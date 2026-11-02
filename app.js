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
      nav_resume_m: 'เรซูเม่ ↗',

      hero_name: 'ขนิษฐา วันไชย',
      hero_nick: '(อ้อม)',
      hero_desc: 'เด็กนิเทศที่เล่าเรื่องผ่าน <strong>ภาพ แสง เสียง และ AI</strong> — จากหน้ากล้องผู้ประกาศข่าว สู่หลังกองถ่าย ไปจนถึงเวทีประกวดที่คว้า <strong>ชนะเลิศอันดับ 1 Huawei Hub</strong>',
      hero_cta_reel: 'ดูโชว์รีล',
      hero_cta_lookbook: 'Lookbook 11 หน้า',
      hero_cta_contact: 'ติดต่อ',
      hero_sticker1: 'Huawei Hub — 1st Place',
      hero_sticker2: 'GPA <b>3.29</b> • นิเทศ BU',

      about_subtitle: 'ทำความรู้จักผู้กำกับเรื่องนี้ — คนที่หลงใหลการเล่าเรื่องผ่านทุกสื่อ',
      about_lead: 'ทุกเฟรมมีเรื่องเล่า — หน้าที่ของฉันคือทำให้คนดู <span class="grad-text">รู้สึก</span> ไปกับมัน',
      about_p1: 'ตลอดการเรียนใน <strong>สาขาการผลิตเนื้อหาสร้างสรรค์และประสบการณ์ดิจิทัล (CDE) คณะนิเทศศาสตร์ มหาวิทยาลัยกรุงเทพ</strong> ฉันได้เรียนรู้ตั้งแต่การคิด Creative Concept เขียนบท ออกกองถ่ายทำ ไปจนถึงตัดต่อและลำดับภาพ รวมถึงการทำงานเป็นทีมและแก้ปัญหาเฉพาะหน้าในกองจริง',
      about_p2: 'ฉันตั้งใจนำ <strong>ความคิดสร้างสรรค์ + ทักษะผลิตสื่อ + Generative AI</strong> มาสร้างคอนเทนต์ที่มีคุณค่า พร้อมเปิดรับคำแนะนำจากพี่ ๆ ในวงการ รับผิดชอบ อ่อนน้อม และพร้อมทุ่มเทเต็มที่ค่ะ',

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
      reel_view_photo: 'ดูภาพถ่าย',

      // Reel items
      reel1_meta: 'EP.01 — AI CINEMA',
      reel1_title: 'ภาพยนตร์อนิเมชันแฟนตาซี — The Golden Knight (EP.1)',
      reel1_desc: 'สร้างสรรค์ภาพยนตร์แอนิเมชันเต็มเรื่องด้วย Generative AI ควบคุม Mood & Tone, การเคลื่อนไหวของตัวละคร และผสานดนตรีประกอบเชิงภาพยนตร์',

      reel2_meta: 'EP.02 — GENERATIVE AI',
      reel2_title: 'ตัวละครเสมือน & AI Avatar — HeyGen AI',
      reel2_desc: 'จำลองและสร้างตัวละคร AI เสมือนจริงขยับปากพูดตามบท (Lip-sync & Voice AI) สำหรับสื่อโฆษณาและการตลาดดิจิทัลยุคใหม่',

      reel3_meta: 'EP.03 — VOICE & STORYTELLING',
      reel3_title: 'บทพากย์เสียงสารคดี — วาฬ 52 Hz (The 52-Hertz Whale)',
      reel3_desc: 'งานพากย์เสียงสารคดีเล่าเรื่อง (Voiceover & Audio Storytelling) ควบคุมจังหวะ ลมหายใจ และถ่ายทอดอารมณ์ความเหงาของวาฬใต้สมุทร',

      reel4_meta: 'EP.04 — NEWSROOM',
      reel4_title: 'ผู้ประกาศข่าวในสตูดิโอ & บอร์ดแคสต์ TNN News',
      reel4_desc: 'ฝึกปฏิบัติการอ่านข่าวสดหน้ากล้องผ่าน Teleprompter ควบคุมน้ำเสียง จังหวะ บุคลิกภาพหน้ากล้องโทรทัศน์ และการจำลองสกู๊ปข่าว',

      reel5_meta: 'EP.05 — COMMERCIAL PRODUCTION',
      reel5_title: 'วิดีโอโฆษณาจำลอง — ฟิตเนส & เครื่องดื่มเกลือแร่',
      reel5_desc: 'ถ่ายทำและกำกับโฆษณาจำลองในยิม ออกแบบมุมกล้อง การเคลื่อนไหวแอ็กชัน จังหวะตัดต่อกระชับเร้าใจ และเกรดสี Mood & Tone',

      reel6_meta: 'EP.06 — SHORT-FORM',
      reel6_title: 'Creative Short Content — ตำส้มตำแซ่บ (CapCut)',
      reel6_desc: 'ตัดต่อวิดีโอสั้นสไตล์อาหารและไลฟ์สไตล์ ดีไซน์จังหวะสับภาพตามจังหวะเพลง (Beat Sync) ใส่ Keyframe และ Sound FX ให้ดูน่ารับประทาน',

      reel7_meta: 'EP.07 — SHORT-FORM',
      reel7_title: 'Lifestyle & Food Vlog — รีวิวของอร่อย & คาเฟ่',
      reel7_desc: 'วิดีโอบล็อกเกาะเทรนด์ไลฟ์สไตล์ เล่าเรื่องเป็นธรรมชาติ ใส่ทรานซิชันซูมและสปีดการตัดต่อเพื่อดึงดูดความสนใจและ Engagement',

      reel8_meta: 'EP.08 — DIRECTOR\'S CUT',
      reel8_title: 'Cinematic Light & Mood — Red Dome Installation',
      reel8_desc: 'งานตัดต่อคุมโทนภาพยนตร์ (Color Grade & Mood) บันทึกแสงเงาศิลปะร่วมสมัยในโดมสีแดง ถ่ายทอดอารมณ์และมุมมองผู้กำกับ',

      reel9_meta: 'EP.09 — DIRECTOR\'S CUT',
      reel9_title: 'Night Street Dance & Night Market Vlog',
      reel9_desc: 'วิดีโอบันทึกโมเมนต์สตรีทแดนซ์และบรรยากาศสตรีทฟู้ดยามค่ำคืน การคุมจังหวะภาพสนุกสนานและมีชีวิตชีวา',

      reel10_meta: 'EP.10 — PHOTOGRAPHY',
      reel10_title: 'Awakening Bangkok ณ สวนรมณีนาถ',
      reel10_desc: 'ช่างภาพบันทึกเทศกาลไฟยามค่ำคืน ถ่ายทอดศิลปะแสงและปฏิสัมพันธ์ของผู้ชม',

      reel11_meta: 'EP.11 — BEHIND THE SCENES',
      reel11_title: 'Staff สาขา CDE & Diamond Days 2024',
      reel11_desc: 'ออกกองหลายหน้าที่ — ช่างแต่งหน้า หาพร็อพ และพี่บิ้วงานปฐมนิเทศ ม.กรุงเทพ',

      reel12_meta: 'EP.12 — MASTERCLASS',
      reel12_title: 'Workshop "สร้างภาพอย่างคูล AI Everywhere"',
      reel12_desc: 'อบรมและลงมือจริงกับ Intel Core Ultra ประยุกต์ AI ในการผลิตภาพและสื่อยุคใหม่',

      bts_subtitle: 'ประสบการณ์จริงหลังกล้อง — ออกกอง ถ่ายภาพ แต่งหน้านักแสดง และทีมสตาฟฟ์สาขา',

      awards_subtitle: 'รางวัลแห่งความภาคภูมิใจจากเวทีประกวดระดับประเทศ (คลิกเกียรติบัตรเพื่อขยาย)',
      award1_prize: 'เงินรางวัล <b>10,000</b> บาท',
      award1_title: 'Award of Excellence — Huawei Hub & First Generate Campaign',
      award1_desc: 'ชนะเลิศการประกวดและเวิร์กช็อป "HUAWEI HUB" และ "HUAWEI FIRST GENERATE CAMPAIGN" ในฐานะทีมที่นำเสนอผลงานได้ดีที่สุด',
      award2_prize: 'รางวัล<b>ชมเชย</b> ระดับประเทศ',
      award2_title: 'Honorable Mention — Airdog VDO Contest 2024',
      award2_desc: 'รางวัลชมเชยการประกวดผลิตวิดีโอเครื่องฟอกอากาศ AIRDOG บนโซเชียลมีเดีย โดย NAPA SOLUTIONS CO., LTD.',

      lookbook_subtitle: 'ม่านเปิดแล้ว! เลื่อนดูเล่มพอร์ตฉบับจริงทั้ง 11 หน้า — คลิกจอเพื่อดูเต็มจอ, ใช้ปุ่ม ← → ได้',
      lb_prev: '‹ ก่อนหน้า',
      lb_next: 'ถัดไป ›',
      lb_fullscreen: '⤢ เต็มจอ',

      journey_subtitle: 'เส้นทางการเรียนรู้และประสบการณ์ที่สั่งสมมาจนถึงปัจจุบัน',

      contact_subtitle: 'พร้อมสำหรับการฝึกงาน และการร่วมงานในทุกโปรเจกต์สร้างสรรค์ค่ะ',
      cs_talent: 'ขนิษฐา วันไชย (อ้อม)',
      cs_pos: 'AI Content Creator • Video Editor • Production Assistant',
      cs_loc: 'Bangkok University • กรุงเทพฯ / ปทุมธานี',

      cv_title: 'ต้องการเอกสารประวัติและผลงานฉบับย่อ?',
      cv_desc: 'เปิด Resume / CV ฉบับพร้อมพิมพ์ หรือบันทึกเป็น PDF ได้ทันที',
      cv_btn: 'เปิดดู Resume / CV',

      footer_copyright: '© 2024–2026 Khanittha Wanchai • Creative Content Production and Digital Experience (CDE) • School of Communication Arts, Bangkok University'
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
      nav_resume_m: 'Resume ↗',

      hero_name: 'Khanittha Wanchai',
      hero_nick: '(Aom)',
      hero_desc: 'Communication Arts student storytelling through <strong>Visuals, Light, Sound & AI</strong> — from on-camera anchor to production crew, to winning <strong>1st Place in the Huawei Hub Campaign</strong>.',
      hero_cta_reel: 'Watch Showreel',
      hero_cta_lookbook: '11-Page Lookbook',
      hero_cta_contact: 'Contact',
      hero_sticker1: 'Huawei Hub — 1st Place',
      hero_sticker2: 'GPA <b>3.29</b> • Comm Arts BU',

      about_subtitle: 'Get to know the director — passionate about cinematic storytelling across all media.',
      about_lead: 'Every frame tells a story — my mission is to make the audience <span class="grad-text">feel</span> it.',
      about_p1: 'Throughout my studies in <strong>Creative Content Production and Digital Experience (CDE), School of Communication Arts, Bangkok University</strong>, I learned the full production lifecycle: creative concepting, scriptwriting, filming on set, video editing, audio mixing, and live problem-solving with the crew.',
      about_p2: 'I aim to combine <strong>creative imagination + production craftsmanship + Generative AI</strong> to craft meaningful stories. Open to mentorship, humble, responsible, and ready to give 100% to every production.',

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
      reel_view_photo: 'View Photos',

      // Reel items
      reel1_meta: 'EP.01 — AI CINEMA',
      reel1_title: 'Fantasy AI Animation — The Golden Knight (EP.1)',
      reel1_desc: 'Produced a full cinematic fantasy animation using Generative AI with consistent characters, dynamic lighting, and immersive soundtrack.',

      reel2_meta: 'EP.02 — GENERATIVE AI',
      reel2_title: 'Virtual Character & AI Host — HeyGen AI',
      reel2_desc: 'Created a hyper-realistic AI talking avatar with synchronized voice and lip-sync for modern digital marketing content.',

      reel3_meta: 'EP.03 — VOICE & STORYTELLING',
      reel3_title: 'Documentary Voiceover — The 52-Hertz Whale',
      reel3_desc: 'Documentary narration and storytelling piece, demonstrating vocal modulation, pacing, and emotional resonance.',

      reel4_meta: 'EP.04 — NEWSROOM',
      reel4_title: 'Studio News Anchor & Broadcast Report',
      reel4_desc: 'Live television news broadcasting practical, teleprompter reading, vocal clarity, on-camera presence, and newsroom pacing.',

      reel5_meta: 'EP.05 — COMMERCIAL PRODUCTION',
      reel5_title: 'Spec Commercial Ad — Fitness & Energy Drink',
      reel5_desc: 'Directed and edited a fast-paced gym commercial spot with dynamic camera work, punchy sound design, and color grading.',

      reel6_meta: 'EP.06 — SHORT-FORM',
      reel6_title: 'Creative Short Content — Somtum (CapCut)',
      reel6_desc: 'Short-form food content editing with beat syncing, keyframe zooms, and snappy sound effects for TikTok and Reels.',

      reel7_meta: 'EP.07 — SHORT-FORM',
      reel7_title: 'Lifestyle & Food Vlog — Cafe & Street Eats',
      reel7_desc: 'Lifestyle food vlog capturing candid food moments, snappy transitions, and engaging visual pacing.',

      reel8_meta: 'EP.08 — DIRECTOR\'S CUT',
      reel8_title: 'Cinematic Light & Mood — Red Dome Installation',
      reel8_desc: 'Cinematic tone study in a red dome art space, emphasizing atmosphere, color grading, and intimate framing.',

      reel9_meta: 'EP.09 — DIRECTOR\'S CUT',
      reel9_title: 'Night Street Dance & Night Market Vlog',
      reel9_desc: 'Energetic street dance and night market food vlog capturing youthful vibrancy and beat-matched cuts.',

      reel10_meta: 'EP.10 — PHOTOGRAPHY',
      reel10_title: 'Awakening Bangkok at Rommaninat Park',
      reel10_desc: 'Event photographer capturing nighttime light installations, mood, and visitor interactions.',

      reel11_meta: 'EP.11 — BEHIND THE SCENES',
      reel11_title: 'Staff CDE & Diamond Days 2024',
      reel11_desc: 'Multidisciplinary on-set crew: makeup artist, prop management, and freshman orientation MC.',

      reel12_meta: 'EP.12 — MASTERCLASS',
      reel12_title: 'Workshop "AI Everywhere with Intel Core Ultra"',
      reel12_desc: 'Hands-on masterclass leveraging Intel Core Ultra processors for generative media production.',

      bts_subtitle: 'Hands-on experience behind the camera — filming, photography, on-set makeup, and crew staff.',

      awards_subtitle: 'National competition honors and achievements (click certificates to zoom).',
      award1_prize: 'Prize: <b>10,000</b> THB',
      award1_title: 'Award of Excellence — Huawei Hub & First Generate Campaign',
      award1_desc: '1st Place Winner in the HUAWEI HUB & FIRST GENERATE CAMPAIGN workshop and pitching competition for top creative presentation.',
      award2_prize: 'National <b>Honorable Mention</b>',
      award2_title: 'Honorable Mention — Airdog VDO Contest 2024',
      award2_desc: 'National Honorable Mention in the Airdog Air Purifier short-video contest by NAPA SOLUTIONS CO., LTD.',

      lookbook_subtitle: 'Curtain rises! Flip through all 11 pages of the official portfolio lookbook — click to view fullscreen.',
      lb_prev: '‹ Prev',
      lb_next: 'Next ›',
      lb_fullscreen: '⤢ Fullscreen',

      journey_subtitle: 'Learning milestones and creative journey from early years to university.',

      contact_subtitle: 'Open for internships, production roles, and creative collaborations.',
      cs_talent: 'Khanittha Wanchai (Aom)',
      cs_pos: 'AI Content Creator • Video Editor • Production Assistant',
      cs_loc: 'Bangkok University • Bangkok / Pathum Thani',

      cv_title: 'Looking for a concise CV / Resume?',
      cv_desc: 'View the print-ready Resume / CV or download it as PDF.',
      cv_btn: 'View Resume / CV',

      footer_copyright: '© 2024–2026 Khanittha Wanchai • Creative Content Production and Digital Experience (CDE) • School of Communication Arts, Bangkok University'
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
      'เกียรติบัตร — Huawei Hub 1st Place & Airdog 2024', 'ขอขอบคุณ (Thank You)'
    ],
    en: [
      'Cover Page', 'Preface & Vision', 'Career Goals & Motivation',
      'Personal Profile & Education', 'Campus Life: CDE Staff & Awakening BKK',
      'Coursework: AI Content Creation', 'Coursework: News Anchor & CapCut',
      'Projects: Personal Video Showcase', 'Workshops: CDE Future & Intel AI',
      'Awards: Huawei Hub 1st & Airdog 2024', 'Thank You & Wrap'
    ]
  };

  let currentLang = localStorage.getItem('aom-lang') || 'th';
  let roles = rolesMap[currentLang] || rolesMap.th;
  let titles = lookbookTitlesMap[currentLang] || lookbookTitlesMap.th;

  const setLanguage = (lang, notify = true) => {
    currentLang = lang === 'en' ? 'en' : 'th';
    root.lang = currentLang;
    localStorage.setItem('aom-lang', currentLang);

    // Update nav toggle buttons
    const lTh = $('.lang-toggle .l-th');
    const lEn = $('.lang-toggle .l-en');
    if (lTh && lEn) {
      lTh.classList.toggle('active', currentLang === 'th');
      lEn.classList.toggle('active', currentLang === 'en');
    }

    // Update mobile menu language buttons
    $$('.m-lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.setlang === currentLang);
    });

    // Translate DOM elements
    const dict = I18N[currentLang] || I18N.th;
    $$('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.innerHTML = dict[key];
    });

    // Update roles for typewriter
    roles = rolesMap[currentLang] || rolesMap.th;
    if (typeof typeEl !== 'undefined' && typeEl && roles && roles.length) {
      typeEl.textContent = roles[0];
    }

    // Update lookbook titles
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

  /* ---------- Intro: film-leader countdown ---------- */
  const intro = $('#intro');
  const start = () => document.body.classList.add('ready');
  start(); // Initialize immediately so hero text is never blank
  const endIntro = () => {
    if (!intro || intro.classList.contains('done')) return;
    intro.classList.add('done');
    setTimeout(() => intro.classList.add('gone'), 700);
  };
  if (window.location.hash || sessionStorage.getItem('aom-intro') || reduce) {
    intro && intro.classList.add('gone');
  } else if (intro) {
    sessionStorage.setItem('aom-intro', '1');
    const num = $('.num', intro);
    let n = 3;
    const tick = setInterval(() => {
      n--;
      if (n > 0) num.textContent = n;
      else {
        clearInterval(tick);
        intro.classList.add('presents');
        setTimeout(endIntro, 600);
      }
    }, 280);
    $('.intro-skip', intro).addEventListener('click', () => { clearInterval(tick); endIntro(); });
    intro.addEventListener('click', () => { clearInterval(tick); endIntro(); });
  }

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

  /* Live timecode (throttled to 10 FPS to eliminate layout thrashing) */
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

  /* ---------- Nav active + scroll progress ---------- */
  const bar = $('.scroll-bar');
  const links = $$('.nav-links a');
  const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const onScroll = () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
    let cur = null;
    secs.forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
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

  // Wire Language toggles
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

  /* ---------- Confetti (gold + rose) ---------- */
  const cv = $('#confetti'), cx = cv.getContext('2d');
  let parts = [], running = false;
  const sizeCv = () => { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; };
  sizeCv(); addEventListener('resize', sizeCv);
  const colors = ['#FF3D7F', '#FF8FB8', '#F6C46A', '#FFE7A8', '#B69CFF', '#ffffff'];
  window.confetti = (x = innerWidth / 2, y = innerHeight / 2, n = 140) => {
    if (reduce) return;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, v = 4 + Math.random() * 9;
      parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 6, s: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - .5) * .4, c: colors[i % colors.length], life: 1, star: Math.random() < .25 });
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
      if (p.star) { cx.font = `${p.s * 3 * d}px serif`; cx.fillText('✦', 0, 0); }
      else cx.fillRect(-p.s * d / 2, -p.s * d / 4, p.s * d, p.s * d / 2);
      cx.restore();
    });
    if (parts.length) requestAnimationFrame(drawC); else { running = false; cx.clearRect(0, 0, cv.width, cv.height); }
  };
  $$('[data-confetti]').forEach(el => el.addEventListener('click', e => confetti(e.clientX, e.clientY)));

  /* Awards: confetti burst when first visible */
  const aw = $('#awards');
  if (aw) new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { setTimeout(() => confetti(innerWidth / 2, innerHeight * .35, 180), 400); o.disconnect(); } }, { threshold: .35 }).observe(aw);

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

    // Pre-bake bokeh sprite onto an offscreen canvas (avoids createRadialGradient in render loop)
    const bCan = document.createElement('canvas');
    bCan.width = 64; bCan.height = 64;
    const bg = bCan.getContext('2d');
    const bGr = bg.createRadialGradient(32, 32, 0, 32, 32, 32);
    bGr.addColorStop(0, 'rgba(255, 143, 184, 0.85)');
    bGr.addColorStop(0.4, 'rgba(255, 61, 127, 0.4)');
    bGr.addColorStop(1, 'rgba(255, 61, 127, 0)');
    bg.fillStyle = bGr;
    bg.beginPath(); bg.arc(32, 32, 32, 0, Math.PI * 2); bg.fill();

    // 2 sleek floating strips with 13 frames each (smooth, low draw calls)
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

      // 1. Draw pre-baked bokeh sprites
      for (let i = 0; i < bokeh.length; i++) {
        const b = bokeh[i];
        const p = proj(b.x + Math.sin(t * .003 + b.tw) * 25, b.y + Math.cos(t * .002 + b.tw) * 18, b.z);
        const dia = b.r * p.s * 3.5;
        const alpha = (0.12 + 0.14 * Math.sin(t * .015 + b.tw) ** 2) * (light ? .7 : 1);
        g.globalAlpha = alpha;
        g.drawImage(bCan, p.x - dia / 2, p.y - dia / 2, dia, dia);
      }

      // 2. Film strips
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

          // Strip background
          g.fillStyle = light ? '#2a1620' : '#14080e';
          g.fillRect(-PITCH / 2, -FH / 2 - 24, PITCH, FH + 48);

          // Fast sprocket holes (fillRect)
          g.fillStyle = light ? '#FFF6F3' : 'rgba(255,240,245,.8)';
          for (let k = 0; k < 5; k++) {
            const sx = -PITCH / 2 + 6 + k * (PITCH / 5);
            g.fillRect(sx, -FH / 2 - 18, 12, 8);
            g.fillRect(sx, FH / 2 + 10, 12, 8);
          }

          // Frame image
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

          // Tint + frame code
          g.fillStyle = `rgba(255,61,127,${0.12 + si * .04})`;
          g.fillRect(-FW / 2, -FH / 2, FW, FH);
          g.fillStyle = '#F6C46A';
          g.font = '600 9px "IBM Plex Mono", monospace';
          g.fillText(`${String((i + st.off) % 36 + 1).padStart(2, '0')}A  ▸ KODAK 5219`, -PITCH / 2 + 6, FH / 2 + 23);

          g.restore();
        }
      }

      // 3. Subtle horizontal anamorphic flare
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

  /* ---------- Scroll param helper for testing & direct navigation ---------- */
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
  // Initialize language on startup
  setLanguage(currentLang, false);
})();