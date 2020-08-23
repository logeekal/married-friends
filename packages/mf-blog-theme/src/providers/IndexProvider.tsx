import React from "react";
import { Post } from "../types/wp-graphql.types";
import useWindow from "../hooks/useWindow";


interface PostObj {
  [k:string]: Post
}
export const SearchIndexContext = React.createContext<PostObj>({});

type DataProviderProps = React.PropsWithChildren<{}>;

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const[hasWindow] = useWindow();
  const [posts, setPosts] = React.useState<PostObj>();

  React.useEffect(() => {
    console.log(`Fetching Posts`);
    fetch("/posts.json")
      .then(res => res.json())
      .then(postObj => {
        console.log(`Fetching posts`, postObj);
        setPosts(postObj)
      });
  },[hasWindow]);
  return (
    <SearchIndexContext.Provider value={posts}>
      {children}
    </SearchIndexContext.Provider>
  );
};

export default DataProvider;
