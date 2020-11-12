import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Grid, TextField } from "@material-ui/core"
import styles from "./LoginForm.module.css"
import TextError from "../TextError"
import { Link, navigate } from "gatsby"
import { useDispatch } from "react-redux"
import { changeAuthState } from "../../Redux/Slicer"
import { Login } from "../auth"

interface formType {
  email: string
  password: string
}

const initialValues: formType = {
  email: "",
  password: "",
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .required("Required")
    .max(20, "Password should be maximun of 20 characters")
    .min(6, "Password must be atleast of 6 characters"),
})

const LoginForm = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState("")
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: formType, onSubmitProps: any) => {
        const exUser = Login(values.email, values.password)

        exUser
          .then(user => {
            dispatch(changeAuthState("PROFILE"))

            onSubmitProps.resetForm()
            navigate(-1)
          })
          .catch(err => {
            setError(err.message)
          })
        onSubmitProps.setSubmitting(false)
      }}
    >
      {formik => {
        return (
          <Form className={styles.form}>
            <h1>SignIn</h1>
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item sm={8} xs={10}>
                <Field
                  name="email"
                  as={TextField}
                  label="E-mail"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="email" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>
              <Grid item sm={8} xs={10}>
                <Field
                  name="password"
                  as={TextField}
                  label="Password"
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="password" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>

              <br />
              <Grid item sm={8} xs={10}>
                {error && <h3 className={styles.Error}>{error}</h3>}
              </Grid>
              <Grid item sm={5} xs={8}>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className={styles.submitBtn}
                >
                  Submit
                </button>
                <span>
                  <Link
                    onClick={() => dispatch(changeAuthState("SIGNUP"))}
                    to="."
                  >
                    Not have a account? Create one
                  </Link>
                </span>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default LoginForm
