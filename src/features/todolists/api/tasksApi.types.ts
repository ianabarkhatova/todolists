import { RequestStatusType } from "../../../app/app-reducer"
import { TaskPriority, TaskStatus } from "common/enums/enums"

export type GetTasksResponse = {
  items: TaskType[]
  totalCount: number
  error: string | null
}
export type UpdateTaskModel = {
  title: string
  description: string
  status: number
  priority: number
  startDate: string
  deadline: string
}
export type TaskType = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
  entityStatus: RequestStatusType
}
