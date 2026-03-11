import { createAsyncThunk } from '@reduxjs/toolkit'
import { setStoredToken, clearStoredToken } from '@/api/apiClient'
import { logout as logoutAction } from './auth.slice'
import * as authService from '../services/auth.service'
import type { AuthUser } from './auth.types'

const AUTH_USER_KEY = 'auth_user'

export const registerUserThunk = createAsyncThunk(
  'auth/register',
  async (
    data: Parameters<typeof authService.registerUser>[0],
    { rejectWithValue }
  ) => {
    try {
      const result = await authService.registerUser(data)
      setStoredToken(result.token)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user))
      return { user: result.user, token: result.token }
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Registration failed')
    }
  }
)

export const loginUserThunk = createAsyncThunk(
  'auth/login',
  async (
    data: Parameters<typeof authService.loginUser>[0],
    { rejectWithValue }
  ) => {
    try {
      const result = await authService.loginUser(data)
      setStoredToken(result.token)
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(result.user))
      return { user: result.user as AuthUser, token: result.token }
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : 'Login failed')
    }
  }
)

export function logoutThunk() {
  return (dispatch: (action: ReturnType<typeof logoutAction>) => void) => {
    clearStoredToken()
    localStorage.removeItem(AUTH_USER_KEY)
    dispatch(logoutAction())
  }
}
