<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { t } from '../stores/lang.js';
  import { hardwarePrices } from '../stores/hardware.js';
  import { scrambleText } from '../utils/scramble.js';
  import ServiceCategory from './ServiceCategory.svelte';
  import ServiceRow      from './ServiceRow.svelte';
  import HardwareTab     from './HardwareTab.svelte';

  let sectionEl, hairlineEl, headingEl;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Heading: clip-path reveal, scramble fires once
    if (headingEl) {
      gsap.fromTo(headingEl,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 0.6, ease: 'none',
          scrollTrigger: { trigger: headingEl, start: 'top 88%', once: true },
          onStart: () => {
            const text = headingEl.textContent;
            setTimeout(() => scrambleText(headingEl, text, { duration: 600 }), 60);
          }
        }
      );
    }

    // Hairline left→right
    if (hairlineEl) {
      gsap.fromTo(hairlineEl,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1, duration: 0.9, ease: 'none',
          scrollTrigger: { trigger: sectionEl, start: 'top 80%' }
        }
      );
    }

    // When language changes, restore heading text (Svelte $t reactive in template)
    const unsub = t.subscribe(() => {
      // Let Svelte update the DOM first, then clip-path stays open
      if (headingEl) {
        gsap.set(headingEl, { clipPath: 'inset(0 0% 0 0)' });
      }
    });
    return unsub;
  });
</script>

<section id="services" bind:this={sectionEl}>
  <h2 class="heading-md" bind:this={headingEl} style="margin-bottom:var(--spacing-xl);">
    {$t('section_services')}
  </h2>
  <div class="section-hairline" bind:this={hairlineEl}></div>

  <div class="section-content">

    <!-- Servis Laptop -->
    <ServiceCategory title={$t('cat_laptop')}>
      <ServiceRow marker="[-]" title={$t('lap_win')}  price="40K" />
      <ServiceRow marker="[-]" title={$t('lap_opt')}  price="40K" />
      <ServiceRow marker="[-]" title={$t('lap_soft')} price={$t('price_start')} />
    </ServiceCategory>

    <!-- Oprek Android -->
    <ServiceCategory title={$t('cat_android')}>
      <ServiceRow marker="[-]" title={$t('and_rom')}       price="50K" />
      <ServiceRow marker="[-]" title={$t('and_flash')}     price="50K" />
      <ServiceRow marker="[-]" title={$t('and_reinstall')} price="35K" />
    </ServiceCategory>

    <!-- Hardware -->
    <ServiceCategory title={$t('cat_hard')}>
      <HardwareTab />
      <ServiceRow marker="[-]" title={$t('hard_lcd')}  price={$hardwarePrices.lcd}  />
      <ServiceRow marker="[-]" title={$t('hard_bat')}  price={$hardwarePrices.bat}  />
      <ServiceRow marker="[-]" title={$t('hard_glue')} price={$hardwarePrices.glue} />
      <ServiceRow marker="[-]" title={$t('hard_btn')}  price={$hardwarePrices.btn}  />
      <div class="service-note body-md">
        <span class="body-strong">{$t('note_hard').split(':')[0]}:</span>
        {$t('note_hard').replace(/^[^:]+:\s*/, '')}
      </div>
    </ServiceCategory>

    <!-- Web -->
    <ServiceCategory title={$t('cat_web')}>
      <div class="list-row body-md">
        <span class="list-row-marker">[-]</span>
        <div class="list-row-inner">
          <span class="list-row-title">{$t('web_dev')}</span>
          <span class="list-row-price">
            <a href="https://wa.me/62895384661641?text=Halo%20min,%20mau%20tanya%20tentang%20jasa%20pembuatan%20website"
               class="link-inline">{$t('web_ask')}</a>
          </span>
        </div>
      </div>
      <div class="service-note body-md">
        <span class="body-strong">{$t('note_web').split(':')[0]}:</span>
        {$t('note_web').replace(/^[^:]+:\s*/, '')}
      </div>
    </ServiceCategory>

  </div>
</section>

<style>
  .section-hairline {
    width: 100%;
    height: 1px;
    background: var(--colors-hairline);
    margin-bottom: var(--spacing-lg);
    transform-origin: left center;
  }

  .list-row {
    padding: var(--spacing-sm) 0;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--colors-hairline);
  }
  .list-row-marker { color: var(--colors-body); margin-right: var(--spacing-sm); white-space: pre; flex-shrink: 0; font-weight: 500; }
  .list-row-inner  { display: flex; justify-content: space-between; width: 100%; max-width: 600px; gap: var(--spacing-xl); }
  .list-row-title  { color: var(--colors-ink); flex-grow: 1; }
  .list-row-price  { color: var(--colors-ink); text-align: right; white-space: nowrap; font-weight: 500; }

  .service-note {
    background: var(--colors-surface-soft);
    padding: 14px 16px;
    border-radius: var(--rounded-sm);
    margin-top: var(--spacing-md);
    max-width: 600px;
    color: var(--colors-body);
  }

  @media (max-width: 640px) {
    .service-note, .list-row-inner { max-width: 100%; }
    .service-note { padding: 12px 14px; font-size: 14px; }
    .list-row-inner { gap: var(--spacing-md); }
  }
</style>
