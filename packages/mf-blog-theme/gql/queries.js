const GET_CATS_SUMMARY = `
query GET_CATS{
    wpgraphql{
      categories{
        nodes{
          id
          name
          count
          slug
          link
        }
      }  
    }
}
`;

const GET_POSTS = `
query GET_POSTS {
    wpgraphql{
      posts {
        nodes {
          id
          title
          date
          excerpt
          content
          slug
          featuredImage {
            altText,
            mediaItemUrl
            mediaDetails {
              sizes {
                name
                sourceUrl
                width
              }
            }
          }
          categories {
            nodes{
              name
              slug
              parent{
                name
                slug
              }
            }
          }
        }
      }
    }
}
`;

module.exports = { GET_POSTS, GET_CATS_SUMMARY };
