@echo off
set PATH=C:\Program Files\nodejs;%PATH%
echo [BUILD] Membangun production bundle...
npm run build
if %errorlevel% equ 0 (
    echo.
    echo [OK] Build berhasil! Output ada di folder: dist\
) else (
    echo [ERROR] Build gagal!
)
pause
