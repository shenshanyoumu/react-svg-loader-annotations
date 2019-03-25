// 将CSS字符串，基于";"分割后，组装为对象属性
export default function cssToObj(css: string) {
  let o = {};
  if (typeof css !== "undefined") {
    let elements = css.split(";");
    elements
      .filter(el => !!el)
      .map(el => {
        let s = el.split(":"),
          key = s.shift().trim(),
          value = s.join(":").trim();
        o[key] = value;
      });
  }
  return o;
}
