# DONSANX WEB & STUDIO

Sistema completo de website + CMS para crear y publicar notas (reflexiones/escritos).

**Status:** ✅ Completamente funcional en desarrollo | 🚀 Listo para producción

---

## 🎯 Características

✅ **Crear notas desde Sanity Studio**
- Título, etiqueta, contenido formateado
- Imágenes de portada y cabecera
- Publicación automática

✅ **Sitio principal dinámico**
- Muestra últimas 2 notas
- Página individual por nota
- SPA routing (React Router)

✅ **Seguridad**
- Autenticación GitHub en Sanity Studio (solo tú)
- SSL automático con Caddy
- Headers de seguridad

✅ **Producción**
- Auto-restart de servicios (PM2)
- Certificados válidos
- CDN de imágenes (Sanity)

---

## 📂 Estructura

```
donsanx-web/
├── DONSANX WEB/           ← Frontend React + Vite
├── studio/                ← Sanity Studio (CMS)
├── server.js              ← Express server
├── Caddyfile              ← Servidor web (Caddy)
├── deploy-digital-ocean.sh ← Script de deploy automático
├── DEPLOY_RAPIDO.md       ← Guía rápida de deploy
├── DEPLOY_DIGITAL_OCEAN.md ← Guía manual detallada
└── README_SANITY_SETUP.md ← Guía del sistema Sanity
```

---

## 🚀 Inicio Rápido (Desarrollo Local)

### 1. Instalar Dependencias

```bash
# Root
npm install

# Sanity Studio
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

### 2. Iniciar Servidor

```bash
# En la raíz
node server.js
```

Accede a:
- **Sitio:** http://localhost:3000/
- **Sanity Studio:** http://localhost:3000/admin

---

## 🔐 Configuración (GitHub OAuth)

### Una sola vez:

1. **Crear OAuth App en GitHub**
   - Ve a: https://github.com/settings/developers
   - Click "New OAuth App"
   - Callback URL: `https://kexbt74e.api.sanity.io/v1/auth/callback`

2. **Agregar a Sanity**
   - Ve a: https://www.sanity.io/manage/project/kexbt74e
   - Settings → API → OAuth
   - Pega Client ID y Secret

3. **Agregar tu usuario**
   - Settings → Members
   - Agrega tu usuario de GitHub
   - Dale rol "Administrator"

**Ahora solo TÚ puedes acceder a Sanity Studio** ✓

---

## 📝 Usar Sanity Studio

### Crear una Nota:

1. Abre http://localhost:3000/admin (o https://admin.donsanx.me en producción)
2. Click "+ Create" → "Notas"
3. Rellena:
   - **Título** (requerido)
   - **Slug** (auto-genera)
   - **Etiqueta** (Reflexión, Ensayo, etc)
   - **Fecha de publicación**
   - **Imagen de portada** (miniatura 16:9)
   - **Imagen de cabecera** (grande)
   - **Cuerpo** (contenido con formato)
4. Click **"Publish"**

**Resultado:** La nota aparece automáticamente en:
- http://localhost:3000/ (sección "ÚLTIMAS NOTAS")
- http://localhost:3000/nota/[slug] (página individual)

---

## 🚀 Deploy en Digital Ocean

### Opción 1: Script Automático (RECOMENDADO)

```bash
./deploy-digital-ocean.sh root TU_IP_DIGITAL_OCEAN
```

El script hace todo automáticamente:
- ✓ Compila localmente
- ✓ Empuja a GitHub
- ✓ Conecta al servidor
- ✓ Actualiza código
- ✓ Compila en el servidor
- ✓ Reinicia servicios

### Opción 2: Guía Manual

Ver [DEPLOY_RAPIDO.md](./DEPLOY_RAPIDO.md) para instrucciones paso a paso.

### Opción 3: Guía Detallada

Ver [DEPLOY_DIGITAL_OCEAN.md](./DEPLOY_DIGITAL_OCEAN.md) para todos los detalles.

---

## 📚 Documentación

| Archivo | Contenido |
|---------|-----------|
| [README_SANITY_SETUP.md](./README_SANITY_SETUP.md) | Explicación completa del sistema Sanity |
| [SANITY_GUIA_NOTAS.md](./SANITY_GUIA_NOTAS.md) | Guía detallada para crear notas |
| [DEPLOY_RAPIDO.md](./DEPLOY_RAPIDO.md) | Guía rápida de deploy (recomendada) |
| [DEPLOY_DIGITAL_OCEAN.md](./DEPLOY_DIGITAL_OCEAN.md) | Guía manual completa |
| [SANITY_CHECKLIST_VERIFICACION.md](./SANITY_CHECKLIST_VERIFICACION.md) | Checklist técnico |

---

## 🌐 URLs en Producción

```
https://donsanx.me/              ← Sitio principal
https://donsanx.me/nota/[slug]   ← Notas individuales
https://admin.donsanx.me/        ← Sanity Studio (GitHub OAuth)
```

---

## 💻 Tecnologías

- **Frontend:** React 19 + Vite + Tailwind CSS
- **Backend:** Sanity CMS (Cloud)
- **Servidor Web:** Caddy (certificados automáticos)
- **App Server:** Express.js + PM2
- **Autenticación:** GitHub OAuth
- **Hosting:** Digital Ocean

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Ejecutar en dev mode

# Compilación
npm run build            # Compilar para producción

# Deploy
./deploy-digital-ocean.sh root 123.45.67.89  # Deploy automático

# Verificación
./verify-setup.sh        # Verificar instalación

# Logs (en servidor)
pm2 logs donsanx-api     # Ver logs en vivo
journalctl -u caddy -f   # Ver logs de Caddy
```

---

## ✅ Checklist Final

Antes de ir a producción:

- [ ] GitHub OAuth configurado en Sanity
- [ ] Tu usuario agregado como Member
- [ ] Código compilado localmente
- [ ] Caddy instalado en servidor (Digital Ocean)
- [ ] PM2 instalado en servidor
- [ ] Dominios apuntando a servidor
- [ ] Deploy completado
- [ ] https://donsanx.me carga
- [ ] https://admin.donsanx.me carga
- [ ] Puedes crear nota de test
- [ ] Nota aparece en sitio principal

---

## 🆘 Problemas?

1. **Revisa la documentación** → Ver tablas de contenidos arriba
2. **Ejecuta verificación** → `./verify-setup.sh`
3. **Ver logs** → `pm2 logs donsanx-api`
4. **DEPLOY_DIGITAL_OCEAN.md** → Sección "Solución de problemas"

---

## 📞 Contacto

- **Frontend Issues:** Ver [DONSANX WEB/README](./DONSANX%20WEB/README.md)
- **Sanity Issues:** Ver [studio/README](./studio/README.md)
- **Deploy Issues:** Ver [DEPLOY_RAPIDO.md](./DEPLOY_RAPIDO.md)

---

**Status:** ✅ Sistema Operativo  
**Última actualización:** 31 de Enero de 2026  
**Versión:** 2.0 (con autenticación GitHub)

