import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {action} from '@storybook/addon-actions'

import {AddItemForm, AddItemFormPropsType} from "../todoList/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";

const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    parameters: {
        layout: 'centered'
    },
    component: AddItemForm,
    tags: ['autodocs'],
    argTypes: {
        addItem: {
            description: 'Button clicked',
            // action: 'clicked',
        }
    },
    args: {addItem: fn()}
}

export default meta;
type Story = StoryObj<typeof AddItemForm>;

export const AddItemFormStory: Story = {};

export const AddItemFormWithErrorStory = {
    render: (args: AddItemFormPropsType) => <AddItemFormWithError addItem={args.addItem}/>
}

const AddItemFormWithError = memo(({addItem}: AddItemFormPropsType) => {
    console.log('AddItemForm was called')
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>("Title is required")

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
