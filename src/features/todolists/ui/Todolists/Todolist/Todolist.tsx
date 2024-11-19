import React, { memo, useCallback, useEffect } from "react"
import { AddItemForm } from "common/components"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useAddTaskMutation, useGetTasksQuery } from "../../../api/tasksApi"
import { TodolistDomain } from "../../../lib/types/types"

export type TodoListProps = {
  todolist: TodolistDomain
  demo?: boolean
}

export const Todolist = memo(({ todolist, demo }: TodoListProps) => {
  const { id } = todolist
  const [addTask] = useAddTaskMutation()

  const addTaskCallback = useCallback((title: string) => {
    addTask({ todolistId: id, title })
  }, [])

  // if demo mode (for Storybook), the function will break
  useEffect(() => {
    if (demo) {
      return
    }
  }, [])

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
