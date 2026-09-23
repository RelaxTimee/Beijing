import fs from "node:fs/promises";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";
const input = "C:/Users/pawit/OneDrive/Documents/ChatGPT/Beijing/output/pptx/Beijing_Tianjin_Trip_Costs_and_Booking_2026.pptx";
const out = "C:/Users/pawit/OneDrive/Documents/ChatGPT/Beijing/.ppt-build/rendered";
await fs.mkdir(out, { recursive: true });
const deck = await PresentationFile.importPptx(await FileBlob.load(input));
const montage = await deck.export({ format: "webp", montage: true, scale: 1 });
await fs.writeFile(`${out}/montage.webp`, new Uint8Array(await montage.arrayBuffer()));
for (let i = 0; i < deck.slides.items.length; i++) {
  const image = await deck.export({ slide: deck.slides.items[i], format: "png", scale: 1 });
  await fs.writeFile(`${out}/slide-${i + 1}.png`, new Uint8Array(await image.arrayBuffer()));
}
console.log(`Rendered ${deck.slides.count} slides to ${out}`);
