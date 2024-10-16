import React, {memo, useCallback, useEffect} from "react";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {useDispatch} from "react-redux";
import {addTaskTC} from "../../../../../state/tasks-reducer";
import {changeTodolistTitleTC, removeTodolistTC, TodolistDomainType} from "../../../../../state/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";

export type TodoListProps = {
    todolist: TodolistDomainType
    demo?: boolean
};


export const TodoListWithRedux = memo(({todolist, demo}: TodoListProps) => {

    const {id} = todolist
    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, id));
    }, [])
    const dispatch = useDispatch()

    // if demo mode (for Storybook), the function will break
    useEffect(() => {
        if (demo) {
            return
        }
        // dispatch(getTasksTC(id))
    }, [])


    return <div>
        <TodolistTitle todolist={todolist}/>
        <AddItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'}/>
        <Tasks todolist={todolist}/>
        <FilterTasksButtons todolist={todolist}/>
    </div>;
})





