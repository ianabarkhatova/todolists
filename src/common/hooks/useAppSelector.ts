import { useSelector } from "react-redux"
import { AppRootStateType } from "../../app/store"

export const useAppSelector = useSelector.withTypes<AppRootStateType>()
