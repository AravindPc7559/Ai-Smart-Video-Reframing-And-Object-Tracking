import axios, { type AxiosError } from 'axios'
import { useAuthStore } from '@/app/stores/authStore'
import { useToastStore } from '@/app/stores/toastStore'

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message = error.response?.data?.message ?? error.message ?? 'Request failed'
    useToastStore.getState().addToast(message, 'error')
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)
