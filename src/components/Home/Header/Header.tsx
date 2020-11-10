import React from "react"
import styles from "./Header.module.css"

const Header = () => {
  return (
    <div className={styles.Header}>
      <img
        className={styles.headerImg}
        src={require("../IMG/headerImg.jpg")}
        alt="Header "
      />
    </div>
  )
}

export default Header
