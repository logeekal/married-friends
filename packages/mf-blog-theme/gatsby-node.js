'use strict';

require('source-map-support').install();
try{

require('ts-node').register();
}catch(err){
  console.error(err)
}


module.exports= require('./gatsby-node.ts');
