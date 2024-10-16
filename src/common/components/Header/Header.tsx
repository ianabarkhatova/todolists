import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {MenuButton} from "../MenuButton/MenuButton";
import {LinearProgress, Switch} from "@mui/material";
import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {logOutTC} from "../../../state/auth-reducer";
import {changeThemeAC, RequestStatusType, ThemeModeType} from "../../../app/app-reducer";
import {getTheme} from "../../theme/theme";


export const Header = () => {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIin)
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status)
    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [])
    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
    }
    const themeMode = useSelector<AppRootStateType, ThemeModeType>(state => state.app.themeMode)
    const theme = getTheme(themeMode)

    return (
        <AppBar position='static' sx={{mb: '30px'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton color='inherit'>
                    <MenuIcon/>
                </IconButton>
                <div>
                    <MenuButton>Login</MenuButton>
                    {isLoggedIn && <MenuButton onClick={logOutHandler}>Logout</MenuButton>}
                    <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </div>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    );
};