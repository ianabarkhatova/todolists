import { TodolistDomainType } from "../model/todolistsSlice"
import { TodolistType } from "./todolistsApi.types"
import { GeneralResponse } from "common/types"
import { baseApi } from "../../../app/baseApi"

// api
export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<any[], void>({
      query: () => "todo-lists",
      transformResponse(todolists: TodolistType[]): TodolistDomainType[] {
        return todolists.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }))
      },
      providesTags: ["Todolist"],
    }),
    addTodolist: build.mutation<GeneralResponse<{ item: TodolistType }>, string>({
      query: (title) => {
        return {
          url: "todo-lists",
          method: "POST",
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),

    removeTodolist: build.mutation<GeneralResponse, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `todo-lists/${id}`,
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: build.mutation<GeneralResponse, { id: string; title: string }>({
      query: ({ id, title }) => {
        return {
          url: `/todo-lists/${id}`,
          method: "PUT",
          body: { title },
        }
      },
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useAddTodolistMutation,
  useRemoveTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi

export type ChangeTodolistTitleArgs = {
  todolistId: string
  title: string
}
