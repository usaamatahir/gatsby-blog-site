import React, { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Grid, TextField } from "@material-ui/core"
import styles from "./SignupForm.module.css"
import TextError from "../TextError"
import { Link, navigate } from "gatsby"
import { useDispatch } from "react-redux"
import { changeAuthState } from "../../Redux/Slicer"
import firebase from "gatsby-plugin-firebase"
import { SignUp } from "../auth"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { Modal, Backdrop, Fade } from "@material-ui/core"

function rand() {
  return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around",
      textAlign: "center",
      position: "absolute",
      width: 400,
      height: 300,
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #d8cbd7",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

interface formType {
  firstname: string
  lastname: string
  email: string
  password: string
  confirm_password: string
}

const initialValues: formType = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirm_password: "",
}

const validationSchema = Yup.object({
  firstname: Yup.string().required("Required"),
  lastname: Yup.string().required("Required"),
  email: Yup.string().email("Invalid Email").required("Required"),
  password: Yup.string()
    .required("Required")
    .max(20, "Password should be maximun of 20 characters")
    .min(6, "Password must be atleast of 6 characters"),
  confirm_password: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password")], "Password is not matching"),
})

const SignupForm = () => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const [error, setError] = useState<null | String>(null)
  const [verificationError, setVerificationError] = useState<null | String>(
    null
  )
  const [verification, setVerification] = useState(false)

  function handleClose() {
    setOpen(false)
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values: formType, onSubmitProps: any) => {
        const newUser = SignUp(values.email, values.password)
        newUser
          .then(() => {
            var currentUser = firebase.auth().currentUser
            currentUser
              ?.sendEmailVerification()
              .then(() => {
                setVerification(true)
              })
              .catch(err => {
                setVerificationError(err.message)
              })
          })
          .catch(err => {
            setError(err.message)
          })
        onSubmitProps.setSubmitting(false)
      }}
    >
      {formik => {
        return (
          <div>
            {verification ? (
              <div style={modalStyle} className={styles.form}>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  disableBackdropClick={true}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 100,
                  }}
                >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <h3>
                        An email has been sent to your inbox. Please verify your
                        Account
                      </h3>
                      <button
                        className={styles.closeBtn}
                        onClick={() => {
                          handleClose()
                          dispatch(changeAuthState("LOGIN"))
                          navigate(-1)
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </Fade>
                </Modal>
              </div>
            ) : (
              <Form className={styles.form}>
                <h1>Sign Up</h1>
                <Grid container spacing={3} justify="center">
                  <Grid item sm={4} xs={5}>
                    <Field
                      name="firstname"
                      as={TextField}
                      label="First Name"
                      variant="outlined"
                      helperText={
                        <ErrorMessage name="firstname" component={TextError} />
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item sm={4} xs={5}>
                    <Field
                      name="lastname"
                      as={TextField}
                      label="Last Name"
                      variant="outlined"
                      helperText={
                        <ErrorMessage name="lastname" component={TextError} />
                      }
                      fullWidth
                    />
                  </Grid>
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
                  <Grid item sm={8} xs={10}>
                    <Field
                      name="confirm_password"
                      as={TextField}
                      label="Confirm Password"
                      variant="outlined"
                      helperText={
                        <ErrorMessage
                          name="confirm_password"
                          component={TextError}
                        />
                      }
                      fullWidth
                    />
                  </Grid>
                  <br />
                  <Grid item sm={8} xs={10}>
                    {verificationError && (
                      <h3 className={styles.Error}>{verificationError}</h3>
                    )}
                    {error && <h3 className={styles.Error}>{error}</h3>}
                  </Grid>
                  <Grid item sm={5} xs={8}>
                    <button
                      type="submit"
                      disabled={formik.isSubmitting}
                      className={styles.submitBtn}
                    >
                      Register
                    </button>
                    <span>
                      <Link
                        to="/login-signup"
                        onClick={() => dispatch(changeAuthState("LOGIN"))}
                      >
                        Already have an account?
                      </Link>
                    </span>
                  </Grid>
                </Grid>
              </Form>
            )}
          </div>
        )
      }}
    </Formik>
  )
}

export default SignupForm
