import { useAppDispatch, useAppSelector } from "common/hooks"
import { selectIsLoggedIn, setIsLoggedIn } from "../../../../app/appSlice"
import { useLoginMutation } from "../../api/authApi"
import { useFormik } from "formik"
import { ResultCode } from "common/enums"

const validate = (values: initialValuesType) => {
  const errors: FormikErrorType = {}

  if (!values.email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }

  if (!values.password) {
    errors.password = "Required"
  } else if (values.password.length < 3) {
    errors.password = "Password must contain at least 3 characters"
  }

  console.log(errors)
  return errors
}

export const useLogin = () => {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const [login] = useLoginMutation()

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate,
    onSubmit: async (values) => {
      try {
        const response = await login(values).unwrap()
        if (response.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedIn({ isLoggedIn: true }))
          localStorage.setItem("sn-token", response.data.token)
          formik.resetForm()
        } else {
          console.error("Login failed:", response.messages[0])
        }
      } catch (error) {
        console.error("Login error:", error)
      }
    },
  })
  return { isLoggedIn, formik }
}

// types
type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}
type initialValuesType = {
  email: string
  password: string
  rememberMe: boolean
}
