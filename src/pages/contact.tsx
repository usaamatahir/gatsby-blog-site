import React from "react"
import Layout2 from "../Layout/Layout2"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Grid, TextField } from "@material-ui/core"
import TextError from "../components/TextError"
import styles from "./contact.module.css"

interface personalInfo {
  firstName: string
  lastName: string
  comment: string
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  comment: Yup.string().required("Required"),
})

const initialValues: personalInfo = {
  firstName: "",
  lastName: "",
  comment: "",
}

const Contact = () => {
  return (
    <Layout2>
      <div className={styles.contactForm}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: personalInfo, { resetForm }) => {
            console.log(values)
            resetForm({
              values: initialValues,
            })
          }}
        >
          <Form className={styles.Form}>
            <Grid container spacing={3} justify="center" alignItems="center">
              <Grid item sm={10} xs={10}>
                <h1>Contact</h1>
              </Grid>
              <Grid item sm={10} xs={10}>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </Grid>
              <Grid item xs={5}>
                <label className={styles.textLabel}>First Name</label>
                <Field
                  name="firstName"
                  as={TextField}
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="firstName" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={5}>
                <label className={styles.textLabel}>Last Name</label>
                <Field
                  name="lastName"
                  as={TextField}
                  variant="outlined"
                  helperText={
                    <ErrorMessage name="lastName" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>

              <Grid item xs={10}>
                <label className={styles.textLabel}>Message</label>
                <Field
                  name="comment"
                  as={TextField}
                  variant="outlined"
                  multiline
                  rows={8}
                  helperText={
                    <ErrorMessage name="comment" component={TextError} />
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={10}>
                <button className={styles.submitBtn} type="submit">
                  Submit
                </button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
    </Layout2>
  )
}

export default Contact
