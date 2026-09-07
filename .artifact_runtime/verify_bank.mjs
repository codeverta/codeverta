import fs from "node:fs/promises";
import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";
const path =
  "/Users/rabihutomo/code/codeverta/outputs/japanese_learning_bank_5000.xlsx";
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(path));
console.log(
  (await wb.inspect({ kind: "sheet", include: "id,name", maxChars: 3000 }))
    .ndjson
);
const q = wb.worksheets.getItem("Questions").getUsedRange();
const c = wb.worksheets.getItem("Choices").getUsedRange();
console.log("Q_USED", q.address, "C_USED", c.address);
const preview = await wb.render({
  sheetName: "Overview",
  autoCrop: "all",
  scale: 1,
  format: "png",
});
await fs.writeFile(
  "/Users/rabihutomo/code/codeverta/outputs/japanese_learning_bank_overview.png",
  new Uint8Array(await preview.arrayBuffer())
);
console.log("RENDERED");
