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
        posts(first: 100, where: {orderby: {field: DATE, order: DESC}}) {
          nodes {
            id
            title
            date
            link
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
          posts (first: 100, where: {orderby: {field: DATE, order: DESC}}){
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
    wpgraphql {
      posts(first: 100, where: {orderby: {field: DATE, order: DESC}, status: PUBLISH}) {
        nodes {
          id
          title
          slug
          status
          content
          categories {
            nodes {
              id
              name
              link
              slug
            }
          }
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
