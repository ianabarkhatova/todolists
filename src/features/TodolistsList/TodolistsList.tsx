import Grid2 from "@mui/material/Grid2";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {TodoListWithRedux} from "./Todolist/TodoListWithRedux";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from "../../state/todolists-reducer";


export const TodolistsList = ({demo = false}) => {

    let todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(
        state => state.todoLists)

    const dispatch = useDispatch()

    const addTodoList = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTodolistsTC());  // Note the parentheses to invoke the thunk
    }, []);

    return <>

        <Grid2 container sx={{mb: '30px'}}>
            <AddItemForm
                addItem={addTodoList}
            />
        </Grid2>
        <Grid2 container spacing={4}>
            {todoLists.map((tl) => {
                return (
                    <Grid2 key={tl.id}>
                        <Paper elevation={4} sx={{p: '0 20px 20px 20px'}}>
                            <TodoListWithRedux todolist={tl} demo={demo}/>
                        </Paper>
                    </Grid2>
                )
            })}
        </Grid2>
    </>
}

