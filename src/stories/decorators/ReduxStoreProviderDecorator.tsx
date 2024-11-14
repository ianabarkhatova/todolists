import { tasksReducer } from "../../features/todolists/model/tasksSlice"
import { todolistsReducer } from "../../features/todolists/model/todolistsSlice"
import { applyMiddleware, combineReducers, legacy_createStore } from "redux"
import { v1 } from "uuid"
import React from "react"
import { Provider } from "react-redux"
import { AppRootStateType } from "../../app/store"
import thunk from "redux-thunk"
import { appReducer } from "../../app/appSlice"
import { TaskPriority, TaskStatus } from "common/enums/enums"
import { CombinedState } from "@reduxjs/toolkit/query"

const todoListId1 = v1()
const todoListId2 = v1()

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todoLists: todolistsReducer,
  app: appReducer,
})

const initialGlobalState: AppRootStateType = {
  todolists: [
    {
      id: todoListId1,
      title: "What to learn",
      filter: "all",
      order: 0,
      entityStatus: "idle",
      addedDate: "",
    },
    {
      id: todoListId2,
      title: "What to buy",
      filter: "all",
      order: 0,
      entityStatus: "loading",
      addedDate: "",
    },
  ],
  tasks: {
    [todoListId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        status: TaskStatus.Completed,
        description: "",
        priority: TaskPriority.Low,
        order: 0,
        deadline: "",
        addedDate: "",
        startDate: "",
        todoListId: "todoListId1",
        entityStatus: "loading",
      },
      {
        id: v1(),
        title: "JS",
        status: TaskStatus.New,
        description: "",
        priority: TaskPriority.Low,
        order: 1,
        deadline: "",
        addedDate: "",
        startDate: "",
        todoListId: "todoListId1",
        entityStatus: "idle",
      },
    ],
    [todoListId2]: [
      {
        id: v1(),
        title: "Typescript",
        status: TaskStatus.New,
        description: "",
        priority: TaskPriority.Low,
        order: 0,
        deadline: "",
        addedDate: "",
        startDate: "",
        todoListId: "todoListId2",
        entityStatus: "loading",
      },
      {
        id: v1(),
        title: "Ajax",
        status: TaskStatus.Completed,
        description: "",
        priority: TaskPriority.Low,
        order: 1,
        deadline: "",
        addedDate: "",
        startDate: "",
        todoListId: "todoListId2",
        entityStatus: "idle",
      },
    ],
  },
  app: {
    error: null,
    status: "idle",
    isInitialized: false,
    themeMode: "light",
  },
  auth: {
    isLoggedIn: false,
  },
  todolistsApi: {} as CombinedState<{}, "Todolist" | "Task", "todolistsApi">,
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
