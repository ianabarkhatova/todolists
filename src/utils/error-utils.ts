import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {GeneralResponseType, GetTasksResponseType} from "../api/todolistsApi";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: GeneralResponseType<D> | GetTasksResponseType, dispatch: ErrorUtilsDispatchType) => {
    if ('messages' in data) {
        if (data.messages.length) {
            dispatch(setAppErrorAC(data.messages[0]))
        } else {
            setAppErrorAC('Some error occurred')
        }
    } else if ('items' in data) {
        dispatch(setAppErrorAC('Some error occurred'))
    }

    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}

// types
type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
