import React, {useState} from 'react';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {MenuButton} from "../components/MenuButton/MenuButton";
import {createTheme, CssBaseline, LinearProgress, Switch, ThemeProvider} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../api/todolists-api";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "../state/app-reducer";
import {Outlet} from "react-router-dom";



function AppWithRedux({demo = false}: AppPropsType) {
    // Business logic layer
    const status = useSelector<AppRootStateType, RequestStatusType>(
        (state) => state.app.status)

    // Theme
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                light: '#93e3a9',
                main: '#1bcf68',
                dark: '#00a234',
                contrastText: '#ffffff',
            },
            secondary: {
                light: '#f1d05b',
                main: '#ecae2c',
                dark: '#e6721f',
                contrastText: '#2e3d34',
            },
        },
    })

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    //UI

    return (
            <div>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <ErrorSnackbar/>
                    <AppBar position='static' sx={{mb: '30px'}}>
                        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <IconButton color='inherit'>
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <MenuButton>Login</MenuButton>
                                <MenuButton>Logout</MenuButton>
                                <MenuButton background={theme.palette.primary.dark}>FAQ</MenuButton>
                                <Switch color={'default'} onChange={changeModeHandler}/>
                            </div>
                        </Toolbar>
                        {status === 'loading' && <LinearProgress/>}
                    </AppBar>
                    <Container fixed>
                        <Outlet/>
                    </Container>
                </ThemeProvider>
            </div>
    );
}

// types
export type TasksObjType = {
    [key: string]: TaskType[],
}

type AppPropsType = {
    demo?: boolean
}

type ThemeMode = 'dark' | 'light'

export default AppWithRedux;
