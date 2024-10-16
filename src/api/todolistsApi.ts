import axios from 'axios'
import {RequestStatusType} from "../app/app-reducer";

const apiKey = process.env.REACT_APP_API_KEY;
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': apiKey,
    },
})

// api
export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<GeneralResponseType<{ item: TodolistType }>>
        ('todo-lists', {title: title})
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<GeneralResponseType>(
            `todo-lists/${todolistId}`, {title: title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<GeneralResponseType>(`todo-lists/${todolistId}`)
    },
}

export const authApi = {
    login (data: LoginParamsType) {
        return instance.post<GeneralResponseType<{userId?: number}>>('auth/login', data)
    },
    logout () {
        return instance.delete<GeneralResponseType<{userId?: number}>>('auth/login')
    },
    me() {
        return instance.get<GeneralResponseType<{id: number, email: string, login: string}>>('/auth/me')
    }
}

// types
export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
type FieldErrorType = {
    error: string
    field: string
}
export type GeneralResponseType<D = {}> = {
    messages: string[],
    fieldsErrors: FieldErrorType[],
    resultCode: number
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    entityStatus: RequestStatusType
}
export type GetTasksResponseType = {
    items: TaskType[],
    totalCount: number,
    error: string | null
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha?: string
}
