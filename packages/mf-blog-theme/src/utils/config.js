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

import {
  TiSocialFacebookCircular,
  TiSocialTwitter,
  TiSocialYoutubeCircular,
  TiMail,
  TiZoom,
} from "react-icons/ti";

import { RiMessengerLine } from "react-icons/ri";
import { MdMenu } from "react-icons/md";
import {FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare} from "react-icons/fa";

/*
 *export const ICON_COMPONENTS = {
 *  facebook: <Facebook />,
 *  twitter: <Twitter />,
 *  youtube: <Youtube />,
 *  youtube_filled: <Youtube sx={{ fill: "accent" }} />,
 *  mail: <Mail />,
 *  search: <Search />,
 *  menu: <Menu />,
 *  share: <Share />
 *}
 */

export const ICON_COMPONENTS = (iconProps) => ({
  facebook: <FaFacebookSquare {...iconProps} />,
  twitter: <FaTwitterSquare {...iconProps} />,
  youtube: <FaYoutubeSquare {...iconProps} />,
  mail: <TiMail {...iconProps} />,
  search: <TiZoom {...iconProps} />,
  menu: <MdMenu {...iconProps} />,
  messenger: <RiMessengerLine {...iconProps} />,
  share: <Share {...iconProps} />,
});
