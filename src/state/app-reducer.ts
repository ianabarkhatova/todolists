

export const appReducer = (state: InitialStateType = initialState, action: AppActionType
): InitialStateType => {
    switch (action.type) {
        case 'APP-SET-STATUS':
            return { ...state, status: action.status }
        case 'APP-SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
}

// action creators
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP-SET-STATUS', status }) as const
export const setAppErrorAC = (error: string | null) => ({ type: 'APP-SET-ERROR', error }) as const

// types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
type AppActionType = SetAppStatusActionType | SetAppErrorActionType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
}