import React from "react"
import styles from "./NewsLetter.module.css"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { TextField, Grid } from "@material-ui/core"
import TextError from "../TextError"

type newsLetter = {
  emailID: string
}

const initialValue: newsLetter = {
  emailID: "",
}

const validationSchema = Yup.object({
  emailID: Yup.string().email("Invalid Email").required("Required"),
})

const NewsLetter = () => {
  return (
    <div className={styles.newsLetter}>
      <div className={styles.letterText}>
        <h1>Get The Best Of All Hands Delivered To Your Inbox</h1>
        <p>Subscribe to our newsletter and stay updated.</p>
      </div>
      <div className={styles.Subscribtion}>
        <Formik
          initialValues={initialValue}
          validationSchema={validationSchema}
          onSubmit={(value: newsLetter, { resetForm }) => {
            alert("Form Submitted Successfully")
            resetForm({
              values: initialValue,
            })
          }}
        >
          <Form>
            <Grid container spacing={1} justify="center">
              <Grid item md={3} xs={10}>
                <label className={styles.textLabel}>
                  Enter your email here
                </label>
                <Field
                  name="emailID"
                  as={TextField}
                  helperText={
                    <ErrorMessage name="emailID" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>
              <Grid item md={3} xs={10}>
                <button type="submit">Subscribe</button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </div>
  )
}

export default NewsLetter
