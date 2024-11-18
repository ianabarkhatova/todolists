import { Task } from "./Task/Task"
import { List } from "@mui/material"
import React from "react"
import { TodolistDomainType } from "../../../../model/todolistsSlice"
import { TaskStatus } from "common/enums/enums"
import { useGetTasksQuery } from "../../../../api/tasksApi"

type Props = {
  todolist: TodolistDomainType
}

export const Tasks = ({ todolist }: Props) => {
  const { id } = todolist
  const { data } = useGetTasksQuery(id)
  let tasks = data?.items
  console.log(todolist.filter)
  // const filter2 = useAppSelector((state) => state.todolists.find((todolist) => todolist.id === id)?.filter)
  // console.log("Current filter value:", filter2)

  if (todolist.filter === "completed") {
    tasks = tasks?.filter((t) => t.status === TaskStatus.Completed)
  }
  if (todolist.filter === "active") {
    tasks = tasks?.filter((t) => t.status === TaskStatus.New)
  }

  console.log("Filter in Tasks component:", todolist.filter)
  console.log("Fetched tasks on filter change:", data)

  return (
    <>
      {tasks?.length === 0 ? (
        <p style={{ padding: "8px 0" }}>No tasks</p>
      ) : (
        <List>
          {tasks?.map((task) => <Task key={task.id} task={task} todolistId={todolist.id} todolist={todolist} />)}
        </List>
      )}
    </>
  )
}
