import React from "react"
import styles from "./TextError.module.css"

const TextError = (props: any) => {
  return <span className={styles.error}>{props.children}</span>
}

export default TextError
