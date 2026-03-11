export type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export type CreateUserPayload = {
  name: string
  email: string
  role: string
}

export type UpdateUserPayload = Partial<CreateUserPayload>
