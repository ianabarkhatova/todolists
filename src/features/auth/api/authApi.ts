import { GeneralResponse } from "common/types"
import { LoginArgs, LoginUser } from "./authApi.types"
import { baseApi } from "../../../app/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<GeneralResponse<{ userId: number; token: string }>, LoginArgs>({
      query: (payload) => {
        return {
          method: "POST",
          url: "auth/login",
          body: payload,
        }
      },
    }),
    logout: build.mutation<GeneralResponse<{ userId?: number }>, void>({
      query: () => {
        return {
          method: "DELETE",
          url: "auth/login",
        }
      },
    }),
    me: build.query<GeneralResponse<LoginUser>, void>({
      query: () => "auth/me",
    }),
  }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
