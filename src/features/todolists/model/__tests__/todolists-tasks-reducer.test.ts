import { addTodolist, TodolistDomainType, todolistsReducer } from "../todolistsSlice"
import { tasksReducer } from "../tasks-reducer"
import { TasksObjType } from "../../../../app/App"

test("ids should be equal", () => {
  const startTasksState: TasksObjType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolist({
    todolist: {
      id: "todolistId1",
      title: "What to learn",
      addedDate: "",
      order: 0,
    },
  })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
