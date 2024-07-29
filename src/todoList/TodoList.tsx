import React, {ChangeEvent} from "react";
import {FilterValuesType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box, Button, Checkbox, List, ListItem} from "@mui/material";

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
        <List>
            {tasks.map((t) => {
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
                    <ListItem
                        key={t.id}
                        sx={{
                            p: 0,
                            justifyContent: 'space-between',
                            opacity: t.isDone ? 0.5 : 1,
                        }}>
                        <div>
                            <Checkbox checked={t.isDone} onChange={checkBoxOnChangeHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler}/>
                        </div>
                        <IconButton aria-label="delete" onClick={removeTaskHandler}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItem>
                );
            })}
        </List>
    );


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


    return <div>
        <h3 style={{padding: '20px 0 20px'}}>
            <EditableSpan
                title={title}
                onChange={onChangeTodoListTitleHandler}
            />
            <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                <DeleteIcon/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTaskHandler}/>

        <ul>
            {tasksElements}
        </ul>

        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button
                onClick={setAllTasksHandler}
                variant={filter === "all" ? "outlined" : "text"}
                color='inherit'
            >
                All
            </Button>
            <Button
                onClick={setActiveTasksHandler}
                variant={filter === "active" ? "outlined" : "text"}
                color='primary'
            >
                Active
            </Button>
            <Button
                onClick={setCompletedTasksHandler}
                variant={filter === "completed" ? "outlined" : "text"}
                color='secondary'
            >
                Completed
            </Button>
        </Box>
    </div>;
}

