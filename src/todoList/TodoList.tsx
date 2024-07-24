import React, {ChangeEvent} from "react";
import {Button} from "../button/Button";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


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
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    id: string
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
};

export const TodoList = ({
                             title,
                             tasks,
                             removeTask,
                             changeFilter,
                             addTask,
                             changeTaskStatus,
                             changeTaskTitle,
                             filter,
                             id,
                             removeTodoList,
                             changeTodoListTitle,
                         }: TodoListPropsType) => {

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

            const onChangeTaskTitleHandler = (newValue: string) => {
                changeTaskTitle(t.id, newValue, id)
            }

            return (
                <li key={t.id} className={t.isDone ? "is-done" : ''}>
                    <input type="checkbox" checked={t.isDone} onChange={checkBoxOnChangeHandler}/>
                    <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler}/>
                    <Button onClickHandler={removeTaskHandler} title={"x"}/>
                </li>
            )
        })
    )


    const setAllTasksHandler = () => changeFilter("all", id)
    const setActiveTasksHandler = () => changeFilter("active", id)
    const setCompletedTasksHandler = () => changeFilter("completed", id)
    const removeTodoListHandler = () => {
        removeTodoList(id)
    }
    const addTaskHandler = (title: string) => {
        addTask(title, id);
    }

    const onChangeTodoListTitleHandler = (newTitle: string) => {
        changeTodoListTitle(id, newTitle)
    }



    // const userTaskTitleLengthWarning = taskTitle.length > 15 &&
    //     <div>Your task title should be not less than 15 characters</div>



    return (
        <div>
            <h3>
                <EditableSpan
                    title={title}
                    onChange={onChangeTodoListTitleHandler}
                />
            </h3>
            <button onClick={removeTodoListHandler}>x</button>

            <AddItemForm addItem={addTaskHandler}/>

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

