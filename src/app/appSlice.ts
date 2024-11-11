import { setIsLoggedIn } from "../features/auth/model/authSlice"
import { authApi } from "../features/auth/api/authApi"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { AppDispatch } from "./store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { handleServerNetworkError } from "common/utils/error-utils"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
    themeMode: "light" as ThemeModeType,
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatusType }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string }>((state, action) => {
      state.error = action.payload.error
    }),
    setAppInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
    changeTheme: create.reducer<{ themeMode: ThemeModeType }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
})

export const appReducer = appSlice.reducer
export const { setAppStatus, setAppError, setAppInitialized, changeTheme } = appSlice.actions

// thunk creators
export const initializeAppTC = () => (dispatch: AppDispatch) => {
  dispatch(
    setAppStatus({ status: "loading" }),
    authApi
      .me()
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }))
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
      .finally(() => {
        dispatch(setAppInitialized({ isInitialized: true }))
      }),
  )
}

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
  themeMode: ThemeModeType
}

export type ThemeModeType = "dark" | "light"

export type AppInitialState = ReturnType<typeof appSlice.getInitialState>
