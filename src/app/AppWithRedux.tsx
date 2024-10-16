import React, {useEffect} from 'react';
import '../features/todolists/ui/Todolists/Todolist/TodolistTitle/TodolistTitle.module.css';
import {CircularProgress, CssBaseline, ThemeProvider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskType} from "../api/todolistsApi";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {initializeAppTC, ThemeModeType} from "./app-reducer";
import {getTheme} from "../common/theme/theme";
import {Header} from "../common/components/Header/Header";
import {Main} from "./Main";


export const AppWithRedux = ({demo = false}: AppPropsType) => {
    // BLL
    const isInitialized = useSelector<AppRootStateType, boolean>(
        (state) => state.app.isInitialized)
    const dispatch = useDispatch()
    const themeMode = useSelector<AppRootStateType, ThemeModeType>(state => state.app.themeMode)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, []);

    //UI

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }

    return (
        <div>
            <ThemeProvider theme={getTheme(themeMode)}>
                <CssBaseline/>
                <ErrorSnackbar/>
                <Header/>
                <Main/>
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


