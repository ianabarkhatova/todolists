import { filterButtonsContainerSx } from "../Tasks/Task/Task.styles"
import { Box, Button, ButtonProps } from "@mui/material"
import React, { memo } from "react"
import { changeTodolistFilter, FilterValuesType } from "../../../../model/todolistsSlice"
import { TodoListProps } from "../TodoList"
import { useAppDispatch } from "common/hooks"

export const FilterTasksButtons = ({ todolist }: TodoListProps) => {
  const dispatch = useAppDispatch()
  const { id, filter } = todolist

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilter({ todolistId: id, filter: filter }))
  }

  const ButtonWithMemo = memo(({ variant, onClick, color, children, ...rest }: Props) => {
    return (
      <Button variant={variant} onClick={onClick} color={color} {...rest}>
        {children}
      </Button>
    )
  })
  type Props = ButtonProps & {} // прошлые пропсы (MaterialUI) + пропсы для расширения кнопки на будущее
  // {children} - все, что находится между открывающимся и закрывающимся тегами

  return (
    <Box sx={filterButtonsContainerSx}>
      <ButtonWithMemo
        size={"small"}
        onClick={() => changeFilterTasksHandler("all")}
        variant={filter === "all" ? "outlined" : "text"}
        color="inherit"
      >
        All
      </ButtonWithMemo>
      <ButtonWithMemo
        size={"small"}
        onClick={() => changeFilterTasksHandler("active")}
        variant={filter === "active" ? "outlined" : "text"}
        color="primary"
      >
        Active
      </ButtonWithMemo>
      <ButtonWithMemo
        size={"small"}
        onClick={() => changeFilterTasksHandler("completed")}
        variant={filter === "completed" ? "outlined" : "text"}
        color="secondary"
      >
        Completed
      </ButtonWithMemo>
    </Box>
  )
}
