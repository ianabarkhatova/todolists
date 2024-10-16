import { clearTodolistsDataAC, ClearTodolistsDataActionType } from "./todolists-reducer"
import { authApi } from "../features/todolists/api/todolistsApi"
import { Dispatch } from "redux"
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { LoginParams } from "common/types"

const initialState = {
  isLoggedIin: false,
}

export const authReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIin: action.value }
    default:
      return state
  }
}

// action creators
export const setIsLoggedInAC = (value: boolean) => ({ type: "login/SET-IS-LOGGED-IN", value }) as const

//thunk creators
export const loginTC = (data: LoginParams) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === 0) {
        console.log(res.data.data)
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}

export const logOutTC = () => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        console.log(res.data.data)
        dispatch(setIsLoggedInAC(false))
        dispatch(setAppStatusAC("succeeded"))
        dispatch(clearTodolistsDataAC())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}

// types
export type LoginActionType = SetAppStatusActionType | SetAppErrorActionType | ReturnType<typeof setIsLoggedInAC>

type InitialStateType = typeof initialState
type ThunkDispatch = Dispatch<
  SetAppErrorActionType | SetAppStatusActionType | LoginActionType | ClearTodolistsDataActionType
>
