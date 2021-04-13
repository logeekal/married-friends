/* @jsx jsx */

import { jsx, Input } from "theme-ui";
import React, { FC } from "react";
import { FLEX_CONFIG } from "../utils/style";
import { SxStyleProp } from "theme-ui";
import { ICON_COMPONENTS } from "../utils/config";
import MenuIcon from "./MenuIcon";
import SearchResults from "./SearchResults";
import useKeyCode from "../hooks/useKeyCode";

export interface SearchPageProps {
  size: number;
  color: string;
}

const SearchPage: FC<SearchPageProps> = props => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const keyPressed = useKeyCode(isSearchOpen);
  const searchRef = React.createRef<HTMLInputElement>(null);

  React.useEffect(() => {
    console.log("Key pressed", keyPressed);
    if (keyPressed.toLowerCase() === "escape") {
      toggleSearch();
    }
  }, [keyPressed]);

  const toggleSearch = () => {
    if (!isSearchOpen) {
      setSearchQuery("");
    }
    setIsSearchOpen(!isSearchOpen);
  };

  React.useEffect(() => {
    if (isSearchOpen) {
      searchRef.current.focus();
    }
  }, [isSearchOpen]);

  return (
    <React.Fragment>
      {isSearchOpen ? (
        <span
          className="search-close-icon"
          sx={
            {
              zIndex: 1002,
              "@media only screen and (max-width: 700px)": {
                transform: "translateX(1rem)"
              }
            } as SxStyleProp
          }
          onClick={toggleSearch}
        >
          <MenuIcon
            isOpen={true}
            width={props.size}
            strokeColor={props.color}
            alternateColor={"accent"}
          />
        </span>
      ) : (
        <span
          className="search-icon"
          onClick={toggleSearch}
          sx={{
            svg: {
              width: props.size + "px",
              height: props.size + "px",
              fill: props.color,
              "&:hover": {
                cursor: "pointer",
                fill: "accent"
              }
            }
          }}
        >
          {ICON_COMPONENTS({ size: props.size, color: props.color })["search"]}
        </span>
      )}
      <div
        className={`search-container ${isSearchOpen ? "open" : ""}`}
        onKeyDown={() => console.log("Key Pressed")}
        sx={
          {
            position: "fixed",
            display: "block",
            top: "0px",
            right: "0px",
            backgroundColor: "bgPrimary",
            paddingY: 3,
            zIndex: 1001,
            width: "100vw",
            height: "100%",
            ...FLEX_CONFIG("flex", "column", "center", "flex-start"),
            clipPath: "circle(0px at 100% 0 )",
            transition: "all 0.5s ease-out",
            overflow: "scroll",
            ".search-container": {
              width: "70%",
              ".search-input": {
                opacity: 0,
                transform: "translateY(-10px)",
                transition:
                  "opacity 0.4s ease-out 0.4s, transform 0.4s ease-out 0.4s"
              }
            },

            "&.open": {
              clipPath: "circle(4000px at 100% 0)",
              ".search-input": {
                opacity: 1,
                transform: "translateY(0)"
              }
            }
          } as SxStyleProp
        }
      >
        <div className="search-container">
          <div className="search-input">
            <Input
              ref={searchRef}
              variant="forms.input.accented"
              value={searchQuery}
              placeholder="Search"
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          <SearchResults searchQuery={searchQuery} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchPage;
