// 判断是否为普通对象
import isPlainObject from "lodash.isplainobject";

// 用于提出的SVG 文档说明、注释和样式元素等删除
const essentialPlugins = [
  "removeDoctype",
  "removeComments",
  "removeStyleElement"
];

export function validateAndFix(opts: any = {}) {
  if (!isPlainObject(opts))
    throw new Error("Expected options.svgo to be Object.");

    // react-svg-loader的options字段，配置plugins属性
  if (opts.plugins === void 0){opts.plugins = [];} 

  if (!Array.isArray(opts.plugins))
    throw new Error("Expected options.svgo.plugins to be an array");

  if (opts.plugins.length === 0) {
    opts.plugins = [...essentialPlugins].map(p => ({ [p]: true }));
  }

  // 将所有基础插件禁止掉
  const state = new Map();
  for (const p of essentialPlugins) {
    state.set(p, false);
  }

  // parse through input plugins and mark enabled ones
  for (const plugin of opts.plugins) {
    if (isPlainObject(plugin)) {
      for (const pluginName of Object.keys(plugin)) {
        if (essentialPlugins.indexOf(pluginName) > -1) {
         
          // 根据配置开启某些基础插件能力
          plugin[pluginName] = true;
          state.set(pluginName, true);
        }
      }
    } else if (typeof plugin === "string") {
      state.set(plugin, true);
    } else {
      throw new TypeError(
        "Expected SVGO plugin to be of type String or Object. Got " +
          typeof plugin
      );
    }
  }

  // add missing plugins
  for (const p of essentialPlugins) {
    if (!state.get(p)) {
      opts.plugins.push(p);
    }
  }

  // convert strings to objects to match the form svgo accepts
  for (let i = 0; i < opts.plugins.length; i++) {
    if (typeof opts.plugins[i] === "string") {
      opts.plugins[i] = { [opts.plugins[i]]: true };
    }
  }
}
