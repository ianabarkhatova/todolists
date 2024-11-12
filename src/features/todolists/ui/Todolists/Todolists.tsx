import { AddItemForm } from "common/components"
import Paper from "@mui/material/Paper"
import { Todolist } from "./Todolist/Todolist"
import React, { useEffect } from "react"
import { addTodolist, fetchTodolists, selectTodolists } from "../../model/todolistsSlice"
import { Navigate } from "react-router-dom"
import { Grid2 } from "@mui/material"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "../../../auth/model/authSlice"

export const Todolists = ({ demo = false }) => {
  let todoLists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodoList = (title: string) => {
    dispatch(addTodolist(title))
  }

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(fetchTodolists()) // Note the parentheses to invoke the thunk
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />
  }

  return (
    <>
      <Grid2 container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid2>
      <Grid2 container spacing={4}>
        {todoLists.map((tl) => {
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
