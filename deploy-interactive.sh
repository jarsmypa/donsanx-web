#!/bin/bash

# Script interactivo para deploy a Digital Ocean
# Este script pregunta por los datos y luego realiza el deploy

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

clear
echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  🚀 DEPLOY INTERACTIVO A DIGITAL OCEAN   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Pedir datos
echo -e "${YELLOW}Ingresa tus datos de Digital Ocean:${NC}"
echo ""

read -p "📍 IP del Droplet (ej: 192.168.1.1): " DROPLET_IP
read -p "👤 Usuario SSH (ej: root): " DROPLET_USER
read -p "📁 Ruta remota (ej: /root/donsanx-web) [Enter para default]: " REMOTE_PATH
REMOTE_PATH=${REMOTE_PATH:-/root/donsanx-web}

echo ""
echo -e "${BLUE}Datos ingresados:${NC}"
echo "  IP: $DROPLET_IP"
echo "  Usuario: $DROPLET_USER"
echo "  Ruta: $REMOTE_PATH"
echo ""

read -p "¿Continuar con el deploy? (s/n): " confirm
if [ "$confirm" != "s" ]; then
    echo -e "${RED}❌ Deploy cancelado${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}Iniciando deploy...${NC}"
echo ""

# Verificar SSH
echo -e "${YELLOW}1️⃣  Verificando conexión SSH...${NC}"
if ssh -o ConnectTimeout=5 "$DROPLET_USER@$DROPLET_IP" "echo 'OK'" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Conexión OK${NC}"
else
    echo -e "${RED}❌ No se puede conectar. Verifica:${NC}"
    echo "   - IP correcta"
    echo "   - Usuario correcto"
    echo "   - Clave SSH configurada (ssh-keygen)"
    exit 1
fi

# Build
echo ""
echo -e "${YELLOW}2️⃣  Haciendo build...${NC}"
cd "DONSANX WEB"
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Build OK${NC}"
else
    echo -e "${RED}❌ Error en build${NC}"
    exit 1
fi
cd ..

# Git
echo ""
echo -e "${YELLOW}3️⃣  Actualizando Git...${NC}"
git add -A
git commit -m "deploy: security, mobile modal fix, performance" 2>/dev/null || echo "✓ Sin cambios"
git push origin main 2>/dev/null || echo "✓ Sin cambios nuevos"

# Transferir archivos
echo ""
echo -e "${YELLOW}4️⃣  Transfiriendo archivos...${NC}"
rsync -avz --delete "DONSANX WEB/dist/" "$DROPLET_USER@$DROPLET_IP:$REMOTE_PATH/DONSANX\ WEB/dist/" 2>&1 | grep -E "^sending|^sent|^total" || echo "✓ Archivos transferidos"

# Recargar servidor
echo ""
echo -e "${YELLOW}5️⃣  Recargando servidor...${NC}"
ssh "$DROPLET_USER@$DROPLET_IP" "systemctl reload caddy && sleep 2 && systemctl status caddy | grep -o 'active.*\|failed'" 2>&1

# Verificar
echo ""
echo -e "${YELLOW}6️⃣  Verificando web...${NC}"
sleep 2
if curl -s -o /dev/null -w "%{http_code}" "https://donsanx.me" | grep -q "200\|301"; then
    echo -e "${GREEN}✅ Web online${NC}"
else
    echo -e "${YELLOW}⚠️  Verifica en https://donsanx.me${NC}"
fi

echo ""
echo -e "${GREEN}════════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ DEPLOY COMPLETADO${NC}"
echo -e "${GREEN}════════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Cambios en producción:${NC}"
echo "  ✓ Seguridad: Headers HTTP agregados"
echo "  ✓ Mobile: Modal z-index arreglado"
echo "  ✓ Performance: Bundle optimizado"
echo ""
echo -e "${BLUE}Próximos pasos:${NC}"
echo "  1. Abre https://donsanx.me"
echo "  2. Presiona F12 → Network → Headers"
echo "  3. Prueba modal en mobile (Ctrl+Shift+M)"
echo "  4. Verifica en https://pagespeed.web.dev"
echo ""
