import { useState } from "react"
import { useGetTasksQuery } from "../../api/tasksApi"
import { TaskStatus } from "common/enums"
import { TodolistDomain } from "../types/types"

export const useTasks = (todolist: TodolistDomain) => {
  const { id, filter } = todolist
  const [page, setPage] = useState(1)
  const { data, isLoading } = useGetTasksQuery({
    todolistId: id,
    args: { page },
  })

  let tasks = data?.items

  if (filter === "completed") {
    tasks = tasks?.filter((t) => t.status === TaskStatus.Completed)
  }
  if (filter === "active") {
    tasks = tasks?.filter((t) => t.status === TaskStatus.New)
  }

  return { tasks, isLoading, page, setPage, totalCount: data?.totalCount }
}
