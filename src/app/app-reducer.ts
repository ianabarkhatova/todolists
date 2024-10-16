import { authApi } from "../features/todolists/api/todolistsApi"
import { handleServerAppError } from "../utils/error-utils"
import { LoginActionType, setIsLoggedInAC } from "../state/auth-reducer"
import { Dispatch } from "redux"

const initialState: InitialStateType = {
  status: "idle",
  error: null as null | string,
  isInitialized: false,
  themeMode: "light" as ThemeModeType,
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS": //APP - название редьюсера, подход Redux Duсks
      return { ...state, status: action.status }
    case "APP/SET-ERROR":
      return { ...state, error: action.error }
    case "APP/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.value }
    case "APP/CHANGE-THEME":
      return { ...state, themeMode: action.value }
    default:
      return state
  }
}

// action creators
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status }) as const
export const setAppErrorAC = (error: string | null) => ({ type: "APP/SET-ERROR", error }) as const
export const setAppInitializedAC = (value: boolean) => ({ type: "APP/SET-IS-INITIALIZED", value }) as const
export const changeThemeAC = (value: ThemeModeType) => ({ type: "APP/CHANGE-THEME", value }) as const

// thunk creators
export const initializeAppTC = () => (dispatch: ThunkDispatch) => {
  authApi.me().then((res) => {
    // debugger
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true))
    } else {
      handleServerAppError(res.data, dispatch)
    }
    dispatch(setAppInitializedAC(true))
  })

  // .catch((error) => {
  //     handleServerNetworkError(dispatch, error)
  // })
}

// types
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsInitializedActionType = ReturnType<typeof setAppInitializedAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type ChangeThemeActionType = ReturnType<typeof changeThemeAC>
export type AppActionType =
  | SetAppStatusActionType
  | SetAppErrorActionType
  | SetIsInitializedActionType
  | ChangeThemeActionType
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = {
  // происходит ли сейчас взаимодействие с сервером
  status: RequestStatusType
  // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
  error: string | null
  // true, когда приложение проинициализировалось (проверили юзера, получили настройки и т.д.)
  isInitialized: boolean
  themeMode: ThemeModeType
}
type ThunkDispatch = Dispatch<
  SetAppErrorActionType | SetAppStatusActionType | LoginActionType | SetIsInitializedActionType
>

export type ThemeModeType = "dark" | "light"
