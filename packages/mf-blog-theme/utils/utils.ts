export function log(msg: string) {
  console.log("*******************************");
  console.log(`************ ${msg} ***********`);
  console.log("*******************************");
}

export function array2Obj(arr: Array<Record<string, string>>, keyAttr: string) {
  let obj = {} as any;
  for (let item of arr) {
    obj[item[keyAttr]] = item;
  }

  return obj;
}

export function cleanContentURLS(content: string) {
  if(!content) return;
  return content.replace(/((http(s)?):\/\/)?marriedfriends.in\/blog/g, "");
}

/*
 *function writeToPublic(content, name) {
 *  fs.writeFileSync(`public/${name}`, content, "utf-8");
 *}
 */


