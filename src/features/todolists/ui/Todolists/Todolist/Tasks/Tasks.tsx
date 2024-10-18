import { Task } from "./Task/Task"
import { List } from "@mui/material"
import React from "react"
import { TodolistDomainType } from "../../../../model/todolists-reducer"
import { useAppSelector } from "common/hooks"
import { selectTasks } from "../../../../model/tasksSelectors"
import { TaskStatus } from "common/enums/enums"

type Props = {
  todolist: TodolistDomainType
}

export const Tasks = ({ todolist }: Props) => {
  const { id } = todolist
  let tasks = useAppSelector(selectTasks)[id]

  if (todolist.filter === "completed") {
    tasks = tasks.filter((t) => t.status === TaskStatus.Completed)
  }
  if (todolist.filter === "active") {
    tasks = tasks.filter((t) => t.status === TaskStatus.New)
  }

  return (
    <>
      {tasks.length === 0 ? (
        <p style={{ padding: "8px 0" }}>No tasks</p>
      ) : (
        <List>
          {tasks.map((task) => (
            <Task key={task.id} task={task} todolistId={todolist.id} todolist={todolist} />
          ))}
        </List>
      )}
    </>
  )
}
