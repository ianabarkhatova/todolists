import { appReducer, appSlice } from "./appSlice"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { baseApi } from "./baseApi"
import { tasksApi } from "../features/todolists/api/tasksApi"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
