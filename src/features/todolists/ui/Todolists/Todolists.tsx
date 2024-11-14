import { AddItemForm } from "common/components"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { Grid2 } from "@mui/material"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "../../../auth/model/authSlice"
import { useAddTodolistMutation, useGetTodolistsQuery } from "../../api/todolistsApi"

export const Todolists = ({ demo = false }) => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const { data: todolists } = useGetTodolistsQuery()
  const [addTodolist] = useAddTodolistMutation()

  const addTodoListHandler = (title: string) => {
    addTodolist(title)
  }

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid2 container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodoListHandler} />
      </Grid2>
      <Grid2 container spacing={4}>
        {todolists?.map((tl) => {
          return (
            <Grid2 key={tl.id}>
              <Paper elevation={4} sx={{ p: "0 20px 20px 20px" }}>
                <Todolist todolist={tl} demo={demo} />
              </Paper>
            </Grid2>
          )
        })}
      </Grid2>
    </>
  )
}
