const rateInput = document.querySelector('#exchange');
const money = (value, rate = Number(rateInput.value) || 0) => `≈ ฿${Math.round(value * rate).toLocaleString('th-TH')}`;

const dayData = [
  {day:'DAY 1', date:'3 ธ.ค. · ถึงปักกิ่ง', title:'เมืองเก่าและพระราชวังต้องห้าม', total:324, stops:[
    {name:'Tiananmen Square', note:'จองช่วงเวลาเข้า แต่ไม่เสียค่าเข้า', price:0, parts:[['ค่าเข้า','¥0'],['Metro จาก/กลับที่พัก (งบเฉลี่ย)','¥10 / คน']], links:[['จอง Tiananmen Square','https://yuyue2026.tamgw.beijing.gov.cn/web/index.html#/index']]},
    {name:'Forbidden City', note:'เข้าทาง Meridian Gate หลังจัตุรัสเทียนอันเหมิน', price:40, parts:[['บัตรเข้าช่วง low season','¥40'],['Treasure Gallery (เลือกเพิ่ม)','¥10'],['Clock Gallery (เลือกเพิ่ม)','¥10']], links:[['จองตั๋วทางการ','https://ticket.dpm.org.cn/'],['ดูนโยบายและเวลา','https://intl.dpm.org.cn/visit']]},
    {name:'Jingshan Park', note:'เดิน 5 นาทีจากประตูเหนือ Forbidden City', price:2, parts:[['ค่าเข้า','¥2']], links:[['ดูข้อมูลทางการ','https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753324.html']]}
  ]},
  {day:'DAY 2', date:'4 ธ.ค. · Mutianyu', title:'กำแพงเมืองจีน', total:1240, stops:[
    {name:'Mutianyu Great Wall', note:'ตัวเลือกแนะนำ: กระเช้าปิดไปและกลับ', price:200, parts:[['ค่าเข้า','¥45'],['รถ shuttle ภายในสถานที่','¥15'],['cable car ไป-กลับ','¥140'],['รถบัสตรงไป-กลับจากปักกิ่ง (งบแนะนำ)','¥100 / คน']], links:[['จองค่าเข้า + shuttle + cable car','https://fx.mutianyugreatwall.com/fore/index?disCode=736798'],['ดูข้อกำหนดการเข้าชม','https://en.mutianyugreatwall.com/article/4DlCYuBZ75h']]}
  ]},
  {day:'DAY 3', date:'5 ธ.ค. · ไปเทียนจิน', title:'Summer Palace และ Haihe Night', total:1100, stops:[
    {name:'Summer Palace', note:'เข้าทาง Beigongmen ตามแผน', price:20, parts:[['บัตรเข้าช่วง low season','¥20'],['บัตรรวม (หากต้องการเข้าจุดด้านใน)','¥50'],['Metro งบเฉลี่ยวันนี้','¥15 / คน']], links:[['ดูราคาและเวลา','https://summerpalace.net.cn/en/'],['ข้อมูลการจอง','https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753037.html']]},
    {name:'รถไฟ Beijing South → Tianjin', note:'แนะนำ First Class เพราะผู้เดินทาง 4 คนมีกระเป๋า', price:88, parts:[['First Class','¥88 / คน'],['Second Class (ทางเลือกประหยัด)','¥54.5 / คน']], links:[['เปิด 12306 เพื่อดูรถจริง','https://www.12306.cn/en/']]},
    {name:'Tianjin Eye', note:'เลือกขึ้นรอบกลางคืนหลัง 18:00', price:138, parts:[['บัตรรอบกลางคืน','¥138'],['Didi Italian Style Area → Tianjin Eye','ประมาณ ¥10 / คน เมื่อหาร 4 คน']], links:[['ดูประกาศราคา 2026','https://m.tj.bendibao.com/xiuxian/167820.shtm?src=amap']]}
  ]},
  {day:'DAY 4', date:'6 ธ.ค. · เทียนจิน', title:'สถาปัตยกรรมเก่าและวัฒนธรรม', total:704, stops:[
    {name:'Five Great Avenues', note:'พื้นที่กลางแจ้งและ Minyuan Square', price:0, parts:[['ค่าเข้า','¥0'],['Metro หรือเดิน','¥0–5 / คน']], links:[['ดูข้อมูลย่าน','https://www.gochinaplanner.com/guides/tianjin-guide/']]},
    {name:'Porcelain House', note:'เดินจาก Hepinglu หรือใช้ Didi จาก Wudadao', price:50, parts:[['ค่าเข้า','¥50'],['Didi จาก Five Great Avenues (หาร 4 คน)','ประมาณ ¥5 / คน']], links:[['ดูข้อมูลและราคา','https://r.visitbeijing.com.cn/cultural-brigade/43']]},
    {name:'Ancient Culture Street', note:'ถนนและ Tianhou Temple เข้าฟรี', price:0, parts:[['ค่าเข้า','¥0'],['Didi/Metro ไปสถานีรถไฟ (หาร 4 คน)','ประมาณ ¥15 / คน']], links:[['ดูข้อมูลย่าน','https://www.gochinaplanner.com/guides/tianjin-guide/']]},
    {name:'รถไฟ Tianjin → Beijing South', note:'กลับปักกิ่งช่วงเย็น', price:88, parts:[['First Class','¥88 / คน'],['Second Class (ทางเลือกประหยัด)','¥54.5 / คน']], links:[['เปิด 12306 เพื่อดูรถจริง','https://www.12306.cn/en/']]}
  ]},
  {day:'DAY 5', date:'7 ธ.ค. · วันกลับ', title:'Temple of Heaven และไปสนามบิน', total:288, stops:[
    {name:'Temple of Heaven', note:'ใช้บัตรรวมเพื่อเข้าจุดสำคัญของสวน', price:28, parts:[['บัตรรวม low season','¥28'],['เฉพาะสวน (ทางเลือก)','¥10'],['Metro จาก/กลับที่พัก (งบเฉลี่ย)','¥15 / คน']], links:[['ดูราคาและวิธีจอง','https://english.beijing.gov.cn/specials/parktours/guidevisitors/templeofheaven/overview/202301/t20230112_2897365.html']]},
    {name:'ไปสนามบิน', note:'ยอดรวมวันแรกและวันกลับในงบหลักอ้างอิง PEK', price:29, parts:[['PEK Airport Express','¥25 / คน / เที่ยว'],['Metro ต่อเข้าเมือง','¥3–6 / คน / เที่ยว'],['PKX Airport Express (แทน PEK)','ประมาณ ¥35 / คน / เที่ยว']], links:[['ดูอัตราค่าโดยสาร Metro ปักกิ่ง','https://english.beijing.gov.cn/specials/beijinglifeonthesubway/noticeforpassengers/202504/t20250423_4072294.html']]}
  ]}
];

function renderDays(rate) {
  document.querySelector('#days').innerHTML = dayData.map(d => `
    <article class="day">
      <div class="day-top"><div><div class="day-number">${d.day}</div><div class="day-date">${d.date}</div></div><h3>${d.title}</h3><div class="day-total">¥${d.total.toLocaleString()}<small>${money(d.total,rate)} · รวม 4 คน</small></div></div>
      <div class="stops">${d.stops.map((s,i) => `<details class="stop" ${i===0?'open':''}><summary><div><div class="stop-title">${s.name}</div><div class="stop-sub">${s.note}</div></div><div class="stop-price">¥${s.price}<small> ${money(s.price,rate)} / คน</small></div></summary><div class="detail-grid"><div class="cost-parts">${s.parts.map(p=>`<div class="cost-part"><span>${p[0]}</span><span>${p[1]}</span></div>`).join('')}</div><div class="links">${s.links.map(l=>`<a class="source-link" target="_blank" rel="noreferrer" href="${l[1]}">${l[0]} ↗</a>`).join('')}</div></div></details>`).join('')}</div>
    </article>`).join('');
}
function updateRate(){ const rate=Number(rateInput.value)||0; document.querySelectorAll('[data-thb]').forEach(el=>el.textContent=money(Number(el.dataset.thb),rate)); renderDays(rate); }
rateInput.addEventListener('input',updateRate); updateRate();
