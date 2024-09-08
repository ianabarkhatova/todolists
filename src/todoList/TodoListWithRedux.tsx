import React, {ChangeEvent, memo, useCallback} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import {Box, Button, ButtonProps, Checkbox, List, ListItem} from "@mui/material";
import {filterButtonsContainerSx, getListItemSx} from "./TodoList.styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {TodoListType} from "../AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {Task} from "./Task";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    todolist: TodoListType
};

export const TodoListWithRedux = memo(({todolist}: TodoListPropsType) => {
    console.log('TodoList was called')

    const {id, filter, title} = todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[id]
    )

    const dispatch = useDispatch()

    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
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


