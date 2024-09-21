import React, {useReducer, useState} from 'react';
import '../app/App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import {MenuButton} from "../components/MenuButton/MenuButton";
import {createTheme, CssBaseline, Switch, ThemeProvider} from "@mui/material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from "../state/todolists-reducer";
import {addTaskAC, updateTaskAC, removeTaskAC, tasksReducer} from "../state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

export type tasksObjType = {
    [key: string]: TaskType[],
}

type ThemeMode = 'dark' | 'light'

function AppWithReducers() {

    // Business logic layer
    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {
            id: todoListId1,
            title: 'What to learn',
            filter: 'all',
            addedDate: '',
            order: 0
        },
        {
            id: todoListId2,
            title: 'What to buy',
            filter: 'all',
            addedDate: '',
            order: 0
        }
    ])
    let [tasksObj, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            {
                description: 'description',
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListId1,
                order: 0,
                addedDate: '',
            },
            {
                description: 'description',
                title: 'JS',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListId1,
                order: 1,
                addedDate: '',
            },
        ],
        [todoListId2]: [
            {
                description: 'description',
                title: 'Milk',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListId2,
                order: 0,
                addedDate: '',
            },
            {
                description: 'description',
                title: 'Book',
                status: TaskStatuses.New,
                priority: TaskPriorities.Hi,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: todoListId2,
                order: 1,
                addedDate: '',
            },
        ]
    })


    // CRUD Tasks

    const addTask = (title: string, todoListId: string) => {
        const action = addTaskAC({
            description: 'description',
            title: title,
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            id: '1',
            todoListId: todoListId,
            order: 0,
            addedDate: '',
        },)
        dispatchToTasks(action)
    }

    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        const action = updateTaskAC(taskId, {status}, todoListId)
        dispatchToTasks(action)
    }

    const removeTask = (taskId: string, todoListId: string) => {
        const action = removeTaskAC(taskId, todoListId)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = updateTaskAC(taskId, {title: newTitle}, todoListId)
        dispatchToTasks(action)
    }

    // CRUD TodoLists

    const removeTodoList = (todoListId: string) => {
        const action = removeTodolistAC(todoListId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTodoList = (title: string) => {
        const action = addTodolistAC({
            id: v1(), title: title, addedDate: '', order: 0
        })
        dispatchToTasks(action)
        dispatchToTodolists(action)
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodolists(action)
    }

    const changeTodoListFilter = (todolistId: string, value: FilterValuesType) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatchToTodolists(action)
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

                            //фильтрация происходит каждый раз на основе одного объекта(tl)
                            let tasksForTodoList = tasksObj[tl.id]

                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.Completed);
                            }
                            if (tl.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.status === TaskStatuses.New);
                            }

                            return (
                                <Grid>
                                    <Paper elevation={4} sx={{p: '0 20px 20px 20px'}}>
                                        <TodoList
                                            key={tl.id}
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeTodoListFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeTaskStatus}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                        />
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

export default AppWithReducers;
