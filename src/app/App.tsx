import React, { useEffect } from "react"
import "../features/todolists/ui/Todolists/Todolist/TodolistTitle/TodolistTitle.module.css"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { ErrorSnackbar } from "common/components"
import { initializeAppTC } from "./app-reducer"
import { getTheme } from "common/theme/theme"
import { Header } from "common/components"
import { Main } from "./Main"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectIsInitialized, selectThemeMode } from "./appSelectors"
import { TaskType } from "../features/todolists/api/tasksApi.types"
import s from "./App.module.css"

export const App = ({ demo = false }: Props) => {
  // BLL
  const isInitialized = useAppSelector(selectIsInitialized)
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)

  // check if is user logged in
  useEffect(() => {
    dispatch(initializeAppTC())
  }, [])

  return (
    <div>
      <ThemeProvider theme={getTheme(themeMode)}>
        <CssBaseline />
        <ErrorSnackbar />
        {isInitialized && (
          <>
            <Header />
            <Main />
          </>
        )}
        {!isInitialized && (
          <div className={s.circularProgressContainer}>
            <CircularProgress size={150} thickness={3} />
          </div>
        )}
      </ThemeProvider>
    </div>
  )
}

// types
export type TasksObjType = {
  [key: string]: TaskType[]
}

type Props = {
  demo?: boolean
}
