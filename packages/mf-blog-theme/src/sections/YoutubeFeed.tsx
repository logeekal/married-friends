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
        flexWrap: "wrap",
        width: "100%",
        '@media (min-width: "640px")': {
          iframe: {
            margin: "15px",
            flexGrow: 1,
            width: "100%",
            maxWidth: "400px"
          }
        }
      }}
    >
      {videos.map(vid => {
        return (
          <div>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/cVDASbWZ_KI"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
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
