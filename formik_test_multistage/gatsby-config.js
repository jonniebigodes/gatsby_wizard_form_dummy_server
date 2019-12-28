/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const proxy = require("http-proxy-middleware")
module.exports = {
  /* all of the requests will be proxied through here, to avoid cors issues locally */
  developMiddleware: app => {
    app.use(
      "/api/",
      proxy({
        target: 'http://localhost:3000/data'
      })
    )
  },
}
