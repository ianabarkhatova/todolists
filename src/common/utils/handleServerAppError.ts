import { GeneralResponse } from "common/types"
import { GetTasksResponse } from "../../features/todolists/api/tasksApi.types"
import { setAppError, setAppStatus } from "../../app/appSlice"
import { Dispatch } from "redux"

export const handleServerAppError = <D>(data: GeneralResponse<D> | GetTasksResponse, dispatch: Dispatch) => {
  if ("messages" in data) {
    if (data.messages.length) {
      dispatch(setAppError({ error: data.messages[0] }))
    } else {
      dispatch(setAppError({ error: "Some error occurred" }))
    }
  } else if ("items" in data) {
    dispatch(setAppError({ error: "Some error occurred" }))
  }
  dispatch(setAppStatus({ status: "failed" }))
}
