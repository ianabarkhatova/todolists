import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {EditableSpan} from "./EditableSpan";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {getListItemSx} from "./TodoList.styles";
import {TaskStatuses, TaskType} from "../api/todolists-api";

export type TaskPropsType = {
    task: TaskType,
    todolistId: string
};

export const Task = memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useDispatch();

    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(task.id, todolistId));
    }, [dispatch, task.id, todolistId]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(changeTaskStatusAC(task.id, newStatus, todolistId));
    }, [dispatch, task.id, todolistId]);

    const changeTaskTitle = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId));
    }, [dispatch, task.id, todolistId]);

    return (
        <ListItem
            sx={getListItemSx(task.status)}
        >
            <div>
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
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
