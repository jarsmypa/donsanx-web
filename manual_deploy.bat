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

rem Intentamos bajar cambios remotos sin borrar lo local
echo    (Bajando historia remota para evitar errores...)
"C:\Program Files\Git\bin\git.exe" pull origin main --allow-unrelated-histories --no-edit -X ours

echo 4. Agregando y Guardando cambios...
"C:\Program Files\Git\bin\git.exe" add -A
"C:\Program Files\Git\bin\git.exe" commit -m "Deploy manual final fix credentials"

echo 5. Subiendo a GitHub...
echo    IMPORTANTE: Si te pide contrasena, usa tu Personal Access Token (o password si te deja).
"C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo ==========================================
echo ✅ PROCESO TERMINADO
echo ==========================================
pause
