<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';

  let barEl;

  onMount(() => {
    if (!barEl) return;
    gsap.set(barEl, { scaleX: 0, transformOrigin: 'left center' });

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? scrolled / total : 0;
      gsap.set(barEl, { scaleX: progress });
    };

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  });
</script>

<div class="scroll-progress" bind:this={barEl}></div>

<style>
  .scroll-progress {
    position: fixed;
    top: 0; left: 0;
    width: 100%;
    height: 1px;
    background: var(--colors-ink);
    transform-origin: left center;
    z-index: 10000;
    pointer-events: none;
  }
</style>
