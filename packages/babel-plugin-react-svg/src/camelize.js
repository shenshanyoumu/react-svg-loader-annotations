// 将形如x-y-z的字符串替换为xYZ形式
export function hyphenToCamel(name: string) {
  return name.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

// 将命名空间下的特定字符串，进行首字母大写处理
export function namespaceToCamel(namespace: string, name: string) {
  return namespace + name.charAt(0).toUpperCase() + name.slice(1);
}
