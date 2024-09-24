import React, {useEffect, useState} from 'react';
import './App.css';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import {MenuButton} from "../components/MenuButton/MenuButton";
import {createTheme, CssBaseline, LinearProgress, Switch, ThemeProvider} from "@mui/material";
import {addTodolistTC, getTodolistsTC, TodolistDomainType,} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TodoListWithRedux} from "../features/Todolists/Todolist/TodoListWithRedux";
import {TaskType} from "../api/todolists-api";
import Grid2 from '@mui/material/Grid2';
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {RequestStatusType} from "../state/app-reducer";


function AppWithRedux({demo = false}: AppPropsType) {
    // Business logic layer
    let todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(
        state => state.todoLists)

    const dispatch = useDispatch()
    // const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
    //мы не можем показать тудулисты, пока не отправим их в какой-либо стейт
    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTodolistsTC());  // Note the parentheses to invoke the thunk
    }, []);

    const addTodoList = (title: string) => {
        dispatch(addTodolistTC(title))
    }

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
                    {status === 'loading' && <LinearProgress /> }

                </AppBar>

                <Container fixed>
                    <Grid2 container sx={{mb: '30px'}}>
                        <AddItemForm
                            addItem={addTodoList}/>
                    </Grid2>
                    <Grid2 container spacing={4}>
                        {todoLists.map((tl) => {
                            return (
                                <Grid2 key={tl.id}>
                                    <Paper elevation={4} sx={{p: '0 20px 20px 20px'}}>
                                        <TodoListWithRedux todolist={tl} demo={demo}/>
                                    </Paper>
                                </Grid2>
                            )
                        })}
                    </Grid2>
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
