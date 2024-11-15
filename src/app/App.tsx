import React, { useEffect, useState } from "react"
import "../features/todolists/ui/Todolists/Todolist/TodolistTitle/TodolistTitle.module.css"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { ErrorSnackbar, Header } from "common/components"
import { selectThemeMode, setIsLoggedIn } from "./appSlice"
import { getTheme } from "common/theme"
import { Main } from "./Main"
import { useAppDispatch, useAppSelector } from "common/hooks"
import { TaskType } from "../features/todolists/api/tasksApi.types"
import s from "./App.module.css"
import { useMeQuery } from "../features/auth/api/authApi"
import { ResultCode } from "common/enums"

export const App = ({ demo = false }: Props) => {
  const dispatch = useAppDispatch()
  const themeMode = useAppSelector(selectThemeMode)
  const [isInitialized, setIsInitialized] = useState(false)
  const { data, isLoading } = useMeQuery()

  useEffect(() => {
    if (!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

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
