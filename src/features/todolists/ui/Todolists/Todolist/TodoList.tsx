import React, { memo, useCallback, useEffect } from "react"
import { AddItemForm } from "../../../../../common/components/AddItemForm/AddItemForm"
import { addTaskTC } from "../../../../../state/tasks-reducer"
import { TodolistDomainType } from "../../../../../state/todolists-reducer"
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { Tasks } from "./Tasks/Tasks"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export type TodoListProps = {
  todolist: TodolistDomainType
  demo?: boolean
}

export const TodoList = memo(({ todolist, demo }: TodoListProps) => {
  const { id } = todolist
  const addTask = useCallback((title: string) => {
    dispatch(addTaskTC(title, id))
  }, [])
  const dispatch = useAppDispatch()

  // if demo mode (for Storybook), the function will break
  useEffect(() => {
    if (demo) {
      return
    }
    // dispatch(getTasksTC(id))
  }, [])

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
})
