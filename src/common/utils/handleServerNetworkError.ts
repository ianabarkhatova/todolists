import { setAppError, setAppStatus } from "../../app/appSlice"
import { Dispatch } from "redux"

export const handleServerNetworkError = (dispatch: Dispatch, error: { message: string }) => {
  dispatch(setAppError({ error: error.message ? error.message : "Some error occurred" }))
  dispatch(setAppStatus({ status: "failed" }))
}
