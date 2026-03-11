import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/app/stores/authStore'
import { useToastStore } from '@/app/stores/toastStore'
import { login as loginApi } from '../api/auth.api'
import type { LoginCredentials } from '../types'

export function useAuth() {
  const navigate = useNavigate()
  const location = useLocation()
  const setUser = useAuthStore((s) => s.setUser)
  const addToast = useToastStore((s) => s.addToast)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const logout = useAuthStore((s) => s.logout)

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (res) => {
      setUser({
        id: res.user.id,
        email: res.user.email,
        token: res.token,
      })
      addToast('Logged in successfully', 'success')
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/users'
      navigate(from, { replace: true })
    },
  })

  const login = (credentials: LoginCredentials) => loginMutation.mutate(credentials)

  const handleLogout = () => {
    logout()
    addToast('Logged out', 'info')
    navigate('/login', { replace: true })
  }

  return {
    login,
    logout: handleLogout,
    isAuthenticated,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  }
}
