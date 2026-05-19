<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { t, currentLang, toggleLanguage } from '../stores/lang.js';

  let menuOpen = false;
  let navEl, navWrapperEl;

  function toggleMenu() { menuOpen = !menuOpen; }
  function closeMenu() { menuOpen = false; }

  onMount(() => {
    // Whole nav-wrapper slides in from top
    if (navWrapperEl) {
      gsap.fromTo(navWrapperEl,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.05 }
      );
    }
    // Magnetic hover on nav links
    const links = navWrapperEl?.querySelectorAll('.nav-links a, .nav-links button');
    links?.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width  / 2) * 0.2;
        const y = (e.clientY - r.top  - r.height / 2) * 0.2;
        gsap.to(el, { x, y, duration: 0.2, ease: 'power2.out' });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      });
    });
  });

</script>

<div class="nav-wrapper" bind:this={navWrapperEl}>
  <div class="nav-outer">
    <nav class="primary-nav" bind:this={navEl}>
      <a href="#hero" class="wordmark body-strong" on:click={closeMenu}>LUTZZSERVIS</a>

      <div class="nav-links" class:active={menuOpen}>
        <a href="#hero"     class="body-strong" on:click={closeMenu}>{$t('nav_home')}</a>
        <a href="#services" class="body-strong" on:click={closeMenu}>{$t('nav_services')}</a>
        <a href="#location" class="body-strong" on:click={closeMenu}>{$t('nav_location')}</a>
        <a href="#contact"  class="body-strong" on:click={closeMenu}>{$t('nav_contact')}</a>
        <a href="https://wa.me/62895384661641" class="btn-primary button-md" on:click={closeMenu}>{$t('nav_call')}</a>
        <button class="lang-btn body-strong" on:click={() => { toggleLanguage(); closeMenu(); }}>{$t('nav_lang')}</button>
      </div>

      <button class="mobile-menu-btn body-strong" aria-label="Toggle Menu" on:click={toggleMenu}>
        {menuOpen ? '[ x Tutup ]' : '[ Menu ]'}
      </button>
    </nav>
  </div>
</div>

<style>
  /* Full-width sticky nav wrapper — NO box-shadow overflow trick */
  .nav-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--colors-canvas);
    width: 100%;
    /* Hairline border bottom instead of the overflowing box-shadow */
    border-bottom: 1px solid var(--colors-hairline);
  }

  .nav-outer {
    max-width: 960px;
    margin: 0 auto;
    padding: 0 var(--spacing-xl);
  }

  .primary-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 56px;
    position: relative;
  }

  .wordmark {
    font-weight: 700;
    color: var(--colors-ink);
    white-space: nowrap;
    line-height: 1;
    letter-spacing: 0.02em;
    transition: opacity 0.15s;
  }
  .wordmark:hover { opacity: 0.65; }

  .nav-links {
    display: flex;
    gap: var(--spacing-xl);
    align-items: center;
  }
  .nav-links a, .nav-links button {
    color: var(--colors-ink);
    transition: opacity 0.15s;
    display: inline-block; /* needed for magnetic x/y */
  }
  .nav-links a:hover, .nav-links button:hover { opacity: 0.65; }


  .mobile-menu-btn {
    display: none;
    background: none;
    border: none;
    color: var(--colors-ink);
    cursor: pointer;
    font-family: var(--font-family);
    font-size: 16px;
  }

  @media (max-width: 768px) {
    .nav-links {
      /* Collapsed state — absolute relative to .primary-nav */
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: fixed;          /* Fixed agar tidak perlu referensi parent */
      top: 57px;                /* tepat di bawah nav (56px + 1px border) */
      left: 0;
      right: 0;
      background: var(--colors-canvas);
      padding: 0 var(--spacing-xl);
      border-bottom: 1px solid var(--colors-hairline);
      z-index: 99;
      gap: var(--spacing-lg);
      /* Smooth slide-down via max-height */
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.3s ease, opacity 0.25s ease, padding 0.3s ease;
      pointer-events: none;
    }
    .nav-links.active {
      max-height: 360px;
      opacity: 1;
      padding: var(--spacing-xl);
      pointer-events: auto;
    }
    .mobile-menu-btn { display: block; }
  }
</style>
