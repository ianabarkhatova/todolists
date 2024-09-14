import {tasksObjType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";
import {TasksObjType} from "../AppWithRedux";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string,
        todolistId: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        taskId: string,
        status: TaskStatuses,
        todolistId: string
    }
}

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        taskId: string
        todolistId: string
    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        taskId: string,
        newTitle: string,
        todolistId: string
    }
}


type ActionType =
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


const initialState: TasksObjType = {
    count: []
}

// Reducer принимает state(initialState) и action и возвращает новый стейт типа TodoListType[]:

export const tasksReducer = (state: tasksObjType = initialState, action: ActionType): tasksObjType => {
    switch (action.type) {

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasksFromTodoList = stateCopy[action.payload.todolistId]
            const newTask: TaskType = {
                description: 'description',
                title: action.payload.title,
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                id: v1(),
                todoListId: action.payload.todolistId,
                order: 1,
                addedDate: '',
            }
            const newTasks = [newTask, ...tasksFromTodoList]
            stateCopy[action.payload.todolistId] = newTasks
            return stateCopy
        }

        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, status: action.payload.status} : t)
            }
        }

        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.payload.todolistId]
            const filteredTasks = tasks.filter(t => t.id !== action.payload.taskId)
            stateCopy[action.payload.todolistId] = filteredTasks
            return stateCopy
        }

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId? {...t, title: action.payload.newTitle} : t)
            }
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

            //при деструктуризации создается новый объект:
            // const {[action.payload.todolistId]: [], ...rest} = state
            // return rest
        }

        default:
            return state
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', payload: {title, todolistId}} as const
}

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', payload: {taskId, todolistId, status}} as const
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', payload: {taskId, newTitle, todolistId}} as const
}





