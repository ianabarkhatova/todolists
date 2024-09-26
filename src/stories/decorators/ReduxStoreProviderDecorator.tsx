import {tasksReducer} from "../../state/tasks-reducer";
import {todoListId1, todoListId2, todolistsReducer} from "../../state/todolists-reducer";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../state/store";
import thunk from "redux-thunk";
import {appReducer} from "../../state/app-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistsReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        {
            id: todoListId1,
            title: 'What to learn',
            filter: 'all',
            order: 0,
            entityStatus: 'idle',
            addedDate: ''},
        {
            id: todoListId2,
            title: 'What to buy',
            filter: 'all',
            order: 0,
            entityStatus: 'loading',
            addedDate: ''}
    ],
    tasks: {
        [todoListId1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                addedDate: '',
                startDate: '',
                todoListId: 'todoListId1',
                entityStatus: 'loading'

            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                order: 1,
                deadline: '',
                addedDate: '',
                startDate: '',
                todoListId: 'todoListId1',
                entityStatus: 'idle'
            },
        ],
        [todoListId2]: [
            {
                id: v1(),
                title: 'Typescript',
                status: TaskStatuses.New,
                description: '',
                priority: TaskPriorities.Low,
                order: 0,
                deadline: '',
                addedDate: '',
                startDate: '',
                todoListId: 'todoListId2',
                entityStatus: 'loading'
            },
            {
                id: v1(),
                title: 'Ajax',
                status: TaskStatuses.Completed,
                description: '',
                priority: TaskPriorities.Low,
                order: 1,
                deadline: '',
                addedDate: '',
                startDate: '',
                todoListId: 'todoListId2',
                entityStatus: 'idle'
            },

        ]
    },
    app: {
        error: null,
        status: 'idle'
    }
};

export const storyBookStore = legacy_createStore(
    rootReducer, initialGlobalState as any, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}