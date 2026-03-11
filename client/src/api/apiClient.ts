import axios, { type AxiosError } from 'axios'
import { useToastStore } from '@/app/stores/toastStore'

const AUTH_TOKEN_KEY = 'auth_token'

const baseURL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api'

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

export function getStoredToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setStoredToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function clearStoredToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

apiClient.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; error?: string }>) => {
    const status = error.response?.status
    const message =
      error.response?.data?.message ??
      error.response?.data?.error ??
      error.message ??
      'Request failed'

    if (status === 401) {
      clearStoredToken()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    if (status === 500 || (status && status >= 500)) {
      useToastStore.getState().addToast(message, 'error')
    }

    return Promise.reject(error)
  }
)
