import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton'
import {Box, Button, Checkbox, List, ListItem} from "@mui/material";
import {filterButtonsContainerSx, getListItemSx} from "./TodoList.styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {FilterValuesType} from "../state/todolists-reducer";
import {useAppDispatch} from "../state/store";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import {useDispatch} from "react-redux";

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
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
        <p style={{padding: '8px 0'}}>No tasks</p>
    ) : (
        <List>
            {tasks.map((t) => {
                //эти функции пишем внутри мапа, т к ф-я будет своя отдельная для каждой таски:
                const removeTaskHandler = () => {
                    removeTask(t.id, id)
                }

                const checkBoxOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                    const newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
                    changeTaskStatus(t.id, newStatus, id);
                }

                const onChangeTaskTitleHandler = (newValue: string) => {
                    changeTaskTitle(t.id, newValue, id)
                }

                return (
                    <ListItem
                        key={t.id}
                        sx={getListItemSx(TaskStatuses.Completed)}>
                        <div>
                            <Checkbox checked={t.status === TaskStatuses.Completed} onChange={checkBoxOnChangeHandler}/>
                            <EditableSpan title={t.title} onChange={onChangeTaskTitleHandler}/>
                        </div>
                        <IconButton aria-label="delete" onClick={removeTaskHandler}>
                            <DeleteOutlineIcon/>
                        </IconButton>
                    </ListItem>
                );
            })}
        </List>
    );


    const setAllTasksHandler = () => changeFilter(id,"all")
    const setActiveTasksHandler = () => changeFilter(id, "active")
    const setCompletedTasksHandler = () => changeFilter(id, "completed")
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
                <DeleteOutlineIcon/>
            </IconButton>
        </h3>

        <AddItemForm addItem={addTaskHandler}/>

        <ul>
            {tasksElements}
        </ul>

        <Box sx={filterButtonsContainerSx}>
            <Button
                size={'small'}
                onClick={setAllTasksHandler}
                variant={filter === "all" ? "outlined" : "text"}
                color='inherit'
            >
                All
            </Button>
            <Button
                size={'small'}
                onClick={setActiveTasksHandler}
                variant={filter === "active" ? "outlined" : "text"}
                color='primary'
            >
                Active
            </Button>
            <Button
                size={'small'}
                onClick={setCompletedTasksHandler}
                variant={filter === "completed" ? "outlined" : "text"}
                color='secondary'
            >
                Completed
            </Button>
        </Box>
    </div>;
}

