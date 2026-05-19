<script>
  import { onMount, afterUpdate } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { scrambleText } from '../utils/scramble.js';

  export let title = '';

  let categoryEl, titleEl;
  let hasAnimated = false;

  // When title prop changes (lang switch), restore correct text
  afterUpdate(() => {
    if (titleEl && titleEl.textContent !== title) {
      titleEl.textContent = title;
    }
  });


  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!categoryEl) return;

    const rows = categoryEl.querySelectorAll('.list-row');

    // Title: clip-path reveal + scramble — only once on first scroll into view
    if (titleEl) {
      gsap.fromTo(titleEl,
        { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.55,
          ease: 'none',
          scrollTrigger: { trigger: titleEl, start: 'top 88%', once: true },
          onStart: () => {
            if (!hasAnimated) {
              hasAnimated = true;
              setTimeout(() => scrambleText(titleEl, title, { duration: 500 }), 80);
            }
          }
        }
      );
    }

    // Rows stagger with slight y lift
    if (rows.length) {
      gsap.fromTo(rows,
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0,
          duration: 0.38,
          stagger: 0.07,
          ease: 'power1.out',
          scrollTrigger: { trigger: categoryEl, start: 'top 83%' }
        }
      );
    }
  });
</script>

<div class="service-category" bind:this={categoryEl}>
  <h3 class="heading-md service-category-title" bind:this={titleEl}>{title}</h3>
  <slot />
</div>

<style>
  .service-category { margin-bottom: var(--spacing-xxl); }
  .service-category-title {
    margin-bottom: var(--spacing-md);
    color: var(--colors-ink);
    /* ensure clip-path works */
    will-change: clip-path;
  }
</style>
