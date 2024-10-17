import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./app/store"
import { router } from "common/router/router"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
