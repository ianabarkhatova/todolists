import { GeneralResponse } from "common/types"
import { instance } from "common/instance"
import { LoginArgs, LoginUser } from "./authApi.types"

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<GeneralResponse<{ userId: number; token: string }>>("auth/login", payload)
  },
  logout() {
    return instance.delete<GeneralResponse<{ userId?: number }>>("auth/login")
  },
  me() {
    return instance.get<GeneralResponse<LoginUser>>("auth/me")
  },
}
