import { GeneralResponse } from "common/types"
import { instance } from "common/instance/instance"
import { LoginArgs } from "./authApi.types"

export const authApi = {
  login(payload: LoginArgs) {
    return instance.post<GeneralResponse<{ userId?: number }>>("auth/login", payload)
  },
  logout() {
    return instance.delete<GeneralResponse<{ userId?: number }>>("auth/login")
  },
  me() {
    return instance.get<GeneralResponse<{ id: number; email: string; login: string }>>("/auth/me")
  },
}
