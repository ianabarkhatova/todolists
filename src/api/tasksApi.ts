import {GeneralResponseType, GetTasksResponseType, TaskType, UpdateTaskModelType} from "./todolistsApi";
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': apiKey,
    },
})


export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, taskTitle: string) {
        return instance.post<GeneralResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<GeneralResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<GeneralResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}