import type {Meta, StoryObj} from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {Provider} from "react-redux";
import {store} from "../state/store";
import React from 'react';
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


const meta: Meta<typeof AppWithRedux> = {
    title: 'TODOLISTS/AppWithRedux',
    component: AppWithRedux,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;


export const AppWithReduxStory: Story = {
};
