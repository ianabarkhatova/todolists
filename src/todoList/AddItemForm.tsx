import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "../button/Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
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
        <input
            value={taskTitle}
            onChange={changeTaskTitleHandler}
            onKeyDown={keyDownAddTaskHandler}
            className={error ? "error" : ''}
        />
        <Button title={"+"} onClickHandler={addTaskHandler}/>
        {error && <div className={"error-message"}>{error}</div>}
    </div>
}