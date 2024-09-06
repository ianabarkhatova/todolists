import React, {ChangeEvent, memo, useCallback} from "react";
import {IconButton, ListItem, Checkbox} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {getListItemSx} from "./TodoList.styles";

export type TaskPropsType = {
    task: {
        id: string
        title: string
        isDone: boolean
    },
    todolistId: string
};

export const Task = memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch();

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(task.id, todolistId));
    }, [dispatch, task.id, todolistId]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId));
    }, [dispatch, task.id, todolistId]);

    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId));
    }, [dispatch, task.id, todolistId]);

    return (
        <ListItem
            sx={getListItemSx(task.isDone)}
        >
            <div>
                <Checkbox
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan
                    title={task.title}
                    onChange={changeTaskTitle}
                />
            </div>
            <IconButton
                aria-label="delete"
                onClick={removeTask}
            >
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
});
