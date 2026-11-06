/* =====================================================================
   AOM KHANITTHA — "THE STORYTELLER" • interactions
   ===================================================================== */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;

  /* ---------- Theme ---------- */
  const saved = localStorage.getItem('aom-theme');
  if (saved) root.dataset.theme = saved;
  const themeBtn = $('#themeToggle');
  const syncThemeIcon = () => {
    const isLight = root.dataset.theme === 'light';
    const sunIco = $('.theme-icon-sun', themeBtn);
    const moonIco = $('.theme-icon-moon', themeBtn);
    if (sunIco && moonIco) {
      sunIco.style.display = isLight ? 'none' : 'block';
      moonIco.style.display = isLight ? 'block' : 'none';
    }
  };
  syncThemeIcon();
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('aom-theme', root.dataset.theme);
    syncThemeIcon();
  });

  /* ---------- Bilingual Support (TH / EN) ---------- */
  const I18N = {
    th: {
      nav_about: 'ผู้กำกับ',
      nav_skills: 'ทักษะ',
      nav_works: 'ผลงาน',
      nav_bts: 'เบื้องหลัง',
      nav_awards: 'รางวัล',
      nav_lookbook: 'เล่มพอร์ต',
      nav_journey: 'การศึกษา',
      nav_contact: 'ติดต่อ',
      nav_cv: 'CV / Resume',
      nav_resume_m: 'เปิดเรซูเม่ (CV)',

      dock_works: 'ผลงาน',
      dock_lookbook: 'เล่มพอร์ต',
      dock_cv: 'เรซูเม่',
      dock_contact: 'ติดต่อ',

      hero_name: 'ขนิษฐา วันไชย',
      hero_nick: '(อ้อม)',
      hero_desc: 'นักศึกษาคณะนิเทศศาสตร์ สาขาการผลิตเนื้อหาสร้างสรรค์และประสบการณ์ดิจิทัล (CDE) มหาวิทยาลัยกรุงเทพ ที่เล่าเรื่องผ่าน <strong>ภาพ แสง เสียง และ Generative AI</strong> — จากหน้ากล้องผู้ประกาศข่าว สู่กองถ่ายจริง ไปจนถึงเวทีประกวดระดับประเทศ',
      hb_huawei: 'ชนะเลิศ Huawei Hub',
      hb_gpa: 'GPA นิเทศศาสตร์ BU',
      hb_reels: 'ผลงานวิดีโอ & AI จริง',
      hero_cta_reel: 'ดูโชว์รีลผลงาน',
      hero_cta_lookbook: 'เล่มพอร์ต 11 หน้า',
      hero_cta_contact: 'ติดต่อร่วมงาน',
      hero_sticker1: 'Huawei Hub — 1st Place',
      hero_sticker2: 'GPA <b>3.29</b> • นิเทศ BU',
      vf_lt_name: 'ขนิษฐา วันไชย • อ้อม',
      vf_shutter: 'ถ่ายภาพ',

      about_subtitle: 'ทำความรู้จักผู้กำกับเรื่องนี้ — คนที่หลงใหลการเล่าเรื่องผ่านทุกสื่อ',
      about_lead: 'ทุกเฟรมมีเรื่องเล่า — หน้าที่ของฉันคือทำให้คนดู <span class="grad-text">รู้สึก</span> ไปกับมัน',
      about_p1: 'ตลอดการเรียนใน <strong>สาขาการผลิตเนื้อหาสร้างสรรค์และประสบการณ์ดิจิทัล (CDE) คณะนิเทศศาสตร์ มหาวิทยาลัยกรุงเทพ</strong> ฉันได้เรียนรู้และลงมือทำจริงครบทุกขั้นตอน ตั้งแต่การคิด Creative Concept การวางโครงเรื่องและเขียนบท การออกกองถ่ายทำ การเป็นผู้ประกาศข่าวหน้ากล้อง ไปจนถึงการตัดต่อและเกรดสี',
      about_p2: 'ฉันตั้งใจนำ <strong>ความคิดสร้างสรรค์ + ทักษะผลิตสื่อ + Generative AI</strong> มาสร้างคอนเทนต์ที่มีคุณค่า พร้อมเปิดรับคำแนะนำจากพี่ ๆ ในวงการ มีความรับผิดชอบ อ่อนน้อม และพร้อมทุ่มเทเต็มที่ในทุกโปรเจกต์ค่ะ',

      pil1_title: 'พัฒนาตนเองและเปิดรับเทคโนโลยี',
      pil1_desc: 'กระตือรือร้นที่จะเรียนรู้เทคนิคการผลิตสื่อและเครื่องมือ AI ใหม่ ๆ พร้อมรับฟังคำแนะนำเพื่อยกระดับงานให้ดียิ่งขึ้น',
      pil2_title: 'ลงมือทำจริงครบทุกกระบวนการ',
      pil2_desc: 'ผ่านประสบการณ์ทั้งการคิดคอนเทนต์ เขียนบท ถ่ายทำ ตัดต่อ และประยุกต์ใช้ AI สร้างสรรค์สื่อดิจิทัล',
      pil3_title: 'เข้าใจเทรนด์และพฤติกรรมผู้ชม',
      pil3_desc: 'วิเคราะห์แนวโน้มโซเชียลมีเดียเพื่อออกแบบคอนเทนต์ให้ตรงใจกลุ่มเป้าหมายและเกิด Engagement จริง',
      pil4_title: 'ทำงานเป็นทีมและแก้ปัญหาเฉพาะหน้า',
      pil4_desc: 'สื่อสารประสานงานในกองถ่ายได้ดี ยืดหยุ่น รับผิดชอบต่อหน้าที่ และพร้อมสนับสนุนทีมในทุกสถานการณ์',

      dna_char_k: 'บุคลิกนิสัย',
      dna_char_v: 'ร่าเริง แจ่มใส เข้ากับผู้อื่นง่าย อ่อนน้อม',
      dna_hobby_k: 'งานอดิเรก',
      dna_hobby_v: 'ดูหนัง ฟังเพลง ถ่ายรูป ตัดต่อคลิปสั้น',

      stat_huawei: 'ชนะเลิศ Huawei Hub Campaign',
      stat_prize: 'เงินรางวัลทีม (บาท)',
      stat_gpa: 'GPA นิเทศ CDE ม.กรุงเทพ',
      stat_works: 'ผลงานวิดีโอ / AI / ภาพถ่าย',

      skills_subtitle: 'อุปกรณ์ โปรแกรม และทักษะที่ใช้จริงในการทำงาน — เรียงเป็นฟิล์มทีละเฟรม',
      skill_cat1: 'AI & Generative Media',
      skill_mj: 'Midjourney — Image Gen',
      skill_gpt: 'ChatGPT & Prompting',
      skill_vid: 'Generative Video / Motion',
      skill_intel: 'Intel AI Everywhere',
      skill_cat2: 'Edit & Post-Production',
      skill_capcut: 'CapCut — Effects & Keyframes',
      skill_premiere: 'Adobe Premiere Pro',
      skill_ps: 'Photoshop — Cover & Retouch',
      skill_sound: 'Sound & Beat Sync',
      skill_cat3: 'Camera & Lighting',
      skill_cam: 'DSLR / Mirrorless',
      skill_photo: 'Event Photo — Awakening BKK',
      skill_light: 'Studio Lighting & Mood',
      skill_canva: 'Canva — Social Design',
      skill_cat4: 'On-Air & Storytelling',
      skill_anchor: 'ผู้ประกาศข่าว & พิธีกรหน้ากล้อง',
      skill_story: 'Digital Storytelling & เขียนบท',
      skill_tiktok: 'Short-form — TikTok / Reels',
      skill_trend: 'Social Trend & Engagement',
      skill_cat5: 'Crew, Set & People Skills',
      skill_makeup: 'On-set Makeup & Styling',
      skill_props: 'Props & Scene Management',
      skill_staff: 'Staff CDE & Diamond Days',
      skill_pitch: 'Pitching & Teamwork (TH/EN)',

      works_subtitle: 'ผลงานจริงทุกชิ้น — คลิกที่โปสเตอร์เพื่อดูวิดีโอระดับคมชัดบนเว็บได้ทันที',
      filter_all: 'ทั้งหมด',
      filter_ai: 'AI Content',
      filter_anchor: 'ผู้ประกาศ & พากย์',
      filter_short: 'Short-form',
      filter_edit: 'ตัดต่อ & โฆษณา',
      filter_onset: 'ออกกอง & กิจกรรม',
      reel_play_cta: 'เล่นวิดีโอบนเว็บ',
      reel_view_photo: 'ดูภาพขยาย',

      reel1_meta: 'EP.01 — AI CINEMA',
      reel1_title: 'ภาพยนตร์อนิเมชันแฟนตาซี — The Golden Knight (EP.1)',
      reel1_desc: 'สร้างสรรค์ภาพยนตร์แอนิเมชันเต็มเรื่องด้วย Generative AI ควบคุม Mood & Tone, การเคลื่อนไหวของตัวละคร และผสานดนตรีประกอบเชิงภาพยนตร์',

      reel2_meta: 'EP.02 — GENERATIVE AI',
      reel2_title: 'ตัวละครเสมือน & AI Avatar — HeyGen AI',
      reel2_desc: 'จำลองและสร้างตัวละคร AI เสมือนจริงขยับปากพูดตามบท (Lip-sync & Voice AI) สำหรับสื่อโฆษณาและการตลาดดิจิทัลยุคใหม่',

      reel3_meta: 'EP.03 — VOICE & STORYTELLING',
      reel3_title: 'บทพากย์เสียงสารคดี — วาฬ 52 Hz (The 52-Hertz Whale)',
      reel3_desc: 'งานพากย์เสียงสารคดีเล่าเรื่อง (Voiceover & Audio Storytelling) ควบคุมจังหวะ ลมหายใจ และถ่ายทอดอารมณ์ความเหงาของวาฬใต้สมุทร',

      reel4_meta: 'EP.04 — NEWSROOM (ชุดที่ 1)',
      reel4_title: 'ผู้ประกาศข่าวในสตูดิโอ & บอร์ดแคสต์ TNN News (ชุดที่ 1)',
      reel4_desc: 'ฝึกปฏิบัติการอ่านข่าวสดหน้ากล้องผ่าน Teleprompter ควบคุมน้ำเสียง จังหวะ บุคลิกภาพหน้ากล้องโทรทัศน์ และการจำลองสกู๊ปข่าว',

      reel5_meta: 'EP.05 — NEWSROOM (ชุดที่ 2)',
      reel5_title: 'ผู้ประกาศข่าวโทรทัศน์ & รายงานสกู๊ปข่าว — BU Broadcast (ชุดที่ 2)',
      reel5_desc: 'ผลงานผู้ประกาศข่าวฉบับสมบูรณ์ (Master Cut) เปิดรายการหน้ากล้องในสตูดิโอ รายงานสกู๊ปข่าวอาชญากรรมและคลิปกล้องวงจรปิดพร้อมเสียงบรรยาย',

      reel6_meta: 'EP.06 — COMMERCIAL PRODUCTION',
      reel6_title: 'วิดีโอโฆษณาจำลอง — ฟิตเนส & เครื่องดื่มเกลือแร่',
      reel6_desc: 'ถ่ายทำและกำกับโฆษณาจำลองในยิม ออกแบบมุมกล้อง การเคลื่อนไหวแอ็กชัน จังหวะตัดต่อกระชับเร้าใจ และเกรดสี Mood & Tone',

      reel7_meta: 'EP.07 — SHORT-FORM',
      reel7_title: 'Creative Short Content — ตำส้มตำแซ่บ (CapCut)',
      reel7_desc: 'ตัดต่อวิดีโอสั้นสไตล์อาหารและไลฟ์สไตล์ ดีไซน์จังหวะสับภาพตามจังหวะเพลง (Beat Sync) ใส่ Keyframe และ Sound FX ให้ดูน่ารับประทาน',

      reel8_meta: 'EP.08 — SHORT-FORM',
      reel8_title: 'Lifestyle & Food Vlog — รีวิวของอร่อย & คาเฟ่',
      reel8_desc: 'วิดีโอบล็อกเกาะเทรนด์ไลฟ์สไตล์ เล่าเรื่องเป็นธรรมชาติ ใส่ทรานซิชันซูมและสปีดการตัดต่อเพื่อดึงดูดความสนใจและ Engagement',

      reel9_meta: 'EP.09 — DIRECTOR\'S CUT',
      reel9_title: 'Cinematic Light & Mood — Red Dome Installation',
      reel9_desc: 'งานตัดต่อคุมโทนภาพยนตร์ (Color Grade & Mood) บันทึกแสงเงาศิลปะร่วมสมัยในโดมสีแดง ถ่ายทอดอารมณ์และมุมมองผู้กำกับ',

      reel10_meta: 'EP.10 — DIRECTOR\'S CUT',
      reel10_title: 'Night Street Dance & Night Market Vlog',
      reel10_desc: 'วิดีโอบันทึกโมเมนต์สตรีทแดนซ์และบรรยากาศสตรีทฟู้ดยามค่ำคืน การคุมจังหวะภาพสนุกสนานและมีชีวิตชีวา',

      reel11_meta: 'EP.11 — PHOTOGRAPHY',
      reel11_title: 'Awakening Bangkok ณ สวนรมณีนาถ',
      reel11_desc: 'ช่างภาพบันทึกเทศกาลไฟยามค่ำคืน ถ่ายทอดศิลปะแสงและปฏิสัมพันธ์ของผู้ชม',

      reel12_meta: 'EP.12 — BEHIND THE SCENES',
      reel12_title: 'Staff สาขา CDE & Diamond Days 2024',
      reel12_desc: 'ออกกองหลายหน้าที่ — ช่างแต่งหน้า หาพร็อพ และพี่บิ้วงานปฐมนิเทศ ม.กรุงเทพ',

      reel13_meta: 'EP.13 — MASTERCLASS',
      reel13_title: 'Workshop "สร้างภาพอย่างคูล AI Everywhere"',
      reel13_desc: 'อบรมและลงมือจริงกับ Intel Core Ultra ประยุกต์ AI ในการผลิตภาพและสื่อยุคใหม่',

      bts_subtitle: 'ประสบการณ์จริงหลังกล้อง — ออกกอง ถ่ายภาพ แต่งหน้านักแสดง และทีมสตาฟฟ์สาขา',
      pol_1: 'ช่างแต่งหน้ากองถ่าย',
      pol_2: 'ช่างภาพ Awakening BKK',
      pol_3: 'ผู้ประกาศข่าวในสตูดิโอ',
      pol_4: 'พี่บิ้ว Diamond Days',
      pol_5: 'CDE Back to the Future',
      pol_6: 'ออกบูธแนะนำสาขา CDE',
      pol_7: 'Intel AI Everywhere',
      pol_8: 'ทริปถ่ายภาพชมรม',

      awards_subtitle: 'รางวัลแห่งความภาคภูมิใจจากเวทีประกวดระดับประเทศ (คลิกเกียรติบัตรเพื่อขยาย)',
      award1_prize: 'เงินรางวัล <b>10,000</b> บาท',
      award1_title: 'Award of Excellence — Huawei Hub Strategic Campaign Project 2025',
      award1_desc: 'ชนะเลิศอันดับ 1 (Best Strategic Project) การประกวดแผนงานและเวิร์กช็อป HUAWEI HUB by UFicon ร่วมกับ คณะนิเทศศาสตร์ มหาวิทยาลัยกรุงเทพ (29 พ.ย. 2568)',
      award2_prize: 'รางวัล<b>ชมเชย</b> ระดับประเทศ',
      award2_title: 'Honorable Mention — Airdog VDO Contest 2024',
      award2_desc: 'รางวัลชมเชยการประกวดผลิตวิดีโอเครื่องฟอกอากาศ AIRDOG บนโซเชียลมีเดีย โดย NAPA SOLUTIONS CO., LTD. (ปี 2567)',
      cert_zoom: 'คลิกเพื่อขยาย',

      lookbook_subtitle: 'ม่านเปิดแล้ว เลื่อนดูเล่มพอร์ตฉบับจริงทั้ง 11 หน้า — คลิกจอเพื่อดูเต็มจอ หรือใช้ปุ่มลูกศรซ้าย-ขวา',
      lb_prev: 'ก่อนหน้า',
      lb_next: 'ถัดไป',
      lb_fullscreen: 'ดูเต็มจอ',

      journey_subtitle: 'เส้นทางการเรียนรู้และประสบการณ์ที่สั่งสมมาจนถึงปัจจุบัน',
      ep1_when: '2551 – 2563 • อนุบาล 1 – มัธยมศึกษาปีที่ 3',
      ep1_title: 'การศึกษาขั้นพื้นฐาน & จุดเริ่มต้นความคิดสร้างสรรค์',
      ep1_org: 'โรงเรียนบ้านนาผาง (วิบูลยาราษฎร์สามัคคี)',
      ep1_desc: 'ปูพื้นฐานการเรียนรู้ การทำกิจกรรมร่วมกับผู้อื่น และค้นพบความสนใจด้านการสื่อสารและการแสดงออก (เกรดเฉลี่ย 3.22)',
      ep2_when: '2563 – 2566 • มัธยมศึกษาปีที่ 4 – 6',
      ep2_title: 'มัธยมปลาย — เริ่มจับกล้อง ตัดต่อ และกิจกรรมโรงเรียน',
      ep2_org: 'โรงเรียนปทุมราชวงศา',
      ep2_desc: 'ฝึกฝนการถ่ายภาพ การตัดต่อวิดีโอเบื้องต้น และการทำงานเป็นทีมผ่านกิจกรรมสื่อสารของโรงเรียน (เกรดเฉลี่ย 2.51)',
      ep3_when: '2566 – ปัจจุบัน • ปริญญาตรี (กำลังศึกษาชั้นปีที่ 3)',
      ep3_title: 'คณะนิเทศศาสตร์ — สาขาการผลิตเนื้อหาสร้างสรรค์และประสบการณ์ดิจิทัล (CDE)',
      ep3_org: 'มหาวิทยาลัยกรุงเทพ (Bangkok University)',
      ep3_desc: 'รหัสนักศึกษา 166... เรียนรู้ครบวงจรทั้งการคิดคอนเทนต์ เขียนบท ถ่ายทำ ผู้ประกาศข่าว ตัดต่อ และ Generative AI พร้อมคว้ารางวัลชนะเลิศ Huawei Hub (เกรดเฉลี่ยสะสม 3.29)',

      contact_subtitle: 'พร้อมสำหรับการฝึกงาน และการร่วมงานในทุกโปรเจกต์สร้างสรรค์ค่ะ',
      cs_talent: 'นางสาว ขนิษฐา วันไชย (อ้อม)',
      cs_pos: 'AI Content Creator • Video Editor • Production Assistant',
      cs_loc: 'มหาวิทยาลัยกรุงเทพ • กรุงเทพฯ / ปทุมธานี / อำนาจเจริญ',
      clapper_hint: 'คลิกที่สเลทเพื่อสั่ง ACTION!',

      cv_title: 'ต้องการเอกสารประวัติและผลงานฉบับย่อ?',
      cv_desc: 'เปิด Resume / CV ฉบับทางการพร้อมพิมพ์ หรือบันทึกเป็น PDF ได้ทันที',
      cv_btn: 'เปิดดู Resume / CV',

      footer_copyright: '© 2023–2026 Khanittha Wanchai • Creative Content Production and Digital Experience (CDE) • School of Communication Arts, Bangkok University'
    },
    en: {
      nav_about: 'Director',
      nav_skills: 'Toolkit',
      nav_works: 'Works',
      nav_bts: 'BTS',
      nav_awards: 'Awards',
      nav_lookbook: 'Lookbook',
      nav_journey: 'Journey',
      nav_contact: 'Contact',
      nav_cv: 'CV / Resume',
      nav_resume_m: 'Open Resume (CV)',

      dock_works: 'Works',
      dock_lookbook: 'Lookbook',
      dock_cv: 'Resume',
      dock_contact: 'Contact',

      hero_name: 'Khanittha Wanchai',
      hero_nick: '(Aom)',
      hero_desc: 'Communication Arts student in Creative Content Production and Digital Experience (CDE) at Bangkok University — crafting stories through <strong>Visuals, Light, Sound & Generative AI</strong> from studio newsrooms to national competitions.',
      hb_huawei: 'Huawei Hub Winner',
      hb_gpa: 'Comm Arts BU GPA',
      hb_reels: 'Video & AI Projects',
      hero_cta_reel: 'Watch Showreel',
      hero_cta_lookbook: '11-Page Lookbook',
      hero_cta_contact: 'Get in Touch',
      hero_sticker1: 'Huawei Hub — 1st Place',
      hero_sticker2: 'GPA <b>3.29</b> • Comm Arts BU',
      vf_lt_name: 'Khanittha Wanchai • Aom',
      vf_shutter: 'CAPTURE',

      about_subtitle: 'Get to know the director — passionate about cinematic storytelling across all media.',
      about_lead: 'Every frame tells a story — my mission is to make the audience <span class="grad-text">feel</span> it.',
      about_p1: 'Throughout my studies in <strong>Creative Content Production and Digital Experience (CDE), School of Communication Arts, Bangkok University</strong>, I have practiced the complete production workflow: creative concepting, scriptwriting, studio anchoring, on-set filming, editing, and color grading.',
      about_p2: 'I combine <strong>creative imagination + production craftsmanship + Generative AI</strong> to deliver meaningful stories. Humble, reliable, eager to learn from industry mentors, and ready to give 100% to every project.',

      pil1_title: 'Continuous Growth & AI Adaptability',
      pil1_desc: 'Eager to master emerging production techniques and AI tools while welcoming constructive feedback.',
      pil2_title: 'End-to-End Production Experience',
      pil2_desc: 'Hands-on experience across ideation, scriptwriting, filming, editing, and Generative AI media creation.',
      pil3_title: 'Audience & Social Trend Insight',
      pil3_desc: 'Analyzing platform trends and viewer behavior to craft resonant content that drives genuine engagement.',
      pil4_title: 'Teamwork & On-Set Problem Solving',
      pil4_desc: 'Strong crew communication, adaptability under pressure, and full accountability on every shoot.',

      dna_char_k: 'PERSONALITY',
      dna_char_v: 'Cheerful, adaptable, collaborative & humble',
      dna_hobby_k: 'INTERESTS',
      dna_hobby_v: 'Cinema, music, photography & short-form editing',

      stat_huawei: 'Huawei Hub 1st Place Champion',
      stat_prize: 'Team Prize Pool (THB)',
      stat_gpa: 'GPA Comm Arts CDE, BU',
      stat_works: 'Video, AI & Photo Projects',

      skills_subtitle: 'Equipment, software, and real production skills — arranged frame by frame.',
      skill_cat1: 'AI & Generative Media',
      skill_mj: 'Midjourney — Image Gen',
      skill_gpt: 'ChatGPT & Prompting',
      skill_vid: 'Generative Video / Motion',
      skill_intel: 'Intel AI Everywhere',
      skill_cat2: 'Edit & Post-Production',
      skill_capcut: 'CapCut — Effects & Keyframes',
      skill_premiere: 'Adobe Premiere Pro',
      skill_ps: 'Photoshop — Cover & Retouch',
      skill_sound: 'Sound & Beat Sync',
      skill_cat3: 'Camera & Lighting',
      skill_cam: 'DSLR / Mirrorless',
      skill_photo: 'Event Photo — Awakening BKK',
      skill_light: 'Studio Lighting & Mood',
      skill_canva: 'Canva — Social Design',
      skill_cat4: 'On-Air & Storytelling',
      skill_anchor: 'News Anchor & On-Camera Host',
      skill_story: 'Digital Storytelling & Scriptwriting',
      skill_tiktok: 'Short-form — TikTok / Reels',
      skill_trend: 'Social Trend & Engagement',
      skill_cat5: 'Crew, Set & People Skills',
      skill_makeup: 'On-set Makeup & Styling',
      skill_props: 'Props & Scene Management',
      skill_staff: 'Staff CDE & Diamond Days',
      skill_pitch: 'Pitching & Teamwork (TH/EN)',

      works_subtitle: 'Real projects — click any poster to stream crisp HD videos directly on the web.',
      filter_all: 'All',
      filter_ai: 'AI Content',
      filter_anchor: 'Anchor & Voice',
      filter_short: 'Short-form',
      filter_edit: 'Editing & Ads',
      filter_onset: 'On-set & Crew',
      reel_play_cta: 'Watch Video',
      reel_view_photo: 'View Photo',

      reel1_meta: 'EP.01 — AI CINEMA',
      reel1_title: 'Fantasy AI Animation — The Golden Knight (EP.1)',
      reel1_desc: 'Produced a full cinematic fantasy animation using Generative AI with consistent characters, dynamic lighting, and immersive soundtrack.',

      reel2_meta: 'EP.02 — GENERATIVE AI',
      reel2_title: 'Virtual Character & AI Host — HeyGen AI',
      reel2_desc: 'Created a hyper-realistic AI talking avatar with synchronized voice and lip-sync for modern digital marketing content.',

      reel3_meta: 'EP.03 — VOICE & STORYTELLING',
      reel3_title: 'Documentary Voiceover — The 52-Hertz Whale',
      reel3_desc: 'Documentary narration and storytelling piece, demonstrating vocal modulation, pacing, and emotional resonance.',

      reel4_meta: 'EP.04 — NEWSROOM (PART 1)',
      reel4_title: 'Studio News Anchor & Broadcast Report — TNN News (Part 1)',
      reel4_desc: 'Live television news broadcasting practical, teleprompter reading, vocal clarity, on-camera presence, and newsroom pacing.',

      reel5_meta: 'EP.05 — NEWSROOM (PART 2)',
      reel5_title: 'Television News Anchor & Crime Scoop — BU Broadcast (Part 2)',
      reel5_desc: 'Complete broadcast news package featuring studio on-camera anchor introduction, investigative CCTV footage, and field narration.',

      reel6_meta: 'EP.06 — COMMERCIAL PRODUCTION',
      reel6_title: 'Spec Commercial Ad — Fitness & Energy Drink',
      reel6_desc: 'Directed and edited a fast-paced gym commercial spot with dynamic camera work, punchy sound design, and color grading.',

      reel7_meta: 'EP.07 — SHORT-FORM',
      reel7_title: 'Creative Short Content — Somtum (CapCut)',
      reel7_desc: 'Short-form food content editing with beat syncing, keyframe zooms, and snappy sound effects for TikTok and Reels.',

      reel8_meta: 'EP.08 — SHORT-FORM',
      reel8_title: 'Lifestyle & Food Vlog — Cafe & Street Eats',
      reel8_desc: 'Lifestyle food vlog capturing candid food moments, snappy transitions, and engaging visual pacing.',

      reel9_meta: 'EP.09 — DIRECTOR\'S CUT',
      reel9_title: 'Cinematic Light & Mood — Red Dome Installation',
      reel9_desc: 'Cinematic tone study in a red dome art space, emphasizing atmosphere, color grading, and intimate framing.',

      reel10_meta: 'EP.10 — DIRECTOR\'S CUT',
      reel10_title: 'Night Street Dance & Night Market Vlog',
      reel10_desc: 'Energetic street dance and night market food vlog capturing youthful vibrancy and beat-matched cuts.',

      reel11_meta: 'EP.11 — PHOTOGRAPHY',
      reel11_title: 'Awakening Bangkok at Rommaninat Park',
      reel11_desc: 'Event photographer capturing nighttime light installations, mood, and visitor interactions.',

      reel12_meta: 'EP.12 — BEHIND THE SCENES',
      reel12_title: 'Staff CDE & Diamond Days 2024',
      reel12_desc: 'Multidisciplinary on-set crew: makeup artist, prop management, and freshman orientation MC.',

      reel13_meta: 'EP.13 — MASTERCLASS',
      reel13_title: 'Workshop "AI Everywhere with Intel Core Ultra"',
      reel13_desc: 'Hands-on masterclass leveraging Intel Core Ultra processors for generative media production.',

      bts_subtitle: 'Hands-on experience behind the camera — filming, photography, on-set makeup, and crew staff.',
      pol_1: 'On-Set Makeup Artist',
      pol_2: 'Awakening BKK Photographer',
      pol_3: 'Studio News Anchor',
      pol_4: 'Diamond Days Orientation',
      pol_5: 'CDE Back to the Future',
      pol_6: 'CDE Open House Booth',
      pol_7: 'Intel AI Everywhere',
      pol_8: 'Photo Club Field Trip',

      awards_subtitle: 'National competition honors and achievements (click certificates to zoom).',
      award1_prize: 'Prize: <b>10,000</b> THB',
      award1_title: 'Award of Excellence — Huawei Hub Strategic Campaign Project 2025',
      award1_desc: '1st Place Winner (Best Strategic Project) in the HUAWEI HUB by UFicon strategic campaign pitching with BU School of Communication Arts (Nov 2025).',
      award2_prize: 'National <b>Honorable Mention</b>',
      award2_title: 'Honorable Mention — Airdog VDO Contest 2024',
      award2_desc: 'National Honorable Mention in the Airdog Air Purifier short-video contest by NAPA SOLUTIONS CO., LTD. (2024).',
      cert_zoom: 'Click to Zoom',

      lookbook_subtitle: 'Curtain rises! Flip through all 11 pages of the official portfolio lookbook — click to view fullscreen.',
      lb_prev: 'Prev',
      lb_next: 'Next',
      lb_fullscreen: 'Fullscreen',

      journey_subtitle: 'Learning milestones and creative journey from early years to university.',
      ep1_when: '2008 – 2020 • Kindergarten 1 – Grade 9',
      ep1_title: 'Primary & Lower Secondary Education',
      ep1_org: 'Ban Naphang School',
      ep1_desc: 'Built strong foundations in communication, group collaboration, and creative expression (GPA: 3.22).',
      ep2_when: '2020 – 2023 • Upper Secondary (Grade 10 – 12)',
      ep2_title: 'Upper Secondary — Photography, Editing & School Media',
      ep2_org: 'Patumratchawongsa School',
      ep2_desc: 'Developed skills in photography, video editing, and teamwork through school media activities (GPA: 2.51).',
      ep3_when: '2023 – Present • Bachelor’s Degree (3rd Year)',
      ep3_title: 'School of Communication Arts — Creative Content Production & Digital Experience (CDE)',
      ep3_org: 'Bangkok University',
      ep3_desc: 'Class of 2023 (ID 166...). Mastering end-to-end content production, scriptwriting, broadcast anchoring, editing, and Generative AI (Cumulative GPAX: 3.29).',

      contact_subtitle: 'Open for internships, production roles, and creative collaborations.',
      cs_talent: 'Miss Khanittha Wanchai (Aom)',
      cs_pos: 'AI Content Creator • Video Editor • Production Assistant',
      cs_loc: 'Bangkok University • Bangkok / Pathum Thani',
      clapper_hint: 'Click the clapperboard to call ACTION!',

      cv_title: 'Looking for a concise CV / Resume?',
      cv_desc: 'View the print-ready Resume / CV or download it as PDF.',
      cv_btn: 'View Resume / CV',

      footer_copyright: '© 2023–2026 Khanittha Wanchai • Creative Content Production and Digital Experience (CDE) • School of Communication Arts, Bangkok University'
    }
  };

  const rolesMap = {
    th: ['AI Content Creator', 'ผู้ประกาศข่าว & พิธีกร', 'Video Editor & ตัดต่อ', 'ตากล้อง & ภาพนิ่ง', 'นักเล่าเรื่องสร้างสรรค์'],
    en: ['AI Content Creator', 'News Anchor & MC', 'Video Editor & Motion', 'On-Set Photographer', 'Creative Storyteller']
  };

  const lookbookTitlesMap = {
    th: [
      'หน้าปก (Cover Page)', 'คำนำ (Preface & Vision)', 'เหตุผลที่อยากเข้าทำงาน (Reasons & Goals)',
      'ข้อมูลส่วนตัว & ประวัติการศึกษา', 'กิจกรรมในมหาวิทยาลัย (CDE Staff & Awakening Bangkok)',
      'ผลงานในชั้นเรียน — AI Content Creation', 'ผลงานในชั้นเรียน — ผู้ประกาศข่าว & CapCut',
      'กิจกรรม — ผลงานตัดต่อวิดีโอส่วนตัว', 'เวิร์กช็อป — CDE Back to the Future & Intel AI',
      'เกียรติบัตร — Huawei Hub 2025 (1st Place) & Airdog 2024', 'ขอขอบคุณ (Thank You)'
    ],
    en: [
      'Cover Page', 'Preface & Vision', 'Career Goals & Motivation',
      'Personal Profile & Education', 'Campus Life: CDE Staff & Awakening BKK',
      'Coursework: AI Content Creation', 'Coursework: News Anchor & CapCut',
      'Projects: Personal Video Showcase', 'Workshops: CDE Future & Intel AI',
      'Awards: Huawei Hub 2025 (1st Place) & Airdog 2024', 'Thank You & Wrap'
    ]
  };

  let currentLang = localStorage.getItem('aom-lang') || 'th';
  let roles = rolesMap[currentLang] || rolesMap.th;
  let titles = lookbookTitlesMap[currentLang] || lookbookTitlesMap.th;

  const setLanguage = (lang, notify = true) => {
    currentLang = lang === 'en' ? 'en' : 'th';
    root.lang = currentLang;
    localStorage.setItem('aom-lang', currentLang);

    const lTh = $('.lang-toggle .l-th');
    const lEn = $('.lang-toggle .l-en');
    if (lTh && lEn) {
      lTh.classList.toggle('active', currentLang === 'th');
      lEn.classList.toggle('active', currentLang === 'en');
    }

    $$('.m-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setlang === currentLang);
    });

    const dict = I18N[currentLang] || I18N.th;
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.innerHTML = dict[key];
    });

    roles = rolesMap[currentLang] || rolesMap.th;
    if (typeof typeEl !== 'undefined' && typeEl && roles && roles.length) {
      typeEl.textContent = roles[0];
    }

    titles = lookbookTitlesMap[currentLang] || lookbookTitlesMap.th;
    if (typeof ttl !== 'undefined' && ttl && typeof page !== 'undefined' && titles[page - 1]) {
      ttl.textContent = titles[page - 1];
    }

    if (notify && typeof showToast === 'function') {
      showToast(currentLang === 'th' ? 'สลับเป็นภาษาไทยเรียบร้อย' : 'Switched to English');
    }
  };

  /* ---------- Split hero title into chars ---------- */
  $$('[data-split]').forEach(el => {
    let i = +(el.dataset.offset || 0);
    el.innerHTML = [...el.textContent].map(c => c === ' ' ? ' ' : `<span class="ch" style="--i:${i++}">${c}</span>`).join('');
  });

  /* ---------- Start ready state immediately ---------- */
  document.body.classList.add('ready');

  /* ---------- Typewriter roles ---------- */
  const typeEl = $('#typeText');
  if (typeEl) {
    let r = 0, c = roles[0].length, del = false;
    typeEl.textContent = roles[0];
    const loop = () => {
      const word = roles[r];
      typeEl.textContent = word.slice(0, c);
      if (!del && c < word.length) c++;
      else if (!del) { del = true; return setTimeout(loop, 1500); }
      else if (c > 0) c--;
      else { del = false; r = (r + 1) % roles.length; }
      setTimeout(loop, del ? 35 : 75);
    };
    setTimeout(loop, 1800);
  }

  /* ---------- Interactive Director Monitor: LUT Switcher & Shutter ---------- */
  const directorVf = $('#directorVf');
  const lutLabel = $('#lutLabel');
  const lutNames = {
    natural: 'LUT: REC.709',
    warm: 'LUT: GOLD 35MM',
    noir: 'LUT: NOIR B&W'
  };
  $$('[data-setlut]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lut = btn.dataset.setlut || 'natural';
      $$('[data-setlut]').forEach(b => b.classList.toggle('active', b === btn));
      if (directorVf) directorVf.dataset.lut = lut;
      if (lutLabel && lutNames[lut]) lutLabel.textContent = lutNames[lut];
    });
  });

  const shutterBtn = $('#shutterBtn');
  const vfFlash = $('#vfFlash');
  if (shutterBtn && vfFlash) {
    shutterBtn.addEventListener('click', () => {
      vfFlash.classList.add('fire');
      setTimeout(() => vfFlash.classList.remove('fire'), 90);
      if (typeof showToast === 'function') {
        showToast(currentLang === 'th' ? 'บันทึกเฟรมภาพ A001_C014.RAW เรียบร้อย' : 'Frame captured: A001_C014.RAW');
      }
    });
  }

  /* ---------- Hero spotlight + 3D tilt (throttled) ---------- */
  const hero = $('.hero'), spot = $('.spotlight');
  if (hero && spot && fine) {
    let spotTicking = false;
    hero.addEventListener('mousemove', e => {
      if (!spotTicking) {
        requestAnimationFrame(() => {
          const b = hero.getBoundingClientRect();
          spot.style.left = (e.clientX - b.left) + 'px';
          spot.style.top = (e.clientY - b.top) + 'px';
          spotTicking = false;
        });
        spotTicking = true;
      }
    }, { passive: true });
  }
  const tilt = (el, max = 10) => {
    if (!fine || reduce) return;
    let ticking = false;
    el.addEventListener('mousemove', e => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const b = el.getBoundingClientRect();
          const px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height;
          el.style.transform = `rotateY(${(px - .5) * max * 2}deg) rotateX(${(.5 - py) * max * 2}deg)`;
          el.style.setProperty('--mx', px * 100 + '%');
          el.style.setProperty('--my', py * 100 + '%');
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    el.addEventListener('mouseleave', () => { el.style.transform = ''; });
  };
  $$('.vf, .frame').forEach(el => tilt(el, el.classList.contains('vf') ? 8 : 5));

  /* Viewfinder focus box wanders */
  const focus = $('.vf-focus');
  if (focus && !reduce) {
    const pts = [[50, 36], [44, 30], [56, 40], [50, 34], [47, 44]];
    let k = 0;
    setInterval(() => { k = (k + 1) % pts.length; focus.style.left = pts[k][0] + '%'; focus.style.top = pts[k][1] + '%'; }, 2400);
  }

  /* Live timecode (throttled to 10 FPS) */
  const tcEls = $$('[data-tc]');
  const t0 = performance.now();
  const pad = n => String(n).padStart(2, '0');
  const updateTc = () => {
    const s = (performance.now() - t0) / 1000;
    const str = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(Math.floor(s * 24) % 24)}`;
    for (let i = 0; i < tcEls.length; i++) {
      tcEls[i].textContent = (tcEls[i].dataset.tc || '') + str;
    }
  };
  setInterval(updateTc, 100);
  updateTc();

  /* ---------- Magnetic buttons ---------- */
  if (fine && !reduce) $$('.btn').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .22}px, ${(e.clientY - r.top - r.height / 2) * .3}px)`;
    });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });

  /* ---------- Duplicate marquee tracks for seamless loop ---------- */
  $$('[data-loop]').forEach(t => { t.innerHTML += t.innerHTML; });

  /* ---------- Marquee sign corner bulbs ---------- */
  $$('.marquee-sign').forEach(sign => {
    const pts = [['10px', '10px'], ['calc(100% - 10px)', '10px'], ['10px', 'calc(100% - 10px)'], ['calc(100% - 10px)', 'calc(100% - 10px)']];
    pts.forEach(([l, t]) => {
      const b = document.createElement('i'); b.className = 'bulb'; b.style.left = l; b.style.top = t; sign.appendChild(b);
    });
  });

  /* ---------- Reveal on scroll + counters ---------- */
  const countUp = el => {
    if (el.dataset.counted) return;
    el.dataset.counted = '1';
    const end = parseFloat(el.dataset.count), dec = (el.dataset.count.split('.')[1] || '').length;
    const pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    const t = performance.now(), dur = 1600;
    const step = now => {
      const p = Math.min((now - t) / dur, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = pre + (end * e).toFixed(dec) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('in');
    $$('[data-count]', en.target).forEach(countUp);
    if (en.target.matches('[data-count]')) countUp(en.target);
    io.unobserve(en.target);
  }), { threshold: .08, rootMargin: '0px 0px 80px 0px' });
  $$('[data-reveal], .scene-head, .ep, .stats, .theatre').forEach(el => io.observe(el));

  const checkVisible = () => {
    $$('[data-reveal], .scene-head, .ep, .stats, .theatre').forEach(el => {
      const b = el.getBoundingClientRect();
      if (b.top < window.innerHeight + 100 && b.bottom > -100) {
        el.classList.add('in');
        $$('[data-count]', el).forEach(countUp);
      }
    });
  };
  window.addEventListener('scroll', checkVisible, { passive: true });
  setTimeout(checkVisible, 50);

  /* ---------- Nav active + Mobile Dock active + Scroll progress ---------- */
  const bar = $('.scroll-bar');
  const links = $$('.nav-links a');
  const dockLinks = $$('.mobile-dock .dock-item[href^="#"]');
  const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const onScroll = () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) * 100) + '%';
    let cur = null;
    secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .42) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
    dockLinks.forEach(a => {
      if (!a.classList.contains('dock-cta')) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
      }
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menu = $('#mobileMenu'), menuBtn = $('#menuBtn');
  if (menu && menuBtn) {
    menuBtn.addEventListener('click', () => {
      const o = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(o));
      document.body.style.overflow = o ? 'hidden' : '';
    });
    $$('a', menu).forEach(a => a.addEventListener('click', () => {
      menu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- Wire Language toggles ---------- */
  const langToggleBtn = $('#langToggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      setLanguage(currentLang === 'th' ? 'en' : 'th');
    });
  }
  $$('.m-lang-btn').forEach(b => {
    b.addEventListener('click', () => {
      setLanguage(b.dataset.setlang || 'th');
    });
  });

  /* ---------- Works filter ---------- */
  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    $$('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    $$('.reel').forEach(r => r.classList.toggle('hide', f !== 'all' && r.dataset.cat !== f));
  }));

  /* ---------- Lightbox (Images) ---------- */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  window.openLightbox = (src, cap) => { lbImg.src = src; lbCap.textContent = cap || ''; lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lb-close')) closeLb(); });
  $$('[data-lightbox]').forEach(el => el.addEventListener('click', () => openLightbox(el.dataset.lightbox, el.dataset.caption)));

  /* ---------- Cinema Video Modal Player ---------- */
  const vm = $('#videoModal'), vmVideo = $('#vmVideo'), vmTitle = $('#vmTitle'), vmMeta = $('#vmMeta'), vmDesc = $('#vmDesc'), vmDriveLink = $('#vmDriveLink');
  window.openVideoModal = (src, meta, title, desc, driveUrl) => {
    if (!vm || !vmVideo) return;
    vmVideo.src = src;
    vmVideo.load();
    if (vmMeta) vmMeta.textContent = meta || 'NOW PLAYING';
    if (vmTitle) vmTitle.textContent = title || '';
    if (vmDesc) vmDesc.textContent = desc || '';
    if (vmDriveLink) {
      if (driveUrl) {
        vmDriveLink.href = driveUrl;
        vmDriveLink.style.display = 'inline-flex';
      } else {
        vmDriveLink.style.display = 'none';
      }
    }
    vm.classList.add('open');
    document.body.style.overflow = 'hidden';
    vmVideo.play().catch(() => {});
  };

  const closeVideoModal = () => {
    if (!vm || !vmVideo) return;
    vmVideo.pause();
    vmVideo.removeAttribute('src');
    vmVideo.load();
    vm.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (vm) {
    vm.addEventListener('click', e => {
      if (e.target === vm || e.target.closest('.vm-close') || e.target.id === 'vmBackdrop') {
        closeVideoModal();
      }
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLb();
      closeVideoModal();
    }
  });

  $$('[data-video]').forEach(el => el.addEventListener('click', e => {
    e.preventDefault();
    const meta = $('.reel-meta', el)?.textContent || el.dataset.meta;
    const title = $('h3', el)?.textContent || el.dataset.title;
    const desc = $('p', el)?.textContent || el.dataset.desc;
    openVideoModal(
      el.dataset.video,
      meta,
      title,
      desc,
      el.dataset.drive
    );
  }));

  /* ---------- Lookbook theatre ---------- */
  const total = titles.length;
  let page = 1;
  const scr = $('#screenImg'), bgScr = $('#screenBg'), num = $('#pageNum'), ttl = $('#pageTitle'), thumbs = $('#thumbs');
  if (scr) {
    titles.forEach((t, i) => {
      const b = document.createElement('button');
      b.className = 'thumb'; b.setAttribute('aria-label', `หน้า ${i + 1}: ${t}`);
      b.innerHTML = `<img src="assets/pages/thumb-${i + 1}.webp" alt="" loading="lazy">`;
      b.addEventListener('click', () => go(i + 1));
      thumbs.appendChild(b);
    });
    const go = p => {
      page = (p - 1 + total) % total + 1;
      scr.classList.add('swap');
      setTimeout(() => {
        scr.src = `assets/pages/page-${page}.webp`;
        if (bgScr) bgScr.src = scr.src;
        scr.onload = () => scr.classList.remove('swap');
      }, 180);
      num.textContent = String(page).padStart(2, '0');
      ttl.textContent = titles[page - 1];
      $$('.thumb', thumbs).forEach((t, i) => t.classList.toggle('active', i + 1 === page));
      const a = $$('.thumb', thumbs)[page - 1];
      thumbs.scrollTo({ left: a.offsetLeft - thumbs.clientWidth / 2 + a.clientWidth / 2, behavior: 'smooth' });
    };
    $$('.thumb', thumbs)[0].classList.add('active');
    $('#prevPage').addEventListener('click', e => { e.stopPropagation(); go(page - 1); });
    $('#nextPage').addEventListener('click', e => { e.stopPropagation(); go(page + 1); });
    $$('[data-page]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); go(page + +b.dataset.page); }));
    $('#zoomPage').addEventListener('click', () => openLightbox(`assets/pages/page-${page}.webp`, `หน้า ${page}: ${titles[page - 1]}`));
    $('.screen').addEventListener('click', () => openLightbox(`assets/pages/page-${page}.webp`, `หน้า ${page}: ${titles[page - 1]}`));
    let sx = 0;
    $('.screen').addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    $('.screen').addEventListener('touchend', e => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) go(page + (dx < 0 ? 1 : -1)); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLb();
      const th = $('.theatre').getBoundingClientRect();
      const visible = th.top < innerHeight && th.bottom > 0;
      if ((lb.classList.contains('open') && lbImg.src.includes('/pages/')) || visible) {
        if (e.key === 'ArrowRight') { go(page + 1); if (lb.classList.contains('open')) lbImg.src = `assets/pages/page-${page}.webp`; }
        if (e.key === 'ArrowLeft') { go(page - 1); if (lb.classList.contains('open')) lbImg.src = `assets/pages/page-${page}.webp`; }
      }
    });
  }

  /* ---------- Toast + copy ---------- */
  const toast = $('#toast');
  const showToast = m => { toast.textContent = m; toast.classList.add('show'); clearTimeout(showToast.t); showToast.t = setTimeout(() => toast.classList.remove('show'), 2400); };
  $$('[data-copy]').forEach(b => b.addEventListener('click', () => {
    navigator.clipboard.writeText(b.dataset.copy).then(() => showToast(b.dataset.msg || 'คัดลอกข้อความแล้วค่ะ')).catch(() => showToast('คัดลอกไม่สำเร็จ'));
  }));

  /* ---------- Confetti (geometric gold + rose ribbons, zero text symbols) ---------- */
  const cv = $('#confetti'), cx = cv.getContext('2d');
  let parts = [], running = false;
  const sizeCv = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; };
  sizeCv(); addEventListener('resize', sizeCv);
  const colors = ['#FF3D7F', '#FF8FB8', '#F6C46A', '#FFE7A8', '#B69CFF', '#ffffff'];
  window.confetti = (x = innerWidth / 2, y = innerHeight / 2, n = 130) => {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, s: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: colors[i % colors.length], life: 1, diamond: Math.random() < .3 });
    }
    if (!running) { running = true; requestAnimationFrame(drawC); }
  };
  const drawC = () => {
    const d = devicePixelRatio;
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(p => p.life > 0);
    parts.forEach(p => {
      p.vy += .22; p.vx *= .985; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life -= .009;
      cx.save(); cx.translate(p.x * d, p.y * d); cx.rotate(p.r); cx.globalAlpha = Math.max(p.life, 0); cx.fillStyle = p.c;
      if (p.diamond) {
        const sz = p.s * 0.75 * d;
        cx.rotate(Math.PI / 4);
        cx.fillRect(-sz / 2, -sz / 2, sz, sz);
      } else {
        cx.fillRect(-p.s * d / 2, -p.s * d / 4, p.s * d, p.s * d / 2);
      }
      cx.restore();
    });
    if (parts.length) requestAnimationFrame(drawC); else { running = false; cx.clearRect(0, 0, cv.width, cv.height); }
  };
  $$('[data-confetti]').forEach(el => el.addEventListener('click', e => confetti(e.clientX, e.clientY)));

  /* Awards: confetti burst when first visible */
  const aw = $('#awards');
  if (aw) new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { setTimeout(() => confetti(innerWidth / 2, innerHeight * .35, 160), 400); o.disconnect(); } }, { threshold: .35 }).observe(aw);

  /* ---------- Clapperboard: ACTION! ---------- */
  const clapper = $('#clapper');
  if (clapper) {
    let take = 1;
    clapper.addEventListener('click', e => {
      clapper.classList.add('clap');
      take++;
      $('#takeNo').textContent = String(take).padStart(2, '0');
      confetti(e.clientX, e.clientY, 90);
      showToast(take % 2 ? 'CUT! บันทึกเทคเรียบร้อย' : 'ACTION! เริ่มต้นการถ่ายทำ');
      setTimeout(() => clapper.classList.remove('clap'), 260);
    });
  }

  /* ---------- Theatre curtains open on view ---------- */
  const th = $('.theatre');
  if (th) new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { setTimeout(() => th.classList.add('open'), 250); o.disconnect(); } }, { threshold: .3 }).observe(th);

  /* =====================================================================
     3D CINEMA WORLD — optimized 60/120 FPS render loop
     ===================================================================== */
  const c3 = $('#film3d');
  if (c3) {
    const g = c3.getContext('2d', { alpha: true });
    let W = 0, H = 0, DPR = Math.min(devicePixelRatio || 1, 1.25);
    const resize = () => {
      const b = c3.getBoundingClientRect();
      W = b.width; H = b.height;
      c3.width = Math.round(W * DPR);
      c3.height = Math.round(H * DPR);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const srcs = ['ai-work-2', 'anchor-1', 'awakening-bangkok', 'cde-staff-2', 'anchor-2', 'ai-workshop-2', 'capcut-1', 'photo-club-2', 'cde-future-1', 'edit-2', 'ai-work-3', 'cde-staff-1'];
    const imgs = srcs.map(s => { const im = new Image(); im.src = `assets/cine/${s}.jpg`; return im; });

    const bCan = document.createElement('canvas');
    bCan.width = 64; bCan.height = 64;
    const bg = bCan.getContext('2d');
    const bGr = bg.createRadialGradient(32, 32, 0, 32, 32, 32);
    bGr.addColorStop(0, 'rgba(255, 143, 184, 0.85)');
    bGr.addColorStop(0.4, 'rgba(255, 61, 127, 0.4)');
    bGr.addColorStop(1, 'rgba(255, 61, 127, 0)');
    bg.fillStyle = bGr;
    bg.beginPath(); bg.arc(32, 32, 32, 0, Math.PI * 2); bg.fill();

    const strips = [
      { y: -130, z: 540, amp: 65, freq: .0040, tilt: -.16, speed: .30, phase: 0, off: 0 },
      { y: 140, z: 780, amp: 85, freq: .0032, tilt: .12, speed: -.22, phase: 2, off: 5 }
    ];
    const FW = 150, FH = 112, GAP = 22, PITCH = FW + GAP, COUNT = 14;
    const bokeh = Array.from({ length: 22 }, () => ({
      x: (Math.random() - .5) * 2400, y: (Math.random() - .5) * 1400, z: 200 + Math.random() * 1500,
      r: 12 + Math.random() * 32, tw: Math.random() * 6
    }));

    let mx = 0, my = 0, tmx = 0, tmy = 0, scrollY = 0, t = 0;
    addEventListener('mousemove', e => {
      tmx = (e.clientX / innerWidth - .5) * 0.8;
      tmy = (e.clientY / innerHeight - .5) * 0.8;
    }, { passive: true });
    addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });

    const FOV = 700;
    const proj = (x, y, z) => {
      const ry = mx * .3, rx = my * .15;
      let X = x * Math.cos(ry) - z * Math.sin(ry) * .18;
      let Z = z + x * Math.sin(ry) * .35;
      let Y = y * Math.cos(rx) + Z * Math.sin(rx) * .12 - scrollY * .2;
      const s = FOV / (FOV + Z);
      return { x: W * .62 + X * s, y: H * .5 + Y * s, s };
    };

    let visible = true, rafId = null;
    const heroObserver = new IntersectionObserver(en => {
      visible = en[0].isIntersecting;
      if (visible && !rafId) {
        rafId = requestAnimationFrame(draw);
      } else if (!visible && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }, { threshold: 0.05 });
    heroObserver.observe(c3);

    const draw = () => {
      if (!visible) { rafId = null; return; }
      rafId = requestAnimationFrame(draw);

      t += reduce ? 0 : 1;
      mx += (tmx - mx) * .05; my += (tmy - my) * .05;

      g.setTransform(DPR, 0, 0, DPR, 0, 0);
      g.clearRect(0, 0, W, H);
      const light = root.dataset.theme === 'light';

      for (let i = 0; i < bokeh.length; i++) {
        const b = bokeh[i];
        const p = proj(b.x + Math.sin(t * .003 + b.tw) * 25, b.y + Math.cos(t * .002 + b.tw) * 18, b.z);
        const dia = b.r * p.s * 3.5;
        const alpha = (0.12 + 0.14 * Math.sin(t * .015 + b.tw) ** 2) * (light ? .7 : 1);
        g.globalAlpha = alpha;
        g.drawImage(bCan, p.x - dia / 2, p.y - dia / 2, dia, dia);
      }

      for (let si = 0; si < strips.length; si++) {
        const st = strips[si];
        const shift = (t * st.speed) % PITCH;
        const span = COUNT * PITCH;
        for (let i = 0; i < COUNT; i++) {
          const x0 = -span / 2 + i * PITCH + shift;
          const xc = x0 + FW / 2;
          const yc = st.y + Math.sin(xc * st.freq + st.phase + t * .005) * st.amp + xc * st.tilt;
          const zc = st.z + Math.cos(xc * st.freq * .8 + st.phase) * 100;
          const pc = proj(xc, yc, zc);
          if (pc.x < -180 || pc.x > W + 180) continue;

          const dx = 6, y2 = st.y + Math.sin((xc + dx) * st.freq + st.phase + t * .005) * st.amp + (xc + dx) * st.tilt;
          const p2 = proj(xc + dx, y2, zc);
          const ang = Math.atan2(p2.y - pc.y, p2.x - pc.x);
          const s = pc.s;

          g.save();
          g.translate(pc.x, pc.y);
          g.rotate(ang);
          g.scale(s, s);
          g.globalAlpha = 0.35 * Math.min(1, s * 1.5);

          g.fillStyle = light ? '#2a1620' : '#14080e';
          g.fillRect(-PITCH / 2, -FH / 2 - 24, PITCH, FH + 48);

          g.fillStyle = light ? '#FFF6F3' : 'rgba(255,240,245,.8)';
          for (let k = 0; k < 5; k++) {
            const sx = -PITCH / 2 + 6 + k * (PITCH / 5);
            g.fillRect(sx, -FH / 2 - 18, 12, 8);
            g.fillRect(sx, FH / 2 + 10, 12, 8);
          }

          const im = imgs[(i + st.off) % imgs.length];
          if (im.complete && im.naturalWidth) {
            const ir = im.naturalWidth / im.naturalHeight, fr = FW / FH;
            let sw = im.naturalWidth, sh = im.naturalHeight, sx = 0, sy = 0;
            if (ir > fr) { sw = sh * fr; sx = (im.naturalWidth - sw) / 2; }
            else { sh = sw / fr; sy = (im.naturalHeight - sh) * .3; }
            g.drawImage(im, sx, sy, sw, sh, -FW / 2, -FH / 2, FW, FH);
          } else {
            g.fillStyle = '#2A101C';
            g.fillRect(-FW / 2, -FH / 2, FW, FH);
          }

          g.fillStyle = `rgba(255,61,127,${0.12 + si * .04})`;
          g.fillRect(-FW / 2, -FH / 2, FW, FH);
          g.fillStyle = '#F6C46A';
          g.font = '600 9px "IBM Plex Mono", monospace';
          g.fillText(`${String((i + st.off) % 36 + 1).padStart(2, '0')}A  KODAK 5219`, -PITCH / 2 + 6, FH / 2 + 23);

          g.restore();
        }
      }

      const fx = W * (.62 + mx * .4), fy = H * (.38 + my * .35);
      g.globalAlpha = light ? 0.18 : 0.28;
      const lg = g.createLinearGradient(0, fy, W, fy);
      lg.addColorStop(0, 'rgba(255,143,184,0)');
      lg.addColorStop(fx / W, 'rgba(255,143,184,0.6)');
      lg.addColorStop(1, 'rgba(255,143,184,0)');
      g.fillStyle = lg;
      g.fillRect(0, fy - 1, W, 2);
    };

    rafId = requestAnimationFrame(draw);
  }

  /* ---------- Scroll param helper ---------- */
  const urlParam = new URLSearchParams(window.location.search);
  const targetId = urlParam.get('scroll') || window.location.hash.slice(1);
  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'instant' });
      el.classList.add('in');
      $$('[data-reveal]', el).forEach(c => c.classList.add('in'));
    }
  }
  setLanguage(currentLang, false);
})();
