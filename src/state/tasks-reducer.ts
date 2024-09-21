import {tasksObjType} from "../temp/App";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TasksObjType} from "../app/AppWithRedux";
import {TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TasksObjType = {}

// Reducer принимает state(initialState) и action и возвращает новый стейт типа TodoListType[]:
export const tasksReducer = (state: tasksObjType = initialState, action: TaskActionType): tasksObjType => {
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.todolistId]
            return stateCopy
        }
        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            // создаем пустые массивы тасок для тудулистов:
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }
        case 'SET-TASKS':
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state
    }
}

// action creators
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => (
    {type: 'UPDATE-TASK', taskId, todolistId, model} as const)
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) => ({type: "SET-TASKS", tasks, todolistId} as const)

//thunk creators
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch<TaskActionType>) =>
    todolistsAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId))
        })
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<TaskActionType>) =>
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<TaskActionType>) =>
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<TaskActionType>, getState: () => AppRootStateType) => {
        // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
        // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
        // чтобы у неё отобрать остальные св-ва
        const state = getState()
        const task = state.tasks[todolistId].find(t => {
            return t.id === taskId
        })

        // if task does not exist:
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        if (task) {
            todolistsAPI
                .updateTask(todolistId, taskId, apiModel)
                .then(() => {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                })
        }
    }

// types
export type TaskActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}











