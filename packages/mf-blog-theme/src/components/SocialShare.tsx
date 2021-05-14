/* @jsx jsx */

import { Box, jsx } from "theme-ui";
import React, { FC, useEffect, useState } from "react";

import { usePopper } from "react-popper";

import { MdShare } from "react-icons/md";
import {
  FaFacebookSquare,
  FaFacebookMessenger,
  FaWhatsappSquare,
  FaTwitterSquare,
  FaCopy,
} from "react-icons/fa";
import { genCompleteURL } from "../utils";
import Copy from "copy-to-clipboard";
import useWindowClick from "../hooks/useWindowClicks";

const SocialShare: React.FC<{}> = () => {
  const clickTarget: Element = useWindowClick();

  useEffect(() => {
    //console.log(clickTarget)
    //console.log('social -share - ', clickTarget.closest("#social-share"))
    //console.log('social -share - ', clickTarget.closest("#tooltip"))
    if (!clickTarget) return;
    if (
      !clickTarget.closest("#tooltip") &&
      !clickTarget.closest("#social-share")
    ) {
      setIsShareDialogVisible(false);
    }
  }, [clickTarget]);

  const [isShareDialogVisible, setIsShareDialogVisible] = useState(false);

  const [shareButtonEl, setShareButtonEl] = useState(null);
  const [popperEl, setPopperEl] = useState(null);
  const [arrowEl, setArrowEl] = useState(null);

  const [copiedMessage, setCopiedMessage] = useState("Copy link")

  const { styles, attributes, update } = usePopper(shareButtonEl, popperEl, {
    modifiers: [
      { name: "arrow", options: { element: arrowEl } },
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
    ],
  });


  const onCopy = (text: string) => {
    Copy(text)
    setCopiedMessage('Copied...')

    setTimeout(()=> {
      setCopiedMessage("Copy link")
    },4000)
  }


  const handleShare = async () => {
    if (typeof window === "undefined") {
      return;
    }

    if (
      navigator.share &&
      navigator.userAgent.toLowerCase().match(/mobile/i) &&
      !navigator.userAgent.toLowerCase().match(/windows/i)
    ) {
      // navigator share is enabled.
      navigator
        .share({
          title: window.document.title,
          text: window.document.title,
          url: window.location.href,
        })
        .then(() => console.log("Shared successfully."))
        .catch((err) => console.error(err));
    } else {
      console.log("native sharing not available, using in build option");
      setIsShareDialogVisible(!isShareDialogVisible);
      await update();
    }
  };

  console.log({
    styles,
    attributes,
    isShareDialogVisible,
  });

  const fbLink = `https://facebook.com/sharer/sharer.php?u=${encodeURI(
    "https://marriedfriends.in"
  )}`;
  const tweetLink = genCompleteURL("https://twitter.com/intent/tweet", {
    hashtags: "kithcenofmarriedfriends,marriedfriends",
    original_referer: "https://marriedfriends.in",
    text: window.document.title,
    url:
      process.env.NODE_ENV === "development"
        ? "https://marriedfriends.in"
        : window.location.href,
    via: "marriedfriendss",
  });

  const whatsappLink = `whatsapp://send?Enjoy ${window.document.title} from the kitchen of married friends. \n\n Read complete recipe:${window.location.href} `;

  return (
    <>
      <Box
        id="social-share"
        sx={{
          cursor: "pointer",
        }}
        ref={setShareButtonEl}
      >
        <MdShare onClick={handleShare} />
      </Box>
      <Box
        id="tooltip"
        className="tooltip"
        ref={setPopperEl}
        style={{
          ...styles.popper,
          display: isShareDialogVisible ? "block" : "none",
        }}
        onClick={(event) => {
          console.log(event);
        }}
        sx={{
          bg: "bgCard",
          zIndex: 1000,
          boxShadow: "2px 2px 20px 2px rgba(0,0,0,0.2)",
          border: "0px solid black",
          borderRadius: "5px",
          paddingX: [1, 1, 2],
          paddingY: [0, 0, 1],
          "&[data-popper-placement^='top'] > #arrow": {
            bottom: "-4px",
          },
          "&[data-popper-placement^='bottom'] > #arrow": {
            top: "-4px",
          },
          "&[data-popper-placement^='left'] > #arrow": {
            right: "-4px",
          },
          "&[data-popper-placement^='right'] > #arrow": {
            left: "-4px",
          },
        }}
        {...attributes.popper}
      >
        <ul
          sx={{
            listStyleType: "none",
            padding: "0px",
            li: {
              marginBottom: 1,
              padding: "0px",
              "&:hover": {
                color: "primary",
              },
              "a,div": {
                color: "secondary",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  color: "primary",
                },
              },
              div: {
                cursor: "pointer",
              },
              "a > svg": {
                width: "20px",
                height: "20px",
                marginRight: "5px",
              },
              "div > svg": {
                width: "20px",
                height: "20px",
                marginRight: "5px",
              },
            },
          }}
        >
          <li>
            <a
              href={fbLink}
              target="popup"
              onClick={() =>
                window.open(fbLink, "popup", "width=600,height=600")
              }
            >
              <FaFacebookSquare /> Facebook
            </a>
          </li>
          <li>
            <a
              href={tweetLink}
              target="popup"
              onClick={() =>
                window.open(tweetLink, "popup", "width=600,height=600")
              }
            >
              <FaTwitterSquare /> Twitter
            </a>
          </li>
          <li>
            <a href={whatsappLink} target="_blank">
              <FaWhatsappSquare /> Whatsapp
            </a>
          </li>
          <li>
            <div onClick={() => onCopy(window.location.href)}>
              <FaCopy /> {copiedMessage}
            </div>
          </li>
        </ul>
        <Box
          id="arrow"
          className="arrow"
          ref={setArrowEl}
          style={styles.arrow}
          {...attributes.arrow}
          sx={{
            bg: "black",
            visibility: "hidden",
            position: "absolute",
            width: "8px",
            height: "8px",
            background: "inherit",
            "::after": {
              position: "absolute",
              width: "8px",
              height: "8px",
              background: "inherit",
              boxShadow: "2px 2px 20px 2px rgba(0,0,0,0.2)",
              border: "0px solid black",
              visibility: "visible",
              zIndex:999,
              content: '""',
              transform: "rotate(45deg)",
            },
          }}
        />
      </Box>
    </>
  );
};

export default SocialShare;
