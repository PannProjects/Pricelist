@echo off
:: ============================================================
:: LutzzServis — Svelte Dev Setup
:: Double-click file ini untuk menjalankan dev server
:: ============================================================

set PATH=C:\Program Files\nodejs;%PATH%

echo [LUTZZSERVIS] Svelte Dev Server
echo.

if not exist "node_modules\" (
    echo [INSTALL] Menginstall dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo [ERROR] npm install gagal.
        pause
        exit /b 1
    )
    echo [OK] Dependencies terinstall!
    echo.
)

echo [DEV] Menjalankan dev server...
echo       Buka browser: http://localhost:5173
echo.
npm run dev
