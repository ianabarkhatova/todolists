import {tasksReducer} from "../../state/tasks-reducer";
import {todoListId1, todoListId2, todolistsReducer} from "../../state/todolists-reducer";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../../state/store";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        [todoListId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React JS', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'REST API', isDone: false},
            {id: v1(), title: 'Typescript', isDone: false},
        ],
        [todoListId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={store}>{storyFn()}</Provider>
}