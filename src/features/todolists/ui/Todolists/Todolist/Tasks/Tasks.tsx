import {Task} from "./Task/Task";
import {List} from "@mui/material";
import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../../../app/store";
import {TaskStatuses, TaskType} from "../../../../../../api/todolistsApi";
import {TodolistDomainType} from "../../../../../../state/todolists-reducer";

type Props = {
    todolist: TodolistDomainType
};

export const Tasks = ({todolist}: Props) => {

    const {id} = todolist
    let tasks = useSelector<AppRootStateType, TaskType[]>(
        state => state.tasks[id]
    )

    if (todolist.filter === "completed") {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (todolist.filter === "active") {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }

    return (
        <>
            {tasks.length === 0 ? (
                <p style={{padding: '8px 0'}}>No tasks</p>
            ) : (
                <List>
                    {tasks.map((task) => (
                        <Task
                            key={task.id}
                            task={task}
                            todolistId={id}
                        />
                    ))}
                </List>
            )}
        </>
    )
}
