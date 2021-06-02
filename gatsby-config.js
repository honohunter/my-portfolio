module.exports = {
  siteMetadata: {
    title: `Hello, I'm Alaa Eddine Bouasla`,
    description: `I'm a web application developer, highly experienced in developing websites/web-application using React.js and Node.js also I'm a python programmer and I'm a lover to experiment with new web technologies.`,
    author: `honohunter`,
    image: `/meta.png`,
    url: `https://honohunter.netlify.app`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#111`,
        theme_color: `#111`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-material-ui`,
    'gatsby-plugin-layout',
    `gatsby-plugin-transition-link`,
    `gatsby-plugin-graphql-config`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
