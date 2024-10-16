import {AddItemForm} from "../../../../common/components/AddItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {TodoList} from "./Todolist/TodoList";
import React, {useEffect} from "react";
import {addTodolistTC, getTodolistsTC} from "../../../../state/todolists-reducer";
import {Navigate} from "react-router-dom";
import {Grid2} from "@mui/material";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {selectIsLoggedIn} from "../../../../state/authSelectors";
import {selectTodolists} from "../../model/todolistsSelectors";


export const Todolists = ({demo = false}) => {

    let todoLists = useAppSelector(selectTodolists)
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

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
                            <TodoList todolist={tl} demo={demo}/>
                        </Paper>
                    </Grid2>
                )
            })}
        </Grid2>
    </>
}

