export type FieldErrorType = {
    error: string
    field: string
}

export type GeneralResponseType<D = {}> = {
    messages: string[],
    fieldsErrors: FieldErrorType[],
    resultCode: number
    data: D
}

export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
