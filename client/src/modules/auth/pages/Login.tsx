import { useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useToast } from '@/components/ui'
import { AuthForm } from '../components/AuthForm'
import { loginUserThunk } from '../store/auth.thunks'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const { loading, error, token } = useAppSelector((s) => s.auth)
  const { showToast } = useToast()

  useEffect(() => {
    if (token) {
      showToast({ type: 'success', message: 'Logged in successfully' })
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/upload-video'
      navigate(from, { replace: true })
    }
  }, [token, navigate, location.state, showToast])

  const handleSubmit = (data: { email: string; password: string }) => {
    dispatch(loginUserThunk(data)).unwrap().catch(() => {})
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Sign in
        </h1>
        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}
        <AuthForm
          mode="login"
          onSubmit={handleSubmit}
          isLoading={loading}
        />
        <p className="mt-4 text-center text-sm text-slate-600">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
