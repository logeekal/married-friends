import React, { FC } from "react";
import CategoryCountItem, {
  CategoryCountItemProps
} from "../components/CategoryCountItem";
import Card from "../components/Card";
import faker from "faker";
import { FLEX_CONFIG } from "../utils/style";
import { SxStyleProp, Link } from "theme-ui";
import { Category } from "../types/wp-graphql.types";

export interface CategoryCardProps {
  categories: Array<Category>;
}

const CategoryCard: FC<CategoryCardProps> = ({ categories }) => {
  return (
    <Card
      className="card-category"
      heading="Categories"
      footer={<span>Explore More </span>}
      cardStyle={{
        columnCount: 2,
        paddingLeft: 1,
        paddingRight: 1
      }}
      contentStyle={
        {
          ...FLEX_CONFIG("flex", "row"),
          columnCount: 2,
          flexWrap: "wrap"
        } as SxStyleProp
      }
    >
      {categories.map((category, index) => {
        console.log(`Category - ${index} - ${category.name} `);
        return (
          <CategoryCountItem
            key={index}
            name={category.name}
            count={category.count || 5}
            link={category.slug}
            sx={{
              flex: "1 1 40%",
              "&:hover": {
                cursor: "pointer"
              }
            }}
          />
        );
      })}
    </Card>
  );
};

let categories: Array<CategoryCountItemProps> = new Array(6).fill(0).map(() => {
  return {
    name: faker.name.firstName(),
    count: Math.floor(Math.random() * 100000) % 11
  };
});

CategoryCard.defaultProps = {
  categories
};

export default CategoryCard;
