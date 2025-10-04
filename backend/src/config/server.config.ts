export function getPackageVersion(): string {
  const { version } = require("@package.json");
  return version;
}
