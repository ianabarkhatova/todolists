import React from "react"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Navigate } from "react-router-dom"
import { Grid2 } from "@mui/material"
import { useLogin } from "../../lib/hooks/useLogin"
import { LoginFormLabel } from "./LoginFormLabel/LoginFormLabel"
import { LoginForm } from "./LoginForm/LoginForm"

export const Login = () => {
  const { isLoggedIn, formik } = useLogin()

  if (isLoggedIn) {
    return <Navigate to={"/"} />
  }

  return (
    <Grid2 container justifyContent={"center"}>
      <Grid2 justifyContent={"center"}>
        <FormControl>
          <FormLabel>
            <LoginFormLabel />
            <LoginForm />
          </FormLabel>
        </FormControl>
      </Grid2>
    </Grid2>
  )
}
