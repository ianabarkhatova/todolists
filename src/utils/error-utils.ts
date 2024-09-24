import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../state/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        setAppErrorAC('Some error occurred')
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServiceNetworkError = (
    dispatch: ErrorUtilsDispatchType, error: {message: string}) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}

// types
type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>