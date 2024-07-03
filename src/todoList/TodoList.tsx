import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "../button/Button";
import {FilterValuesType} from "../App";
import {Simulate} from "react-dom/test-utils";
import keyDown = Simulate.keyDown;


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
};

export const TodoList = ({title, tasks, removeTask, changeFilter, addTask}: TodoListPropsType) => {

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length === 0 ? (
        <p>No tasks</p>
    ) : (
        tasks.map((t) => {
            const removeTaskHandler = () => {
                removeTask(t.id)
            }

            return (
                // каждая таска попадает в переменную "t":
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <Button onClickHandler={removeTaskHandler} title={"x"}/>
                </li>
            )
        })
    )

    const [taskTitle, setTaskTitle] = useState('')

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)

    const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const setAllTasksHandler = () => changeFilter("all")

    const setActiveTasksHandler = () => changeFilter("active")

    const setCompletedTasksHandler = () => changeFilter("completed")

const userTaskTitleLengthWarning = taskTitle.length > 15 && <div>Your task title should be not less than 15 characters</div>

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={keyDownAddTaskHandler}
                />
                <Button title={"+"} onClickHandler={addTaskHandler}
                        disabled={!taskTitle.trim()}/>
                        {userTaskTitleLengthWarning}
            </div>

            <ul>
                {tasksElements}
            </ul>
            
            <div>
                <Button onClickHandler={setAllTasksHandler} title={"All"}/>
                <Button onClickHandler={setActiveTasksHandler} title={"Active"}/>
                <Button onClickHandler={setCompletedTasksHandler} title={"Completed"}/>
            </div>
        </div>
    );

}
