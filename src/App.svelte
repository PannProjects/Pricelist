<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  import CursorFollower  from './components/CursorFollower.svelte';
  import ScrollProgress  from './components/ScrollProgress.svelte';
  import TerminalNav     from './components/TerminalNav.svelte';
  import HeroTUI         from './components/HeroTUI.svelte';
  import ServicesSection from './components/ServicesSection.svelte';
  import LocationSection from './components/LocationSection.svelte';
  import FooterSection   from './components/FooterSection.svelte';

  let appEl;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Page load: fade in from black
    gsap.fromTo(appEl,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'none' }
    );

    // Footer: fade-in + hairline top reveal
    const footerEl = document.querySelector('.footer-section');
    if (footerEl) {
      gsap.fromTo(footerEl,
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power1.out',
          scrollTrigger: { trigger: footerEl, start: 'top 90%' }
        }
      );
    }

    // Scroll-linked parallax on the hero wrapper background
    const heroWrapper = document.querySelector('.hero-wrapper');
    if (heroWrapper) {
      gsap.to(heroWrapper, {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: heroWrapper,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }
  });
</script>

<div class="app-root" bind:this={appEl}>
  <!-- Global overlays -->
  <CursorFollower />
  <ScrollProgress />

  <!-- Navigation -->
  <TerminalNav />

  <!-- Hero — full-bleed (outside container) -->
  <HeroTUI />

  <!-- Body content -->
  <div class="container">
    <ServicesSection />
    <LocationSection />
    <FooterSection />
  </div>
</div>

<style>
  .app-root { min-height: 100vh; }
</style>
