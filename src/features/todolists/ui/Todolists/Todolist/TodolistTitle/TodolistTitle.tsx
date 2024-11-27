import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { todolistsApi, useChangeTodolistTitleMutation, useRemoveTodolistMutation } from "../../../../api/todolistsApi"
import { RequestStatusType } from "../../../../../../app/appSlice"
import { useDispatch } from "react-redux"
import { TodolistDomain } from "../../../../lib/types/types"

type Props = {
  todolist: TodolistDomain
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const [removeTodolist] = useRemoveTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()
  const dispatch = useDispatch()

  const updateQueryData = (status: RequestStatusType) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const index = state.findIndex((todolist) => todolist.id === id)
        if (index !== -1) state[index].entityStatus = status
      }),
    )
  }

  const removeTodoListHandler = () => {
    updateQueryData("loading")
    removeTodolist(id)
      .unwrap() // нужен, чтобы попасть в catch
      .catch(() => {
        updateQueryData("idle")
      })
  }

  const changeTodoListTitleHandler = (title: string) => {
    changeTodolistTitle({ id, title })
  }

  return (
    <h3 style={{ padding: "20px 0 20px" }}>
      <EditableSpan
        title={title}
        onChange={changeTodoListTitleHandler}
        disabled={todolist.entityStatus === "loading"}
      />
      <IconButton aria-label="delete" onClick={removeTodoListHandler} disabled={entityStatus === "loading"}>
        <DeleteOutlineIcon />
      </IconButton>
    </h3>
  )
}
