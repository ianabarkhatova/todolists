import { instance } from "common/instance"
import { TodolistType } from "./todolistsApi.types"
import { GeneralResponse } from "common/types"

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
