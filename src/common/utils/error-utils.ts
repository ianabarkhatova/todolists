import axios from "axios"
import { AppDispatch } from "app/store"
import { setAppError, setAppStatus } from "../../app/appSlice"

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
  let errorMessage = "Some error occurred"

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(setAppError({ error: errorMessage }))
  dispatch(setAppStatus({ status: "failed" }))
}
