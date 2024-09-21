import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export let todoListId1 = v1()
export let todoListId2 = v1()


const initialState: TodolistDomainType[] = []

// Reducer принимает state(initialState) и action и возвращает новый стейт типа TodolistDomainType[]:

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter((tl) => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            // не делаем копию стейта, т к массив тудулистов изначально пустой
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state
    }
}

// action creators
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (todolistId: string, title: string) => (
    {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title} as const)
export const changeTodolistFilterAC = (todolistId: string, value: FilterValuesType) => (
    {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: value} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => (
    {type: 'SET-TODOLISTS', todolists: todolists} as const)

//thunk creators
export const getTodolistsTC = () => (dispatch: Dispatch<TodolistActionType>) =>
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistActionType>) =>
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistActionType>) =>
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistActionType>) =>
    todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })

// types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type TodolistActionType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

export type FilterValuesType = "all" | "completed" | "active"
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


