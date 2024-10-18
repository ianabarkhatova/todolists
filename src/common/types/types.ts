import { resultCode } from "common/enums/enums"

export type FieldError = {
  error: string
  field: string
}

export type GeneralResponse<D = {}> = {
  messages: string[]
  fieldsErrors: FieldError[]
  resultCode: resultCode
  data: D
}
