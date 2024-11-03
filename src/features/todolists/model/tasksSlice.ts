import { TasksObjType } from "../../../app/App"
import { RequestStatusType, setAppStatus } from "../../../app/appSlice"
import { AddTaskArgs, tasksApi, UpdateTaskArgs } from "../api/tasksApi"
import { TaskType, UpdateTaskModel } from "../api/tasksApi.types"
import { ResultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist, setTodolists } from "./todolistsSlice"
import { createAppAsyncThunk } from "common/utils/createAppAsyncThunk"
import { handleServerNetworkError } from "common/utils/error-utils"

// todo:
// add task name update on enter

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksObjType,
  reducers: {
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ taskId: string; todolistId: string; status: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks[index].entityStatus = action.payload.status
    },
    clearTasksData: () => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift(action.payload.task)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.domainModel }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) tasks.splice(index, 1)
      })
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
  },
})

export const tasksReducer = tasksSlice.reducer
export const { changeTaskEntityStatus, clearTasksData } = tasksSlice.actions

//thunk creators
export const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  `${tasksSlice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await tasksApi.getTasks(todolistId)
      const tasks = res.data.items
      dispatch(setAppStatus({ status: "succeeded" }))
      return { tasks, todolistId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const addTask = createAppAsyncThunk<{ task: TaskType }, AddTaskArgs>(
  `${tasksSlice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await tasksApi.createTask({ todolistId: arg.todolistId, title: arg.title })
      if (res.data.resultCode === ResultCode.Success) {
        const task = res.data.data.item
        dispatch(setAppStatus({ status: "succeeded" }))
        return { task }
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

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${tasksSlice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI

    try {
      dispatch(setAppStatus({ status: "loading" }))
      const state = getState()
      const task = state.tasks[arg.todolistId].find((t) => {
        return t.id === arg.taskId
      })
      if (!task) {
        console.warn("task not found in the state")
        return rejectWithValue(null)
      }

      const apiModel: UpdateTaskModel = {
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        ...arg.domainModel,
      }

      const res = await tasksApi.updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, apiModel })
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(changeTaskEntityStatus({ taskId: arg.taskId, todolistId: arg.todolistId, status: "succeeded" }))
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

export const removeTask = createAppAsyncThunk<Omit<UpdateTaskArgs, "domainModel">, Omit<UpdateTaskArgs, "domainModel">>(
  `${tasksSlice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      dispatch(changeTaskEntityStatus({ taskId: arg.taskId, todolistId: arg.todolistId, status: "loading" }))
      const res = await tasksApi.deleteTask({ todolistId: arg.todolistId, taskId: arg.taskId })
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatus({ status: "succeeded" }))
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
export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}

export const tasksThunks = { fetchTasks, removeTask, addTask, updateTask }
