<script>
  // ServiceRow — single list-row item
  // Props: marker, title, price
  export let marker = '[-]';
  export let title  = '';
  export let price  = '';
</script>

<div class="list-row body-md">
  <span class="list-row-marker">{marker}</span>
  <div class="list-row-inner">
    <span class="list-row-title">{title}</span>
    <span class="list-row-price">{@html price}</span>
  </div>
</div>

<style>
  .list-row {
    padding: var(--spacing-sm) 0;
    display: flex;
    align-items: flex-start;
    border-bottom: 1px solid var(--colors-hairline);
  }

  .list-row:last-child {
    border-bottom: none;
  }

  .list-row-marker {
    color: var(--colors-body);
    margin-right: var(--spacing-sm);
    white-space: pre;
    flex-shrink: 0;
    font-weight: 500;
  }

  .list-row-inner {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    width: 100%;
    max-width: 600px;
    gap: var(--spacing-xl);
  }

  .list-row-title {
    color: var(--colors-ink);
    flex-grow: 1;
    min-width: 0;        /* allow text to shrink */
  }

  .list-row-price {
    color: var(--colors-ink);
    text-align: right;
    white-space: nowrap;
    font-weight: 500;
    flex-shrink: 0;      /* price never shrinks */
  }

  /* ── Mobile ≤520px: stack title atas, price bawah ────────── */
  @media (max-width: 520px) {
    .list-row { align-items: flex-start; padding: var(--spacing-sm) 0 10px; }
    .list-row-inner { flex-direction: column; gap: 2px; max-width: 100%; }
    .list-row-price {
      text-align: left;
      font-size: 14px;
      color: var(--colors-mute);
      font-weight: 400;
    }
  }
</style>
