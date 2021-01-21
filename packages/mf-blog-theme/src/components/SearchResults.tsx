/* @jsx jsx */

import React, { FC, useEffect, PropsWithChildren } from "react";
import { Post } from "../../src/types/wp-graphql.types";
import { SearchIndexContext } from "../providers/IndexProvider";
import striptags from "striptags";
import lunr from "lunr";
import SearchResultCard from "./SearchResultCard";
import { FLEX_CONFIG } from "../utils/style";
import { jsx, SxStyleProp } from "theme-ui";
import useWindow from "../hooks/useWindow";

export interface SearchResultsProps
  extends PropsWithChildren<{
    searchQuery: string;
    //posts: Array<Post>;
  }> {}

const SearchResults: FC<SearchResultsProps> = props => {
  const [searchIndex, setSearchIndex] = React.useState<lunr.Index>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchResult, setSearchResults] = React.useState([]);
  const [hasWindow] = useWindow();
  const [lunrData, setLunrData] = React.useState<{
    loaded: boolean;
    index: any;
  }>({ loaded: false, index: {} });

  const postObj: { [k: string]: Post } = React.useContext(SearchIndexContext);

  React.useEffect(() => {
    if (postObj) {
      setIsLoading(false);
    }
    console.log("postObj", postObj);
  }, [postObj]);

  //Set LUNR Data
  React.useEffect(() => {
    if (!hasWindow) return;
    console.log("Window is here. Now loaded index");
    setIsLoading(true);
    if (window.__LUNR__.loaded) {
      setSearchIndex(window.__LUNR__.index);
      setIsLoading(false);
    }
  }, [hasWindow]);

  const prepareQuery = (initialQuery: string): string => {
    //escape space
    let newQuery = initialQuery.replace(/ /g, "\\\\ ");
    newQuery = `*${newQuery}*`;

    //exact match should get more precedence
    newQuery = `${initialQuery}^2 ${newQuery}`;
    return newQuery;
  };

  useEffect(() => {
    if (props.searchQuery === "") {
      setSearchResults([]);
      return;
    }
    if (searchIndex) {
      let results = searchIndex.search(prepareQuery(props.searchQuery));
      console.log(results);
      setSearchResults(results);
    }
  }, [props.searchQuery]);

  if (isLoading) {
    return <span>"loading"</span>;
  }

  return (
    <React.Fragment>
      <div className="search-results">
        {searchResult.length === 0 && props.searchQuery != "" ? (
          <div
            className="search-result__nothing"
            sx={
              {
                bg: "bgCard",
                ...FLEX_CONFIG("flex", "column", "center", "center"),
                marginY: 1,
                textAlign: "center",
                padding: 1,
                fontFamily: "cursive",
                fontSize: 4,
                color: "accent"
              } as SxStyleProp
            }
          >
            <img
              alt="nothing found"
              src="https://img.icons8.com/dotty/80/000000/nothing-found.png"
            />
            Oops! Nothing found
          </div>
        ) : (
          searchResult
            .sort((a, b) => {
              return b.score - a.score;
            })
            .map((item: any, index: number) => {
              return (
                <div className="results" key={index}>
                  <SearchResultCard post={postObj[item.ref]} />
                </div>
              );
            })
        )}
      </div>
    </React.Fragment>
  );
};

export default SearchResults;
