import React from "react"
import BlogTemplate from "../components/Home/BlogTemplate/BlogTemplate"
import Header from "../components/Home/Header/Header"
import Layout from "../Layout/Layout"
import { navigate } from "gatsby"
import styles from "./index.module.css"

const index = () => {
  return (
    <Layout>
      <div className={styles.Home}>
        <Header />
        <BlogTemplate />
      </div>
    </Layout>
  )
}

export default index
