/*@jsx jsx*/

import React, { FC } from "react";
import { Post } from "../types/wp-graphql.types";
import { FLEX_CONFIG } from "../utils/style";
import { jsx, SxStyleProp, Link } from "theme-ui";
import { extractTextfromHTML, makePostSlug } from "../utils";

export interface SearchResultCardProps {
  post: Post;
}

const SearchResultCard: FC<SearchResultCardProps> = props => {
  const { post } = props;
  let { sourceUrl } = post.featuredImage
    ? post.featuredImage.mediaDetails.sizes.find(size => {
        return size.name === "thumbnail";
      })
    : { sourceUrl: "https://picum.photos/150/90" };
  return (
    <div
      className="search__result"
      sx={
        {
          ...FLEX_CONFIG("flex", "row", "center", "center"),
          width: "100%",
          marginTop: 1,
          marginBottom: 1,
          bg: "bgCard",
          padding: 1,
          fontFamily: "normal",
          ".search__result__image": {
            paddingRight: 0,
            minWidth: "150px",
            img: {
              width: "100%",
              height: "auto"
            }
          },
          "@media only screen and (max-Width: 700px)": {
            ".search__result__image": {
              display: "none"
            }
          },
          ".search_result__title": {
            paddingX: 0,
            paddingY: 0,
            paddingBottom: 1
          },
          ".search__result__excerpt": {
            span: {
              textOverflow: "ellipsis",
              paddingX: 0,
              paddingY: 0,
              paddingBottom: "0px",
              display: "table",
              whiteSpace: "normal",
              color: "secondary"
            }
          },
          ".search__result__details": {
            h2: {
              margin: "0px",
              marginBottom: 0,
              padding: "0px",
              paddingX: 0
            }
          }
        } as SxStyleProp
      }
    >
      <div className="search__result__image">
        <Link href={makePostSlug(post)} sx={{ color: "primary" }}>
          <img src={sourceUrl} alt={post.title} />
        </Link>
      </div>
      <div className="search__result__details">
        <Link href={makePostSlug(post)} sx={{ color: "primary" }}>
          <h2
            className="search__result__title"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
        </Link>
        <span
          className="search__result__excerpt"
          dangerouslySetInnerHTML={{
            __html: `<span> ${
              extractTextfromHTML(post.excerpt).substr(0, 300) + "..."
            } </span>`
          }}
        />
      </div>
    </div>
  );
};

export default SearchResultCard;
