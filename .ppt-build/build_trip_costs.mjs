import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "C:/Users/pawit/OneDrive/Documents/ChatGPT/Beijing";
const skillDir = "C:/Users/pawit/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations";
const tmpDir = path.join(workspaceDir, ".ppt-build");
const finalPath = path.join(workspaceDir, "output/pptx/Beijing_Tianjin_Trip_Costs_and_Booking_2026.pptx");
const { resolvePresentationFont, applyPresentationChartFont, finalizePresentation } = await import(pathToFileURL(path.join(skillDir, "container_tools/artifact_tool_utils.mjs")).href);
const font = resolvePresentationFont();
const p = Presentation.create({ slideSize: { width: 1280, height: 720 } });

const C = { ink: "#152B3C", paper: "#F8F5EF", red: "#B64232", gold: "#D8A24A", teal: "#1E6F72", pale: "#EAE2D7", gray: "#56636C", white: "#FFFFFF", lightTeal: "#DCEDEE" };
function addText(slide, text, left, top, width, height, style = {}) {
  const s = slide.shapes.add({ geometry: "textbox", position: { left, top, width, height }, fill: "none", line: { fill: "none", width: 0 } });
  s.text = text;
  s.text.style = { typeface: font, fontSize: 20, color: C.ink, autoFit: "shrinkText", breakLine: false, ...style };
  return s;
}
function title(slide, text, subtitle = "") {
  addText(slide, text, 72, 50, 1136, 56, { fontSize: 34, bold: true, color: C.ink });
  if (subtitle) addText(slide, subtitle, 74, 109, 1120, 28, { fontSize: 15, color: C.gray });
  const rule = slide.shapes.add({ geometry: "rect", position: { left: 72, top: 145, width: 1136, height: 3 }, fill: C.gold, line: { fill: C.gold, width: 0 } });
  return rule;
}
function note(slide, text) { slide.speakerNotes.textFrame.setText(text); }
function styleTable(table, columns, rows, headerColor = C.teal) {
  table.styleOptions = { headerRow: true, bandedRows: true };
  table.borders.assign({ style: "solid", fill: "#D4D8D7", width: 1 });
  for (let c = 0; c < columns; c++) {
    const cell = table.getCell(0, c);
    cell.fill = headerColor;
    cell.text.style = { typeface: font, fontSize: 16, bold: true, color: C.white };
  }
  for (let r = 1; r < rows; r++) for (let c = 0; c < columns; c++) {
    table.getCell(r, c).text.style = { typeface: font, fontSize: 16, color: C.ink };
  }
}

// 1. Cover
{
  const s = p.slides.add(); s.background.fill = C.ink;
  s.shapes.add({ geometry: "rect", position: { left: 72, top: 78, width: 16, height: 510 }, fill: C.gold, line: { fill: C.gold, width: 0 } });
  addText(s, "ปักกิ่ง × เทียนจิน", 126, 132, 940, 72, { fontSize: 50, bold: true, color: C.white });
  addText(s, "งบค่าเข้าสถานที่ การเดินทาง และแผนการจอง", 130, 222, 890, 42, { fontSize: 26, color: "#E7DDD1" });
  addText(s, "3–7 ธันวาคม 2026  |  ผู้เดินทาง 4 ผู้ใหญ่", 130, 290, 780, 32, { fontSize: 19, color: C.gold });
  addText(s, "ไม่รวมตั๋วเครื่องบิน โรงแรม และอาหาร\nงบแนะนำ: ¥3,650–3,750 สำหรับทั้งกลุ่ม", 130, 448, 750, 68, { fontSize: 22, color: C.white, bold: true });
  addText(s, "อัตราแลกเปลี่ยนโดยประมาณ ¥1 ≈ ฿4.9", 130, 559, 460, 24, { fontSize: 15, color: "#C4D4D5" });
  note(s, "Source itinerary: Beijing_Tianjin_Trip_3-7_Dec_2026_Detailed_v2.pdf. FX used only as a rough conversion, not a booking rate.");
}

// 2. Budget overview
{
  const s = p.slides.add(); s.background.fill = C.paper; title(s, "งบรวมที่แนะนำ", "ใช้รถไฟ First Class, รถบัสตรงไป Mutianyu และ Didi ในเทียนจิน");
  addText(s, "¥3,656", 76, 190, 380, 74, { fontSize: 52, bold: true, color: C.red });
  addText(s, "กรณีบินเข้าและออก PEK", 80, 274, 330, 28, { fontSize: 18, color: C.gray });
  addText(s, "ประมาณ ฿17,900", 80, 328, 360, 42, { fontSize: 26, bold: true, color: C.ink });
  addText(s, "ถ้าใช้สนามบิน PKX: เพิ่มราว ¥88\nถ้าเลือก Second Class: ลด ¥268", 80, 412, 410, 62, { fontSize: 18, color: C.gray });
  const chart = s.charts.add("bar", { position: { left: 540, top: 187, width: 600, height: 380 }, categories: ["ค่าเข้าสถานที่", "รถไฟระหว่างเมือง", "Mutianyu bus", "Metro + Didi", "สนามบิน PEK"], series: [{ name: "CNY", values: [1912, 704, 400, 408, 232], fill: C.teal }], barOptions: { direction: "bar", grouping: "clustered" }, hasLegend: false, dataLabels: { showValue: true, position: "outEnd" } });
  applyPresentationChartFont(chart, { fontFamily: font });
  addText(s, "ยอดนี้มีเงินเผื่อสำหรับ Didi แล้ว แต่ยังไม่รวมค่ารถจากสนามบินถึงโรงแรมตามตำแหน่งจริง", 76, 613, 1060, 28, { fontSize: 16, color: C.gray });
  note(s, "Calculation: attraction admissions ¥1,912; First Class Beijing-Tianjin return ¥704 for four; direct Mutianyu bus allowance ¥400; urban transit and Didi ¥408; PEK airport rail+metro estimate ¥232. Sources on final slide.");
}

// 3. Day-by-day admissions
{
  const s = p.slides.add(); s.background.fill = C.paper; title(s, "ค่าเข้าสถานที่ตามวัน", "ราคาผู้ใหญ่ 4 คน ช่วง low season ของเดือนธันวาคม");
  const t = s.tables.add({ rows: 8, columns: 4, left: 72, top: 180, width: 1136, height: 390, columnTracks: [{mode:"fr",value:1.2},{mode:"fr",value:3.5},{mode:"fr",value:1.4},{mode:"fr",value:1.4}], values: [
    ["วัน", "สถานที่", "ต่อคน", "4 คน"],
    ["3 ธ.ค.", "Forbidden City + Jingshan Park", "¥42", "¥168"],
    ["4 ธ.ค.", "Mutianyu: เข้า + shuttle + cable car", "¥200", "¥800"],
    ["5 ธ.ค.", "Summer Palace", "¥20", "¥80"],
    ["5 ธ.ค.", "Tianjin Eye รอบกลางคืน", "¥138", "¥552"],
    ["6 ธ.ค.", "Porcelain House", "¥50", "¥200"],
    ["7 ธ.ค.", "Temple of Heaven บัตรรวม", "¥28", "¥112"],
    ["", "รวม", "", "¥1,912"]
  ] }); styleTable(t, 4, 8);
  addText(s, "สถานที่ฟรี: Tiananmen Square, Wangfujing, Italian Style Area, Five Great Avenues และ Ancient Culture Street", 74, 605, 1090, 28, { fontSize: 16, color: C.gray });
  note(s, "Sources: Palace Museum official tickets; Mutianyu official ticketing; Beijing Municipal ticketing pages for Jingshan and Temple of Heaven; Summer Palace official visitor page; Tianjin Eye price notice April 2026; Tianjin Porcelain House listing. Exact links on final slide.");
}

// 4. Transport
{
  const s = p.slides.add(); s.background.fill = C.paper; title(s, "ค่าเดินทาง", "แยกต้นทุนที่กำหนดราคาได้จากงบเผื่อที่ขึ้นกับโรงแรมและเวลาเดินทาง");
  const t = s.tables.add({ rows: 7, columns: 3, left: 72, top: 180, width: 740, height: 338, columnTracks: [{mode:"fr",value:3.4},{mode:"fr",value:1.4},{mode:"fr",value:1.4}], values: [
    ["รายการ", "4 คน", "สถานะ"],
    ["รถไฟ Beijing South ↔ Tianjin, First Class", "¥704", "แนะนำ"],
    ["รถบัสตรง Mutianyu ไป-กลับ", "¥320–560", "งบเผื่อ"],
    ["Metro ปักกิ่งในเมือง", "¥160–240", "งบเผื่อ"],
    ["Metro เทียนจิน", "¥48–80", "งบเผื่อ"],
    ["Didi ในเทียนจิน 3–4 เที่ยว", "¥90–140", "งบเผื่อ"],
    ["PEK airport rail + metro ไป/กลับ", "¥232", "ประมาณการ"]
  ] }); styleTable(t, 3, 7, C.red);
  addText(s, "Metro ปักกิ่ง", 870, 194, 270, 30, { fontSize: 24, bold: true, color: C.teal });
  addText(s, "เริ่ม ¥3 ตามระยะทาง\nCapital Airport Express ¥25/เที่ยว", 870, 242, 290, 64, { fontSize: 18, color: C.ink });
  addText(s, "Metro เทียนจิน", 870, 348, 270, 30, { fontSize: 24, bold: true, color: C.teal });
  addText(s, "เริ่ม ¥2 และสูงสุด ¥5\nสำหรับเส้นทางหลักในทริป", 870, 396, 280, 58, { fontSize: 18, color: C.ink });
  addText(s, "Didi ไม่มีราคาตายตัว จึงตั้งงบแทนราคาแน่นอน", 870, 497, 300, 45, { fontSize: 16, color: C.gray });
  note(s, "Beijing metro fare source: Beijing Subway/Beijing Government, fares start ¥3 and Capital Airport Express ¥25. Tianjin fare source: Tianjin Development and Reform Commission, ¥2-¥5 by station bands. Direct Mutianyu bus and Didi vary; allowance based on current available services and itinerary assumptions.");
}

// 5. Booking timeline
{
  const s = p.slides.add(); s.background.fill = C.paper; title(s, "ปฏิทินการจอง", "นับถอยหลังจากวันเข้าแต่ละสถานที่ เพื่อให้ได้เวลาและที่นั่งตามแผน");
  const t = s.tables.add({ rows: 7, columns: 4, left: 72, top: 176, width: 1136, height: 374, columnTracks: [{mode:"fr",value:1.25},{mode:"fr",value:2.3},{mode:"fr",value:3.6},{mode:"fr",value:3.1}], values: [
    ["วันที่ควรทำ", "รายการ", "ควรจองเมื่อไร", "คำแนะนำ"],
    ["18 พ.ย.", "Mutianyu 3 ธ.ค.", "เปิดจองล่วงหน้า 15 วัน", "จองเข้า + shuttle + cable car ไปกลับพร้อมกัน"],
    ["21 พ.ย.", "รถไฟ 5 ธ.ค.", "โดยปกติเปิดขาย 15 วันก่อนเดินทาง", "จอง First Class 4 ที่นั่งใน 12306 ทันที"],
    ["26 พ.ย. 20:00", "Forbidden City 3 ธ.ค.", "เปิดก่อนวันเข้า 7 วัน", "ใช้พาสปอร์ต จองผ่านช่องทางทางการ"],
    ["27 พ.ย.–2 ธ.ค.", "Tianjin Eye 5 ธ.ค.", "จองล่วงหน้า 3–7 วัน", "เลือกรอบหลัง 18:00 ราคา ¥138"],
    ["ภายใน 7 วันก่อนเข้า", "Temple of Heaven / Summer Palace", "เปิดตามระบบ WeChat ของสถานที่", "ซื้อไว้เมื่อแผนเวลาแน่นอน"],
    ["ก่อนเดินทาง", "Tiananmen Square", "ต้องจองช่วงเวลาเข้าพื้นที่", "ใช้ชื่อและพาสปอร์ตให้ตรงกับวันจริง"]
  ] }); styleTable(t, 4, 7, C.teal);
  addText(s, "สำคัญ: ตรวจสอบเวลาเปิดขายใน 12306 อีกครั้ง เพราะตารางรถไฟและโควตาเปลี่ยนได้", 74, 599, 1120, 27, { fontSize: 16, color: C.red, bold: true });
  note(s, "Sources: Palace Museum official ticket policy states sales open 7 days prior. Mutianyu official notice says reservations available within 15 days. 12306 official rail booking is the purchase channel; itinerary source specifies around 21 Nov for 5 Dec. Tianjin Eye booking timing follows the supplied itinerary and should be rechecked on its official platform. Temple of Heaven and Summer Palace official pages specify their WeChat booking platforms.");
}

// 6. Recommendations
{
  const s = p.slides.add(); s.background.fill = C.paper; title(s, "ข้อแนะนำสำหรับทริปนี้", "เน้นเดินทางลื่น ลดการเดินชัน และลดโอกาสพลาดการจอง");
  const items = [
    ["รถไฟ", "เลือก First Class ทั้งไปและกลับ. ต่างจาก Second Class รวม ¥268 สำหรับ 4 คน แต่เหมาะกว่าเมื่อมีกระเป๋า."],
    ["Mutianyu", "ใช้ cable car ไป-กลับและ shuttle ของสถานที่. เดือนธันวาคมควรข้าม toboggan หากพื้นเปียกหรือมีน้ำแข็ง."],
    ["การจอง", "ตั้งเตือน 26 พ.ย. 20:00 สำหรับ Forbidden City. ถ้าเต็ม ให้ปรับเวลาในวันเดียวกัน ไม่ควรรอหน้าสถานที่."],
    ["สนามบิน", "ยืนยันว่าออก PEK หรือ PKX และส่งชื่อโรงแรมก่อนเดินทาง. รายการนี้เปลี่ยนเส้นทางและงบรถรับส่งมากที่สุด."],
    ["การจ่ายเงิน", "ผูกบัตรต่างประเทศกับ Alipay หรือ WeChat Pay และพกพาสปอร์ตที่ใช้จองทุกสถานที่."],
  ];
  let y = 181;
  for (const [head, body] of items) {
    s.shapes.add({ geometry: "rect", position: { left: 76, top: y + 5, width: 12, height: 52 }, fill: C.gold, line: { fill: C.gold, width: 0 } });
    addText(s, head, 110, y, 175, 30, { fontSize: 22, bold: true, color: C.teal });
    addText(s, body, 286, y, 845, 50, { fontSize: 18, color: C.ink });
    y += 80;
  }
  note(s, "Recommendations based on itinerary traveler ages, luggage mentioned in itinerary, official booking terms, and winter safety considerations. No claim of weather certainty.");
}

// 7. Sources
{
  const s = p.slides.add(); s.background.fill = C.ink; addText(s, "แหล่งข้อมูล", 72, 52, 600, 52, { fontSize: 36, bold: true, color: C.white });
  addText(s, "ราคาควรตรวจอีกครั้งก่อนชำระเงินจริง โดยเฉพาะรถไฟ Didi และรถบัส", 74, 112, 1070, 28, { fontSize: 17, color: C.gold });
  const sources = [
    "Forbidden City: https://intl.dpm.org.cn/visit",
    "Mutianyu official ticketing: https://fx.mutianyugreatwall.com/fore/index?disCode=736798",
    "Mutianyu visitor notice: https://en.mutianyugreatwall.com/article/4DlCYuBZ75h",
    "Temple of Heaven: https://english.beijing.gov.cn/specials/parktours/guidevisitors/templeofheaven/overview/202301/t20230112_2897365.html",
    "Jingshan Park: https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753324.html",
    "Summer Palace: https://english.visitbeijing.com.cn/article/4Jaqw6nQVBN",
    "Tianjin Eye price notice: https://m.tj.bendibao.com/xiuxian/167820.shtm?src=amap",
    "Porcelain House: https://r.visitbeijing.com.cn/cultural-brigade/43",
    "Beijing metro: https://english.beijing.gov.cn/specials/beijinglifeonthesubway/noticeforpassengers/202504/t20250423_4072294.html",
    "Tianjin metro: https://fzgg.tj.gov.cn/zmhd/gzcx/syjgcx/kyfw/202112/t20211216_5752650.html",
    "China Railway 12306: https://www.12306.cn/en/"
  ];
  let y = 177;
  for (const x of sources) { addText(s, x, 80, y, 1110, 26, { fontSize: 13.5, color: "#E7DDD1" }); y += 34; }
  addText(s, "ใช้กำหนดการจากไฟล์ Beijing_Tianjin_Trip_3-7_Dec_2026_Detailed_v2.pdf", 80, 592, 1050, 24, { fontSize: 15, color: C.gold });
  note(s, "All sources listed visibly on slide. Trip itinerary source: Beijing_Tianjin_Trip_3-7_Dec_2026_Detailed_v2.pdf.");
}

await fs.mkdir(path.dirname(finalPath), { recursive: true });
const candidate = path.join(workspaceDir, ".codex-finalizer", "candidate-trip-costs.pptx");
await (await PresentationFile.exportPptx(p)).save(candidate);
const result = await finalizePresentation({
  workspaceDir, candidatePath: candidate, finalPath,
  pythonExecutable: "C:/Users/pawit/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe",
  integrityValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-bullet-geometry", "--validate-heading-fit", "--require-native-table-slide", "3", "--require-native-table-slide", "4", "--require-native-table-slide", "5"],
  requiredNativeTableOwnerSlides: [3,4,5],
  materializeLiteralChartWorkbooks: true,
  fontPolicy: { basis: "design", families: [font] }, verifyArtifactToolImport: true,
  receiptPath: path.join(workspaceDir, ".codex-finalizer", "trip-costs-validation.json")
});
console.log(JSON.stringify({ finalPath, result }, null, 2));
