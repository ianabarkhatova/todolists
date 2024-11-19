import { Task } from "./Task/Task"
import { List } from "@mui/material"
import React from "react"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { TasksPagination } from "../TasksPagination/TasksPagination"
import { TodolistDomain } from "../../../../lib/types/types"
import { useTasks } from "../../../../lib/hooks/useTasks"

type Props = {
  todolist: TodolistDomain
}

export const Tasks = ({ todolist }: Props) => {
  const { isLoading, tasks, totalCount, setPage, page } = useTasks(todolist)

  if (isLoading) {
    return <TasksSkeleton />
  }

  return (
    <>
      {tasks?.length === 0 ? (
        <p style={{ padding: "8px 0" }}>No tasks</p>
      ) : (
        <>
          <List>
            {tasks?.map((task) => <Task key={task.id} task={task} todolistId={todolist.id} todolist={todolist} />)}
          </List>
          <TasksPagination totalCount={totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
