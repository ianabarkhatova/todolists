import { GetTasksResponse, TaskType, UpdateTaskModel } from "./tasksApi.types"
import { GeneralResponse } from "common/types"
import { UpdateDomainTaskModelType } from "../model/tasksSlice"
import { baseApi } from "../../../app/baseApi"

//1 арг. - возвращаемый тип
// 2 арг. - тип query аргументов (QueryArg)

export const PAGE_SIZE = 4

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string; args: { page: number } }>({
      query: ({ todolistId, args }) => {
        const params = { ...args, count: PAGE_SIZE }
        return {
          method: "GET",
          url: `todo-lists/${todolistId}/tasks`,
          params,
        }
      },
      providesTags: (res, err, { todolistId }) =>
        res
          ? [...res.items.map(({ id }) => ({ type: "Task", id }) as const), { type: "Task", id: todolistId }]
          : ["Task"],
    }),
    addTask: build.mutation<GeneralResponse<{ item: TaskType }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks`,
          method: "POST",
          body: { title },
        }
      },
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    removeTask: build.mutation<GeneralResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => {
        return {
          url: `todo-lists/${todolistId}/tasks/${taskId}`,
          method: "DELETE",
        }
      },
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    updateTask: build.mutation<
      GeneralResponse<{ item: TaskType }>,
      {
        todolistId: string
        taskId: string
        apiModel: UpdateTaskModel
      }
    >({
      query: ({ todolistId, taskId, apiModel }) => {
        return {
          url: `/todo-lists/${todolistId}/tasks/${taskId}`,
          method: "PUT",
          body: { ...apiModel },
        }
      },
      invalidatesTags: (result, error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useAddTaskMutation, useRemoveTaskMutation, useUpdateTaskMutation } = tasksApi

// types
export type AddTaskArgs = {
  todolistId: string
  title: string
}

export type UpdateTaskArgs = {
  taskId: string
  todolistId: string
  domainModel: UpdateDomainTaskModelType
}

export type RemoveTaskArgs = {
  todolistId: string
  taskId: string
}
