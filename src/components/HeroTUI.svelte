<script>
  import { onMount, onDestroy } from 'svelte';
  import { gsap } from 'gsap';
  import { t } from '../stores/lang.js';

  // ASCII wordmark — 5 separate lines for line-by-line terminal reveal
  const ASCII_LINES = [
    '_     _   _ _____ __________ ____  _____ ______     _____ ____  ',
    '| |   | | | |_   _|__  /__  // ___|| ____|  _ \\ \\   / /_ _/ ___| ',
    '| |   | | | | | |   / /  / / \\___ \\|  _| | |_) \\ \\ / / | |\\___ \\ ',
    '| |___| |_| | | |  / /_ / /_  ___) | |___|  _ < \\ V /  | | ___) |',
    '|_____|\\___/  |_| /____/____||____/|_____|_| \\_\\ \\_/  |___|____/ ',
  ];

  let heroEl, canvasEl, subtitleEl, cursorEl, titleEl;
  let renderer, scene, camera, animFrameId, resizeObs;
  let cleanupListeners = null;

  // ── Three.js ASCII Wireframe ──────────────────────────────────
  async function initThree() {
    const THREE = await import('three');
    const w = canvasEl.clientWidth, h = canvasEl.clientHeight || 420;

    renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);

    scene  = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Torus wireframe — ash color
    const torusGeo = new THREE.TorusGeometry(1.3, 0.42, 10, 44);
    const torusWire = new THREE.WireframeGeometry(torusGeo);
    const torus = new THREE.LineSegments(torusWire,
      new THREE.LineBasicMaterial({ color: 0x9a9898, transparent: true, opacity: 0.45 })
    );
    scene.add(torus);

    // Icosahedron inner — mute color
    const icoGeo  = new THREE.IcosahedronGeometry(0.55, 1);
    const icoWire = new THREE.WireframeGeometry(icoGeo);
    const ico = new THREE.LineSegments(icoWire,
      new THREE.LineBasicMaterial({ color: 0x646262, transparent: true, opacity: 0.35 })
    );
    scene.add(ico);

    // Outer ring — very faint
    const ringGeo  = new THREE.TorusGeometry(2.2, 0.01, 4, 80);
    const ringWire = new THREE.WireframeGeometry(ringGeo);
    const ring = new THREE.LineSegments(ringWire,
      new THREE.LineBasicMaterial({ color: 0x646262, transparent: true, opacity: 0.2 })
    );
    scene.add(ring);

    // Mouse & touch parallax state
    let mx = 0, my = 0, tx = 0, ty = 0, scrollY = 0;

    const onMouse = (e) => {
      const r = heroEl.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      my = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    const onTouch = (e) => {
      const r = heroEl.getBoundingClientRect();
      mx = ((e.touches[0].clientX - r.left) / r.width  - 0.5) * 1.2;
      my = ((e.touches[0].clientY - r.top)  / r.height - 0.5) * 1.2;
    };
    const onScroll = () => { scrollY = window.scrollY; };

    heroEl.addEventListener('mousemove', onMouse);
    heroEl.addEventListener('touchmove', onTouch, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    let tick = 0;
    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      tick += 0.004;

      tx += (mx - tx) * 0.035;
      ty += (my - ty) * 0.035;

      torus.rotation.x = tick * 0.35 + ty * 0.25;
      torus.rotation.y = tick * 0.6  + tx * 0.25;
      torus.rotation.z = tick * 0.12;

      ico.rotation.x = -tick * 0.5 + ty * 0.18;
      ico.rotation.y = -tick * 0.75 + tx * 0.18;

      ring.rotation.z = tick * 0.08 + tx * 0.05;
      ring.rotation.x = ty * 0.1;

      camera.position.z = 5.5 + scrollY * 0.002;
      renderer.render(scene, camera);
    };
    animate();

    resizeObs = new ResizeObserver(() => {
      const nw = canvasEl.clientWidth;
      const nh = canvasEl.clientHeight;
      if (!nw || !nh) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    resizeObs.observe(canvasEl);

    cleanupListeners = () => {
      heroEl?.removeEventListener('mousemove', onMouse);
      heroEl?.removeEventListener('touchmove', onTouch);
      window.removeEventListener('scroll', onScroll);
    };
  }

  // ── GSAP Subtitle reveal (NO innerHTML — Svelte handles $t reactivity) ───
  function animateSubtitle() {
    if (!subtitleEl) return;
    gsap.fromTo(subtitleEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'none', delay: 1.2 }
    );
    if (cursorEl) {
      gsap.killTweensOf(cursorEl);
      gsap.to(cursorEl, { opacity: 0, duration: 0.5, ease: 'none', repeat: -1, yoyo: true, delay: 1 });
    }
  }

  // ── GSAP ASCII Line-by-line reveal ────────────────────────────
  function initAsciiReveal() {
    if (!titleEl) return;
    const lines = titleEl.querySelectorAll('.al');
    gsap.fromTo(lines,
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, duration: 0.22, stagger: 0.07, ease: 'none', delay: 0.15 }
    );
  }

  // ── Hero content entrance ─────────────────────────────────────
  function initHeroEntrance() {
    const els = heroEl?.querySelectorAll('.hero-badge, .tui-prompt-row, .hero-actions');
    if (els?.length) {
      gsap.fromTo(els,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power1.out', delay: 1.6 }
      );
    }
  }

  onMount(async () => {
    if (canvasEl) { await initThree(); }
    initAsciiReveal();
    animateSubtitle();
    initHeroEntrance();

    // Subscribe to lang changes — re-fade subtitle when language toggles
    const unsubscribe = t.subscribe(() => {
      if (subtitleEl) {
        gsap.fromTo(subtitleEl,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: 'none', delay: 0.05 }
        );
      }
    });
    return unsubscribe; // cleanup on destroy
  });

  onDestroy(() => {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (resizeObs) resizeObs.disconnect();
    if (renderer) renderer.dispose();
    if (cleanupListeners) cleanupListeners();
  });
</script>

<div class="hero-wrapper">
  <div id="hero" class="hero-tui-mockup" bind:this={heroEl}>

    <!-- Three.js canvas -->
    <canvas class="hero-canvas" bind:this={canvasEl}></canvas>

    <!-- Scanline overlay — terminal CRT effect -->
    <div class="scanlines" aria-hidden="true"></div>

    <!-- Ambient ASCII chars -->
    <div class="ascii-ambient" aria-hidden="true">
      <span style="top:9%;left:6%">·</span>
      <span style="top:22%;left:88%">+</span>
      <span style="top:68%;left:12%">×</span>
      <span style="top:82%;left:74%">─</span>
      <span style="top:44%;left:94%">·</span>
      <span style="top:57%;left:3%">│</span>
      <span style="top:31%;left:52%">+</span>
      <span style="top:75%;left:38%">×</span>
      <span style="top:91%;left:23%">·</span>
      <span style="top:16%;left:45%">─</span>
      <span style="top:60%;left:78%">+</span>
    </div>

    <!-- Hero content -->
    <div class="hero-content">

      <!-- ASCII wordmark — line by line for GSAP reveal (hidden ≤480px) -->
      <div class="hero-title-container no-scrollbar">
        <h1 class="hero-title" bind:this={titleEl}>
          {#each ASCII_LINES as line}
            <span class="al">{line}</span>
          {/each}
        </h1>
      </div>

      <!-- Text fallback for very small screens (≤480px) -->
      <div class="hero-wordmark-fallback" aria-hidden="true">LUTZZSERVIS</div>

      <!-- Subtitle + cursor -->
      <p class="hero-subtitle body-md" bind:this={subtitleEl}>{$t('hero_subtitle')}</p>
      <span class="cursor-blink" bind:this={cursorEl} aria-hidden="true">█</span>

      <!-- TUI prompt -->
      <div class="tui-prompt-row body-md">
        &gt;&gt;&gt; print("<span class="ok">{$t('hero_cmd')}</span>")
      </div>

      <!-- CTA buttons -->
      <div class="hero-actions">
        <a href="#services" class="btn-secondary button-md hero-btn-outline">{$t('btn_price')}</a>
        <a href="https://wa.me/62895384661641" class="btn-primary button-md hero-btn-solid">{$t('btn_wa')}</a>
      </div>

    </div>
  </div>
</div>

<style>
  /* ── Wrapper ───────────────────────────────────────────────── */
  .hero-wrapper {
    background: var(--colors-surface-dark);
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacing-section);
    position: relative;
    overflow: hidden;         /* clip Three.js canvas + ASCII overflow */
    contain: layout style;    /* prevent overflow from affecting body */
  }

  .hero-tui-mockup {
    position: relative;
    color: var(--colors-canvas);
    padding: 64px 32px 48px;
    width: 100%;
    max-width: 1100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 480px;
  }

  /* ── Three.js canvas ───────────────────────────────────────── */
  .hero-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0.65;
  }

  /* ── CRT scanlines ─────────────────────────────────────────── */
  .scanlines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0px,
      transparent 2px,
      rgba(0,0,0,0.06) 2px,
      rgba(0,0,0,0.06) 4px
    );
    z-index: 1;
  }

  /* ── Ambient ASCII chars ───────────────────────────────────── */
  .ascii-ambient {
    position: absolute;
    inset: 0;
    pointer-events: none;
    font-family: var(--font-family);
    font-size: 11px;
    color: var(--colors-ash);
    user-select: none;
  }
  .ascii-ambient span {
    position: absolute;
    animation: ambPulse 4s ease-in-out infinite;
  }
  .ascii-ambient span:nth-child(2n)   { animation-delay: -1.3s; }
  .ascii-ambient span:nth-child(3n)   { animation-delay: -2.7s; }
  .ascii-ambient span:nth-child(4n)   { animation-delay: -0.6s; }
  .ascii-ambient span:nth-child(5n)   { animation-delay: -3.1s; }

  @keyframes ambPulse {
    0%,100% { opacity: 0.08; }
    50%      { opacity: 0.5; }
  }

  /* ── Hero content ──────────────────────────────────────────── */
  .hero-content {
    position: relative;
    z-index: 3;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ── ASCII wordmark ────────────────────────────────────────── */
  .hero-title-container {
    width: 100%;
    overflow-x: auto;          /* internal scroll — tidak leak ke body */
    overflow-y: hidden;
    text-align: center;
    margin-bottom: var(--spacing-xxl);
    -webkit-overflow-scrolling: touch;
  }
  .hero-title {
    font-family: var(--font-family);
    font-size: clamp(7.5px, 1.55vw, 17px);
    font-weight: 700;
    line-height: 1.25;
    color: var(--colors-canvas);
    display: inline-block;
    text-align: left;
    /* Prevent ASCII from causing body-level overflow */
    max-width: max-content;
  }
  /* Each line as block for GSAP targeting + proper line breaks */
  :global(.al) {
    display: block;
    white-space: pre;
  }

  /* ── Subtitle ──────────────────────────────────────────────── */
  .hero-subtitle {
    text-align: center;
    color: var(--colors-ash);
    max-width: 580px;
    width: 100%;               /* fill container on mobile */
    margin-bottom: 4px;
    word-wrap: break-word;     /* prevent long text overflow */
    overflow-wrap: break-word;
    white-space: normal;       /* allow text to wrap */
    padding: 0 var(--spacing-sm);
  }
  .cursor-blink {
    color: var(--colors-ash);
    font-family: var(--font-family);
    font-size: 13px;
    display: inline-block;
    margin-bottom: var(--spacing-xxl);
  }

  /* ── TUI prompt ────────────────────────────────────────────── */
  .tui-prompt-row {
    background: var(--colors-surface-dark-elevated);
    color: var(--colors-canvas);
    padding: 8px 12px;
    border-radius: var(--rounded-sm);
    margin-bottom: var(--spacing-xxl);
    display: inline-block;
    max-width: 100%;
    overflow-x: auto;
    white-space: nowrap;
    scrollbar-width: none;
  }
  .tui-prompt-row::-webkit-scrollbar { display: none; }
  .ok { color: var(--colors-success); }

  /* ── CTA ───────────────────────────────────────────────────── */
  .hero-actions {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xxl);
  }
  .hero-btn-outline {
    background: transparent !important;
    color: var(--colors-canvas) !important;
    border-color: var(--colors-canvas) !important;
    transition: background 0.2s, color 0.2s;
  }
  .hero-btn-outline:hover {
    background: rgba(253,252,252,0.1) !important;
  }
  .hero-btn-solid {
    background: var(--colors-canvas) !important;
    color: var(--colors-ink) !important;
    transition: opacity 0.2s;
  }
  .hero-btn-solid:hover { opacity: 0.85; }

  /* ── Mobile ≤768px ──────────────────────────────────────── */
  @media (max-width: 768px) {
    .hero-tui-mockup { padding: 40px 16px 36px; min-height: 300px; }
    .hero-title { font-size: clamp(8px, 3.6vw, 13px); }
    .hero-subtitle { font-size: 14px; max-width: 100%; }
    .tui-prompt-row { font-size: 13px; }
    .hero-actions {
      flex-direction: column; align-items: stretch;
      width: 100%; max-width: 280px; gap: var(--spacing-sm);
    }
    .hero-actions a { text-align: center; }
    .hero-wordmark-fallback { display: none; }
  }

  /* ── Very small ≤480px: ASCII → teks fallback ───────────── */
  @media (max-width: 480px) {
    .hero-title-container { display: none; }
    .hero-wordmark-fallback {
      display: block;
      font-size: 24px; font-weight: 700;
      font-family: var(--font-family);
      color: var(--colors-canvas);
      letter-spacing: 0.08em;
      margin-bottom: var(--spacing-xxl);
      text-align: center;
    }
    .hero-tui-mockup { padding: 36px 16px 28px; min-height: 260px; }
  }

  /* default (desktop): hide fallback, show ASCII */
  .hero-wordmark-fallback { display: none; }
</style>

