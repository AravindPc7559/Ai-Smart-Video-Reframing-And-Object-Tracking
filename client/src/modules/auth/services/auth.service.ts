import { apiClient } from '@/api/apiClient'

export type RegisterPayload = {
  fullName: string
  mobile: string
  email: string
  password: string
}

export type LoginPayload = {
  email: string
  password: string
}

type UserResponse = {
  _id: string
  fullName: string
  mobile: string
  email: string
}

type AuthData = {
  user: UserResponse
  token: string
}

type ApiResponse = {
  data?: AuthData
  user?: UserResponse
  token?: string
}

function toAuthUser(raw: UserResponse): { id: string; email: string; fullName?: string; mobile?: string } {
  return {
    id: raw._id,
    email: raw.email,
    fullName: raw.fullName,
    mobile: raw.mobile,
  }
}

export async function registerUser(data: RegisterPayload): Promise<{ user: ReturnType<typeof toAuthUser>; token: string }> {
  const res = await apiClient.post<ApiResponse>('/user/register', data)
  const payload = res.data?.data ?? { user: res.data?.user!, token: res.data?.token! }
  return { user: toAuthUser(payload.user), token: payload.token }
}

export async function loginUser(data: LoginPayload): Promise<{ user: ReturnType<typeof toAuthUser>; token: string }> {
  const res = await apiClient.post<ApiResponse>('/user/login', data)
  const payload = res.data?.data ?? { user: res.data?.user!, token: res.data?.token! }
  return { user: toAuthUser(payload.user), token: payload.token }
}
