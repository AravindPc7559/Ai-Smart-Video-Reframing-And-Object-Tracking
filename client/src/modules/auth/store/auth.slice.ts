import { createSlice } from '@reduxjs/toolkit'
import type { AuthState, AuthUser } from './auth.types'
import { getStoredToken } from '@/api/apiClient'

const AUTH_USER_KEY = 'auth_user'

function getInitialAuthState(): AuthState {
  const token = getStoredToken()
  if (!token) {
    return { user: null, token: null, loading: false, error: null }
  }
  try {
    const stored = localStorage.getItem(AUTH_USER_KEY)
    const user = stored ? (JSON.parse(stored) as AuthUser) : null
    return { user, token, loading: false, error: null }
  } catch {
    return { user: null, token: null, loading: false, error: null }
  }
}

type AuthPayload = {
  user: AuthUser
  token: string
}

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    setUser(state, action: { payload: AuthPayload }) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.error = null
    },
    logout(state) {
      state.user = null
      state.token = null
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type?.startsWith('auth/') && action.type?.endsWith('/pending'),
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addMatcher(
        (action) => action.type?.startsWith('auth/') && action.type?.endsWith('/fulfilled'),
        (state, action: { payload?: AuthPayload }) => {
          state.loading = false
          state.error = null
          if (action.payload) {
            state.user = action.payload.user
            state.token = action.payload.token
          }
        }
      )
      .addMatcher(
        (action) => action.type?.startsWith('auth/') && action.type?.endsWith('/rejected'),
        (state, action: { payload?: string; error?: { message?: string } }) => {
          state.loading = false
          state.error = action.payload ?? action.error?.message ?? 'Request failed'
        }
      )
  },
})

export const { setUser, logout } = authSlice.actions
export const authReducer = authSlice.reducer
