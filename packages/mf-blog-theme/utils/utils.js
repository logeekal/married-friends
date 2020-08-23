const { URL_MATCHER } = require("../config");

function log(msg) {
  console.log("*******************************");
  console.log(`************ ${msg} ***********`);
  console.log("*******************************");
}

function array2Obj(arr, keyAttr) {
  let obj = {};
  for (let item of arr) {
    obj[item[keyAttr]] = item;
  }

  return obj;
}

function cleanContentURLS(content) {
  return content.replace(/((http(s)?):\/\/)?marriedfriends.in\/blog/g, "");
}

module.exports = {
  log,
  array2Obj,
  cleanContentURLS,
};
