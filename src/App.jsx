import { useState } from 'react'

const dayData = [
  {day:'DAY 1', date:'2 ธ.ค. · ถึงปักกิ่ง', title:'เมืองเก่าและพระราชวังต้องห้าม', total:324, stops:[
    {name:'Tiananmen Square', note:'จองช่วงเวลาเข้า แต่ไม่เสียค่าเข้า', price:0, parts:[['ค่าเข้า','¥0'],['Metro จาก/กลับที่พัก (งบเฉลี่ย)','¥10 / คน']], links:[['จอง Tiananmen Square','https://yuyue2026.tamgw.beijing.gov.cn/web/index.html#/index']]},
    {name:'Forbidden City', note:'เข้าทาง Meridian Gate หลังจัตุรัสเทียนอันเหมิน', price:40, parts:[['บัตรเข้าช่วง low season','¥40'],['Treasure Gallery (เลือกเพิ่ม)','¥10'],['Clock Gallery (เลือกเพิ่ม)','¥10']], links:[['จองตั๋วทางการ','https://ticket.dpm.org.cn/'],['ดูนโยบายและเวลา','https://intl.dpm.org.cn/visit']]},
    {name:'Jingshan Park', note:'เดิน 5 นาทีจากประตูเหนือ Forbidden City', price:2, parts:[['ค่าเข้า','¥2']], links:[['ดูข้อมูลทางการ','https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753324.html']]}
  ]},
  {day:'DAY 2', date:'3 ธ.ค. · วัดลามะและหูท่ง', title:'วัดลามะ ย่านโบราณ และทะเลสาบ', total:140, stops:[
    {name:'Lama Temple (Yonghegong)', note:'วัดทิเบตที่สวยงามและสำคัญที่สุดในปักกิ่ง', price:25, parts:[['ค่าเข้า','¥25']], links:[['ดูข้อมูลและวิธีเดินทาง','https://www.travelchinaguide.com/attraction/beijing/yonghe.htm']]},
    {name:'Wudaoying Hutong', note:'ย่านหูท่งเก๋ๆ ตรงข้ามวัดลามะ เต็มไปด้วยคาเฟ่และร้านคราฟต์', price:0, parts:[['ค่าเข้า','¥0']], links:[['ดูรีวิวย่าน Wudaoying','https://www.thebeijinger.com/directory/wudaoying-hutong']]},
    {name:'Shichahai (Houhai)', note:'เดินเล่นริมทะเลสาบและหูท่งตอนเย็น/ค่ำ ถ่ายรูปสวยมาก', price:0, parts:[['ค่าเข้า','¥0'],['Metro เดินทางในวันนี้','¥10 / คน']], links:[['ข้อมูล Shichahai','https://www.travelchinaguide.com/attraction/beijing/shichahai.htm']]}
  ]},
  {day:'DAY 3', date:'4 ธ.ค. · Mutianyu', title:'กำแพงเมืองจีน', total:1240, stops:[
    {name:'Mutianyu Great Wall', note:'ตัวเลือกแนะนำ: กระเช้าปิดไปและกลับ', price:200, parts:[['ค่าเข้า','¥45'],['รถ shuttle ภายในสถานที่','¥15'],['cable car ไป-กลับ','¥140'],['รถบัสตรงไป-กลับจากปักกิ่ง (งบแนะนำ)','¥100 / คน']], links:[['จองค่าเข้า + shuttle + cable car','https://fx.mutianyugreatwall.com/fore/index?disCode=736798'],['ดูข้อกำหนดการเข้าชม','https://en.mutianyugreatwall.com/article/4DlCYuBZ75h']]}
  ]},
  {day:'DAY 4', date:'5 ธ.ค. · ไปเทียนจิน', title:'Summer Palace และ Haihe Night', total:1100, stops:[
    {name:'Summer Palace', note:'เข้าทาง Beigongmen ตามแผน', price:20, parts:[['บัตรเข้าช่วง low season','¥20'],['บัตรรวม (หากต้องการเข้าจุดด้านใน)','¥50'],['Metro งบเฉลี่ยวันนี้','¥15 / คน']], links:[['ดูราคาและเวลา','https://summerpalace.net.cn/en/'],['ข้อมูลการจอง','https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753037.html']]},
    {name:'รถไฟ Beijing South → Tianjin', note:'แนะนำ First Class เพราะผู้เดินทาง 4 คนมีกระเป๋า', price:88, parts:[['First Class','¥88 / คน'],['Second Class (ทางเลือกประหยัด)','¥54.5 / คน']], links:[['เปิด 12306 เพื่อดูรถจริง','https://www.12306.cn/en/']]},
    {name:'Tianjin Eye', note:'เลือกขึ้นรอบกลางคืนหลัง 18:00', price:138, parts:[['บัตรรอบกลางคืน','¥138'],['Didi Italian Style Area → Tianjin Eye','ประมาณ ¥10 / คน เมื่อหาร 4 คน']], links:[['ดูประกาศราคา 2026','https://m.tj.bendibao.com/xiuxian/167820.shtm?src=amap']]}
  ]},
  {day:'DAY 5', date:'6 ธ.ค. · เทียนจิน', title:'สถาปัตยกรรมเก่าและวัฒนธรรม', total:704, stops:[
    {name:'Five Great Avenues', note:'พื้นที่กลางแจ้งและ Minyuan Square', price:0, parts:[['ค่าเข้า','¥0'],['Metro หรือเดิน','¥0–5 / คน']], links:[['ดูข้อมูลย่าน','https://www.gochinaplanner.com/guides/tianjin-guide/']]},
    {name:'Porcelain House', note:'เดินจาก Hepinglu หรือใช้ Didi จาก Wudadao', price:50, parts:[['ค่าเข้า','¥50'],['Didi จาก Five Great Avenues (หาร 4 คน)','ประมาณ ¥5 / คน']], links:[['ดูข้อมูลและราคา','https://r.visitbeijing.com.cn/cultural-brigade/43']]},
    {name:'Ancient Culture Street', note:'ถนนและ Tianhou Temple เข้าฟรี', price:0, parts:[['ค่าเข้า','¥0'],['Didi/Metro ไปสถานีรถไฟ (หาร 4 คน)','ประมาณ ¥15 / คน']], links:[['ดูข้อมูลย่าน','https://www.gochinaplanner.com/guides/tianjin-guide/']]},
    {name:'รถไฟ Tianjin → Beijing South', note:'กลับปักกิ่งช่วงเย็น', price:88, parts:[['First Class','¥88 / คน'],['Second Class (ทางเลือกประหยัด)','¥54.5 / คน']], links:[['เปิด 12306 เพื่อดูรถจริง','https://www.12306.cn/en/']]}
  ]},
  {day:'DAY 6', date:'7 ธ.ค. · วันกลับ', title:'Temple of Heaven และไปสนามบิน', total:288, stops:[
    {name:'Temple of Heaven', note:'ใช้บัตรรวมเพื่อเข้าจุดสำคัญของสวน', price:28, parts:[['บัตรรวม low season','¥28'],['เฉพาะสวน (ทางเลือก)','¥10'],['Metro จาก/กลับที่พัก (งบเฉลี่ย)','¥15 / คน']], links:[['ดูราคาและวิธีจอง','https://english.beijing.gov.cn/specials/parktours/guidevisitors/templeofheaven/overview/202301/t20230112_2897365.html']]},
    {name:'ไปสนามบิน', note:'ยอดรวมวันแรกและวันกลับในงบหลักอ้างอิง PEK', price:29, parts:[['PEK Airport Express','¥25 / คน / เที่ยว'],['Metro ต่อเข้าเมือง','¥3–6 / คน / เที่ยว'],['PKX Airport Express (แทน PEK)','ประมาณ ¥35 / คน / เที่ยว']], links:[['ดูอัตราค่าโดยสาร Metro ปักกิ่ง','https://english.beijing.gov.cn/specials/beijinglifeonthesubway/noticeforpassengers/202504/t20250423_4072294.html']]}
  ]}
];

export default function App() {
  const [rate, setRate] = useState(4.90);
  const money = (value) => `≈ ฿${Math.round(value * rate).toLocaleString('th-TH')}`;

  return (
    <>
      <header 
        className="min-h-[540px] md:min-h-[620px] text-white bg-ink"
        style={{ background: 'radial-gradient(circle at 78% 18%, #285969 0, transparent 27%), linear-gradient(124deg, #112a3b 0%, #173c4d 56%, #1f5961 100%)' }}
      >
        <nav className="shell h-[82px] flex items-center justify-between">
          <a className="font-serif font-bold text-base tracking-[1.2px] text-white no-underline" href="#top">
            BEIJING <span className="text-gold mx-1">×</span> TIANJIN
          </a>
          <a className="text-[#e9e0d3] no-underline text-sm" href="#sources">แหล่งข้อมูล</a>
        </nav>
        <div className="shell pt-[62px] md:pt-[85px]" id="top">
          <p className="m-0 mb-2.5 text-[13px] tracking-[0.09em] uppercase font-bold text-[#d8e4e2]">2–7 ธันวาคม 2026 · 6 วัน 5 คืน · ผู้ใหญ่ 4 คน</p>
          <h1 className="max-w-[800px] mb-[22px] text-[clamp(47px,7vw,82px)] leading-[1.08] tracking-[-0.04em] font-extrabold mt-0">
            งบเที่ยวที่<br />
            <em className="font-serif font-semibold text-[#f0c168] not-italic">เห็นทุกองค์ประกอบ</em>
          </h1>
          <p className="max-w-[600px] text-[#dce9e6] text-lg md:text-[20px] mt-0">เลือกดูรายวัน กดเข้าเว็บไซต์ต้นทางเพื่อจอง และดูราคาทั้งหยวนกับเงินบาทได้ในหน้าเดียว</p>
          <div className="flex gap-3.5 mt-9">
            <a className="px-5 py-3 rounded-sm no-underline font-bold text-[15px] bg-gold text-ink inline-block" href="#itinerary">ดูแผนรายวัน</a>
            <a className="px-5 py-3 rounded-sm no-underline font-bold text-[15px] border border-[#8eb1ae] text-white inline-block" href="#booking">ดูวันจองตั๋ว</a>
          </div>
        </div>
      </header>

      <main>
        <section className="shell py-[55px] md:py-[74px] grid grid-cols-1 md:grid-cols-[1.25fr_0.75fr] gap-[34px] md:gap-[70px]">
          <div>
            <p className="m-0 mb-2.5 text-[13px] tracking-[0.09em] uppercase font-bold text-red">งบแนะนำสำหรับทั้งกลุ่ม</p>
            <h2 className="text-[49px] md:text-[62px] text-red leading-[1.18] tracking-[-0.035em] font-bold mt-0 mb-1">
              ¥3,796<small className="block text-ink-soft text-[20px] tracking-normal font-medium">{money(3796)}</small>
            </h2>
            <p className="max-w-[580px] text-ink-soft mt-0">คำนวณจากรถไฟ First Class, รถบัสตรงไป Mutianyu, Metro, Didi ในเทียนจิน และ Airport Express ที่ PEK</p>
          </div>
          <div className="self-center border-t-[3px] border-gold pt-4 md:pt-[18px]">
            <label htmlFor="exchange" className="block font-bold">อัตราแลกเปลี่ยนสำหรับแสดงราคา</label>
            <div className="flex items-center gap-1.5 my-2 font-bold text-[17px]">
              <span>¥1 = ฿</span>
              <input 
                id="exchange" 
                value={rate} 
                onChange={(e) => setRate(e.target.value)} 
                type="number" 
                min="0" 
                step="0.01" 
                className="w-[82px] bg-transparent border-0 border-b border-ink p-1 font-sans font-bold text-[18px] text-red focus:outline-none" 
              />
            </div>
            <p className="text-[13px] text-ink-soft mt-0">เป็นอัตราเพื่อวางแผน งบจริงขึ้นกับวันแลกเงินหรือบัตรที่ใช้</p>
          </div>
        </section>

        <section className="bg-[#eee8dd] py-[75px]">
          <div className="shell grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-[34px] md:gap-[80px]">
            <div>
              <p className="m-0 mb-2.5 text-[13px] tracking-[0.09em] uppercase font-bold text-red">ภาพรวมค่าใช้จ่าย</p>
              <h2 className="text-[clamp(30px,4vw,48px)] leading-[1.18] tracking-[-0.035em] font-bold mt-0 mb-3.5">จ่ายอะไรบ้าง</h2>
              <p className="text-ink-soft max-w-[670px] mt-0">ยอดด้านล่างเป็นเงินสำหรับ 4 คน ไม่รวมตั๋วเครื่องบิน โรงแรม และอาหาร</p>
            </div>
            <dl className="m-0">
              {[
                { label: 'ค่าเข้าสถานที่', cny: 2012 },
                { label: 'รถไฟ Beijing ↔ Tianjin', cny: 704 },
                { label: 'รถบัส, Metro และ Didi', cny: 848 },
                { label: 'PEK Airport Express + Metro', cny: 232 },
              ].map((item, idx) => (
                <div key={idx} className={`flex justify-between items-baseline border-t border-line py-3.5 ${idx === 3 ? 'border-b' : ''}`}>
                  <dt className="font-semibold">{item.label}</dt>
                  <dd className="m-0 text-right text-[20px] font-extrabold text-teal">
                    ¥{item.cny.toLocaleString()}<small className="block text-[13px] font-medium text-ink-soft">{money(item.cny)}</small>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="shell py-[86px]" id="itinerary">
          <div className="mb-[34px]">
            <p className="m-0 mb-2.5 text-[13px] tracking-[0.09em] uppercase font-bold text-red">แผนวันต่อวัน</p>
            <h2 className="text-[clamp(30px,4vw,48px)] leading-[1.18] tracking-[-0.035em] font-bold mt-0 mb-3.5">กดแต่ละสถานที่เพื่อดูองค์ประกอบราคา</h2>
            <p className="text-ink-soft max-w-[670px] mt-0">ราคาต่อคนในรายการสถานที่ และยอดรวมประจำวันสำหรับ 4 คน</p>
          </div>
          
          <div className="grid gap-[18px]">
            {dayData.map((d, i) => (
              <article key={i} className="bg-white border border-[#e2dbd0]">
                <div className="grid grid-cols-[70px_1fr] md:grid-cols-[120px_1fr_auto] gap-[18px] md:gap-5 items-center p-[18px] md:p-6 md:px-6 border-b border-[#e2dbd0]">
                  <div>
                    <div className="text-red font-serif font-bold text-[33px] leading-none">{d.day.replace('DAY ','')}</div>
                    <div className="text-[14px] text-ink-soft mt-1">{d.date.split('·')[0].trim()}</div>
                  </div>
                  <h3 className="m-0 text-[23px] leading-[1.25] font-bold">{d.title}</h3>
                  <div className="col-start-2 md:col-start-3 text-left md:text-right font-extrabold text-teal text-[21px]">
                    ¥{d.total.toLocaleString()}
                    <small className="block text-ink-soft text-[12px] font-medium">{money(d.total)} · รวม 4 คน</small>
                  </div>
                </div>
                
                <div className="px-[18px] md:px-6">
                  {d.stops.map((s, j) => (
                    <details key={j} className="py-[18px] border-b border-[#eee9e0] last:border-0 group" open={j === 0}>
                      <summary className="flex flex-col md:flex-row items-start md:items-center justify-between gap-[18px] cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <div>
                          <div className="text-[18px] font-bold">{s.name}</div>
                          <div className="text-ink-soft text-[14px]">{s.note}</div>
                        </div>
                        <div className="text-[17px] font-extrabold text-red whitespace-nowrap">
                          ¥{s.price}
                          <small className="text-[12px] text-ink-soft font-medium"> {money(s.price)} / คน</small>
                        </div>
                      </summary>
                      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[15px] md:gap-[30px] py-[18px] pb-1 mt-2">
                        <div className="grid gap-1.5">
                          {s.parts.map((p, k) => (
                            <div key={k} className="flex justify-between gap-[18px] text-[14px]">
                              <span>{p[0]}</span><span className="font-bold whitespace-nowrap">{p[1]}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-start justify-start md:justify-end gap-2 flex-wrap">
                          {s.links.map((l, k) => (
                            <a key={k} className="px-2.5 py-1.5 bg-[#eaf0ee] hover:bg-[#d5e4df] transition-colors text-teal text-[13px] font-bold no-underline rounded-sm" target="_blank" rel="noreferrer" href={l[1]}>{l[0]} ↗</a>
                          ))}
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-ink text-white py-[82px]" id="booking">
          <div className="shell">
            <p className="m-0 mb-2.5 text-[13px] tracking-[0.09em] uppercase font-bold text-gold">อย่ารอถึงวันเดินทาง</p>
            <h2 className="text-[clamp(30px,4vw,48px)] leading-[1.18] tracking-[-0.035em] font-bold mt-0 mb-3.5">ปฏิทินการจอง</h2>
            <p className="text-[#c8d6d3] max-w-[670px] mt-0">สำหรับวันเที่ยว 2–7 ธันวาคม 2026 โดยยึดช่วงเวลาขายตั๋วที่ประกาศไว้ในปัจจุบัน</p>
            
            <ol className="m-0 mt-[36px] p-0 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-x-[60px] list-none">
              {[
                { time: '19 พ.ย.', name: 'Mutianyu', desc: 'เปิดจองล่วงหน้า 15 วัน (สำหรับวันที่ 4 ธ.ค.) จองค่าเข้า รถ shuttle และ cable car ไป-กลับพร้อมกัน', link: 'https://fx.mutianyugreatwall.com/fore/index?disCode=736798', linkText: 'จองผ่านช่องทางทางการ' },
                { time: '20 พ.ย.', name: 'รถไฟ Beijing South → Tianjin', desc: '12306 เปิดขาย 15 วันก่อนเดินทาง (สำหรับ 5 ธ.ค.) เลือก First Class 4 ที่นั่ง', link: 'https://www.12306.cn/en/', linkText: 'เปิด 12306' },
                { time: '25 พ.ย. · 20:00', name: 'Forbidden City', desc: 'ตั๋ววันที่ 2 ธ.ค. เปิดขายล่วงหน้า 7 วันเวลา 20:00 ไม่มีตั๋วขายหน้างานในวันเที่ยว', link: 'https://ticket.dpm.org.cn/', linkText: 'จอง Forbidden City' },
                { time: '28 พ.ย.–2 ธ.ค.', name: 'Tianjin Eye', desc: 'จองล่วงหน้า 3–7 วัน (สำหรับ 5 ธ.ค.) เลือกรอบหลัง 18:00 หากต้องการขึ้นกลางคืน', link: 'https://m.tj.bendibao.com/xiuxian/167820.shtm?src=amap', linkText: 'ดูราคาและข้อมูลล่าสุด' },
                { time: 'ภายใน 7 วัน', name: 'Summer Palace / Temple of Heaven', desc: 'ซื้อผ่านช่องทาง WeChat ของสถานที่หรือหน้างานเมื่อเวลาแน่นอน', link: 'https://english.beijing.gov.cn/specials/ticketing/', linkText: 'ดูระบบจองสวนปักกิ่ง' },
                { time: 'ก่อนเดินทาง', name: 'Tiananmen Square', desc: 'จองช่วงเวลาเข้าพื้นที่ด้วยชื่อและเลขพาสปอร์ตให้ตรงกับผู้เดินทาง', link: 'https://yuyue2026.tamgw.beijing.gov.cn/web/index.html#/index', linkText: 'จอง Tiananmen Square' },
              ].map((item, idx) => (
                <li key={idx} className="grid grid-cols-[120px_1fr] gap-[18px] py-[21px] border-t border-[#41606a]">
                  <time className="text-gold font-extrabold text-[15px]">{item.time}</time>
                  <div>
                    <strong className="block text-[18px]">{item.name}</strong>
                    <p className="m-0 mt-1 mb-2 text-[#d8e2df] text-[14px]">{item.desc}</p>
                    <a className="text-[#f0c168] text-[14px] font-bold no-underline" href={item.link} target="_blank" rel="noreferrer">{item.linkText} ↗</a>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="shell py-[88px]">
          <p className="m-0 mb-2.5 text-[13px] tracking-[0.09em] uppercase font-bold text-red">คำแนะนำ</p>
          <h2 className="text-[clamp(30px,4vw,48px)] leading-[1.18] tracking-[-0.035em] font-bold mt-0 mb-3.5">สิ่งที่ผมแนะนำให้ทำ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-line border border-line">
            {[
              { num: '01', title: 'ยืนยันสนามบินและโรงแรม', desc: 'เส้นทางวันแรกและวันกลับเปลี่ยนทันทีเมื่อรู้ว่าใช้ PEK หรือ PKX และพักที่ใด' },
              { num: '02', title: 'ใช้ cable car ที่ Mutianyu', desc: 'เหมาะกับกลุ่มนี้ที่สุดในฤดูหนาว ควรเลี่ยง toboggan หากพื้นเปียกหรือน้ำแข็ง' },
              { num: '03', title: 'ใช้ First Class ไปเทียนจิน', desc: 'เพิ่มจาก Second Class รวม ¥268 สำหรับ 4 คน แต่จัดการกระเป๋าและการนั่งร่วมกันสบายกว่า' },
              { num: '04', title: 'เตรียม Alipay หรือ WeChat Pay', desc: 'ผูกบัตรก่อนออกเดินทาง และใช้พาสปอร์ตเล่มเดียวกับที่ลงทะเบียนตั๋วทุกใบ' },
            ].map((item, idx) => (
              <article key={idx} className="bg-paper p-[30px]">
                <span className="font-serif font-bold text-[18px] text-red">{item.num}</span>
                <h3 className="text-[22px] my-2 font-bold">{item.title}</h3>
                <p className="m-0 text-ink-soft">{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-[70px] bg-[#e6dfd3]" id="sources">
          <div className="shell">
            <p className="m-0 mb-2.5 text-[13px] tracking-[0.09em] uppercase font-bold text-ink-soft">แหล่งข้อมูลและข้อจำกัด</p>
            <h2 className="max-w-[800px] text-[clamp(30px,4vw,48px)] leading-[1.18] tracking-[-0.035em] font-bold mt-0 mb-3.5">ทุกปุ่มในแผนรายวันพาไปยังแหล่งข้อมูลหรือช่องทางจอง</h2>
            <p className="max-w-[930px] text-ink-soft mt-0">เว็บไซต์นี้อัปเดตข้อมูลราคาที่ค้นเมื่อ 23 กันยายน 2026 ราคาตั๋ว, ตารางรถไฟ, Didi และอัตราแลกเปลี่ยนอาจเปลี่ยนได้ จึงควรตรวจหน้าเว็บไซต์ต้นทางก่อนชำระเงินจริง</p>
            <p className="text-[13px] font-bold text-red mt-4">อัปเดตกำหนดการ: 2-7 ธ.ค. 2026</p>
          </div>
        </section>
      </main>
    </>
  )
}
