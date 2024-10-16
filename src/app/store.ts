import { TaskActionType, tasksReducer } from "../features/todolists/model/tasks-reducer"
import { TodolistActionType, todolistsReducer } from "../features/todolists/model/todolists-reducer"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import thunk, { ThunkDispatch } from "redux-thunk"
import { AppActionType, appReducer } from "./app-reducer"
import { authReducer, AuthActionType } from "../features/auth/model/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({ reducer: rootReducer })
export type AppRootStateType = ReturnType<typeof store.getState>

// создаем тип диспатча который принимает как AC так и TC
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, ActionType>

type ActionType = TaskActionType | TodolistActionType | AuthActionType | AppActionType

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
