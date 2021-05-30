/* @jsx jsx */

import { graphql, useStaticQuery } from "gatsby";
import React, { useState, useEffect, FC } from "react";
import { jsx, useThemeUI } from "theme-ui";
import useWindowDims from "../hooks/useWindowDims";

export interface YoutubeFeedProps {
  videos: Array<{
    title: string;
    thumbnail: string;
  }>;
}

const YoutubeFeed: FC<YoutubeFeedProps> = ({ videos }) => {
  const data = useStaticQuery(graphql`
    query GET_YT_FEED {
      allYoutubeVideo(filter: {title: {regex: "/^((?!#shorts).)*$/"}}) {
        edges {
          node {
            id
            title
            description
            videoId
            publishedAt
            privacyStatus
            channelTitle
          }
        }
      }
    }
  `);

  

  const { width, height } = useWindowDims();

  let effectiveWidth = width - 120 - 60;
  let margins = 15;

  // setting video dimension for 1920 width
  //
  const getFinalWidth = () => (effectiveWidth - margins) / videos.length;
  const [vidWidth, setVidWidth] = useState(getFinalWidth());
  const [vidHeight, setVidHeight] = useState(getFinalWidth());

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
            flex: "100%",
          },
        },
        "@media only screen and (min-width: 650px)": {
          ".video-wrapper": {
            flex: "20%",
          },
        },

        ".video-wrapper": {
          width: "100%",
          display: "inline-flex",
          //border: "3px solid red",
          margin: 1,
          ".video": {
            position: "relative",
            width: "100%",
            iframe: {
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
            },
          },
        },
      }}
    >
      {data.allYoutubeVideo.edges.slice(0,3).map((vid, index) => {
        const currentVideo = vid.node;
        return (
          <div key={index} className="video-wrapper">
            <div className="video">
              <lite-youtube videoid={currentVideo.videoId} videotitle={currentVideo.title} title={currentVideo.title}></lite-youtube>
            </div>
          </div>
        );
      })}
    </div>
  );
};

let sampleVideos: any = new Array(3).fill(0).map((vid, index) => ({
  title: `title-${index + 1}`,
  thumbnail: `https://picsum.photos/seed/${index}photo/280/157`,
}));

YoutubeFeed.defaultProps = { videos: sampleVideos };

export default YoutubeFeed;
