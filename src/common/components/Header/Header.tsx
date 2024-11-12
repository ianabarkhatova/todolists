import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "common/components"
import { LinearProgress, Switch } from "@mui/material"
import React, { useCallback } from "react"
import { logOutTC, selectIsLoggedIn } from "../../../features/auth/model/authSlice"
import { getTheme } from "../../theme"
import { useAppSelector } from "common/hooks"
import { changeTheme, selectStatus, selectThemeMode } from "../../../app/appSlice"
import { useDispatch } from "react-redux"

export const Header = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const status = useAppSelector(selectStatus)

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC())
  }, [])
  const changeModeHandler = () => {
    dispatch(changeTheme({ themeMode: "light" ? "dark" : "light" }))
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
