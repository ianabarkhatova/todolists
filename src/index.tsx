import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import './index.css';
import {Provider} from "react-redux";
import {store} from "./app/store";
import {Login} from "./features/login/Login";
import {ErrorPage} from "./common/components/ErrorPage/ErrorPage";
import {AppWithRedux} from "./app/AppWithRedux";
import {Todolists} from "./features/todolists/ui/Todolists/Todolists";

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
                element: <Todolists/>,
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


