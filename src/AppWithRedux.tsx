import React, {useState} from 'react';
import './App.css';
import {TaskType} from "./todoList/TodoList";
import {AddItemForm} from "./todoList/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from "./components/MenuButton";
import {createTheme, CssBaseline, Switch, ThemeProvider} from "@mui/material";
import {addTodolistAC,} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListWithRedux} from "./todoList/TodoListWithRedux";

export type FilterValuesType = "all" | "completed" | "active"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksObjType = {
    [key: string]: TaskType[],
}

type ThemeMode = 'dark' | 'light'

function AppWithRedux() {
    console.log('App was called')

    // Business logic layer
    let todoLists = useSelector<AppRootStateType, TodoListType[]>(
        state => state.todoLists)

    const dispatch = useDispatch()

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

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
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }

    //UI

    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
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
                </AppBar>

                <Container fixed>
                    <Grid container sx={{mb: '30px'}}>
                        <AddItemForm
                            addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todoLists.map((tl) => {
                            return (
                                <Grid key={tl.id}>
                                    <Paper elevation={4} sx={{p: '0 20px 20px 20px'}}>
                                        <TodoListWithRedux todolist={tl}/>
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default AppWithRedux;
