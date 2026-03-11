export type LoginCredentials = {
  email: string
  password: string
}

export type LoginResponse = {
  user: {
    id: string
    email: string
  }
  token: string
}
