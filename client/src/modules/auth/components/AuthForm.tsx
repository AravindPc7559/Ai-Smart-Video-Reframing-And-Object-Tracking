import { useState } from 'react'
import { z } from 'zod'
import { Button, Input } from '@/components/ui'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

const registerSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  mobile: z.string().min(1, 'Mobile is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginPayload = { email: string; password: string }
type RegisterPayload = { fullName: string; mobile: string; email: string; password: string }

type AuthFormProps =
  | {
      mode: 'login'
      onSubmit: (data: LoginPayload) => void
      isLoading?: boolean
    }
  | {
      mode: 'register'
      onSubmit: (data: RegisterPayload) => void
      isLoading?: boolean
    }

export function AuthForm(props: AuthFormProps) {
  const isLogin = props.mode === 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [mobile, setMobile] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      const result = loginSchema.safeParse({ email, password })
      if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.issues.forEach((issue) => {
          const path = String(issue.path[0])
          if (!fieldErrors[path]) fieldErrors[path] = issue.message
        })
        setErrors(fieldErrors)
        return
      }
      setErrors({})
      props.onSubmit(result.data)
    } else {
      const result = registerSchema.safeParse({ fullName, mobile, email, password })
      if (!result.success) {
        const fieldErrors: Record<string, string> = {}
        result.error.issues.forEach((issue) => {
          const path = String(issue.path[0])
          if (!fieldErrors[path]) fieldErrors[path] = issue.message
        })
        setErrors(fieldErrors)
        return
      }
      setErrors({})
      props.onSubmit(result.data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!isLogin && (
        <>
          <Input
            label="Full name"
            id="fullName"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Doe"
            autoComplete="name"
            error={errors.fullName}
          />
          <Input
            label="Mobile"
            id="mobile"
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+1234567890"
            autoComplete="tel"
            error={errors.mobile}
          />
        </>
      )}
      <Input
        label="Email"
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email}
      />
      <Input
        label="Password"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••••"
        autoComplete={isLogin ? 'current-password' : 'new-password'}
        error={errors.password}
      />
      <Button type="submit" className="w-full" isLoading={props.isLoading}>
        {isLogin ? 'Sign in' : 'Create account'}
      </Button>
    </form>
  )
}
