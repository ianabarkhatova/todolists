import React, { ChangeEvent, KeyboardEvent, memo, useCallback } from "react"
import { Checkbox, IconButton, ListItem } from "@mui/material"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { getListItemSx } from "./Task.styles"
import { useAppDispatch } from "common/hooks"
import { TaskStatus } from "common/enums"
import { EditableSpan } from "common/components"
import { TaskType, UpdateTaskModel } from "../../../../../api/tasksApi.types"
import { TodolistDomainType } from "../../../../../model/todolistsSlice"
import { useRemoveTaskMutation, useUpdateTaskMutation } from "../../../../../api/tasksApi"

export type TaskProps = {
  task: TaskType
  todolistId: string
  todolist: TodolistDomainType
}

export const Task = memo(({ task, todolistId, todolist }: TaskProps) => {
  const dispatch = useAppDispatch()
  const [removeTask] = useRemoveTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const removeTaskHandler = useCallback(() => {
    removeTask({ taskId: task.id, todolistId })
  }, [])

  const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const apiModel: UpdateTaskModel = {
      status: newStatus,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    }
    updateTask({ taskId: task.id, todolistId, apiModel })
  }, [])

  const changeTaskTitleHandler = useCallback(
    (newTitle: string) => {
      const apiModel: UpdateTaskModel = {
        status: task.status,
        title: newTitle,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
      }
      updateTask({ taskId: task.id, todolistId, apiModel })
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
