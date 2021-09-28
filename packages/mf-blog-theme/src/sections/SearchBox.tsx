/** @jsx jsx */

import React, { KeyboardEvent, useEffect, useState } from "react";
import { jsx, SxStyleProp, Link, Box, Field, Input, Flex } from "theme-ui";
import useKeyCode from "../hooks/useKeyCode";
import useWindowClicks from "../hooks/useWindowClicks";
import SearchWidget from "./SearchWidget";
import { getURLWithEndpoint } from "../utils";
import axios from "axios";

const SearchBox: React.FC<{}> = (_) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  let searchBox = null;
  let inputEl = null;

  const clickTarget = useWindowClicks();

  const { key, ctrl } = useKeyCode(true);

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
    if (ctrl && key == "k") {
      openSearchWidget();
    }
    if (key.toLowerCase() == "escape") setIsModalVisible(false);
  }, [key, ctrl]);

  const openSearchWidget = () => {
    setIsModalVisible(true);
    if (inputEl) {
      (inputEl as HTMLInputElement).focus();
    }
  };

  useEffect(() => {
    if (searchQuery.length === 0) return;
    const searchAPI = getURLWithEndpoint("search");
    axios
      .get(`${searchAPI}?search=${searchQuery}`)
      .then((res) => console.log(res));
  }, [searchQuery]);

  return (
    <>
      <Flex
        className="search__box"
        sx={{
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
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
        </Flex>
      </Flex>

      <SearchWidget visible={isModalVisible} onClose={() => null} />
    </>
  );
};

export default SearchBox;
