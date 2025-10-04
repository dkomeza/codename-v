import fs from "fs";

export function saveFile(file: Buffer, path: string) {
  const dir = path.split("/").slice(0, -1).join("/");

  fs.mkdirSync(dir, { recursive: true });

  return fs.promises.writeFile(path, file);
}
