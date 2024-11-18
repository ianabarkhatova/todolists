import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "common/components"
import { LinearProgress, Switch } from "@mui/material"
import React from "react"
import { getTheme } from "../../theme"
import { useAppSelector } from "common/hooks"
import { changeTheme, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn } from "../../../app/appSlice"
import { useDispatch } from "react-redux"
import { useLogoutMutation } from "../../../features/auth/api/authApi"
import { ResultCode } from "common/enums"
import { clearTasksData } from "../../../features/todolists/model/tasksSlice"
import { clearTodolistsData } from "../../../features/todolists/model/todolistsSlice"

export const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const status = useAppSelector(selectStatus)
  const [logout] = useLogoutMutation()

  const logOutHandler = () => {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        dispatch(clearTasksData())
        dispatch(clearTodolistsData())
      }
    })
  }

  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          {isLoggedIn && <MenuButton onClick={logOutHandler}>Logout</MenuButton>}
          <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
          <Switch color={"default"} onChange={changeModeHandler} />
        </div>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
