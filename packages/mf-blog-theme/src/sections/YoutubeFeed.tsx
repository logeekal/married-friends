/* @jsx jsx */

import React, { useState, useEffect } from "react";
import { jsx, useThemeUI } from "theme-ui";
import useWindowDims from "../hooks/useWindowDims";

export interface YoutubeFeedProps {
  videos: Array<{
    title: string;
    thumbnail: string;
  }>;
}

const YoutubeFeed: FC<YoutubeFeedProps> = ({ videos }) => {
  console.log(useThemeUI());

  const { width, height } = useWindowDims();

  let effectiveWidth = width - 120 - 60;
  let margins = 15;

  // setting video dimension for 1920 width
  //
  const getFinalWidth = () => (effectiveWidth - margins) / videos.length;
  const [vidWidth, setVidWidth] = useState(getFinalWidth());
  const [vidHeight, setVidHeight] = useState(getFinalWidth());

  console.log({ vidWidth });
  useEffect(() => {
    setVidWidth(getFinalWidth());
    setVidHeight((9 * getFinalWidth()) / 16);
  }, [width]);

  return (
    <div
      className="youtube-feed__container"
      sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 1,
        "@media only screen and (max-width: 650px)": {
          ".video-wrapper": {
            flex: "100%"
          }
        },
        "@media only screen and (min-width: 650px)": {
          ".video-wrapper": {
            flex: "20%"
          }
        },

        ".video-wrapper": {
          width: "100%",
          display: "inline-flex",
          //border: "3px solid red",
          margin: 1,
          ".video": {
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            iframe: {
              position: "absolute",
              top:"0px",
              left:"0px",
              width: "100%",
              height: "100%"
            }
          }
        }
      }}
    >
      {videos.map((vid, index) => {
        return (
          <div key={index} className="video-wrapper">
            <div className="video">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/cVDASbWZ_KI"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="true"
              ></iframe>
            </div>
          </div>
        );
      })}
    </div>
  );
};

let sampleVideos: any = new Array(3).fill(0).map((vid, index) => ({
  title: `title-${index + 1}`,
  thumbnail: `https://picsum.photos/seed/${index}photo/280/157`
}));

YoutubeFeed.defaultProps = { videos: sampleVideos };

export default YoutubeFeed;
