export type LoginArgs = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: string
}

export type LoginUser = {
  id: number
  email: string
  login: string
}
