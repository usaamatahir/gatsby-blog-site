import React from "react"
import styles from "./TextError.module.css"

const TextError = (props: any) => {
  return <div className={styles.error}>{props.children}</div>
}

export default TextError
