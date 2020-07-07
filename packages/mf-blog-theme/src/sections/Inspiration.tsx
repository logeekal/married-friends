import React, { FC } from "react";
import Card from "../components/Card";
import { Styled } from "theme-ui";
import {quotes} from '../dummy_data/quotes.data' 


export interface InspirationProps {}

const Inspiration: FC<InspirationProps> = props => {
  
  const [random, setRandom] = React.useState(Math.floor(Math.random() * quotes.length ))

  React.useEffect(()=>{

    let timer = setTimeout(()=>{setRandom(Math.floor(Math.random() * quotes.length))}, 6*3600*1000)

    function cleanup(){      
      clearTimeout(timer)
    }

    return cleanup
  },[random])

  return ( <Card
      heading={"inspiration"}
    footer={<Styled.a style={{textTransform:"none" }}>{quotes[random].author}</Styled.a>}
    >
      {quotes[random].quote}
    </Card>
  );
};

export default Inspiration;
