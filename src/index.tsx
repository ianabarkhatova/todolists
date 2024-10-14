import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import './index.css';
import AppWithRedux from "./app/AppWithRedux";
import {Provider} from "react-redux";
import {store} from "./state/store";
import {Login} from "./features/Login/Login";
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppWithRedux/>,
        errorElement: <Navigate to={'/404'}/>,
        children: [
            {
                index: true,
                element: <Navigate to="/todolists"/>
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "todolists",
                element: <TodolistsList/>,
            },
        ],
    },
    {
        path: '/404',
        element: <ErrorPage/>
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);


root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);


