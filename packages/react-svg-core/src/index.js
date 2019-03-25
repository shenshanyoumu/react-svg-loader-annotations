// SVGO表示svg optimization，用于优化SVG文件；各种SVG编辑器导出的文件
// 存在大量冗余信息，包含编辑器元数据、注释、隐藏的元素等
import Svgo from "svgo";
import { transformSync as babelTransform } from "@babel/core";
import plugin from "babel-plugin-react-svg";

import { validateAndFix } from "./svgo";

// SVGO Optimize
export function optimize(opts: any = {}): string => Promise<string> {
  validateAndFix(opts);

  // svgo模块来集成各种remove*插件
  const svgo = new Svgo(opts);

  // 对svg文件的优化处理
  return (content: string) => svgo.optimize(content).then(data => data.data);
}

// Babel转换函数
export function transform({
  jsx = false
}: { jsx: boolean } = {}): string => string {
  return content =>
    babelTransform(content, {
      babelrc: false,
      presets: [jsx ? void 0 : "@babel/preset-react"].filter(Boolean),
      plugins: [require.resolve("@babel/plugin-syntax-jsx"), plugin]
    });
}
