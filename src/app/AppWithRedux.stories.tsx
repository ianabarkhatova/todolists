import type {Meta, StoryObj} from '@storybook/react';
import {ReduxStoreProviderDecorator} from "../stories/decorators/ReduxStoreProviderDecorator";
import {AppWithRedux} from "./AppWithRedux";


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
    args: {
        demo: true,
    },
};
