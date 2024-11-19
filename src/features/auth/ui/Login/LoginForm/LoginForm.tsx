import FormGroup from "@mui/material/FormGroup"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import React from "react"
import { useLogin } from "../../../lib/hooks/useLogin"

export const LoginForm = () => {
  const { formik } = useLogin()
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroup>
        <TextField label="Email" margin="normal" {...formik.getFieldProps("email")} onBlur={formik.handleBlur} />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        <TextField
          type="password"
          label="Password"
          margin="normal"
          {...formik.getFieldProps("password")}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        <FormControlLabel
          label={"Remember me"}
          control={
            <Checkbox
              name={"rememberMe"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.rememberMe}
            />
          }
        />
        <Button type={"submit"} variant={"contained"} color={"primary"}>
          Login
        </Button>
      </FormGroup>
    </form>
  )
}
