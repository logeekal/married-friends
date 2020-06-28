/* @jsx jsx */

import { jsx } from "theme-ui";
import React from "react";
import Facebook from "../../assets/facebook.svg";
import Youtube from "../../assets/youtube.svg";

import Mail from "../../assets/mail.svg";
import Twitter from "../../assets/twitter.svg";
import Search from "../../assets/search.svg";
import Menu from "../../assets/menu.svg";
import Share from "../../assets/share.svg";

export const ICON_COMPONENTS = {
  facebook: <Facebook />,
  twitter: <Twitter />,
  youtube: <Youtube />,
  youtube_filled: <Youtube sx={{ fill: "accent" }} />,
  mail: <Mail />,
  search: <Search />,
  menu: <Menu />,
  share: <Share />
};
