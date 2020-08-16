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

const GET_CATS_DETAILS = `
  query GET_CATS_DETAILS {
    wpgraphql {
      categories {
        nodes {
          id
          name
          slug
          count
          posts {
            nodes {
              id
              title
              date
              excerpt
              content
              slug
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
            featuredImage {
                altText
                mediaItemUrl
                mediaDetails {
                  sizes {
                    name
                    sourceUrl
                    width
                  }
                }
              }
            }
          }
          children {
            nodes {
              id
              name
              count
              slug
            }
          }
        }
      }
    }
  }`;

const GET_ALL_POSTS = `
  query GET_POSTS {
    wpgraphql{
      posts {
        nodes {
          id
          title
          slug
          content
        }
      }
    }
  }
  `;

module.exports = {
  GET_POSTS,
  GET_CATS_SUMMARY,
  GET_CATS_DETAILS,
  GET_ALL_POSTS,
};
