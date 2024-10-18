import type { Meta, StoryObj } from "@storybook/react"
import { Task } from "./Task"
import { ReduxStoreProviderDecorator } from "../../../../../../../stories/decorators/ReduxStoreProviderDecorator"
import { Provider } from "react-redux"
import { store } from "../../../../../../../app/store"
import React from "react"
import { TaskPriority, TaskStatus } from "common/enums/enums"

const meta: Meta<typeof Task> = {
  title: "TODOLISTS/task",
  parameters: {
    layout: "centered",
  },
  component: Task,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
  args: {
    task: {
      id: "12ehjhddiuiwhu",
      title: "JS",
      status: TaskStatus.New,
      addedDate: "",
      deadline: "",
      order: 0,
      startDate: "",
      description: "desc",
      todoListId: "todoListId1",
      priority: TaskPriority.Hi,
      entityStatus: "idle",
    },
    todolist: {
      id: "todolistId1",
      title: "My TodoList",
      order: 0,
      addedDate: "",
      filter: "all",
      entityStatus: "idle",
    },
    todolistId: "d4sduhn4t45k4kjnsf",
  },
}

export default meta
type Story = StoryObj<typeof Task>

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
  render: () => (
    <Provider store={store}>
      <Task
        task={{
          id: "12ehjhddiuiwhu",
          title: "JS",
          status: TaskStatus.Completed,
          addedDate: "",
          deadline: "",
          order: 0,
          startDate: "",
          description: "desc",
          todoListId: "todoListId1",
          priority: TaskPriority.Hi,
          entityStatus: "idle",
        }}
        todolist={{
          id: "todolistId1",
          title: "My TodoList",
          order: 0,
          addedDate: "",
          filter: "all",
          entityStatus: "idle",
        }}
        todolistId={"sfsdf34534hskdf"}
      />
    </Provider>
  ),
}
