import React, { useEffect, useRef, useState } from "react"
import { Link } from "gatsby"
import styles from "./Nav.module.css"
import MenuRoundedIcon from "@material-ui/icons/MenuRounded"
import CloseRoundedIcon from "@material-ui/icons/CloseRounded"
import { StateType, changeAuthState } from "../../Redux/Slicer"
import { useSelector, useDispatch } from "react-redux"
import { Logout } from "../auth"
import firebase from "gatsby-plugin-firebase"

const Nav = () => {
  const [display, setDisplay] = useState<boolean>(false)
  const [user, setUser] = useState<firebase.User | null>(null)
  const dispatch = useDispatch()
  const show = useRef<HTMLLinkElement>(null)

  useEffect(() => {
    let ignore = false

    function getUser() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          if (ignore === false) {
            setUser(user)
          }
        } else {
          if (ignore === false) {
            setUser(null)
          }
        }
      })
    }
    getUser()
    return () => {
      ignore = true
    }
  }, [])

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

  function handleLogOut() {
    dispatch(changeAuthState("LOGIN"))
    Logout()
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
        {!user ? (
          <Link to="/login-signup" className={styles.link}>
            Login/Signup
          </Link>
        ) : (
          <Link to="." className={styles.link} onClick={handleLogOut}>
            Logout
          </Link>
        )}
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
