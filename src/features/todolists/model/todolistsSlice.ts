import { v1 } from "uuid"
import { ChangeTodolistTitleArgs, todolistsApi } from "../api/todolistsApi"
import { RequestStatusType, setAppStatus } from "../../../app/appSlice"
import { TodolistType } from "../api/todolistsApi.types"
import { ResultCode } from "common/enums"
import { handleServerNetworkError } from "common/utils/error-utils"
import { createSlice } from "@reduxjs/toolkit"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { handleServerAppError } from "common/utils/handleServerAppError"

export let todoListId1 = v1()
export let todoListId2 = v1()

// check state:
// const state = current(state)

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: (create) => ({
    fetchTodolists: create.reducer<{ todolists: TodolistType[] }>((state, action) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
    }),
    removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
      state.filter((tl) => tl.id !== action.payload.todolistId)
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) state.splice(index, 1)
    }),
    addTodolist: create.reducer<{ todolist: TodolistType }>((state, action) => {
      state.unshift({ ...action.payload.todolist, filter: "all", entityStatus: "idle" })
    }),
    changeTodolistTitle: create.reducer<{ todolistId: string; title: string }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) state[index].title = action.payload.title
    }),
    changeTodolistFilter: create.reducer<{ todolistId: string; filter: FilterValuesType }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) state[index].filter = action.payload.filter
    }),
    changeTodolistEntityStatus: create.reducer<{
      todolistId: string
      status: RequestStatusType
    }>((state, action) => {
      const index = state.findIndex((todolist) => todolist.id === action.payload.todolistId)
      if (index !== -1) state[index].entityStatus = action.payload.status
    }),
    clearTodolistsData: create.reducer((state, action) => {
      return []
    }),
  }),
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistEntityStatus, changeTodolistFilter, clearTodolistsData } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

//thunk creators
export const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(
  `${todolistsSlice.name}/fetchTodolists`,
  async (_, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistsApi.getTodolists()
      dispatch(setAppStatus({ status: "succeeded" }))
      const todolists = res.data
      return { todolists }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const removeTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  `${todolistsSlice.name}/removeTodolist`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }))
      const res = await todolistsApi.deleteTodolist(todolistId)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { todolistId }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${todolistsSlice.name}/addTodolist`,
  async (title, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistsApi.createTodolist(title)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        const todolist = res.data.data.item
        return { todolist }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const changeTodolistTitle = createAppAsyncThunk<ChangeTodolistTitleArgs, ChangeTodolistTitleArgs>(
  `${todolistsSlice.name}/changeTodolistTitle`,
  async (arg, thunkApi) => {
    const { dispatch, rejectWithValue } = thunkApi
    try {
      dispatch(setAppStatus({ status: "loading" }))
      dispatch(changeTodolistEntityStatus({ todolistId: arg.todolistId, status: "loading" }))
      const res = await todolistsApi.updateTodolist(arg)
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTodolistEntityStatus({ todolistId: arg.todolistId, status: "succeeded" }))
        return arg
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

// types
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export const todolistsThunks = { fetchTodolists, removeTodolist, addTodolist }
