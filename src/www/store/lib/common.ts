export function toCamelCase(str: string) {
  return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
}

export function toUpperSnakeCase(str: string) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toUpperCase().replace(/-/g, '_');
}
