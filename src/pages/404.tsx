import React from "react"
import { Grid } from "@material-ui/core"
import styles from "./NotFound.module.css"

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Grid
        container
        spacing={3}
        justify="space-around"
        alignItems="center"
        direction="column-reverse"
      >
        <Grid item xs={10}>
          <h1>This Page Was Lost</h1>
          <p>
            The Page You are looking for isn’t available. Try to search again
          </p>
        </Grid>
        <Grid item xs={10}>
          <img
            className={styles.NotFoundImg}
            src={require("../Images/404/404.svg")}
            alt="404 Not Found"
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default NotFound
