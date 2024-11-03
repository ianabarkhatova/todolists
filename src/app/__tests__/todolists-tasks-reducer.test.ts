import { addTodolist, TodolistDomainType, todolistsReducer } from "../../features/todolists/model/todolistsSlice"
import { tasksReducer } from "../../features/todolists/model/tasksSlice"
import { TasksObjType } from "../App"

test("ids should be equal", () => {
  const startTasksState: TasksObjType = {}
  const startTodolistsState: Array<TodolistDomainType> = []
  let todolist = {
    id: "todolistId1",
    title: "What to learn",
    addedDate: "",
    order: 0,
  }

  const action = addTodolist.fulfilled(
    {
      todolist: todolist,
    },
    "requestId",
    todolist.title,
  )

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
