import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { MenuButton } from "../MenuButton/MenuButton"
import { LinearProgress, Switch } from "@mui/material"
import React, { useCallback } from "react"
import { logOutTC } from "../../../features/auth/model/auth-reducer"
import { changeThemeAC } from "../../../app/app-reducer"
import { getTheme } from "../../theme/theme"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useAppSelector } from "../../hooks/useAppSelector"
import { selectIsLoggedIn } from "../../../features/auth/model/authSelectors"
import { selectStatus, selectThemeMode } from "../../../app/appSelectors"

export const Header = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const status = useAppSelector(selectStatus)

  const logOutHandler = useCallback(() => {
    dispatch(logOutTC())
  }, [])
  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === "light" ? "dark" : "light"))
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
