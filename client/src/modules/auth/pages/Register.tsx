import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useToast } from '@/components/ui'
import { AuthForm } from '../components/AuthForm'
import { registerUserThunk } from '../store/auth.thunks'

export function Register() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, error, token } = useAppSelector((s) => s.auth)
  const { showToast } = useToast()

  useEffect(() => {
    if (token) {
      showToast({ type: 'success', message: 'Account created successfully' })
      navigate('/upload-video', { replace: true })
    }
  }, [token, navigate, showToast])

  const handleSubmit = (data: { fullName: string; mobile: string; email: string; password: string }) => {
    dispatch(registerUserThunk(data)).unwrap().catch(() => {})
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Create account
        </h1>
        {error && (
          <p className="mb-4 text-sm text-red-600">{error}</p>
        )}
        <AuthForm
          mode="register"
          onSubmit={handleSubmit}
          isLoading={loading}
        />
        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
