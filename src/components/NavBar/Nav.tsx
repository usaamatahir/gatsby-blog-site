import React, { useRef, useState } from "react"
import { Link } from "gatsby"
import styles from "./Nav.module.css"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import CloseRoundedIcon from "@material-ui/icons/CloseRounded"

const Nav = () => {
  const [display, setDisplay] = useState<boolean>(false)
  const show = useRef<HTMLLinkElement>(null)

  function handleNav() {
    if (display === false) {
      if (show.current !== null) {
        show.current.style.right = "0"
        setDisplay(true)
      }
    } else {
      if (show.current !== null) {
        show.current.style.right = "-100%"
        setDisplay(false)
      }
    }
  }
  return (
    <div className={styles.navBar}>
      <label className={styles.Logo}>
        Blog<span>Site</span>
      </label>
      <nav className={styles.navLinks} ref={show} onClick={handleNav}>
        <Link to="/" className={styles.link}>
          Home
        </Link>
        <Link to="/blogs" className={styles.link} onClick={handleNav}>
          Blogs
        </Link>
        <Link to="/about" className={styles.link} onClick={handleNav}>
          About
        </Link>
        <Link to="/contact" className={styles.link} onClick={handleNav}>
          Contact
        </Link>
      </nav>
      <div className={styles.menuIcon}>
        {!display ? (
          <MenuRoundedIcon onClick={handleNav} />
        ) : (
          <CloseRoundedIcon onClick={handleNav} />
        )}
      </div>
    </div>
  )
}

export default Nav
