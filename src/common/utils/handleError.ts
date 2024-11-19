import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from "@reduxjs/toolkit/query"
import { setAppError } from "../../app/appSlice"
import { ResultCode } from "common/enums"

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Some error occurred"

  // 1. Global query errors
  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR":
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error = result.error.error
        break

      case 403:
        error = "403 Forbidden Error. Check API-KEY"
        break

      case 400:
        error = (result.error.data as { message: string }).message
        break

      default:
        error = JSON.stringify(result.error)
        break
    }
    api.dispatch(setAppError({ error }))
  }

  // 2. Result code errors
  if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
    const messages = (result.data as { messages: string[] }).messages
    error = messages.length ? messages[0] : error
    api.dispatch(setAppError({ error }))
  }
}
