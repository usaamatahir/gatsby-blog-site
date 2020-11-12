const path = require("path")
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
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
  `)

  result.data.allContentfulBlogPost.edges.forEach(data => {
    createPage({
      path: `/blogs/${data.node.slug}`,
      component: path.resolve("./src/Template/Template.tsx"),
      context: {
        data: data.node,
      },
    })
  })
}
