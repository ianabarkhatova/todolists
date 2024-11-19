import { Task } from "./Task/Task"
import { List } from "@mui/material"
import React, { useState } from "react"
import { TodolistDomainType } from "../../../../model/todolistsSlice"
import { TaskStatus } from "common/enums/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"
import { TasksSkeleton } from "../../../skeletons/TasksSkeleton/TasksSkeleton"
import { useAppDispatch } from "common/hooks"
import { TasksPagination } from "../TasksPagination/TasksPagination"

type Props = {
  todolist: TodolistDomainType
}

type ErrorData = {
  status: number
  data: {
    message: string
  }
}

export const Tasks = ({ todolist }: Props) => {
  const { id } = todolist
  const [page, setPage] = useState(1)

  const { data, isLoading } = useGetTasksQuery({
    todolistId: id,
    args: { page },
  })
  const dispatch = useAppDispatch()
  let tasks = data?.items

  if (todolist.filter === "completed") {
    tasks = tasks?.filter((t) => t.status === TaskStatus.Completed)
  }
  if (todolist.filter === "active") {
    tasks = tasks?.filter((t) => t.status === TaskStatus.New)
  }

  if (isLoading) {
    return <TasksSkeleton />
  }

  // if (error) {
  //   let errMsg = "Some error occurred"
  //   if ("data" in error) {
  //     const errData = error.data as ErrorData
  //     if ("message" in errData) {
  //       errMsg = errData.message as string
  //     }
  //   }
  //   dispatch(setAppError({ error: errMsg }))
  // }

  return (
    <>
      {tasks?.length === 0 ? (
        <p style={{ padding: "8px 0" }}>No tasks</p>
      ) : (
        <>
          <List>
            {tasks?.map((task) => <Task key={task.id} task={task} todolistId={todolist.id} todolist={todolist} />)}
          </List>
          <TasksPagination totalCount={data?.totalCount || 0} page={page} setPage={setPage} />
        </>
      )}
    </>
  )
}
