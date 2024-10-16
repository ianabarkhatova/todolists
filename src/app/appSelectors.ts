import { AppRootStateType } from "./store"

export const selectThemeMode = (state: AppRootStateType) => state.app.themeMode
export const selectError = (state: AppRootStateType) => state.app.error
export const selectIsInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectStatus = (state: AppRootStateType) => state.app.status
