import { TasksObjType } from "../../../app/App"
import { AppDispatch, AppRootStateType } from "../../../app/store"
import { RequestStatusType, setAppStatus } from "../../../app/appSlice"
import { tasksApi } from "../api/tasksApi"
import { TaskType, UpdateTaskModel } from "../api/tasksApi.types"
import { resultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { Dispatch } from "redux"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolist, removeTodolist, setTodolists } from "./todolistsSlice"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {} as TasksObjType,
  reducers: {
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift(action.payload.task)
    },
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks.splice(index, 1)
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks[index] = { ...tasks[index], ...action.payload.model }
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskType[]; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks
    },
    clearData: () => {
      return {}
    },
    changeTaskEntityStatus: (
      state,
      action: PayloadAction<{ taskId: string; todolistId: string; status: RequestStatusType }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) tasks[index].entityStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder
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
export const { addTask, removeTask, changeTaskEntityStatus, setTasks, updateTask, clearData } = tasksSlice.actions

//thunk creators
export const getTasksTC = (todolistId: string) => (dispatch: AppDispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  tasksApi
    .getTasks(todolistId)
    .then((res) => {
      if (res.data.error === null) {
        dispatch(setTasks({ tasks: res.data.items, todolistId }))
        dispatch(setAppStatus({ status: "succeeded" }))
        // console.log("getTasks ", res)
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "loading" }))
  tasksApi
    .deleteTask({ todolistId, taskId })
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        dispatch(removeTask({ taskId, todolistId }))
        dispatch(setAppStatus({ status: "succeeded" }))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((error) => {
      handleServerNetworkError(dispatch, error)
    })
}
export const addTaskTC =
  (title: string, todolistId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .createTask({ todolistId, title })
      .then((res) => {
        if (res.data.resultCode === resultCode.Success) {
          dispatch(addTask({ task: res.data.data.item }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(dispatch, error)
      })
  }
export const updateTaskTC =
  (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todolistId].find((t) => {
      return t.id === taskId
    })
    if (!task) {
      console.warn("task not found in the state")
      return
    }
    const apiModel: UpdateTaskModel = {
      title: task.title,
      startDate: task.startDate,
      priority: task.priority,
      description: task.description,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    }

    if (task) {
      dispatch(setAppStatus({ status: "loading" }))
      dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "loading" }))
      tasksApi
        .updateTask({ todolistId, taskId, apiModel })
        .then((res) => {
          if (res.data.resultCode === resultCode.Success) {
            dispatch(updateTask({ taskId, model: domainModel, todolistId }))
            dispatch(setAppStatus({ status: "succeeded" }))
            dispatch(changeTaskEntityStatus({ taskId, todolistId, status: "succeeded" }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(dispatch, error)
        })
    }
  }

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
