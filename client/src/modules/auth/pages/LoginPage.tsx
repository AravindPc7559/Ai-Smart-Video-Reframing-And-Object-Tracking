import { useAuth } from '../hooks/useAuth'
import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  const { login, isLoading } = useAuth()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Sign in
        </h1>
        <LoginForm onSubmit={login} isLoading={isLoading} />
      </div>
    </div>
  )
}
