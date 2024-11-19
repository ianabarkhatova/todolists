import { RequestStatusType } from "../../../../app/appSlice"
import { Todolist } from "../../api/todolistsApi.types"

export type FilterValues = "all" | "completed" | "active"
export type TodolistDomain = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatusType
}
