#!/bin/bash
# Script de deploy a Digital Ocean
# Uso: ./deploy.sh

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=====================================${NC}"
echo -e "${YELLOW}🚀 DEPLOY A DIGITAL OCEAN${NC}"
echo -e "${YELLOW}=====================================${NC}"

# Verificar si estamos en el directorio correcto
if [ ! -f "Caddyfile" ]; then
    echo -e "${RED}❌ Error: No se encontró Caddyfile. Ejecuta este script desde la raíz del proyecto${NC}"
    exit 1
fi

# Variables - ACTUALIZA ESTAS CON TUS DATOS
DROPLET_IP="${DROPLET_IP:-tu-ip-aqui}"
DROPLET_USER="${DROPLET_USER:-root}"
REMOTE_PATH="/root/donsanx-web"

echo -e "${YELLOW}📋 Configuración:${NC}"
echo "  IP del Droplet: $DROPLET_IP"
echo "  Usuario: $DROPLET_USER"
echo "  Ruta remota: $REMOTE_PATH"
echo ""

# Step 1: Verificar conexión SSH
echo -e "${YELLOW}1️⃣  Verificando conexión SSH...${NC}"
if ssh -o ConnectTimeout=5 "$DROPLET_USER@$DROPLET_IP" "echo 'SSH OK'" > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Conexión SSH OK${NC}"
else
    echo -e "${RED}❌ No se puede conectar al servidor. Verifica:${NC}"
    echo "   - IP correcta: $DROPLET_IP"
    echo "   - Usuario correcto: $DROPLET_USER"
    echo "   - Clave SSH configurada"
    exit 1
fi

# Step 2: Hacer build
echo -e "${YELLOW}2️⃣  Haciendo builds optimizados...${NC}"

# Build Main Web
echo "   🔹 Building Main Web..."
cd "DONSANX WEB"
if npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Main Web Build OK${NC}"
else
    echo -e "${RED}   ❌ Error en Main Web Build${NC}"
    exit 1
fi
cd ..

# Build Fam Dashboard
echo "   🔹 Building Family Dashboard..."
cd "fam-dashboard"
if npm install > /dev/null 2>&1 && npm run build > /dev/null 2>&1; then
    echo -e "${GREEN}   ✅ Fam Dashboard Build OK${NC}"
else
    echo -e "${RED}   ❌ Error en Fam Dashboard Build${NC}"
    exit 1
fi
cd ..

# Step 3: Commit y push
echo -e "${YELLOW}3️⃣  Commit y push a Git...${NC}"
git add -A
git commit -m "deploy: update sites" 2>/dev/null || echo "✓ Sin cambios nuevos o ya commiteado"
if git push origin main > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Push a GitHub completado${NC}"
else
    echo -e "${YELLOW}⚠️  Push no necesario o error menor${NC}"
fi

# Step 4: Copiar archivos al servidor
echo -e "${YELLOW}4️⃣  Transfiriendo archivos al servidor...${NC}"

# Ensure remote directory exists
echo "   🔹 Creating remote directory structure..."
ssh "$DROPLET_USER@$DROPLET_IP" "mkdir -p \"$REMOTE_PATH/fam-dashboard\""

# Copy Caddyfile first
echo "   🔹 Updating Caddyfile..."
rsync -avz "Caddyfile" "$DROPLET_USER@$DROPLET_IP:$REMOTE_PATH/"

# Copy Main Web
echo "   🔹 Deploying Main Web..."
rsync -avz --delete \
    "DONSANX WEB/dist/" \
    "$DROPLET_USER@$DROPLET_IP:$REMOTE_PATH/DONSANX\ WEB/dist/" 2>&1 | tail -2

# Copy Fam Dashboard
echo "   🔹 Deploying Family Dashboard..."
rsync -avz --delete \
    "fam-dashboard/dist/" \
    "$DROPLET_USER@$DROPLET_IP:$REMOTE_PATH/fam-dashboard/dist/" 2>&1 | tail -2

if [ ${PIPESTATUS[0]} -eq 0 ]; then
    echo -e "${GREEN}✅ Archivos transferidos${NC}"
else
    echo -e "${RED}❌ Error en la transferencia${NC}"
    exit 1
fi

# Step 5: Actualizar studio (Sanity)
echo -e "${YELLOW}5️⃣  Actualizando Sanity Studio...${NC}"
rsync -avz --delete \
    "studio/dist/" \
    "$DROPLET_USER@$DROPLET_IP:$REMOTE_PATH/studio/dist/" 2>&1 | tail -2

# Step 6: Recargar configuración del servidor
echo -e "${YELLOW}6️⃣  Recargando servidor...${NC}"
ssh "$DROPLET_USER@$DROPLET_IP" "
    echo 'Recargando Caddy...'
    systemctl reload caddy
    echo 'Verificando estado...'
    systemctl status caddy | grep -E 'active|failed'
" 

# Step 7: Verificar que la web está up
echo -e "${YELLOW}7️⃣  Verificando que la web está online...${NC}"
sleep 2
if curl -s -o /dev/null -w "%{http_code}" "https://donsanx.me" | grep -q "200\|301"; then
    echo -e "${GREEN}✅ Web online en https://donsanx.me${NC}"
else
    echo -e "${YELLOW}⚠️  Verifica manualmente: https://donsanx.me${NC}"
fi

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}✅ DEPLOY COMPLETADO${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "🎉 Nuevos sitios desplegados:"
echo "  ✓ Main: https://donsanx.me"
echo "  ✓ Family: https://fam.donsanx.me"
echo ""
