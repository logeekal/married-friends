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

module.exports = {
  log,
  array2Obj,
};
