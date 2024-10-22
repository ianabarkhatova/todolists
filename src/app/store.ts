import { tasksReducer } from "../features/todolists/model/tasksSlice"
import { todolistsReducer } from "../features/todolists/model/todolistsSlice"
import { appReducer } from "./appSlice"
import { authReducer } from "../features/auth/model/authSlice"
import { configureStore } from "@reduxjs/toolkit"

export const store = configureStore({
  reducer: { tasks: tasksReducer, todolists: todolistsReducer, app: appReducer, auth: authReducer },
})
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
