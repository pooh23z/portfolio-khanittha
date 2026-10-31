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
  const syncThemeIcon = () => { themeBtn.textContent = root.dataset.theme === 'light' ? '🌙' : '☀️'; };
  syncThemeIcon();
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('aom-theme', root.dataset.theme);
    syncThemeIcon();
  });

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
  const roles = ['AI Content Creator ✨', 'News Anchor & MC 🎙️', 'Video Editor ✂️', 'On-set Photographer 📸', 'Creative Storyteller 🎬'];
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

  /* ---------- Custom cursor (hardware accelerated & throttled) ---------- */
  if (fine && !reduce) {
    document.body.classList.add('has-cursor');
    const dot = $('.cursor-dot'), ring = $('.cursor-ring'), label = $('span', ring);
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, moving = false;
    addEventListener('mousemove', e => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      if (!moving) { moving = true; requestAnimationFrame(follow); }
    }, { passive: true });
    const follow = () => {
      rx += (x - rx) * .22; ry += (y - ry) * .22;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      if (Math.abs(x - rx) > 0.4 || Math.abs(y - ry) > 0.4) {
        requestAnimationFrame(follow);
      } else {
        moving = false;
      }
    };
    document.addEventListener('mouseover', e => {
      const t = e.target.closest('[data-cursor], a, button');
      if (t) { ring.classList.add('is-hover'); label.textContent = t.dataset.cursor || 'CLICK'; }
      else ring.classList.remove('is-hover');
    }, { passive: true });
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
  menuBtn.addEventListener('click', () => { const o = menu.classList.toggle('open'); menuBtn.textContent = o ? '✕' : '☰'; document.body.style.overflow = o ? 'hidden' : ''; });
  $$('a', menu).forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); menuBtn.textContent = '☰'; document.body.style.overflow = ''; }));

  /* ---------- Works filter ---------- */
  $$('.filter').forEach(btn => btn.addEventListener('click', () => {
    $$('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    $$('.reel').forEach(r => r.classList.toggle('hide', f !== 'all' && r.dataset.cat !== f));
  }));

  /* ---------- Lightbox ---------- */
  const lb = $('#lightbox'), lbImg = $('#lbImg'), lbCap = $('#lbCap');
  window.openLightbox = (src, cap) => { lbImg.src = src; lbCap.textContent = cap || ''; lb.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const closeLb = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.lb-close')) closeLb(); });
  $$('[data-lightbox]').forEach(el => el.addEventListener('click', () => openLightbox(el.dataset.lightbox, el.dataset.caption)));

  /* ---------- Lookbook theatre ---------- */
  const titles = [
    'หน้าปก (Cover Page)', 'คำนำ (Preface & Vision)', 'เหตุผลที่อยากเข้าทำงาน (Reasons & Goals)',
    'ข้อมูลส่วนตัว & ประวัติการศึกษา', 'กิจกรรมในมหาวิทยาลัย (CDE Staff & Awakening Bangkok)',
    'ผลงานในชั้นเรียน — AI Content Creation', 'ผลงานในชั้นเรียน — ผู้ประกาศข่าว & CapCut',
    'กิจกรรม — ผลงานตัดต่อวิดีโอส่วนตัว', 'เวิร์กช็อป — CDE Back to the Future & Intel AI',
    'เกียรติบัตร — Huawei Hub 1st Place & Airdog 2024', 'ขอขอบคุณ (Thank You)'
  ];
  const total = titles.length;
  let page = 1;
  const scr = $('#screenImg'), bgScr = $('#screenBg'), num = $('#pageNum'), ttl = $('#pageTitle'), thumbs = $('#thumbs');
  if (scr) {
    titles.forEach((t, i) => {
      const b = document.createElement('button');
      b.className = 'thumb'; b.setAttribute('aria-label', `หน้า ${i + 1}: ${t}`); b.dataset.cursor = 'P.' + (i + 1);
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
    navigator.clipboard.writeText(b.dataset.copy).then(() => showToast(b.dataset.msg || 'คัดลอกแล้วค่ะ ✨')).catch(() => showToast('คัดลอกไม่สำเร็จ'));
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
      showToast(take % 2 ? '🎬 CUT! เป็นเทคที่ดีมากค่ะ' : '🎬 ACTION! พร้อมร่วมงานกับทีมคุณแล้วค่ะ');
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
})();
