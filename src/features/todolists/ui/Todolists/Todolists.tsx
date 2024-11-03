import { AddItemForm } from "common/components"
import Paper from "@mui/material/Paper"
import { TodoList } from "./Todolist/TodoList"
import React, { useEffect } from "react"
import { addTodolist, fetchTodolists } from "../../model/todolistsSlice"
import { Navigate } from "react-router-dom"
import { Grid2 } from "@mui/material"
import { useAppDispatch } from "common/hooks"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "../../../auth/model/authSelectors"
import { selectTodolists } from "../../model/todolistsSelectors"
import { fetchTasks } from "../../model/tasksSlice"

export const Todolists = ({ demo = false }) => {
  let todoLists = useAppSelector(selectTodolists)
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const addTodoList = (title: string) => {
    dispatch(addTodolist({ title }))
  }

  useEffect(() => {
    if (demo || !isLoggedIn) {
      return
    }
    dispatch(fetchTodolists()) // Note the parentheses to invoke the thunk
  }, [])

  // useEffect(() => {
  //   // Fetch tasks for each todolist after todolists are loaded
  //   todoLists.forEach((todolist) => {
  //     dispatch(fetchTasks(todolist.id))
  //   })
  // }, [dispatch, todoLists])

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
                <TodoList todolist={tl} demo={demo} />
              </Paper>
            </Grid2>
          )
        })}
      </Grid2>
    </>
  )
}
