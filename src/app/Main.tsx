import { Outlet } from "react-router-dom"
import Container from "@mui/material/Container"
import React from "react"

export const Main = () => {
  return (
    <Container fixed>
      <Outlet />
    </Container>
  )
}
