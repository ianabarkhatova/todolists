import {TaskActionType, tasksReducer} from './tasks-reducer'
import {TodolistActionType, todolistsReducer} from './todolists-reducer'
import {Action, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunk, {ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer
})

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// создаем тип диспатча который принимает как AC так и TC
export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, Action>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
//типизация useSelector
// export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// все типы action в App
export type AppActionsType = TodolistActionType | TaskActionType



// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
