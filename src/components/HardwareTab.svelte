<script>
  import { withShipping } from '../stores/hardware.js';
  import { t } from '../stores/lang.js';
</script>

<!-- Tab strip untuk harga hardware -->
<div class="tab-strip">
  <button
    class="button-tab"
    class:active={!$withShipping}
    id="tab-tanpa-ongkir"
    on:click={() => withShipping.set(false)}
  >{$t('hard_no_ship')}</button>

  <button
    class="button-tab"
    class:active={$withShipping}
    id="tab-dengan-ongkir"
    on:click={() => withShipping.set(true)}
  >{$t('hard_with_ship')}</button>
</div>

<style>
  .tab-strip {
    display: flex;
    gap: 0;
    margin-bottom: var(--spacing-md);
    border-bottom: 1px solid var(--colors-hairline-strong);
    overflow-x: auto;
    scrollbar-width: none;
  }
  .tab-strip::-webkit-scrollbar { display: none; }

  /* Mobile: font-size lebih kecil agar tabs tidak overflow */
  @media (max-width: 520px) {
    :global(.button-tab) {
      font-size: 13px;
      padding: 8px 10px;
    }
  }
</style>
