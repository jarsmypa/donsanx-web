@echo off
echo ==========================================
echo 🛠️  REPARANDO Y SUBIENDO CAMBIOS...
echo ==========================================

echo 1. Deteniendo procesos trabados...
taskkill /F /IM git.exe >nul 2>&1

echo 2. Eliminando bloqueos...
if exist .git\index.lock del .git\index.lock
if exist .git\COMMIT_EDITMSG del .git\COMMIT_EDITMSG

echo 3. Configurando GitHub y Sincronizando...
"C:\Program Files\Git\bin\git.exe" remote remove origin >nul 2>&1
"C:\Program Files\Git\bin\git.exe" remote add origin https://jarsmypa@github.com/jarsmypa/donsanx-web.git

echo    (Asegurando que la carpeta dist se suba si o si...)
if exist "fam-dashboard\dist" "C:\Program Files\Git\bin\git.exe" add -f "fam-dashboard\dist"

echo 4. Agregando y Guardando cambios...
"C:\Program Files\Git\bin\git.exe" add -A
"C:\Program Files\Git\bin\git.exe" commit -m "Deploy manual final force"

echo 5. Subiendo a GitHub (FORZADO)...
echo    Atencion: Esto sobreescribira la historia en GitHub con tu version local.
"C:\Program Files\Git\bin\git.exe" push -u origin main --force

echo.
echo ==========================================
echo ✅ PROCESO TERMINADO
echo ==========================================
pause
