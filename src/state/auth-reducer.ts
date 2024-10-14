import {
    addTodolistAC,
    AddTodolistActionType,
    changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    clearTodolistsDataAC,
    ClearTodolistsDataActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TasksObjType} from "../app/AppWithRedux";
import {authAPI, LoginParamsType, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIin: false,
}

export const authReducer = (
    state: InitialStateType = initialState,
    action: LoginActionType
): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIin: action.value}
        default:
            return state
    }
}

// action creators
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//thunk creators
export const loginTC = (data: LoginParamsType) =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    console.log(res.data.data)
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })

    }

export const logOutTC = () =>
    (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then((res) => {
                if (res.data.resultCode === 0) {
                    console.log(res.data.data)
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(clearTodolistsDataAC())
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })
    }


// types
export type LoginActionType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | ReturnType<typeof setIsLoggedInAC>


type InitialStateType = typeof initialState
type ThunkDispatch = Dispatch<SetAppErrorActionType | SetAppStatusActionType | LoginActionType | ClearTodolistsDataActionType>












