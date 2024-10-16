import {filterButtonsContainerSx} from '../Tasks/Task/Task.styles';
import {Box, Button, ButtonProps} from "@mui/material";
import React, {memo} from "react";
import {changeTodolistFilterAC, FilterValuesType} from "../../../../../../state/todolists-reducer";
import {useDispatch} from "react-redux";
import {TodoListProps} from "../TodoListWithRedux";

export const FilterTasksButtons = ({todolist}: TodoListProps) => {

    const dispatch = useDispatch()
    const {id, filter, title} = todolist

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }

    const ButtonWithMemo = memo(({variant, onClick, color, children, ...rest }: ButtonWithMemoPropsType) => {
        return (
            <Button
                variant={variant}
                onClick={onClick}
                color={color}
                {...rest}
            >{children}
            </Button>
        )
    })
    type ButtonWithMemoPropsType = ButtonProps & {} // прошлые пропсы (MaterialUI) + пропсы для расширения кнопки на будущее
    // {children} - все, что находится между открывающимся и закрывающимся тегами

    return (
        <Box sx={filterButtonsContainerSx}>
            <ButtonWithMemo
                size={'small'}
                onClick={()=> changeFilterTasksHandler('all')}
                variant={filter === "all" ? "outlined" : "text"}
                color='inherit'
            >
                All
            </ButtonWithMemo>
            <ButtonWithMemo
                size={'small'}
                onClick={()=> changeFilterTasksHandler('active')}
                variant={filter === "active" ? "outlined" : "text"}
                color='primary'
            >
                Active
            </ButtonWithMemo>
            <ButtonWithMemo
                size={'small'}
                onClick={()=> changeFilterTasksHandler('completed')}
                variant={filter === "completed" ? "outlined" : "text"}
                color='secondary'
            >
                Completed
            </ButtonWithMemo>
        </Box>
    );
};


