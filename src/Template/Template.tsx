import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Layout from "../Layout/Layout"
import styles from "./Template.module.css"

const Template = ({ pageContext: { data } }: any) => {
  let details = documentToReactComponents(data.description.json)
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
        <div className={styles.BlogDesc}>{details}</div>
      </div>
    </Layout>
  )
}

export default Template
