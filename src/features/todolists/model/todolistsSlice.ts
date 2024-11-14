import { RequestStatusType } from "../../../app/appSlice"
import { TodolistType } from "../api/todolistsApi.types"
import { createSlice } from "@reduxjs/toolkit"

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

// types
export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
