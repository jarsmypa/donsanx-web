#!/bin/bash

# 📋 Instrucciones para actualizar Digital Ocean

cat << 'EOF'
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║     📦 ACTUALIZAR EL DROPLET EN DIGITAL OCEAN             ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝


🔄 OPCIÓN 1: ACTUALIZACIÓN RÁPIDA (RECOMENDADA)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Conéctate al servidor:
   $ ssh root@TU_IP_DIGITAL_OCEAN

2. Ve a la carpeta del proyecto:
   $ cd /root/donsanx-web

3. Ejecuta el script de actualización:
   $ bash update.sh

4. Espera a que termine
   
5. Verifica que funcione:
   - Abre https://donsanx.me/
   - Abre https://admin.donsanx.me/
   - Comprueba que todo está igual

¡Listo! El sitio está actualizado con los nuevos cambios.


⏱️  TIEMPO: 2-3 minutos


🔧 OPCIÓN 2: ACTUALIZACIÓN MANUAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Si el script no funciona, hazlo manualmente:

$ ssh root@TU_IP_DIGITAL_OCEAN

cd /root/donsanx-web

# Parar servicios
pm2 stop donsanx-api
systemctl stop caddy

# Actualizar código
git pull origin main

# Recompilar todo
npm install
cd studio && npm install && npm run build && cd ..
cd "DONSANX WEB" && npm install && npm run build && cd ..

# Reiniciar
pm2 start donsanx-api
systemctl start caddy

# Verificar
pm2 status
systemctl status caddy


📊 CAMBIOS QUE INCLUYE ESTA ACTUALIZACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Sanity Studio compilado (completo)
✅ Sitio principal compilado (completo)
✅ GitHub OAuth configurado (solo tú accedes)
✅ Variables de ambiente (.env.example)
✅ Guías de deploy
✅ Script de actualización

IMPORTANTE: Estos cambios REEMPLAZAN el repositorio viejo
con el nuevo desde GitHub.


🔐 ANTES Y DESPUÉS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ANTES:
  - Sanity Studio sin compilar
  - Sin autenticación GitHub OAuth
  - Sin guías de deploy

DESPUÉS:
  - Sanity Studio compilado
  - GitHub OAuth configurado (SEGURO)
  - Guías de deploy completas
  - Scripts de actualización rápida


✅ VERIFICACIÓN DESPUÉS DE ACTUALIZAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Checklist:
  ✓ https://donsanx.me/ carga normalmente
  ✓ https://admin.donsanx.me/ carga
  ✓ En admin, ves opción "Login with GitHub"
  ✓ Puedes clickear en "+ Create" → "Notas"
  ✓ El sitio se ve igual que antes

Si todo funciona, ¡está done!


📝 COMANDOS ÚTILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ver logs en vivo:
  pm2 logs donsanx-api

Ver estado:
  pm2 status

Reiniciar servicios:
  pm2 restart donsanx-api
  systemctl reload caddy

Ver últimos cambios:
  git log --oneline -5


🆘 SI ALGO FALLA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Error: "Cannot pull origin main"
  → Verifica conexión a internet
  → Verifica que git está configurado

Error: "pm2: command not found"
  → Instala: npm install -g pm2

Error: "Cannot find studio/dist"
  → Asegúrate de que npm run build se ejecutó sin errores
  → Verifica logs de build

Error: "Port 3000 already in use"
  → Kill: lsof -ti:3000 | xargs kill -9
  → Reinicia: pm2 restart donsanx-api

Error: "Caddy: permission denied"
  → Asegúrate de tener permisos: sudo systemctl restart caddy


═══════════════════════════════════════════════════════════

🎯 RESUMEN

1. ssh root@TU_IP
2. cd /root/donsanx-web
3. bash update.sh
4. Espera 2-3 minutos
5. Verifica https://donsanx.me/

¡Listo! Sitio actualizado con los nuevos cambios.

═══════════════════════════════════════════════════════════
EOF
