import { createBrowserRouter, Navigate } from "react-router-dom"
import { App } from "../../app/App"
import { Login } from "../../features/auth/ui/Login/Login"
import { Todolists } from "../../features/todolists/ui/Todolists/Todolists"
import { Page404 } from "common/components"
import React from "react"

export const Path = {
  Login: "login",
} as const

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/todolists" />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/todolists",
        element: <Todolists />,
      },
      {
        path: "/404",
        element: <Page404 />,
      },
      {
        path: "*",
        element: <Navigate to={"/404"} />,
      },
    ],
  },
])
