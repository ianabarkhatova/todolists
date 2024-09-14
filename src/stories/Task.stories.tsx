import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../todoList/Task";
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator'
import {Provider} from "react-redux";
import {store} from "../state/store";
import React from "react";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    parameters: {
        layout: 'centered'
    },
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator],
    args: {
        task: {
            id: '12ehjhddiuiwhu',
            title: 'JS',
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            order: 0,
            startDate: '',
            description: 'desc', todoListId: "todoListId1",
            priority: TaskPriorities.Hi
        },
        todolistId: 'd4sduhn4t45k4kjnsf',
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

export const TaskIsNotDoneStory: Story = {};

export const TaskIsDoneStory: Story = {
    render: () => <Provider store={store}><Task
        task={
            {
                id: '12ehjhddiuiwhu',
                title: 'JS',
                status: TaskStatuses.Completed,
                addedDate: '',
                deadline: '',
                order: 0,
                startDate: '',
                description: 'desc', todoListId: "todoListId1",
                priority: TaskPriorities.Hi
            }
        }
        todolistId={'sfsdf34534hskdf'}/>
    </Provider>
};