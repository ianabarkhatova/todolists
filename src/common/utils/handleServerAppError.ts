import { GeneralResponse } from "common/types"
import { GetTasksResponse } from "../../features/todolists/api/tasksApi.types"
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { ErrorUtilsDispatchType } from "common/utils/ErrorUtils.types"

export const handleServerAppError = <D>(
  data: GeneralResponse<D> | GetTasksResponse,
  dispatch: ErrorUtilsDispatchType,
) => {
  if ("messages" in data) {
    if (data.messages.length) {
      dispatch(setAppErrorAC(data.messages[0]))
    } else {
      setAppErrorAC("Some error occurred")
    }
  } else if ("items" in data) {
    dispatch(setAppErrorAC("Some error occurred"))
  }

  dispatch(setAppStatusAC("failed"))
}
