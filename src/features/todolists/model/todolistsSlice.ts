import { v1 } from "uuid"
import { todolistsApi } from "../api/todolistsApi"
import { Dispatch } from "redux"
import { RequestStatusType, setAppStatus, ThemeModeType } from "../../../app/appSlice"
import { getTasksTC } from "./tasksSlice"
import { TodolistType } from "../api/todolistsApi.types"
import { resultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { AppDispatch } from "../../../app/store"
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"

export let todoListId1 = v1()
export let todoListId2 = v1()

const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      // console.log("State", current(state))
      state.filter((tl) => tl.id !== action.payload.todolistId)
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) state.splice(index, 1)
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) state[index].title = action.payload.title
    },
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterValuesType }>) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) state[index].entityStatus = action.payload.status
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    },
    clearTodolistsData: () => {
      return []
    },
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  removeTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  addTodolist,
  setTodolists,
  clearTodolistsData,
} = todolistsSlice.actions

//thunk creators
export const getTodolistsTC = () => (dispatch: AppDispatch) => {
  // todo: type for dispatch above
  //не ставим loading т к приложение только загрузилось
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolists({ todolists: res.data }))
      dispatch(setAppStatus({ status: "succeeded" }))
      return res.data
    })
    .then((todolists) => {
      todolists.forEach((tl) => {
        dispatch(getTasksTC(tl.id))
      })
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({ todolistId: todolistId, status: "loading" }))
  todolistsApi
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        dispatch(removeTodolist({ todolistId: todolistId }))
        dispatch(setAppStatus({ status: "succeeded" }))
        console.log("removeTodolist ", res)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        dispatch(addTodolist({ todolist: res.data.data.item }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTodolistEntityStatus({ todolistId: todolistId, status: "loading" }))
  todolistsApi
    .updateTodolist({ todolistId, title })
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        dispatch(changeTodolistTitle({ todolistId: todolistId, title: title }))
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTodolistEntityStatus({ todolistId: todolistId, status: "succeeded" }))
        console.log("changeTodolist ", res)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}

// types
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
