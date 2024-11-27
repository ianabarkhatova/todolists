import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { tasksApi } from "../features/todolists/api/tasksApi"

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
    setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
    changeTheme: create.reducer<{ themeMode: ThemeModeType }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
  }),
  extraReducers: (builder) => {
    // отрабатывают для всех экшенов
    builder
      .addMatcher(isPending, (state, action) => {
        // loader will not be shown when todolists or tasks are loaded (getTodolists, getTasks)
        if (
          todolistsApi.endpoints.getTodolists.matchPending(action) ||
          tasksApi.endpoints.getTasks.matchPending(action)
        ) {
          return
        }
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state) => {
        state.status = "failed"
      })
  },
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
export const { setAppStatus, setAppError, changeTheme, setIsLoggedIn } = appSlice.actions
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
