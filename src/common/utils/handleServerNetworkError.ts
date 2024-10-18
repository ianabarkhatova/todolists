import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer"
import { ErrorUtilsDispatchType } from "common/utils/ErrorUtils.types"

export const handleServerNetworkError = (dispatch: ErrorUtilsDispatchType, error: { message: string }) => {
  dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
  dispatch(setAppStatusAC("failed"))
}
