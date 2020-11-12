import React, { FC, ReactNode, useState, useEffect } from "react"
import Footer from "../components/Footer/Footer"
import Nav from "../components/NavBar/Nav"
import NewsLetter from "../components/NewsLetter/NewsLetter"
import firebase from "gatsby-plugin-firebase"
import styles from "./Layout.module.css"

type layoutProps = {
  children: ReactNode
}

const Layout: FC<layoutProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)

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

  return (
    <div>
      <Nav />

      {user && !user.emailVerified && (
        <div className={styles.emailVerification}>
          <span>
            An email has been sent to your inbox. Please verify your email
          </span>
        </div>
      )}

      {children}
      <NewsLetter />
      <Footer />
    </div>
  )
}

export default Layout
