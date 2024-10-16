import { v1 } from "uuid"
import { todolistsApi } from "../features/todolists/api/todolistsApi"
import { Dispatch } from "redux"
import { RequestStatusType, setAppStatusAC, SetAppStatusActionType } from "../app/app-reducer"
import { handleServerAppError, handleServerNetworkError } from "../utils/error-utils"
import { getTasksTC } from "./tasks-reducer"
import { TodolistType } from "../features/todolists/api/todolistsApi.types"

export let todoListId1 = v1()
export let todoListId2 = v1()

const initialState: TodolistDomainType[] = []

// Reducer принимает state(initialState) и action и возвращает новый стейт типа TodolistDomainType[]:
export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: TodolistActionType,
): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.todolistId)
    case "ADD-TODOLIST":
      return [{ ...action.todolist, filter: "all", entityStatus: "idle" }, ...state]
    case "CHANGE-TODOLIST-TITLE":
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl))
    case "CHANGE-TODOLIST-FILTER":
      return state.map((tl) => (tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.value } : tl))
    case "SET-TODOLISTS":
      // не делаем копию стейта, т к массив тудулистов изначально пустой
      return action.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    case "CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map((tl) => (tl.id === action.payload.id ? { ...tl, entityStatus: action.payload.status } : tl))
    case "CLEAR-DATA":
      return []
    default:
      return state
  }
}

// action creators
export const addTodolistAC = (todolist: TodolistType) => ({ type: "ADD-TODOLIST", todolist }) as const
export const removeTodolistAC = (todolistId: string) => ({ type: "REMOVE-TODOLIST", todolistId }) as const
export const changeTodolistTitleAC = (todolistId: string, title: string) =>
  ({ type: "CHANGE-TODOLIST-TITLE", payload: { todolistId, title } }) as const
export const changeTodolistFilterAC = (todolistId: string, value: FilterValuesType) =>
  ({ type: "CHANGE-TODOLIST-FILTER", payload: { todolistId, value } }) as const
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET-TODOLISTS", todolists }) as const
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
  ({ type: "CHANGE-TODOLIST-ENTITY-STATUS", payload: { id, status } }) as const
export const clearTodolistsDataAC = () => ({ type: "CLEAR-DATA" }) as const

//thunk creators
export const getTodolistsTC = () => (dispatch: any) => {
  // todo: type for dispatch above
  //не ставим loading т к приложение только загрузилось
  todolistsApi
    .getTodolists()
    .then((res) => {
      dispatch(setTodolistsAC(res.data))
      dispatch(setAppStatusAC("succeeded"))
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
export const removeTodolistTC = (todolistId: string) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
  todolistsApi
    .deleteTodolist(todolistId)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(removeTodolistAC(todolistId))
        dispatch(setAppStatusAC("succeeded"))
        console.log("removeTodolist ", res)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const addTodolistTC = (title: string) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC("loading"))
  todolistsApi
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: ThunkDispatch) => {
  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodolistEntityStatusAC(todolistId, "loading"))
  todolistsApi
    .updateTodolist({ todolistId, title })
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(changeTodolistTitleAC(todolistId, title))
        dispatch(setAppStatusAC("succeeded"))
        dispatch(changeTodolistEntityStatusAC(todolistId, "succeeded"))
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
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>
  | ClearTodolistsDataActionType

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch<TodolistActionType | SetAppStatusActionType>
export type ClearTodolistsDataActionType = ReturnType<typeof clearTodolistsDataAC>
