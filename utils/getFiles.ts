// utils/getFiles.js
import fs from "fs";
import path from "path";

export function getFiles(dir: string) {
  let files: any = [];

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Recursively get files from the directory
      files = [...files, ...getFiles(filePath)];
    } else {
      files.push({
        name: file,
        path: filePath.replace(process.cwd() + "/public", ""),
      });
    }
  });

  return files;
}
