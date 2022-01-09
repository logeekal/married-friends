/* @jsx jsx */

import React, { useState } from "react";
import { Box, Divider, Flex, Heading, jsx, Text } from "theme-ui";
import { IFAQObj } from "../../utils/types";
import { log } from "../utils";

interface FAQProps {
  faqs: IFAQObj;
  faqIds: number[];
}

const FAQ: React.FC<FAQProps> = ({ faqs, faqIds }) => {
  // stores the indices of expanded QnAs
  log({ faqs, faqIds });
  const [expandedIdx, setExpandedIdx] = useState(
    new Array(faqIds.length).fill(false)
  );

  const isExpanded = (idx: number) => {
    return expandedIdx[idx];
  };

  const toggleExpansion = (idx: number) => {
    let newArray = [...expandedIdx];
    newArray[idx] = !newArray[idx];
    setExpandedIdx(newArray);
  };

  return (
    <Box
      itemScope
      itemType="https://schema.org/FAQPage"
      sx={{
        width: "100%",
        backgroundColor: "accentSecondary",
        color: "bgCard",
        paddingY: [1, 2, 2],
        paddingLeft: [3, 4, 4],
        paddingRight: [3, 4, 4],
        position: "relative",
      }}
    >
      <Box
        className="qna__artwork"
        sx={{
          position: "absolute",
          left: "0px",
          top: ["34px", "34px", "34px"],
          width: ["60px", "100px", "100px"],
          zIndex: "1",
        }}
      >
        <img
          src="/fork_white.png"
          alt="frequently asked questions"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "unset",
          }}
        />
      </Box>

      <p
        sx={{
          fontFamily: "cursive",
          fontSize: 3,
          margin: "0px",
          marginBottom: [1, 1, 2],
        }}
      >
        FAQs
      </p>

      <Flex
        sx={{
          flexDirection: "column",
          width: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {faqIds.map((faqId, index) => {
          log(`Issue with faqid ${faqId} : ${faqId in faqs}`);
          return (
            <div
              className={`qna_container ${isExpanded(index) ? "expanded" : ""}`}
              key={index}
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
              sx={{
                ".qna__answer": {
                  maxHeight: "0px",
                  overflow: "hidden",
                  transition: "0.4s ease-in-out",
                },
                "&.expanded": {
                  ".qna__answer": {
                    maxHeight: "500px",
                  },
                },
              }}
            >
              <Flex
                onClick={() => toggleExpansion(index)}
                sx={{
                  fontWeight: 600,
                  justifyContent: "space-between",
                  cursor: "pointer",
                  gap: 0,
                }}
              >
                <div className="qna__question" itemProp="name">
                  {faqs[faqId].title.rendered}
                </div>
                <div
                  className="qna_expander"
                  sx={{
                    textAlign: "center",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  +
                </div>
              </Flex>
              <div
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <div
                  className="qna__answer"
                  itemProp="text"
                  dangerouslySetInnerHTML={{
                    __html: faqs[faqId].content.rendered,
                  }}
                  sx={{
                    fontWeight: 200,
                    marginTop: "0px",
                    marginBottom: "0px",
                    a: {
                      color: "bgPrimary",
                      textDecoration: "underline",
                    },
                    "p:first-child": {
                      marginBottom: "0px",
                      marginTop: [0, 1, 1],
                    },
                  }}
                />
              </div>
              <Divider
                sx={{
                  bg: "bgCard",
                  height: "1.5px",
                  padding: "0px",
                  margin: "0px",
                  width: "100%",
                  marginY: [0, 1, 1],
                }}
              />
            </div>
          );
        })}
      </Flex>
    </Box>
  );
};

export default FAQ;
