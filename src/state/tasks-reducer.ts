import {tasksObjType} from "../App";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "./todolists-reducer";
import {TasksObjType} from "../AppWithRedux";
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType,
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    payload: {
        taskId: string,
        model: UpdateDomainTaskModelType,
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

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionType =
    | AddTaskActionType
    | UpdateTaskActionType
    | RemoveTaskActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType


const initialState: TasksObjType = {}

// Reducer принимает state(initialState) и action и возвращает новый стейт типа TodoListType[]:

export const tasksReducer = (state: tasksObjType = initialState, action: ActionType): tasksObjType => {
    switch (action.type) {

        case 'ADD-TASK': {
            const stateCopy = {...state}
            const tasksFromTodoList = stateCopy[action.task.todoListId]
            const newTasks = [action.task, ...tasksFromTodoList]
            stateCopy[action.task.todoListId] = newTasks
            return stateCopy
        }

        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
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
                    .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.newTitle} : t)
            }
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolist.id] = []
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

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}

            action.todolists.forEach(tl => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }

        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }

        default:
            return state
    }
}

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task} as const
}

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', payload: {taskId, todolistId, model}} as const
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', payload: {taskId, todolistId}} as const
}

export const setTasksAC = (tasks: TaskType[], todolistId: string): SetTasksActionType => {
    return {type: "SET-TASKS", tasks, todolistId}
}

//thunk creators
export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasksAC(res.data.items, todolistId))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        // так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
        // те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
        // чтобы у неё отобрать остальные св-ва
        const state = getState()
        const task = state.tasks[todolistId].find(t => {
            return t.id === taskId
        })

        // if task does not exist:
        if (!task) {
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskModelType = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }

        if (task) {
            todolistsAPI
                .updateTask(todolistId, taskId, apiModel)
                .then(() => {
                    const action = updateTaskAC(taskId, domainModel, todolistId)
                    dispatch(action)
                })
        }
    }
}











