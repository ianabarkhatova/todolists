import React, { ChangeEvent, memo, useCallback } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { removeTaskTC, updateTaskTC } from "../../../../../model/tasks-reducer"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks"
import { TaskStatus } from "common/enums"
import { EditableSpan } from "common/components"
import { TaskType } from "../../../../../api/tasksApi.types"
import { TodolistDomainType } from "../../../../../model/todolists-reducer"

export type TaskProps = {
  task: TaskType
  todolistId: string
  todolist: TodolistDomainType
}

export const Task = memo(({ task, todolistId, todolist }: TaskProps) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = useCallback(() => {
    dispatch(removeTaskTC(task.id, todolistId))
  }, [])

  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTaskTC(task.id, todolistId, { status: newStatus }))
  }, [])

  const changeTaskTitleHandler = useCallback(
    (newValue: string) => {
      dispatch(updateTaskTC(task.id, todolistId, { title: newValue }))
    },
    [dispatch, task.id, todolistId],
  )

  return (
    <ListItem sx={getListItemSx(task.status)}>
      <div>
        <Checkbox
          checked={task.status === TaskStatus.Completed}
          onChange={changeTaskStatusHandler}
          disabled={task.entityStatus === "loading" || todolist.entityStatus === "loading"}
        />
        <EditableSpan
          title={task.title}
          onChange={changeTaskTitleHandler}
          disabled={task.entityStatus === "loading" || todolist.entityStatus === "loading"}
        />
      </div>
      <IconButton
        aria-label="delete"
        onClick={removeTaskHandler}
        disabled={task.entityStatus === "loading" || todolist.entityStatus === "loading"}
      >
        <DeleteOutlineIcon />
      </IconButton>
    </ListItem>
  )
})
