import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./todoList/TodoList";
import {v1} from "uuid";
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
import {FilterValuesType, TodolistDomainType} from "./state/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";

export type tasksObjType = {
    [key: string]: TaskType[],
}

type ThemeMode = 'dark' | 'light'

function App() {
    // Business logic layer

    let todoListId1 = v1()
    let todoListId2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
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

    let [tasksObj, setTasks] = useState<tasksObjType>({
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
        const newTask: TaskType = {
            description: 'description',
            title: title,
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            id: v1(),
            todoListId: todoListId,
            order: 1,
            addedDate: '',
        }
        //если передаем title c таким же именем, можно писать так:
        // title,
        let tasks = tasksObj[todoListId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todoListId] = newTasks
        setTasks({...tasksObj})
    }

    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        const newState = tasks.map(t => taskId === t.id ? {...t, status: status} : t)
        tasksObj[todoListId] = newState
        setTasks({...tasksObj})
    }

    const removeTask = (taskId: string, todoListId: string) => {
        let tasks = tasksObj[todoListId]
        let filteredTasks = tasks.filter(t => t.id !== taskId)
        tasksObj[todoListId] = filteredTasks
        setTasks({...tasksObj})
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        //достаем нужный массив по todoListId:
        let tasks = tasksObj[todoListId]
        //находим и изменяем нужную таску:
        const newState = tasks.map(t => taskId === t.id ? {...t, title: newTitle} : t)
        tasksObj[todoListId] = newState
        //сетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasksObj})
    }

    // CRUD TodoLists

    const removeTodoList = (todoListId: string) => {
        let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoLists(filteredTodoList)
        delete tasksObj[todoListId]
        setTasks({...tasksObj})
    }

    const addTodoList = (title: string) => {
        let todoList: TodolistDomainType = {
            id: v1(),
            title: title,
            addedDate: '',
            order: 1,
            filter: 'all'
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasksObj, [todoList.id]: []})
    }

    const changeTodoListTitle = (id: string, newTitle: string) => {
        setTodoLists(todoLists.map(tl => tl.id === id ? {...tl, title: newTitle} : tl))
    }

    const changeTodoListFilter = (todoListId: string, value: FilterValuesType) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
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

export default App;
