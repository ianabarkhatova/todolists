import { Dispatch } from "redux"
import { SetAppErrorActionType, SetAppStatusActionType } from "../../app/app-reducer"

export type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
