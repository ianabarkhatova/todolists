import {TodolistType} from "./todolistsApi.types";
import {instance} from "../../../common/instance/instance";
import {GeneralResponseType, LoginParamsType} from "../../../common/types/types";


// api
export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<GeneralResponseType<{ item: TodolistType }>>
        ('todo-lists', {title: title})
    },
    updateTodolist(payload: {todolistId: string, title: string}) {
        const {todolistId, title} = payload
        return instance.put<GeneralResponseType>(
            `todo-lists/${todolistId}`, {title})
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


