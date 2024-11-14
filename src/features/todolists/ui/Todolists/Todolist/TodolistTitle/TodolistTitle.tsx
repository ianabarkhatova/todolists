import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { TodolistDomainType } from "../../../../model/todolistsSlice"
import { useChangeTodolistTitleMutation, useRemoveTodolistMutation } from "../../../../api/todolistsApi"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const [removeTodolist] = useRemoveTodolistMutation()
  const [changeTodolistTitle] = useChangeTodolistTitleMutation()

  const removeTodoListHandler = () => {
    removeTodolist(id)
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
