import { clearTodolistsDataAC, ClearTodolistsDataActionType } from "../../todolists/model/todolists-reducer"
import { Dispatch } from "redux"
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../../../app/app-reducer"
import { LoginArgs } from "../api/authApi.types"
import { authApi } from "../api/authApi"
import { resultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../../../app/store"
import { ThunkDispatch } from "redux-thunk"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIin: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIin = action.payload.isLoggedIn
    },
  },
})

export const authReducer = authSlice.reducer
export const { setIsLoggedIn } = authSlice.actions

//thunk creators
export const loginTC =
  (data: LoginArgs): AppDispatch =>
  (dispatch: any) => {
    dispatch(setAppStatusAC("loading"))
    authApi
      .login(data)
      .then((res) => {
        if (res.data.resultCode === resultCode.Success) {
          console.log(res.data.data)
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
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
export const logOutTC = (): AppDispatch => (dispatch: any) => {
  dispatch(setAppStatusAC("loading"))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        console.log(res.data.data)
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
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
export type AuthActionType = SetAppStatusActionType | SetAppErrorActionType
