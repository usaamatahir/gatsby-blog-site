import React from "react"
import { Grid } from "@material-ui/core"
import { Link, navigate, graphql, useStaticQuery } from "gatsby"
import styles from "./BlogTemplate.module.css"

const BlogTemplate = () => {
  const data = useStaticQuery(
    graphql`
      {
        allContentfulBlogPost {
          edges {
            node {
              id
              title
              slug
              publishedDate(fromNow: true)
              description {
                childContentfulRichText {
                  html
                }
              }
              image {
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    `
  )
  function truncate(str: any, n: number) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str
  }

  return (
    <div className={styles.BlogTemplate}>
      <Grid container spacing={3} justify="center">
        {data.allContentfulBlogPost.edges
          .slice(0, 4)
          .map((post: any, ind: number) => {
            const details = post.node.description.childContentfulRichText.html

            const desc = details.replace(/<[^>]+>/g, "")
            return (
              <Grid item md={5} sm={10} key={ind}>
                <div className={styles.BlogContent}>
                  <Link to={`/blogs/${post.node.slug}`}>
                    <img
                      className={styles.BlogImg}
                      src={post.node.image.fluid.src}
                      alt={post.node.title}
                    />
                  </Link>
                  <Link to={`/blogs/${post.node.slug}`} className={styles.Link}>
                    <h1>{post.node.title}</h1>
                  </Link>
                  <p className={styles.para}>{truncate(desc, 150)}</p>
                </div>
              </Grid>
            )
          })}
      </Grid>
      <button className={styles.button} onClick={() => navigate("/blogs")}>
        See more
      </button>
    </div>
  )
}

export default BlogTemplate
