<script>
  import { t, toggleLanguage } from '../stores/lang.js';
</script>

<footer id="contact" class="footer-section">
  <!-- 5-up link grid — WhatsApp, Maps, Instagram, Facebook, Back to Top -->
  <div class="footer-grid caption-md">
    <a href="https://wa.me/62895384661641">WhatsApp [0895384661641]</a>
    <a href="https://maps.app.goo.gl/n2VoZCYYVF5hRJce9">Google Maps</a>
    <a href="https://www.instagram.com/just_360p" target="_blank" rel="noopener">Instagram</a>
    <a href="https://www.facebook.com/profile.php?id=100073770163510" target="_blank" rel="noopener">Facebook</a>
    <a href="#hero">{$t('foot_top')}</a>
  </div>

  <!-- Bottom row: copyright + utility links -->
  <div class="footer-bottom caption-md">
    <div>©2026 LutzzServis</div>
    <div class="footer-bottom-links">
      <button class="lang-btn caption-md">{$t('foot_priv')}</button>
      <button class="lang-btn caption-md">{$t('foot_term')}</button>
      <button class="lang-btn caption-md" id="foot-lang-toggle" on:click={toggleLanguage}>
        {$t('foot_lang')}
      </button>
    </div>
  </div>
</footer>

<style>
  .footer-section {
    padding: var(--spacing-xxl) 0;
    border-top: 1px solid var(--colors-hairline);
    margin-top: var(--spacing-xxl);
    color: var(--colors-mute);
  }

  /* 5-up link grid */
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    text-align: center;
    margin-bottom: var(--spacing-xl);
  }

  .footer-grid > a {
    border-right: 1px solid var(--colors-hairline);
    padding: 8px 4px;
    color: var(--colors-mute);
    transition: color 0.15s;
    word-break: break-word;
  }

  .footer-grid > a:last-child {
    border-right: none;
  }

  .footer-grid > a:hover {
    color: var(--colors-ink);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: var(--spacing-lg);
    align-items: center;
    color: var(--colors-mute);
  }

  .footer-bottom-links {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
  }


  /* ── Tablet ≤850px: 2-up grid ───────────────────────── */
  @media (max-width: 850px) {
    .footer-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    /* Reset border-right di semua item */
    .footer-grid > a {
      border-right: none;
      border-bottom: 1px solid var(--colors-hairline);
    }
    /* Item di kolom kanan (genap) tidak perlu border khusus */
    /* Hapus border bawah dari 2 elemen terakhir hanya jika ada 4+ items per baris terakhir */
    /* Solusi lebih aman: hapus border bawah dari item terakhir saja */
    .footer-grid > a:last-child {
      border-bottom: none;
    }
  }

  /* ── Mobile (≤640px): 1-up full-width ───────────────────── */
  @media (max-width: 640px) {
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .footer-grid > a {
      border-right: none;
      border-bottom: 1px solid var(--colors-hairline);
      text-align: left;
    }

    .footer-grid > a:last-child {
      border-bottom: none;
    }

    .footer-bottom {
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: flex-start;
    }

    .footer-bottom-links {
      flex-direction: column;
      gap: var(--spacing-sm);
      align-items: flex-start;
    }
  }
</style>
