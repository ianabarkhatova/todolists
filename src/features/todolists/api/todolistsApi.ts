import { instance } from "common/instance/instance"
import { TodolistType } from "./todolistsApi.types"
import { GeneralResponse, LoginParams } from "common/types"

// api
export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists")
  },
  createTodolist(title: string) {
    return instance.post<GeneralResponse<{ item: TodolistType }>>("todo-lists", { title: title })
  },
  updateTodolist(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.put<GeneralResponse>(`todo-lists/${todolistId}`, { title })
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<GeneralResponse>(`todo-lists/${todolistId}`)
  },
}

export const authApi = {
  login(data: LoginParams) {
    return instance.post<GeneralResponse<{ userId?: number }>>("auth/login", data)
  },
  logout() {
    return instance.delete<GeneralResponse<{ userId?: number }>>("auth/login")
  },
  me() {
    return instance.get<GeneralResponse<{ id: number; email: string; login: string }>>("/auth/me")
  },
}
