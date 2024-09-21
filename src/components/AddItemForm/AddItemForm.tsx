import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from '@mui/icons-material/AddBox';

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo(({addItem}: AddItemFormPropsType) => {
    console.log('AddItemForm was called')
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }

    const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError("Title is required")
        }
    }

    return <div>
        <TextField
            label='Enter a title'
            variant={'outlined'}
            className={error ? "error" : ''}
            value={taskTitle}
            size={'small'}
            onChange={changeTaskTitleHandler}
            onKeyDown={keyDownAddTaskHandler}
            error={!!error}
            helperText={error}
        />
        <IconButton onClick={addTaskHandler} color={'primary'}>
            <AddBoxIcon/>
        </IconButton>
    </div>
})