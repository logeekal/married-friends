const GET_CATS_SUMMARY = `
    query GET_CATS{
    wpgraphql{
      categories{
        nodes{
          id
          names
          count
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
