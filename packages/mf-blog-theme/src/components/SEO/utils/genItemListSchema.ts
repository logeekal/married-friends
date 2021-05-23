import {Post, Recipe} from "../../../types/wp-graphql.types";


const genItemListSchema = (posts: Array<Post | Recipe>) => {

  const listSchema : any[] = posts.map((post,index) => {
    return {
      "@type": "ListItem",
      position: index + 1,
      url: (post as Post).uri,
      image: (post as Post).featuredImage.node.mediaItemUrl,
    }
  })

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [... listSchema]
  }

}

export default genItemListSchema;
