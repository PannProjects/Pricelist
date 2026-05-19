<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { scrambleText } from '../utils/scramble.js';
  import { t } from '../stores/lang.js';

  let sectionEl, headingEl, contentEl;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (headingEl) {
      gsap.fromTo(headingEl,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.55, ease: 'none',
          scrollTrigger: { trigger: headingEl, start: 'top 88%', once: true },
          onStart: () => {
            const text = headingEl.textContent;
            setTimeout(() => scrambleText(headingEl, text, { duration: 500 }), 60);
          }
        }
      );
    }

    if (contentEl) {
      gsap.fromTo(contentEl,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, duration: 0.55, ease: 'power1.out',
          scrollTrigger: { trigger: contentEl, start: 'top 85%' }
        }
      );
    }

    // Restore heading visibility on lang change
    const unsub = t.subscribe(() => {
      if (headingEl) gsap.set(headingEl, { clipPath: 'inset(0 0% 0 0)' });
    });
    return unsub;
  });
</script>

<section id="location" bind:this={sectionEl}>
  <h2 class="heading-md" bind:this={headingEl}>{$t('section_location')}</h2>
  <div class="section-content" bind:this={contentEl}>
    <p class="body-md location-open">{$t('loc_open')}</p>
    <div class="map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d987.2!2d112.6134328!3d-8.0074546!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e789d1df673bb11%3A0x511d74492e760a78!2sLutzzServis!5e0!3m2!1sid!2sid!4v1710927000000"
        allowfullscreen="" loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Google Maps Location"
      ></iframe>
    </div>
  </div>
</section>

<style>
  .location-open {
    color: var(--colors-body);
    margin-bottom: var(--spacing-lg);
  }
  .map-container {
    width: 100%;
    height: 350px;
    overflow: hidden;
    border: 1px solid var(--colors-hairline);
  }
  .map-container iframe {
    width: 100%; height: 100%; border: 0;
    filter: grayscale(100%) contrast(120%);
  }

  @media (max-width: 768px) { .map-container { height: 280px; } }
  @media (max-width: 480px) {
    .map-container { height: 220px; }
    .location-open { font-size: 14px; }
  }
</style>
