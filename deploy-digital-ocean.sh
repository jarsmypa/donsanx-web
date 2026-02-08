#!/bin/bash

# 🚀 Script de Deploy Automático para Digital Ocean
# Uso: ./deploy-digital-ocean.sh [usuario@ip-digital-ocean]

set -e

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuración
REMOTE_USER=${1:-root}
REMOTE_HOST=${2:-tu-ip-digital-ocean}
REMOTE_PATH="/root/donsanx-web"
LOCAL_PATH=$(pwd)

# Función para imprimir con colores
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_section() {
    echo -e "\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}$1${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_error() {
    echo -e "${RED}✗ ERROR:${NC} $1"
    exit 1
}

# Validar entrada
if [ "$REMOTE_HOST" = "tu-ip-digital-ocean" ]; then
    print_error "Por favor, proporciona la IP de tu servidor:\n  ./deploy-digital-ocean.sh root TU_IP"
fi

print_section "🚀 DEPLOY AUTOMÁTICO A DIGITAL OCEAN"
echo "Servidor: $REMOTE_USER@$REMOTE_HOST"
echo "Ruta remota: $REMOTE_PATH"
echo ""

# 1. Compilar localmente
print_section "📦 PASO 1: Compilar Localmente"

print_status "Compilando Sanity Studio..."
cd "$LOCAL_PATH/studio"
npm run build > /dev/null 2>&1
print_status "Studio compilado"

print_status "Compilando Sitio Principal..."
cd "$LOCAL_PATH/DONSANX WEB"
npm run build > /dev/null 2>&1
print_status "Sitio compilado"

cd "$LOCAL_PATH"

# 2. Verificar que los dist existan
print_status "Verificando directorios compilados..."
[ -d "$LOCAL_PATH/studio/dist" ] || print_error "studio/dist no existe"
[ -d "$LOCAL_PATH/DONSANX WEB/dist" ] || print_error "DONSANX WEB/dist no existe"
print_status "Directorios compilados verificados"

# 3. Hacer commit si hay cambios
print_section "📝 PASO 2: Actualizar Repositorio"

if [ -n "$(git status --porcelain)" ]; then
    print_status "Preparando cambios para commit..."
    git add -A
    git commit -m "build: compilar para producción en Digital Ocean" || true
    print_status "Cambios comprometidos"
else
    print_status "No hay cambios nuevos"
fi

print_status "Empujando a GitHub..."
git push origin main
print_status "Código actualizado en GitHub"

# 4. Conectar al servidor y actualizar
print_section "🌍 PASO 3: Actualizar en Digital Ocean"

print_status "Conectando a $REMOTE_HOST..."

ssh "$REMOTE_USER@$REMOTE_HOST" << 'REMOTE_SCRIPT'
    set -e
    
    print_status() {
        echo "✓ $1"
    }
    
    # Navegar a la carpeta del proyecto
    cd /root/donsanx-web
    
    print_status "Descargando últimos cambios..."
    git pull origin main
    
    print_status "Instalando dependencias..."
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
    
    print_status "Reiniciando servicios..."
    pm2 restart donsanx-api
    sleep 2
    systemctl reload caddy
    
    print_status "Deploy completado exitosamente"
REMOTE_SCRIPT

print_status "Servidor actualizado"

# 5. Verificación final
print_section "✅ PASO 4: Verificación"

print_status "Verificando servicios en Digital Ocean..."
ssh "$REMOTE_USER@$REMOTE_HOST" << 'VERIFY_SCRIPT'
    echo "Estado de PM2:"
    pm2 status donsanx-api 2>/dev/null || echo "  ✗ Servicio no encontrado"
    
    echo ""
    echo "Estado de Caddy:"
    systemctl is-active caddy > /dev/null && echo "  ✓ Caddy ejecutándose" || echo "  ✗ Caddy no está activo"
VERIFY_SCRIPT

# 6. Resumen final
print_section "🎉 DEPLOY COMPLETADO"

echo "Tu sitio está actualizado:"
echo ""
echo "  🌐 Sitio Principal:    https://donsanx.me/"
echo "  🔒 Sanity Admin:       https://admin.donsanx.me/"
echo ""
echo "Próximos pasos:"
echo "  1. Abre https://admin.donsanx.me en tu navegador"
echo "  2. Inicia sesión con GitHub"
echo "  3. Crea nuevas notas"
echo "  4. Verifica que aparezcan en https://donsanx.me/"
echo ""
echo "Para ver logs:"
echo "  ssh $REMOTE_USER@$REMOTE_HOST"
echo "  pm2 logs donsanx-api"
echo ""
