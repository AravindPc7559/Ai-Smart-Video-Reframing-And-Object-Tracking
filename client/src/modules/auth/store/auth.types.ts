export type AuthUser = {
  id: string
  email: string
  fullName?: string
  mobile?: string
}

export type AuthState = {
  user: AuthUser | null
  token: string | null
  loading: boolean
  error: string | null
}
