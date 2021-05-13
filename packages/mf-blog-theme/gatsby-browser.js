import DataProvider from "./src/providers/IndexProvider";
import React from "react";
import lunr from "lunr";
import { log } from "./utils/utils";

export const onClientEntry = () => {
  window.__LUNR__ = window.__LUNR__ || {};

  //log("Fetching index");

  //window.__LUNR__.loaded = false;

  //fetch(`${__PATH_PREFIX__}/post_index.json`)
    //.then((res) => res.json())
    //.then((index) => {
      //window.__LUNR__.index = lunr.Index.load(index);
      //window.__LUNR__.loaded = true;
    //})
    //.catch((err) => {
      //console.log(`failed to fetch index : `);
      //throw err;
    //});
};

export const wrapRootElement = ({ element }) => {
  return <DataProvider className="data-provider">{element}</DataProvider>;
};
