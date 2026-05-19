// ============================================================
// i18n Store — LutzzServis (100% konten asli dari script.js)
// ============================================================
import { writable, derived } from 'svelte/store';

// Raw i18n data — konten identik dengan original script.js
export const i18n = {
  id: {
    nav_home:       'Beranda',
    nav_services:   'Layanan',
    nav_location:   'Lokasi',
    nav_contact:    'Kontak',
    nav_call:       'Hubungi',
    hero_subtitle:  'Melayani Servis Laptop, Oprek Android, Perbaikan Perangkat Keras & Pembuatan Website dengan Kualitas Terbaik.',
    hero_cmd:       'Selamat datang di LutzzServis',
    btn_price:      '[ Harga ]',
    btn_wa:         '[ WA ]',
    section_services: '**Layanan & Harga**',
    cat_laptop:     '[+] Servis Laptop',
    lap_win:        'Install Ulang Windows',
    lap_opt:        'Optimisasi / Custom OS',
    lap_soft:       'Install Software',
    price_start:    'Mulai 5K',
    cat_android:    '[+] Oprek Android',
    and_rom:        'Custom ROM + Root',
    and_flash:      'Flashing (Bootloop)',
    and_reinstall:  'Install Ulang HP',
    cat_hard:       '[+] Hardware',
    hard_no_ship:   'Belum Ongkir',
    hard_with_ship: 'Termasuk Ongkir (+12K)',
    hard_lcd:       'Ganti LCD',
    hard_bat:       'Ganti Baterai',
    hard_glue:      'Lem LCD',
    hard_btn:       'Servis Tombol / FP',
    note_hard:      'Catatan: Anda dapat membawa sparepart sendiri atau kami bantu sediakan. Harga sparepart transparan beserta nota asli (ongkir 12k).',
    cat_web:        '[+] Pembuatan Website',
    web_dev:        'Jasa Pembuatan Website',
    web_ask:        'Tanya via WA',
    note_web:       'Catatan: Cocok untuk landing page, portofolio, tugas, atau profil UMKM. Harga dan waktu pengerjaan bervariasi.',
    section_location: '**Lokasi Kami**',
    loc_open:       'Buka tiap hari',
    foot_top:       'Kembali ke Atas',
    foot_priv:      'Privasi',
    foot_term:      'Ketentuan',
    nav_lang:       'EN',
    foot_lang:      'Indonesia ▼',
  },
  en: {
    nav_home:       'Home',
    nav_services:   'Services',
    nav_location:   'Location',
    nav_contact:    'Contact',
    nav_call:       'Contact Us',
    hero_subtitle:  'Providing Laptop Repair, Android Modding, Hardware Repair & Website Development with the Best Quality.',
    hero_cmd:       'Welcome to LutzzServis',
    btn_price:      '[ Prices ]',
    btn_wa:         '[ WA ]',
    section_services: '**Services & Pricing**',
    cat_laptop:     '[+] Laptop Services',
    lap_win:        'Windows Reinstall',
    lap_opt:        'Optimization / Custom OS',
    lap_soft:       'Software Installation',
    price_start:    'Starts at 5K',
    cat_android:    '[+] Android Modding',
    and_rom:        'Custom ROM + Root',
    and_flash:      'Flashing (Bootloop)',
    and_reinstall:  'Phone Reinstall',
    cat_hard:       '[+] Hardware',
    hard_no_ship:   'Without Shipping',
    hard_with_ship: 'With Shipping (+12K)',
    hard_lcd:       'LCD Replacement',
    hard_bat:       'Battery Replacement',
    hard_glue:      'LCD Regluing',
    hard_btn:       'Button / FP Repair',
    note_hard:      'Note: You can bring your own spare parts or we can help provide them. Spare part prices are transparent with original receipt (12k shipping).',
    cat_web:        '[+] Website Development',
    web_dev:        'Website Development Service',
    web_ask:        'Ask via WA',
    note_web:       'Note: Suitable for landing pages, portfolios, assignments, or MSME profiles. Prices and processing times vary.',
    section_location: '**Our Location**',
    loc_open:       'Open every day',
    foot_top:       'Back to Top',
    foot_priv:      'Privacy',
    foot_term:      'Terms',
    nav_lang:       'ID',
    foot_lang:      'English ▼',
  }
};

// Reactive language store
export const currentLang = writable('id');

// Derived translation helper
export const t = derived(currentLang, ($lang) => {
  return (key) => i18n[$lang][key] ?? key;
});

// Toggle action
export function toggleLanguage() {
  currentLang.update(lang => lang === 'id' ? 'en' : 'id');
}
