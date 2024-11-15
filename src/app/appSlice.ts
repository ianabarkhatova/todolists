import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
    themeMode: "light" as ThemeModeType,
    isLoggedIn: false,
  },
  reducers: (create) => ({
    setAppStatus: create.reducer<{ status: RequestStatusType }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppError: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setAppInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
      state.isInitialized = action.payload.isInitialized
    }),
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    changeTheme: create.reducer<{ themeMode: ThemeModeType }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectError: (state) => state.error,
    selectIsInitialized: (state) => state.isInitialized,
    selectStatus: (state) => state.status,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
})

export const appReducer = appSlice.reducer
// actions
export const { setAppStatus, setAppError, setAppInitialized, changeTheme, setIsLoggedIn } = appSlice.actions
// selectors
export const { selectStatus, selectError, selectThemeMode, selectIsLoggedIn } = appSlice.selectors

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
