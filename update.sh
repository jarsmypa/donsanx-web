#!/bin/bash

# 🚀 Script de Actualización Rápida para Digital Ocean
# Uso en el servidor: bash update.sh

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_section() {
    echo -e "\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_section "🚀 ACTUALIZACIÓN DEL SISTEMA DONSANX"

# Verificar que estamos en el directorio correcto
if [ ! -f "Caddyfile" ]; then
    echo "❌ Error: Debes ejecutar este script desde /root/donsanx-web"
    exit 1
fi

print_status "Estamos en: $(pwd)"

# 1. Detener servicios
print_section "1️⃣ DETENIENDO SERVICIOS"

print_status "Parando servidor Node.js..."
pm2 stop donsanx-api 2>/dev/null || echo "   (Servidor no estaba corriendo)"

print_status "Parando Caddy..."
systemctl stop caddy 2>/dev/null || echo "   (Caddy no estaba corriendo)"

# 2. Actualizar repositorio
print_section "2️⃣ ACTUALIZANDO CÓDIGO"

print_status "Descargando cambios de GitHub..."
git pull origin main

print_status "Cambios descargados"

# 3. Recompilar
print_section "3️⃣ RECOMPILANDO APLICACIONES"

print_status "Actualizando dependencias root..."
npm install > /dev/null 2>&1

print_status "Compilando Sanity Studio..."
cd studio
npm install > /dev/null 2>&1
npm run build > /dev/null 2>&1
cd ..

print_status "Compilando Sitio Principal..."
cd "DONSANX WEB"
npm install > /dev/null 2>&1
npm run build > /dev/null 2>&1
cd ..

# 4. Reiniciar servicios
print_section "4️⃣ REINICIANDO SERVICIOS"

print_status "Iniciando servidor Node.js..."
pm2 start donsanx-api 2>/dev/null || pm2 start server.js --name "donsanx-api"

print_status "Iniciando Caddy..."
systemctl start caddy

print_status "Esperando servicios..."
sleep 3

# 5. Verificación
print_section "5️⃣ VERIFICANDO ESTADO"

if pm2 status donsanx-api | grep -q "online"; then
    print_status "✓ Servidor Node.js corriendo"
else
    echo "❌ Error: Servidor Node.js no está corriendo"
fi

if systemctl is-active caddy > /dev/null; then
    print_status "✓ Caddy corriendo"
else
    echo "❌ Error: Caddy no está corriendo"
fi

# 6. Resumen
print_section "✅ ACTUALIZACIÓN COMPLETADA"

echo "Tu sitio ha sido actualizado:"
echo ""
echo "  🌐 https://donsanx.me/"
echo "  🔒 https://admin.donsanx.me/"
echo ""
echo "Ver logs:"
echo "  pm2 logs donsanx-api"
echo ""
