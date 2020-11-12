import React, { useEffect, useState } from "react"
import Layout from "../Layout/Layout"
import styles from "./Template.module.css"
import firebase from "gatsby-plugin-firebase"
import { Link } from "gatsby"

const Template = ({ pageContext: { data } }: any) => {
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

  function truncate(str: any, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }
  const details = data.description.childContentfulRichText.html

  const desc = details.replace(/<[^>]+>/g, "")

  return (
    <Layout>
      <div className={styles.Template}>
        <h1 className={styles.Title}>{data.title}</h1>
        <h4 className={styles.PublishedDate}>{data.publishedDate}</h4>
        <img
          className={styles.HeaderImage}
          src={data.image.fluid.src}
          alt={data.title}
        />
        {!user ? (
          <div>
            <span className={styles.BlogDesc}>{truncate(desc, 500)}</span>
            <h1 className={styles.loginMsg}>
              Please <Link to="/login-signup">login</Link> to get full access
            </h1>
          </div>
        ) : (
          <div>
            <span className={styles.BlogDesc}>{desc}</span>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Template
