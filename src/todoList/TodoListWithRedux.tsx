import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import {Box, Button, ButtonProps, List} from "@mui/material";
import {filterButtonsContainerSx} from "./TodoList.styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, fetchTasksTC} from "../state/tasks-reducer";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType
} from "../state/todolists-reducer";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "../api/todolists-api";

export type TodoListPropsType = {
    todolist: TodolistDomainType
};

// export type TaskDomainType =

export const TodoListWithRedux = memo(({todolist}: TodoListPropsType) => {

    const {id, filter, title} = todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[id]
    )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

    if (filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length === 0 ? (
        <p style={{padding: '8px 0'}}>No tasks</p>
    ) : (
        <List>
            {tasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    todolistId={id}
                />
            ))}
        </List>
    );


    const setAllTasks = useCallback(() => dispatch(changeTodolistFilterAC(id, "all")), [])
    const setActiveTasks = useCallback(() => dispatch(changeTodolistFilterAC(id, "active")), [])
    const setCompletedTasks = useCallback(() => dispatch(changeTodolistFilterAC(id, "completed")), [])


    const removeTodoList = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [])
    const changeTodoListTitle = useCallback((newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [])
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, id));
    }, [])

    // const userTaskTitleLengthWarning = taskTitle.length > 15 &&
    //     <div>Your task title should be not less than 15 characters</div>

    return <div>
        <h3 style={{padding: '20px 0 20px'}}>
            <EditableSpan
                title={title}
                onChange={changeTodoListTitle}
            />
            <IconButton aria-label="delete" onClick={removeTodoList}>
                <DeleteOutlineIcon/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTask}/>

        <ul>
            {tasksElements}
        </ul>

        <Box sx={filterButtonsContainerSx}>
            <ButtonWithMemo
                size={'small'}
                onClick={setAllTasks}
                variant={filter === "all" ? "outlined" : "text"}
                color='inherit'
            >
                All
            </ButtonWithMemo>
            <ButtonWithMemo
                size={'small'}
                onClick={setActiveTasks}
                variant={filter === "active" ? "outlined" : "text"}
                color='primary'
            >
                Active
            </ButtonWithMemo>
            <ButtonWithMemo
                size={'small'}
                onClick={setCompletedTasks}
                variant={filter === "completed" ? "outlined" : "text"}
                color='secondary'
            >
                Completed
            </ButtonWithMemo>
        </Box>
    </div>;
})

type ButtonWithMemoPropsType = ButtonProps & {} // прошлые пропсы (MaterialUI) + пропсы для расширения кнопки на будущее
// {children} - все, что находится между открывающимся и закрывающимся тегами

const ButtonWithMemo = memo(({variant, onClick, color, children, ...rest }: ButtonWithMemoPropsType) => {
    return (
        <Button
            variant={variant}
            onClick={onClick}
            color={color}
            {...rest}
        >{children}
        </Button>
    )
})


