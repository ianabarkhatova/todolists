import { TasksObjType } from "../../../app/App"
import { AppDispatch, AppRootStateType } from "../../../app/store"
import { RequestStatusType, setAppStatus } from "../../../app/appSlice"
import { tasksApi } from "../api/tasksApi"
import { TaskType, UpdateTaskModel } from "../api/tasksApi.types"
import { resultCode } from "common/enums"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { Dispatch } from "redux"

const initialState: TasksObjType = {}

// Reducer принимает state(initialState) и action и возвращает новый стейт типа TodoListType[]:
export const tasksReducer = (state: TasksObjType = initialState, action: TaskActionType): TasksObjType => {
  switch (action.type) {
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      }
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter((t) => t.id !== action.payload.taskId),
      }
    case "UPDATE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, ...action.payload.model } : t,
        ),
      }
    case "ADD-TODOLIST":
      return { ...state, [action.todolist.id]: [] }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state }
      delete stateCopy[action.todolistId]
      return stateCopy
    }
    case "SET-TODOLISTS": {
      // debugger
      const stateCopy = { ...state }
      // создаем пустые массивы тасок для тудулистов:
      action.todolists.forEach((tl: any) => {
        stateCopy[tl.id] = []
      })
      return stateCopy
    }
    case "SET-TASKS":
      // debugger
      return { ...state, [action.payload.todolistId]: action.payload.tasks }

    case "CHANGE-TASK-ENTITY-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((t) =>
          t.id === action.payload.taskId ? { ...t, entityStatus: action.payload.status } : t,
        ),
      }

    case "CLEAR-DATA":
      return {}

    default:
      return state
  }
}

// action creators
export const addTaskAC = (task: TaskType) => ({ type: "ADD-TASK", task }) as const
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) =>
  ({ type: "UPDATE-TASK", payload: { taskId, todolistId, model } }) as const
export const removeTaskAC = (taskId: string, todolistId: string) =>
  ({ type: "REMOVE-TASK", payload: { taskId, todolistId } }) as const
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
  ({ type: "SET-TASKS", payload: { tasks, todolistId } }) as const
export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, status: RequestStatusType) =>
  ({ type: "CHANGE-TASK-ENTITY-STATUS", payload: { taskId, todolistId, status } }) as const

//thunk creators
export const getTasksTC =
  (todolistId: string): AppDispatch =>
  (dispatch: any) => {
    dispatch(setAppStatus({ status: "loading" }))
    tasksApi
      .getTasks(todolistId)
      .then((res) => {
        if (res.data.error === null) {
          dispatch(setTasksAC(res.data.items, todolistId))
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
  dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"))
  tasksApi
    .deleteTask({ todolistId, taskId })
    .then((res) => {
      if (res.data.resultCode === resultCode.Success) {
        dispatch(removeTaskAC(taskId, todolistId))
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
          dispatch(addTaskAC(res.data.data.item))
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
    // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
    // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
    // чтобы у неё отобрать остальные св-ва
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
      dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"))
      tasksApi
        .updateTask({ todolistId, taskId, apiModel })
        .then((res) => {
          if (res.data.resultCode === resultCode.Success) {
            dispatch(updateTaskAC(taskId, domainModel, todolistId))
            dispatch(setAppStatus({ status: "succeeded" }))
            dispatch(changeTaskEntityStatusAC(taskId, todolistId, "succeeded"))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(dispatch, error)
        })
    }
  }

// types
export type TaskActionType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof setTasksAC>
  | ReturnType<typeof changeTaskEntityStatusAC>
  | any

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: number
  priority?: number
  startDate?: string
  deadline?: string
}
