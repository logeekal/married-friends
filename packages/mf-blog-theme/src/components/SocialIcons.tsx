/* @jsx jsx */

import React, { FC, MouseEvent } from "react";
import { FLEX_CONFIG } from "../utils/style";
import { SxStyleProp, jsx } from "theme-ui";
import { ICON_COMPONENTS } from "../utils/config";

export interface SocialProps {
  type: string;
  name: string;
  target: string;
}

export interface SocialIconsProps {
  socialProfiles: Array<SocialProps>;
  includeSearch: boolean;
}

const SocialIcons: FC<SocialIconsProps> = ({
  socialProfiles,
  includeSearch
}) => {
  const [visibleIconLabelIndex, setVisibleIconLabelIndex] = React.useState(-1);

  let toggleFocus: {
    (e: React.SyntheticEvent<HTMLDivElement>, index: number): void;
  } = (e, index) => {
    console.log(e, index);
    e.stopPropagation();
    if (["blur", "mouseleave"].includes(e.type)) {
      setVisibleIconLabelIndex(-1);
    } else {
      console.log(`Setting up index  to ${index}`);
      setVisibleIconLabelIndex(index);
    }
  };

  let search: SocialProps = {
    type: "search",
    name: "Search",
    target: "abc"
  };
  if (
    includeSearch &&
    socialProfiles.findIndex(profile => profile.type === "search") === -1
  ) {
    socialProfiles.push(search);
  }
  return (
    <div
      className="social-icons__container"
      sx={
        {
          ...FLEX_CONFIG("inline-flex"),
          fontFamily: "special",
          ".icon-saperator": {
            fontSize: 2,
            color: "accent"
          },
          ".social-icon__container": {
            ...FLEX_CONFIG(),
            cursor: "pointer",
            ".social-icon__label": {
              opacity: 0,
              width: 0,
              marginInlineEnd: "5px",
              transition: "all 1s ease-out",
              "&.visible": {
                opacity: 1,
                width: "auto"
              }
            },
            ".social-icon": {
              paddingInline: "2px",
              height: "100%",
              transition: "0.2s easeOut",
              "svg.icon": {
                width: "24px",
                height: "24px"
              }
            }
          }
        } as SxStyleProp
      }
    >
      {socialProfiles.map((socialProfile, index) => {
        {
          /*
           *let DynamicComponent = React.lazy(() =>
           *  import(`../../assets/${socialProfile.type}.svg`)
           *);
           */
        }
        let toggleFocusMod = e => toggleFocus(e, index);
        return (
          <React.Fragment>
            {index > 0 && <div className="icon-saperator">/</div>}
            <div className="social-icon__container">
              <div
                className={`social-icon__label ${
                  index === visibleIconLabelIndex ? "visible" : ""
                }`}
              >
                {socialProfile.name}
              </div>
              <div
                className="social-icon"
                onMouseEnter={toggleFocusMod}
                onMouseLeave={toggleFocusMod}
                onFocus={toggleFocusMod}
                onBlur={toggleFocusMod}
              >
                {ICON_COMPONENTS[socialProfile.type]}
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

SocialIcons.defaultProps = {
  includeSearch: true,
  socialProfiles: [
    {
      name: "Mail",
      type: "mail",
      target: "https://www.facebook.com/marriedfriendss/"
    },
    {
      name: "Youtube",
      type: "youtube",
      target: "https://www.facebook.com/marriedfriendss/"
    }
  ]
};

export default SocialIcons;
