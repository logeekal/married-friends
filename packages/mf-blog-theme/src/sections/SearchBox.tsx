/** @jsx jsx */

import React, { KeyboardEvent, useEffect, useState } from "react";
import { jsx, SxStyleProp, Link, Box, Field, Input, Flex } from "theme-ui";
import useKeyPress from "../hooks/useKeyPress";
import useWindowClicks from "../hooks/useWindowClicks";
import SearchWidget from "./SearchWidget";
import { getURLWithEndpoint } from "../utils";
import axios from "axios";
import { debounce } from "lodash";
import SearchResultCard from "../components/SearchResultCard";

const SearchBox: React.FC<{}> = (_) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<any>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  let searchBox = null;
  let inputEl = null;

  const clickTarget = useWindowClicks();

  const isKPressed = useKeyPress("k")
  const isCtrlPressed = useKeyPress("ctrl")
  const isEscapePressed = useKeyPress("escape")

  useEffect(() => {
    console.log({
      searchBox,
      clickTarget,
    });
    if (!searchBox) return;
    if (!searchBox.contains(clickTarget)) {
      setIsModalVisible(false);
    }
  }, [clickTarget]);

  useEffect(() => {
    if (isCtrlPressed && isKPressed) {
      openSearchWidget();
    }
    if (isEscapePressed) setIsModalVisible(false);
  }, [isKPressed,]);

  const openSearchWidget = () => {
    setIsModalVisible(true);
    if (inputEl) {
      (inputEl as HTMLInputElement).focus();
    }
  };

  const getSearchResults = React.useCallback(async (query: string) => {
    const searchApi = getURLWithEndpoint("search");
    axios
      .get(`${searchApi}?search=${query}`)
      .then(({ data }) => setSearchResults(data));
  }, []);

  const debouncedSearch = React.useCallback(
    debounce(getSearchResults, 500),
    []
  );

  useEffect(() => {
    if (searchQuery.length === 0) return;
    debouncedSearch(searchQuery);
  }, [searchQuery]);

  const getSearchResultsMarkup = () => {
    if (!isModalVisible) return [];

    if (searchResults.length === 0) {
      return <Flex> No Data Found</Flex>;
    }

    return searchResults.map((result) => {
      return <SearchResultCard post={result} />;
    });
  };

  return (
    <>
      <Flex
        className="search__box"
        sx={{
          maxHeight: isModalVisible ? "40rem" : "4rem",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: [0, 0, 0, 0],
          paddingRight: [0, 0, "12.5px"],
          position: "relative",
          height: "4rem",
          width: "100%",
        }}
        ref={(el) => (searchBox = el)}
      >
        <Flex
          className="search__results"
          sx={{
            position: isModalVisible ? "absolute" : "relative",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "inherit",
            width: "100%",
            zIndex: 998,
          }}
        >
          <Input
            className="search__input"
            name="search"
            type="text"
            placeholder="Start Searching for recipes here"
            value={searchQuery}
            ref={(el) => (inputEl = el)}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => openSearchWidget()}
            onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
              openSearchWidget();
            }}
          
            sx={{
              maxWidth: "100%",
              paddingRight: 1,
              transition: "all 0.2s ease-out ",
            }}
            autoFocus={true}
          />
          {getSearchResultsMarkup()}
        </Flex>
      </Flex>

      <SearchWidget visible={isModalVisible} onClose={() => null} />
    </>
  );
};

export default SearchBox;
