import { instance } from "common/instance"
import { GetTasksResponse, TaskType, UpdateTaskModel } from "./tasksApi.types"
import { GeneralResponse } from "common/types"

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
  },
  createTask(payload: { todolistId: string; title: string }) {
    const { todolistId, title } = payload
    return instance.post<GeneralResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  updateTask(payload: { todolistId: string; taskId: string; apiModel: UpdateTaskModel }) {
    const { todolistId, taskId, apiModel } = payload
    return instance.put<GeneralResponse<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, apiModel)
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    const { todolistId, taskId } = payload
    return instance.delete<GeneralResponse>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
}
