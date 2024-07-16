import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {Button} from "../button/Button";
import {FilterValuesType} from "../App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    id: string
    removeTodoList: (todoListId: string) => void
};

export const TodoList = ({title, tasks, removeTask, changeFilter, addTask, changeTaskStatus, filter, id, removeTodoList}: TodoListPropsType) => {

    const tasksElements: Array<JSX.Element> | JSX.Element = tasks.length === 0 ? (
        <p>No tasks</p>
    ) : (
        tasks.map((t) => {
            //эти функции пишем внутри мапа, т к ф-я будет своя отдельная для каждой таски:
            const removeTaskHandler = () => {
                removeTask(t.id, id)
            }

            const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                changeTaskStatus(t.id, e.currentTarget.checked, id)
            }

            return (
                // каждая таска попадает в переменную "t":
                <li key={t.id} className={t.isDone? "is-done" : ''}>
                    <input type="checkbox" checked={t.isDone} onChange={checkBoxOnChangeHandler}/>
                    <span>{t.title}</span>
                    <Button onClickHandler={removeTaskHandler} title={"x"}/>
                </li>
            )
        })
    )

    const [taskTitle, setTaskTitle] = useState('')
    //обработка ошибок
    const [error, setError] = useState<string | null>(null)


    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim(), id)
            setTaskTitle('')
        } else {
            setError("Title is required")
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTaskTitle(e.currentTarget.value)
    }


    const keyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const setAllTasksHandler = () => changeFilter("all", id)

    const setActiveTasksHandler = () => changeFilter("active", id)

    const setCompletedTasksHandler = () => changeFilter("completed", id)

    const removeTodoListHandler = () => {
        removeTodoList(id)
    }

    const userTaskTitleLengthWarning = taskTitle.length > 15 &&
        <div>Your task title should be not less than 15 characters</div>

    return (
        <div>
            <h3>{title}</h3> <button onClick={removeTodoListHandler}>x</button>

            <div>
                <input
                    value={taskTitle}
                    onChange={changeTaskTitleHandler}
                    onKeyDown={keyDownAddTaskHandler}
                    className={error ? "error" : ''}
                />
                <Button title={"+"} onClickHandler={addTaskHandler}/>
                {/*//если ошибка существует, показывай эту дивку:*/}
                {error && <div className={"error-message"}>{error}</div>}

            </div>

            <ul>
                {tasksElements}
            </ul>

            <div>
                <Button
                    onClickHandler={setAllTasksHandler}
                    title={"All"}
                    className={filter === "all" ? "active-filter" : ''}/>
                <Button
                    onClickHandler={setActiveTasksHandler}
                    title={"Active"}
                    className={filter === "active" ? "active-filter" : ''}
                />
                <Button
                    onClickHandler={setCompletedTasksHandler}
                    title={"Completed"}
                    className={filter === "completed" ? "active-filter" : ''}/>
            </div>
        </div>
    );

}
