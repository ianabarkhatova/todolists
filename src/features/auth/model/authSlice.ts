import { LoginArgs } from "../api/authApi.types"
import { authApi } from "../api/authApi"
import { resultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch } from "../../../app/store"
import { setAppStatus } from "../../../app/appSlice"
import { clearTodolistsData } from "../../todolists/model/todolistsSlice"
import { clearTasksData } from "../../todolists/model/tasksSlice"

export const authSlice = createSlice({
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
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .login(data)
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
        dispatch(setAppStatus({ status: "succeeded" }))
        localStorage.setItem("sn-token", res.data.data.token)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const logOutTC = () => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        console.log(res.data.data)
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(clearTodolistsData())
        dispatch(clearTasksData())
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
