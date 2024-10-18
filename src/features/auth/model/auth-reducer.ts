import { clearTodolistsDataAC, ClearTodolistsDataActionType } from "../../todolists/model/todolists-reducer"
import { Dispatch } from "redux"
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../../app/app-reducer"
import { LoginArgs } from "../api/authApi.types"
import { authApi } from "../api/authApi"
import { resultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"

const initialState = {
  isLoggedIin: false,
}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
  switch (action.type) {
    case "Login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIin: action.isLoggedIn }
    default:
      return state
  }
}

// action creators
export const setIsLoggedInAC = (isLoggedIn: boolean) => ({ type: "Login/SET-IS-LOGGED-IN", isLoggedIn }) as const

//thunk creators
export const loginTC = (data: LoginArgs) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        console.log(res.data.data)
        dispatch(setIsLoggedInAC(true))
        dispatch(setAppStatusAC("succeeded"))
        localStorage.setItem("sn-token", res.data.data.token)
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
      if (res.data.resultCode === resultCode.Success) {
        console.log(res.data.data)
        dispatch(setIsLoggedInAC(false))
        localStorage.removeItem("sn-token")
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
export type AuthActionType = SetAppStatusActionType | SetAppErrorActionType | ReturnType<typeof setIsLoggedInAC>

type InitialStateType = typeof initialState
type ThunkDispatch = Dispatch<AuthActionType | ClearTodolistsDataActionType>
