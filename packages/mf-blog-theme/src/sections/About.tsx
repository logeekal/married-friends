/* @jsx jsx */

import React, { FC } from "react";
import Card from "../components/Card";
import { jsx } from "theme-ui";
import { Link } from '@theme-ui/components'
import  { Link as GatsbyLink} from 'gatsby'

import { alpha } from "@theme-ui/color";

const AboutFooter: React.FC<{}> = props => {
  return (
    <div
      className="about__footer"
      sx={{
        color: "secondary",
        width: "100%",
        marginTop: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "bgAccent",
        paddingX: 1,
        paddingY: 1
      }}
    >
      <Link as={GatsbyLink} to="#" sx={{color: 'secondary'}}>Read More</Link>
      <span>icons </span>
    </div>
  );
};

export interface AboutProps {}

const About: FC<AboutProps> = props => {
  return (
    <Card
      className="about__card"
      heading={"about"}
      footer={<AboutFooter />}
      cardStyle={{ paddingInline: "0px" }}
      footerStyle={{ paddingBlock: "0px"}}
    >
      <div className="about__container" sx={{ width: "100%" }}>
        <div
          className="about__photo"
          sx={{
            background: t => `linear-gradient(
              to bottom,
              ${alpha("bgCard", 1)(t)} 50%,  ${alpha("bgAccent", 1)(t)} 50%
            )`
          }}
          style={{
            width: "100%",
            display: "flex",
            justifyItems: "center",
            alignItems: "center"
          }}
        >
          <img
            src="https://picsum.photos/seed/photo/320/180"
            width="270px"
            height="auto"
            sx={{ display: "block", margin: "auto" }}
          />
        </div>
        <div
          className="about__desc"
          sx={{
            backgroundColor: "bgAccent",
            padding: "30px",
            textAlign: "center"
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type....
        </div>
      </div>
    </Card>
  );
};

export default About;
