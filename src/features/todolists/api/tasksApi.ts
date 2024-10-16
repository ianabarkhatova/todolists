import {GetTasksResponseType, TaskType, UpdateTaskModelType} from "./tasksApi.types";
import {instance} from "../../../common/instance/instance";
import {GeneralResponseType} from "../../../common/types/types";

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: {todolistId: string, title: string}) {
        const{todolistId, title} = payload
        return instance.post<GeneralResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(payload: {todolistId: string, taskId: string, apiModel: UpdateTaskModelType}) {
        const {todolistId, taskId, apiModel} = payload
        return instance.put<GeneralResponseType<{ item: TaskType }>>(
            `/todo-lists/${todolistId}/tasks/${taskId}`, apiModel)
    },
    deleteTask(payload: {todolistId: string, taskId: string}) {
        const {todolistId, taskId} = payload
        return instance.delete<GeneralResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}