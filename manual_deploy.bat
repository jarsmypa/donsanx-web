@echo off
echo ==========================================
echo 🛠️  REPARANDO Y SUBIENDO CAMBIOS...
echo ==========================================

echo 1. Deteniendo procesos trabados...
taskkill /F /IM git.exe >nul 2>&1

echo 2. Eliminando bloqueos...
if exist .git\index.lock del .git\index.lock
if exist .git\COMMIT_EDITMSG del .git\COMMIT_EDITMSG

echo 3. Agregando archivos...
"C:\Program Files\Git\bin\git.exe" add -A

echo 4. Guardando cambios (Commit)...
"C:\Program Files\Git\bin\git.exe" commit -m "Deploy manual final"

echo 5. Subiendo a GitHub (Push)...
echo    (Si te pide login, una ventana se abrira o te pedira en texto)
"C:\Program Files\Git\bin\git.exe" push origin main

echo.
echo ==========================================
echo ✅ PROCESO TERMINADO
echo ==========================================
pause
