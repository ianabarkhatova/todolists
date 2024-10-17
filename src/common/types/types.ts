export type FieldError = {
  error: string
  field: string
}

export type GeneralResponse<D = {}> = {
  messages: string[]
  fieldsErrors: FieldError[]
  resultCode: number
  data: D
}
