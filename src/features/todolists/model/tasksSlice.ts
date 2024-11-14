import { TasksObjType } from "../../../app/App"
import { RequestStatusType } from "../../../app/appSlice"
import { TaskType } from "../api/tasksApi.types"
import { createSlice } from "@reduxjs/toolkit"
import { todolistsApi } from "../api/todolistsApi"

// todo:
// add task name update on enter

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksObjType,
  reducers: (create) => ({
    fetchTasks: create.reducer<{ todolistId: string; tasks: TaskType[] }>((state, action) => {
      state[action.payload.todolistId] = action.payload.tasks
    }),
    removeTask: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    }),
    addTask: create.reducer<{ task: TaskType }>((state, action) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    }),
    updateTask: create.reducer<{
      taskId: string
      todolistId: string
      domainModel: UpdateDomainTaskModelType
    }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.domainModel }
    }),
    changeTaskEntityStatus: create.reducer<{
      taskId: string
      todolistId: string
      status: RequestStatusType
    }>((state, action) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks[index].entityStatus = action.payload.status
    }),
    clearTasksData: create.reducer(() => {
      return {}
    }),
  }),

  extraReducers: (builder) => {
    builder
      .addMatcher(todolistsApi.endpoints.addTodolist.matchFulfilled, (state, action) => {
        state[action.payload.data.item.id] = []
      })
      .addMatcher(todolistsApi.endpoints.removeTodolist.matchFulfilled, (state, action) => {
        // delete state[action.payload.id]
        delete state[action.meta.arg.originalArgs]
      })
      .addMatcher(todolistsApi.endpoints.getTodolists.matchFulfilled, (state, action) => {
        action.payload.forEach((tl) => {
          state[tl.id] = []
        })
      })
  },
  selectors: {
    selectTasks: (state) => state,
  },
})

export const tasksReducer = tasksSlice.reducer
export const { changeTaskEntityStatus, clearTasksData } = tasksSlice.actions
export const { selectTasks } = tasksSlice.selectors

// types
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
