const dotenv = require("dotenv")
if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}
dotenv.config()

module.exports = {
  siteMetadata: {
    title: `Blog Site`,
    description: `This is a simple blog site. It uses Gatsby, contentful and material-ui `,
    author: `@usamatahir`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-material-ui`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENT_FUL_SPACE_ID,
        accessToken: process.env.CONTENT_FUL_ACCESS_TOKEN,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `@contentful/gatsby-transformer-contentful-richtext`,

    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: process.env.apiKey,
          authDomain: process.env.authDomain,
          databaseURL: process.env.databaseURL,
          projectId: process.env.projectId,
          storageBucket: process.env.storageBucket,
          messagingSenderId: process.env.messagingSenderId,
          appId: process.env.appId,
        },
      },
    },
  ],
}
