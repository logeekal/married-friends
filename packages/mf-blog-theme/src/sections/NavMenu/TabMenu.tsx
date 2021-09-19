/** @jsx jsx */

import { jsx } from "theme-ui";
import Tabs, { TabPane } from "rc-tabs";
import CircularPhoto from "../../components/CirclePhoto";
import { useScroll } from '../../hooks/useScroll'

export default function TabMenu() {
 
  const x = useScroll()

  const getCategories = (index) => {
    let arr = new Array(10).fill(1).map((item, index) => {
      return {
        img: `https://picsum.photos/seed/${1000 * index}/50/50`,
        alt: `${item} - ${index}`,
      };
    });

    return arr;
  };

  return (
    <Tabs prefixCls="mf-tabs">
      <TabPane tab="first" key="first">
        <div
          sx={{
            display: "flex",
            gap: 1,
            overflow: "auto",
            scrollbarWidth: "none"

          }}
        >

        {getCategories(1).map((item) => {
          return <CircularPhoto src={item.img} alt={item.alt} />;
        })}
        </div>
      </TabPane>
      <TabPane tab="second" key="second">
        2nd
      </TabPane>
    </Tabs>
  );
}
