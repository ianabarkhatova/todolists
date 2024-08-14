import {FilterValuesType, tasksObjType, TodoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../todoList/TodoList";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type addTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string,
        todolistId: string
    }
}

export type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        taskId: string,
        newIsDone: boolean,
        todolistId: string
    }
}

export type removeTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todolistId: string
    }
}

export type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        taskId: string,
        newTitle: string,
        todolistId: string
    }
}


type ActionType =
    | addTaskActionType
    | changeTaskStatusActionType
    | removeTaskActionType
    | changeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


// Reducer принимает state(initialState) и action и возвращает новый стейт типа TodoListType[]:

export const tasksReducer = (state: tasksObjType, action: ActionType): tasksObjType => {
    switch (action.type) {

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasksFromTodoList = stateCopy[action.payload.todolistId]
            const newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false}
            const newTasks = [newTask, ...tasksFromTodoList]
            stateCopy[action.payload.todolistId] = newTasks
            return stateCopy
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId]
            const newTasks = tasks.map(t => action.payload.taskId === t.id ? {
                ...t,
                isDone: action.payload.newIsDone
            } : t)
            stateCopy[action.payload.todolistId] = newTasks
            return stateCopy
        }

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.payload.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = filteredTasks
            return stateCopy
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.payload.todolistId]
            const newTasks = tasks.map(t => action.payload.taskId === t.id ? {...t, title: action.payload.newTitle} : t)
            stateCopy[action.payload.todolistId] = newTasks
            return stateCopy
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.payload.todolistId] = []
            return stateCopy
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todolistId]
            return stateCopy
        }


        default:
            throw new Error("I don't understand this action type")
    }
}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, newIsDone: boolean, todolistId: string): changeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, todolistId, newIsDone}} as const
}

export const removeTaskAC = (taskId: string, todolistId: string): removeTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): changeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, newTitle, todolistId}} as const
}





