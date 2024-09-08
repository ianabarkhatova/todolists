import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../todoList/Task";
import {ReduxStoreProviderDecorator} from './decorators/ReduxStoreProviderDecorator'
import {fn} from "@storybook/test";
import {Provider} from "react-redux";
import {store} from "../state/store";
import AppWithRedux from "../AppWithRedux";
import React from "react";


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
            isDone: false
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
                isDone: true
            }
        }
        todolistId={'sfsdf34534hskdf'}/>
    </Provider>
};