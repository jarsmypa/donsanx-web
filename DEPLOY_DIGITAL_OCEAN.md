# 🔐 Configuración de Autenticación GitHub + Deploy Digital Ocean

## 📋 Tabla de Contenidos
1. [Configurar GitHub OAuth en Sanity](#github-oauth)
2. [Variables de Ambiente](#variables)
3. [Deploy en Digital Ocean](#deploy)
4. [Verificación Final](#verificacion)

---

## 🔐 Configurar GitHub OAuth en Sanity {#github-oauth}

### Paso 1: Crear OAuth App en GitHub

1. Ve a: https://github.com/settings/developers
2. Click en **"New OAuth App"** (lado derecho)
3. Rellena el formulario:

```
Application name: Donsanx Admin
Homepage URL: https://admin.donsanx.me
Application description: Editor de contenido para donsanx.me
Authorization callback URL: https://kexbt74e.api.sanity.io/v1/auth/callback
```

4. Click **"Register application"**
5. Copia:
   - **Client ID** → Guárdalo en un lugar seguro
   - **Client Secret** → Guárdalo en un lugar seguro

### Paso 2: Configurar OAuth en Sanity Cloud

1. Ve a: https://www.sanity.io/manage/project/kexbt74e
2. En el lado izquierdo: **"Settings"** → **"API"** → **"OAuth"**
3. Click en **"Add OAuth Provider"** (si existe)
4. Selecciona **"GitHub"**
5. Pega:
   - **Client ID** (del paso anterior)
   - **Client Secret** (del paso anterior)
6. Click **"Save"**

### Paso 3: Agregar tu Usuario de GitHub como Miembro

1. En Sanity Cloud Settings: **"Members"**
2. Click **"+ Add member"**
3. Busca tu usuario de GitHub
4. Dale rol **"Administrator"** (para poder publicar)
5. Click **"Add"**

**Ahora solo TÚ podrás acceder a admin.donsanx.me con tus credenciales de GitHub** ✓

---

## 🌍 Variables de Ambiente {#variables}

### En Desarrollo (Local)

Crea `.env.local` en `/studio/`:

```bash
# studio/.env.local
VITE_SANITY_PROJECT_ID=kexbt74e
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-05-03
```

Crea `.env.local` en `/DONSANX WEB/`:

```bash
# DONSANX WEB/.env.local
VITE_SANITY_PROJECT_ID=kexbt74e
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2023-05-03
```

### En Producción (Digital Ocean)

Creas estas variables en el servidor:

```bash
export SANITY_PROJECT_ID=kexbt74e
export SANITY_DATASET=production
export NODE_ENV=production
export PORT=3000
```

---

## 🚀 Deploy en Digital Ocean {#deploy}

### Requisitos Previos

- Cuenta en Digital Ocean
- Droplet con Ubuntu 24.04
- SSH configurado
- Tu IP DNS apuntando a la IP del droplet

### Paso 1: Preparar el Servidor

Conecta via SSH:

```bash
ssh root@tu-ip-digital-ocean
```

Instala dependencias:

```bash
# Actualizar sistema
apt-get update && apt-get upgrade -y

# Instalar Node.js (versión 20+)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Instalar Caddy (servidor web)
apt-get install -y caddy

# Instalar Git
apt-get install -y git

# Instalar PM2 (para mantener servidor vivo)
npm install -g pm2
```

Verifica las instalaciones:

```bash
node --version    # Debe ser v20+
npm --version
caddy --version
git --version
pm2 --version
```

### Paso 2: Clonar Repositorio

```bash
cd /root
git clone https://github.com/jarsmypa/donsanx-web.git
cd donsanx-web
```

### Paso 3: Instalar Dependencias

```bash
# Root
npm install

# Studio
cd studio
npm install
npm run build
cd ..

# Sitio Principal
cd "DONSANX WEB"
npm install
npm run build
cd ..
```

### Paso 4: Configurar Variables de Ambiente

```bash
# Crear archivo .env en la raíz
cat > .env << EOF
NODE_ENV=production
PORT=3000
SANITY_PROJECT_ID=kexbt74e
SANITY_DATASET=production
EOF
```

### Paso 5: Configurar Caddy

El archivo `Caddyfile` ya está configurado correctamente. Verifica que apunte a tus dominios:

```bash
# Ver Caddyfile
cat Caddyfile
```

Debe contener:

```caddy
donsanx.me {
    root * "./DONSANX WEB/dist"
    file_server
    try_files {path} /index.html
}

admin.donsanx.me {
    root * "./studio/dist"
    file_server
    try_files {path} /index.html
}
```

Inicia Caddy:

```bash
# Opción A: Manual (para testing)
caddy run --config Caddyfile

# Opción B: Como servicio (permanente)
sudo systemctl start caddy
sudo systemctl enable caddy
```

### Paso 6: Iniciar Servidor Node.js

```bash
# Opción A: PM2 (Recomendado - inicia automáticamente)
pm2 start server.js --name "donsanx-api"
pm2 startup
pm2 save

# Opción B: Node directo (para testing)
node server.js
```

### Paso 7: Verificar que Funciona

```bash
# Verificar que Caddy está corriendo
systemctl status caddy

# Verificar que Node está corriendo
pm2 status

# Probar URLs
curl -I https://donsanx.me/
curl -I https://admin.donsanx.me/
```

---

## ✅ Verificación Final {#verificacion}

### Checklist de Deploy

- [ ] Node.js instalado (v20+)
- [ ] Caddy instalado y corriendo
- [ ] PM2 instalado
- [ ] Repositorio clonado en `/root/donsanx-web`
- [ ] Dependencias instaladas (npm install en 3 carpetas)
- [ ] Studio compilado (`studio/dist` existe)
- [ ] Sitio compilado (`DONSANX WEB/dist` existe)
- [ ] Caddyfile apunta a dominios correctos
- [ ] Servidor Node.js corriendo (pm2)
- [ ] GitHub OAuth configurado en Sanity
- [ ] Tu usuario agregado como miembro en Sanity
- [ ] Acceso exitoso a https://admin.donsanx.me
- [ ] Acceso exitoso a https://donsanx.me/

### Comandos de Verificación

```bash
# Ver logs del servidor Node
pm2 logs donsanx-api

# Ver logs de Caddy
journalctl -u caddy -n 50 -f

# Verificar procesos ejecutándose
ps aux | grep -E "node|caddy"

# Verificar puertos
netstat -tlnp | grep -E ":80|:443|:3000"
```

### URLs en Producción

| URL | Estado | Descripción |
|-----|--------|-------------|
| `https://donsanx.me/` | ✅ Debe cargar | Sitio principal |
| `https://admin.donsanx.me/` | ✅ Debe cargar | Sanity Studio |
| `https://admin.donsanx.me/login` | ✅ Login con GitHub | Acceso seguro |

---

## 🔄 Actualizar Código en Producción

Cuando hagas cambios y quieras actualizar:

```bash
cd /root/donsanx-web

# Actualizar código
git pull origin main

# Compilar cambios
npm install
cd studio && npm run build && cd ..
cd "DONSANX WEB" && npm run build && cd ..

# Reiniciar servicios
pm2 restart donsanx-api
sudo systemctl reload caddy
```

O usa el script (ya está en el repo):

```bash
./deploy.sh
```

---

## 🆘 Solución de Problemas

### Error: "Cannot find Caddyfile"
```bash
cd /root/donsanx-web
sudo caddy run --config Caddyfile
```

### Error: "Port 3000 already in use"
```bash
# Matar proceso anterior
lsof -ti:3000 | xargs kill -9

# O cambiar puerto en .env
export PORT=3001
```

### Error: "Certificate error"
```bash
# Caddy genera certificados automáticamente
# Espera 30 segundos y recarga la página

# Si persiste:
sudo systemctl restart caddy
```

### Error: "Sanity API no responde"
```bash
# Verificar conexión a internet
ping api.sanity.io

# Verificar ProjectId y Dataset
cat .env | grep SANITY

# Reconstruir
npm run build
```

### Error: "GitHub OAuth no funciona"
```bash
# Verificar que GitHub OAuth esté configurado en Sanity Cloud
# https://www.sanity.io/manage/project/kexbt74e

# Verificar que el callback URL es correcto:
# https://kexbt74e.api.sanity.io/v1/auth/callback
```

---

## 📊 Monitoreo en Producción

### Ver Logs en Vivo

```bash
# Logs del servidor Node
pm2 logs donsanx-api

# Logs de Caddy
sudo journalctl -u caddy -f

# Todos los logs
tail -f /root/.pm2/logs/*.log
```

### Reiniciar Servicios

```bash
# Reiniciar solo el servidor Node
pm2 restart donsanx-api

# Reiniciar Caddy
sudo systemctl restart caddy

# Reiniciar todo
pm2 restart donsanx-api && sudo systemctl restart caddy
```

---

## 🎯 Resumen del Setup en Digital Ocean

```
┌─────────────────────────────────────────────────────────┐
│           ARQUITECTURA EN DIGITAL OCEAN                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Usuarios en navegador                                  │
│         ↓                                               │
│  ┌─────────────────────────────────────────────┐        │
│  │  Caddy (Servidor Web - Puertos 80, 443)     │        │
│  │  ├─ https://donsanx.me → DONSANX WEB/dist  │        │
│  │  └─ https://admin.donsanx.me → studio/dist │        │
│  └──────────────────┬──────────────────────────┘        │
│                     ↓                                   │
│  ┌─────────────────────────────────────────────┐        │
│  │  Node.js + Express (Puerto 3000)            │        │
│  │  - Sirve APIs                               │        │
│  │  - Manejo de rutas SPA                      │        │
│  │  - Gestionado por PM2 (auto-reinicia)      │        │
│  └──────────────────┬──────────────────────────┘        │
│                     ↓                                   │
│  ┌─────────────────────────────────────────────┐        │
│  │  Sanity Cloud (API)                         │        │
│  │  - ProjectId: kexbt74e                      │        │
│  │  - Dataset: production                      │        │
│  │  - Auth: GitHub OAuth                       │        │
│  └─────────────────────────────────────────────┘        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist Completo

Después de seguir todos los pasos:

- [ ] Sanity Studio accesible en https://admin.donsanx.me
- [ ] Solo TÚ puedes acceder (con GitHub)
- [ ] Puedes crear notas en Sanity
- [ ] Notas aparecen en https://donsanx.me/
- [ ] Sitio carga rápido (Caddy + optimización)
- [ ] Certificados SSL válidos (Caddy)
- [ ] Servidor reinicia automáticamente (PM2)
- [ ] Logs disponibles para debugging

---

**Estado:** ✅ LISTO PARA PRODUCCIÓN  
**Fecha:** 31 de Enero de 2026  
**Servidor:** Ubuntu 24.04 en Digital Ocean
