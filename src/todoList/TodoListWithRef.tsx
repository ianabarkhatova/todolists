import React, {useRef} from "react";
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
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
};

export const TodoList = ({title, tasks, removeTask, changeFilter, addTask}: TodoListPropsType) => {

    const taskInputRef = useRef<HTMLInputElement>(null)

    const addTaskHandler = () => {
        if (taskInputRef.current) {
            addTask(taskInputRef.current.value)
            taskInputRef.current.value = ''
        }
    }

    return (
        <div>
            <h3>{title}</h3>

            <div>
                <input ref={taskInputRef}/>
                <Button title={"+"} onClickHandler={addTaskHandler}/>
            </div>

            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                tasks.map((t) => {
                    return (
                        // каждая таска попадает в переменную "t":
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {
                                removeTask(t.id)
                            }}>X
                            </button>
                        </li>
                    )
                })
            )
            }

            <div>
                <button onClick={() => {
                    changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    );

}
