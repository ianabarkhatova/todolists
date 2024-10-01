import Grid2 from "@mui/material/Grid2";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {TodoListWithRedux} from "./Todolist/TodoListWithRedux";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addTodolistTC, getTodolistsTC, TodolistDomainType} from "../../state/todolists-reducer";
import {Navigate} from "react-router-dom";


export const TodolistsList = ({demo = false}) => {

    let todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(
        state => state.todoLists)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIin)

    const addTodoList = (title: string) => {
        dispatch(addTodolistTC(title))
    }

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(getTodolistsTC());  // Note the parentheses to invoke the thunk
    }, []);


    if(!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

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

