<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let cursorEl;
  let rippleContainer;
  let isTouch = false;

  onMount(() => {
    isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) { initTouchRipple(); return; }
    initCursor();
  });

  function initCursor() {
    if (!cursorEl) return;

    // Center + hide off-screen
    gsap.set(cursorEl, { xPercent: -50, yPercent: -50, x: -200, y: -200, opacity: 0 });

    const xTo = gsap.quickTo(cursorEl, 'x', { duration: 0.3, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursorEl, 'y', { duration: 0.3, ease: 'power3.out' });

    let entered = false;
    const dot = cursorEl.querySelector('.cur-dot');
    const ring = cursorEl.querySelector('.cur-ring');

    const onMove = (e) => {
      if (!entered) { entered = true; gsap.to(cursorEl, { opacity: 1, duration: 0.2 }); }
      xTo(e.clientX); yTo(e.clientY);
    };

    const onEnter = () => {
      dot.textContent = '_';
      gsap.to(ring, { scale: 2, opacity: 0.6, duration: 0.2, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0.5, duration: 0.2 });
    };
    const onLeave = () => {
      dot.textContent = '+';
      gsap.to(ring, { scale: 1, opacity: 0.3, duration: 0.2, ease: 'power2.out' });
      gsap.to(dot,  { scale: 1, duration: 0.2 });
    };

    document.addEventListener('mousemove', onMove);

    // Apply to all interactive elements
    const query = () => document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .button-tab, .list-row');
    const attach = () => {
      query().forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attach();
    // Re-attach after hydration
    setTimeout(attach, 500);
  }

  function initTouchRipple() {
    const onTouch = (e) => {
      const t = e.touches[0];
      const el = document.createElement('span');
      el.className = 'touch-ripple';
      el.textContent = '+';
      el.style.cssText = `left:${t.clientX}px;top:${t.clientY}px;`;
      document.body.appendChild(el);
      gsap.fromTo(el,
        { x: -8, y: -8, scale: 0.5, opacity: 0.8 },
        { scale: 3.5, opacity: 0, duration: 0.55, ease: 'power2.out', onComplete: () => el.remove() }
      );
    };
    document.addEventListener('touchstart', onTouch, { passive: true });
  }
</script>

<!-- Cursor only shows on non-touch via CSS -->
<div class="cursor-root" bind:this={cursorEl}>
  <span class="cur-ring"></span>
  <span class="cur-dot">+</span>
</div>

<style>
  .cursor-root {
    position: fixed;
    top: 0; left: 0;
    pointer-events: none;
    z-index: 9999;
    will-change: transform;
    user-select: none;
  }

  .cur-ring {
    position: absolute;
    width: 28px; height: 28px;
    border: 1px solid var(--colors-ash);
    border-radius: 0; /* square — terminal aesthetic */
    transform: translate(-50%, -50%);
    opacity: 0.3;
    display: block;
  }

  .cur-dot {
    position: absolute;
    font-family: var(--font-family);
    font-size: 14px;
    font-weight: 700;
    color: var(--colors-ink);
    transform: translate(-50%, -50%);
    display: block;
    line-height: 1;
  }

  /* Hide on touch */
  @media (pointer: coarse) { .cursor-root { display: none; } }

  :global(.touch-ripple) {
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    font-family: var(--font-family);
    font-size: 14px;
    font-weight: 700;
    color: var(--colors-ash);
    user-select: none;
  }
</style>
