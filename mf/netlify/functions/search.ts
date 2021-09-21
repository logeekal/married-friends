import { Handler } from "@netlify/functions";

const recipeIndex = require("./assets/recipeIndex.json");

const recipes = require("./assets/recipes.json");

import * as lunr from "lunr";

const handler: Handler = async (event, context) => {
  try {
    if (event.httpMethod === "GET") {

      const query = event.queryStringParameters;
      console.log(query)

      if (!('search' in query)){
        return {
          statusCode : 400,
          body: "search term missing"
        }
      }

      const searchQuery = query['search']
      const idx: lunr.Index = lunr.Index.load(recipeIndex);
      
      const results: lunr.Index.Result[] = idx.search(searchQuery)

      //const informativeResults = results.slice(0,5).map((searchResult) => {

      //const terms = Object.keys(searchResult.matchData.metadata)
      //for (let term of terms){

        //const fieldMatchesForTerm
      //}

        //return {
          //...searchResult,
          //"matchData": {
            //...searchResult.matchData,
            //"metadata": {

            //}
          //}
        
        //}

      //})
      return {
        statusCode: 200,
        body: JSON.stringify(results)
      }

    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: err,
    };
  }
};

export {handler }
