# 🚀 Guía Rápida de Deploy en Digital Ocean

## 📋 Resumen

Este documento explica cómo desplegar tu sitio en Digital Ocean con:
- ✅ Autenticación solo con GitHub en Sanity Studio
- ✅ Sitio principal con últimas notas
- ✅ SSL automático (Caddy)
- ✅ Auto-restart de servicios (PM2)

---

## 🎯 Requisitos Previos

- [ ] Cuenta en Digital Ocean
- [ ] Droplet creado (Ubuntu 24.04, mínimo 1GB RAM)
- [ ] Dominio apuntando a la IP del droplet
  - `donsanx.me` → IP droplet
  - `admin.donsanx.me` → IP droplet
- [ ] SSH configurado
- [ ] GitHub OAuth configurado en Sanity (ver abajo)

---

## 🔐 PASO 1: Configurar GitHub OAuth en Sanity

**Esto SOLO se hace una vez**

### 1.1 Crear OAuth App en GitHub

1. Ve a: https://github.com/settings/developers
2. Click **"New OAuth App"**
3. Rellena:

```
Application name:        Donsanx Admin
Homepage URL:            https://admin.donsanx.me
Description:             Editor de contenido
Authorization callback:  https://kexbt74e.api.sanity.io/v1/auth/callback
```

4. Click **"Register application"**
5. Copia y guarda:
   - **Client ID**
   - **Client Secret** (🔴 SECRETO - no compartas)

### 1.2 Agregar OAuth a Sanity Cloud

1. Ve a: https://www.sanity.io/manage/project/kexbt74e
2. Click **Settings** → **API** → **OAuth**
3. Pega Client ID y Client Secret
4. Click **Save**

### 1.3 Agregar tu Usuario a Sanity

1. En Settings: **Members**
2. Click **"+ Add member"**
3. Busca tu usuario de GitHub
4. Dale rol **Administrator**
5. Click **Add**

**Ahora solo TÚ puedes acceder a Sanity con GitHub** ✓

---

## 🚀 PASO 2: Deploy Automático (RECOMENDADO)

La forma más fácil y segura.

### 2.1 Uso del Script

```bash
cd /path/to/donsanx-web

# Comando
./deploy-digital-ocean.sh root TU_IP_DIGITAL_OCEAN

# Ejemplo
./deploy-digital-ocean.sh root 123.45.67.89
```

El script:
- ✓ Compila el sitio localmente
- ✓ Hace commit de cambios
- ✓ Empuja a GitHub
- ✓ Conecta al servidor
- ✓ Actualiza código
- ✓ Compila en el servidor
- ✓ Reinicia servicios
- ✓ Verifica que funcione

---

## 📚 PASO 3: Deploy Manual (Si el script falla)

### 3.1 Conectar al Servidor

```bash
ssh root@tu-ip-digital-ocean
```

### 3.2 Instalar Dependencias del Sistema

```bash
# Actualizar
apt-get update && apt-get upgrade -y

# Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt-get install -y nodejs

# Caddy (servidor web)
apt-get install -y caddy

# PM2 (mantener vivo el servidor)
npm install -g pm2

# Git
apt-get install -y git
```

### 3.3 Clonar Repositorio

```bash
cd /root
git clone https://github.com/jarsmypa/donsanx-web.git
cd donsanx-web
```

### 3.4 Instalar Dependencias del Proyecto

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

### 3.5 Iniciar Servicios

```bash
# Iniciar servidor Node.js con PM2
pm2 start server.js --name "donsanx-api"
pm2 startup
pm2 save

# Iniciar Caddy como servicio
systemctl start caddy
systemctl enable caddy
```

### 3.6 Verificar

```bash
# Ver estado
pm2 status
systemctl status caddy

# Ver logs
pm2 logs donsanx-api

# Probar URLs
curl -I https://donsanx.me/
curl -I https://admin.donsanx.me/
```

---

## ✅ Verificación Final

### Checklist

- [ ] https://donsanx.me carga (sitio principal)
- [ ] https://admin.donsanx.me carga (Sanity Studio)
- [ ] Click "Login with GitHub" en admin
- [ ] Auténticas con tu usuario de GitHub
- [ ] Ves el dashboard de Sanity
- [ ] Puedes crear una nota de test
- [ ] La nota aparece en https://donsanx.me/ (sección ÚLTIMAS NOTAS)

### URLs Después del Deploy

| URL | Uso |
|-----|-----|
| `https://donsanx.me/` | Tu sitio web |
| `https://donsanx.me/sobre` | Página About |
| `https://donsanx.me/portafolio` | Portafolio |
| `https://donsanx.me/nota/slug-de-nota` | Nota individual |
| `https://admin.donsanx.me/` | Sanity Studio (solo GitHub) |

---

## 📝 Crear tu Primera Nota en Producción

1. Abre https://admin.donsanx.me
2. Click "Login with GitHub"
3. Auténticate
4. Click "+ Create"
5. Selecciona "Notas"
6. Rellena:
   - **Título**: Tu reflexión
   - **Etiqueta**: Reflexión, Ensayo, etc
   - **Slug**: Se auto-genera
   - **Fecha**: Hoy (o futura para programar)
   - **Imagen Portada**: Miniatura (16:9)
   - **Imagen Cabecera**: Grande
   - **Cuerpo**: Tu contenido
7. Click **"Publish"**
8. Recarga https://donsanx.me/
9. ¡Tu nota aparece en ÚLTIMAS NOTAS! ✨

---

## 🔄 Actualizar Después del Deploy

Cuando hagas cambios locales:

```bash
cd /path/to/donsanx-web

# Usa el script
./deploy-digital-ocean.sh root TU_IP

# O manualmente en tu servidor:
# ssh root@TU_IP
# cd /root/donsanx-web
# git pull
# npm run build && cd studio && npm run build && cd ../DONSANX\ WEB && npm run build
# pm2 restart donsanx-api
# systemctl reload caddy
```

---

## 🆘 Troubleshooting

### "Connection refused"
El servidor no está corriendo:
```bash
pm2 restart donsanx-api
```

### "Certificate error"
Caddy genera certificados automáticamente:
```bash
systemctl restart caddy
# Espera 30 segundos y recarga
```

### "Cannot find Sanity Studio"
Verificar que studio/dist existe:
```bash
ls -la studio/dist
# Si no existe:
cd studio && npm run build
```

### "GitHub OAuth no funciona"
Verificar configuración:
1. GitHub OAuth App existe en https://github.com/settings/developers
2. Sanity tiene Client ID y Secret en Settings → API → OAuth
3. Tu usuario es Member en Sanity Project
4. Callback URL es: `https://kexbt74e.api.sanity.io/v1/auth/callback`

### "Notas no aparecen"
1. Hiciste "Publish" (no solo Save)
2. Fecha de publicación no es futura
3. Recarga con Ctrl+F5
4. Verifica logs:
```bash
pm2 logs donsanx-api
```

---

## 📊 Monitoreo en Producción

### Ver Logs

```bash
# Logs en vivo del servidor Node
pm2 logs donsanx-api

# Logs de Caddy
journalctl -u caddy -f

# Líneas específicas
pm2 logs donsanx-api --lines 100
```

### Reiniciar Servicios

```bash
# Solo Node.js
pm2 restart donsanx-api

# Solo Caddy
systemctl restart caddy

# Todo
pm2 restart donsanx-api && systemctl restart caddy
```

### Ver Estado

```bash
# Procesos corriendo
pm2 status

# Puertos abiertos
netstat -tlnp | grep -E ":80|:443|:3000"

# Espacio en disco
df -h

# Memoria usada
free -h
```

---

## 🔐 Seguridad

### Lo que ya está seguro:

✅ **Sanity Studio** - Solo accesible con GitHub OAuth  
✅ **SSL/TLS** - Certificados automáticos (Caddy)  
✅ **Headers de seguridad** - Configurados en Caddyfile  
✅ **SPA routing** - Protegido

### Adicional (Opcional):

Si quieres más seguridad:

```bash
# Firewall (en Digital Ocean)
ufw enable
ufw allow 22/tcp  # SSH
ufw allow 80/tcp  # HTTP
ufw allow 443/tcp # HTTPS

# Fail2ban (proteger SSH)
apt-get install -y fail2ban
systemctl enable fail2ban
```

---

## 📚 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `Caddyfile` | Configuración de servidor web |
| `server.js` | Servidor Node.js (Express) |
| `.env.example` | Variables de ambiente |
| `DEPLOY_DIGITAL_OCEAN.md` | Guía manual completa |
| `deploy-digital-ocean.sh` | Script automático |

---

## ✨ Resumen Visual del Deploy

```
Paso 1: Configurar GitHub OAuth en Sanity ✓ (Una sola vez)
   ↓
Paso 2: Ejecutar deploy script ✓ (Automático)
   ↓
Paso 3: Verificar que funciona ✓ (Manual)
   ↓
🎉 ¡Sistema en producción!
   ↓
Crear notas en https://admin.donsanx.me
   ↓
Aparecen automáticamente en https://donsanx.me/
```

---

## 📞 Soporte

Si algo no funciona:

1. Revisa la sección **Troubleshooting** arriba
2. Revisa los logs: `pm2 logs donsanx-api`
3. Revisa DEPLOY_DIGITAL_OCEAN.md para más detalles
4. Verifica que GitHub OAuth esté configurado

---

**Status:** ✅ LISTO PARA PRODUCCIÓN  
**Última actualización:** 31 de Enero de 2026  
**Script automático:** `./deploy-digital-ocean.sh`
