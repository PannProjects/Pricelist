const i18n = {
    id: {
        nav_home: "Beranda",
        nav_services: "Layanan",
        nav_location: "Lokasi",
        nav_contact: "Kontak",
        nav_call: "Hubungi",
        hero_subtitle: "Melayani Servis Laptop, Oprek Android, Perbaikan Perangkat Keras & Pembuatan Website dengan Kualitas Terbaik.",
        hero_cmd: "Selamat datang di LutzzServis",
        btn_price: "[ Harga ]",
        btn_wa: "[ WA ]",
        section_services: "**Layanan & Harga**",
        cat_laptop: "[+] Servis Laptop",
        lap_win: "Install Ulang Windows",
        lap_opt: "Optimisasi / Custom OS",
        lap_soft: "Install Software",
        price_start: "Mulai 5K",
        cat_android: "[+] Oprek Android",
        and_rom: "Custom ROM + Root",
        and_flash: "Flashing (Bootloop)",
        and_reinstall: "Install Ulang HP",
        cat_hard: "[+] Hardware",
        hard_no_ship: "Belum Ongkir",
        hard_with_ship: "Termasuk Ongkir (+12K)",
        hard_lcd: "Ganti LCD",
        hard_bat: "Ganti Baterai",
        hard_glue: "Lem LCD",
        hard_btn: "Servis Tombol / FP",
        note_hard: '<span class="body-strong">Catatan:</span> Anda dapat membawa sparepart sendiri atau kami bantu sediakan. Harga sparepart transparan beserta nota asli (ongkir 12k).',
        cat_web: "[+] Pembuatan Website",
        web_dev: "Jasa Pembuatan Website",
        web_ask: "Tanya via WA",
        note_web: '<span class="body-strong">Catatan:</span> Cocok untuk landing page, portofolio, tugas, atau profil UMKM. Harga dan waktu pengerjaan bervariasi.',
        section_location: "**Lokasi Kami**",
        loc_open: "Buka tiap hari",
        foot_top: "Kembali ke Atas",
        foot_priv: "Privasi",
        foot_term: "Ketentuan",
        nav_lang: "EN",
        foot_lang: "Indonesia ▼"
    },
    en: {
        nav_home: "Home",
        nav_services: "Services",
        nav_location: "Location",
        nav_contact: "Contact",
        nav_call: "Contact Us",
        hero_subtitle: "Providing Laptop Repair, Android Modding, Hardware Repair & Website Development with the Best Quality.",
        hero_cmd: "Welcome to LutzzServis",
        btn_price: "[ Prices ]",
        btn_wa: "[ WA ]",
        section_services: "**Services & Pricing**",
        cat_laptop: "[+] Laptop Services",
        lap_win: "Windows Reinstall",
        lap_opt: "Optimization / Custom OS",
        lap_soft: "Software Installation",
        price_start: "Starts at 5K",
        cat_android: "[+] Android Modding",
        and_rom: "Custom ROM + Root",
        and_flash: "Flashing (Bootloop)",
        and_reinstall: "Phone Reinstall",
        cat_hard: "[+] Hardware",
        hard_no_ship: "Without Shipping",
        hard_with_ship: "With Shipping (+12K)",
        hard_lcd: "LCD Replacement",
        hard_bat: "Battery Replacement",
        hard_glue: "LCD Regluing",
        hard_btn: "Button / FP Repair",
        note_hard: '<span class="body-strong">Note:</span> You can bring your own spare parts or we can help provide them. Spare part prices are transparent with original receipt (12k shipping).',
        cat_web: "[+] Website Development",
        web_dev: "Website Development Service",
        web_ask: "Ask via WA",
        note_web: '<span class="body-strong">Note:</span> Suitable for landing pages, portfolios, assignments, or MSME profiles. Prices and processing times vary.',
        section_location: "**Our Location**",
        loc_open: "Open every day",
        foot_top: "Back to Top",
        foot_priv: "Privacy",
        foot_term: "Terms",
        nav_lang: "ID",
        foot_lang: "English ▼"
    }
};

let currentLang = 'id';

function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    document.documentElement.lang = currentLang;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) {
            el.innerHTML = i18n[currentLang][key];
        }
    });

    document.getElementById('nav-lang-toggle').innerText = i18n[currentLang].nav_lang;
    document.getElementById('foot-lang-toggle').innerText = i18n[currentLang].foot_lang;
}

// Auto scroll animation for ASCII art on mobile
// Auto scroll animation for ASCII art on mobile (Seamless Marquee)
function initAsciiAnimation() {
    const container = document.querySelector('.hero-title-container');
    const title = document.querySelector('.hero-title');
    if (!container || !title || title.dataset.cloned) return;

    // Clone the ASCII art for a seamless loop
    const clone = title.cloneNode(true);
    container.appendChild(clone);
    title.dataset.cloned = "true";

    let scrollPos = 0;
    const speed = 1.5; // Smooth scroll speed

    function scrollLoop() {
        if (window.innerWidth <= 768) {
            // Apply flex layout for mobile marquee
            clone.style.display = 'inline-block';
            container.style.display = 'flex';
            container.style.gap = '50px';
            container.style.justifyContent = 'flex-start';
            container.style.overflowX = 'hidden';

            scrollPos += speed;
            const elementWidth = title.offsetWidth + 50; // width + gap
            
            // Seamless reset point
            if (scrollPos >= elementWidth) {
                scrollPos -= elementWidth;
            }
            container.scrollLeft = scrollPos;
        } else {
            // Restore desktop layout
            clone.style.display = 'none';
            container.style.display = '';
            container.style.gap = '';
            container.style.justifyContent = '';
            container.style.overflowX = 'auto';
            container.scrollLeft = 0;
            scrollPos = 0;
        }
        requestAnimationFrame(scrollLoop);
    }
    
    // Start the loop
    requestAnimationFrame(scrollLoop);
}

document.addEventListener('DOMContentLoaded', () => {
    // Menu logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuBtn.innerText = '[ x Tutup ]';
            } else {
                menuBtn.innerText = '[ Menu ]';
            }
        });

        navLinks.querySelectorAll('a, button:not(.lang-btn)').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.innerText = '[ Menu ]';
            });
        });
    }

    // Toggle Ongkir Logic
    const tabTanpaOngkir = document.getElementById('tab-tanpa-ongkir');
    const tabDenganOngkir = document.getElementById('tab-dengan-ongkir');
    if (tabTanpaOngkir && tabDenganOngkir) {
        const hardwareCategory = document.getElementById('hardware-category');
        const priceElements = hardwareCategory.querySelectorAll('.list-row-price[data-base]');
        
        const updatePrices = (ongkir) => {
            priceElements.forEach(el => {
                const base = parseInt(el.getAttribute('data-base'));
                el.innerText = (base + (ongkir ? 12 : 0)) + 'K';
            });
        };

        tabTanpaOngkir.addEventListener('click', () => {
            tabTanpaOngkir.classList.add('active');
            tabDenganOngkir.classList.remove('active');
            updatePrices(false);
        });

        tabDenganOngkir.addEventListener('click', () => {
            tabDenganOngkir.classList.add('active');
            tabTanpaOngkir.classList.remove('active');
            updatePrices(true);
        });
    }

    // Initialize animation
    initAsciiAnimation();
});
