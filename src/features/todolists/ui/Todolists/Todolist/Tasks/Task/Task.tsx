import React, { ChangeEvent, memo, useCallback } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { removeTask, updateTask } from "../../../../../model/tasksSlice"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks"
import { TaskStatus } from "common/enums"
import { EditableSpan } from "common/components"
import { TaskType } from "../../../../../api/tasksApi.types"
import { TodolistDomainType } from "../../../../../model/todolistsSlice"

export type TaskProps = {
  task: TaskType
  todolistId: string
  todolist: TodolistDomainType
}

export const Task = memo(({ task, todolistId, todolist }: TaskProps) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = useCallback(() => {
    dispatch(removeTask({ taskId: task.id, todolistId }))
  }, [])

  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(updateTask({ taskId: task.id, todolistId, domainModel: { status: newStatus } }))
  }, [])

  const changeTaskTitleHandler = useCallback(
    (newValue: string) => {
      dispatch(updateTask({ taskId: task.id, todolistId, domainModel: { title: newValue } }))
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
