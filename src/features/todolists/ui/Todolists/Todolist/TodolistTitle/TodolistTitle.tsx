import { EditableSpan } from "common/components"
import IconButton from "@mui/material/IconButton"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import { changeTodolistTitleTC, removeTodolistTC, TodolistDomainType } from "../../../../model/todolists-reducer"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const removeTodoListHandler = () => {
    dispatch(removeTodolistTC(id))
  }

  const changeTodoListTitleHandler = (newTitle: string) => {
    dispatch(changeTodolistTitleTC(id, newTitle))
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
