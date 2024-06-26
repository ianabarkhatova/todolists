import React from "react";
import {Button} from "../button/Button";
import {FilterValuesType} from "../App";


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (value: FilterValuesType) => void
};

export const TodoList = ({title, tasks, removeTask, changeFilter}: TodoListPropsType) => {
    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input/>
                <Button title={"+"}/>
            </div>

            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map((t) => {
                        return (
                            // каждая таска попадает в переменную "t":
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={ () => {removeTask(t.id)} }>X</button>
                            </li>
                        )
                    })}
                </ul>
            )
            }

            <div>
                <button onClick={() => {changeFilter("all")}}>All</button>
                <button onClick={() => {changeFilter("active")}}>Active</button>
                <button onClick={() => {changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    );
};