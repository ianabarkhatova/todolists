import React, {ChangeEvent, memo, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import {removeTaskTC, updateTaskTC,} from "../../../../../../../state/tasks-reducer";
import {TaskStatuses, TaskType} from "../../../../../../../api/todolistsApi";
import {getListItemSx} from "./Task.styles";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";

export type TaskProps = {
    task: TaskType,
    todolistId: string,
};

export const Task = memo(({task, todolistId}: TaskProps) => {
    const dispatch = useAppDispatch();

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskTC(task.id, todolistId));
    }, []);

    const changeTaskStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const newStatus = e.currentTarget.checked
            ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTaskTC(task.id, todolistId, {status: newStatus}));
    }, []);

    const changeTaskTitleHandler = useCallback((newValue: string) => {
        dispatch(updateTaskTC(task.id, todolistId, {title: newValue} ));
    }, [dispatch, task.id, todolistId]);


    return (
        <ListItem
            sx={getListItemSx(task.status)}
        >
            <div>
                <Checkbox
                    checked={task.status === TaskStatuses.Completed}
                    onChange={changeTaskStatusHandler}
                />
                <EditableSpan
                    title={task.title}
                    onChange={changeTaskTitleHandler}
                    disabled={task.entityStatus === 'loading'}
                />
            </div>
            <IconButton
                aria-label="delete"
                onClick={removeTaskHandler}
                disabled={task.entityStatus === 'loading'}
            >
                <DeleteOutlineIcon/>
            </IconButton>
        </ListItem>
    );
});
