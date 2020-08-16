/** @jsx jsx */
import React from "react";
import { jsx } from "theme-ui";
import Card from "../../components/Card";

interface InstagramImageProps {
  id: string;
  likes: string;
  src: string;
}

interface InstagramProps {
  data: InstagramImageProps[];
}

const InstagramFooter: React.FC<{}> = ({}) => {
  return (
    <div className="instagram__footer">
      <a target="_blank">Export More</a>
    </div>
  );
};

const Instagram: React.FC<InstagramProps> = ({ data }) => {
  return (
    <Card
      className="card___instagram"
      heading="insta life"
      footer={<InstagramFooter />}
    >
      <div
        className="instagram__image-container"
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "270px",
        }}
      >
        {data.map((image, index) => {
          return (
            <img
              className={`instagram__image-${index}`}
              key={image.id}
              src={image.src}
              width="90"
              height="90"
            />
          );
        })}
      </div>
    </Card>
  );
};

const dummyImageArray: any = new Array(9).fill(10).map((node, index) => {
  return {
    id: index,
    likes: 54,
    src: `https://picsum.photos/seed/${index}/90`
  };
});
console.log(dummyImageArray);

Instagram.defaultProps = {
  data: dummyImageArray
};

export default Instagram;
