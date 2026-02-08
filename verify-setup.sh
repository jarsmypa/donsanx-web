#!/bin/bash
# 🎯 Script de Verificación Rápida - Sanity Setup

echo "════════════════════════════════════════════════════════"
echo "🔍 VERIFICACIÓN DEL SISTEMA SANITY"
echo "════════════════════════════════════════════════════════"
echo ""

# 1. Verificar servidor Node
echo "✓ Verificando servidor Node.js..."
if pgrep -f "node server.js" > /dev/null; then
    echo "  ✅ Servidor ejecutándose en http://localhost:3000"
else
    echo "  ❌ Servidor NO está ejecutándose"
    echo "     Inicia con: node server.js"
fi
echo ""

# 2. Verificar compilaciones
echo "✓ Verificando directorios compilados..."
if [ -d "studio/dist" ]; then
    echo "  ✅ Sanity Studio compilado (studio/dist)"
    echo "     Acceso: http://localhost:3000/admin"
else
    echo "  ❌ Sanity Studio NO compilado"
    echo "     Compila con: cd studio && npm run build"
fi
echo ""

if [ -d "DONSANX WEB/dist" ]; then
    echo "  ✅ Sitio Principal compilado (DONSANX WEB/dist)"
    echo "     Acceso: http://localhost:3000/"
else
    echo "  ❌ Sitio Principal NO compilado"
    echo "     Compila con: cd \"DONSANX WEB\" && npm run build"
fi
echo ""

# 3. Verificar archivos clave
echo "✓ Verificando archivos de configuración..."
[ -f "server.js" ] && echo "  ✅ server.js (Express)" || echo "  ❌ server.js falta"
[ -f "studio/sanity.config.js" ] && echo "  ✅ Sanity config" || echo "  ❌ Sanity config falta"
[ -f "DONSANX WEB/src/client.js" ] && echo "  ✅ Cliente Sanity" || echo "  ❌ Cliente Sanity falta"
echo ""

# 4. Verificar dependencias
echo "✓ Verificando dependencias..."
if [ -d "node_modules" ]; then
    echo "  ✅ Dependencias root (express, etc)"
else
    echo "  ❌ Dependencias root falta - npm install"
fi

if [ -d "studio/node_modules" ]; then
    echo "  ✅ Dependencias Sanity Studio"
else
    echo "  ❌ Dependencias Sanity falta - cd studio && npm install"
fi

if [ -d "DONSANX WEB/node_modules" ]; then
    echo "  ✅ Dependencias Sitio Principal"
else
    echo "  ❌ Dependencias Sitio falta - cd 'DONSANX WEB' && npm install"
fi
echo ""

# 5. Información del sistema
echo "════════════════════════════════════════════════════════"
echo "📊 INFORMACIÓN DEL SISTEMA"
echo "════════════════════════════════════════════════════════"
echo "Node.js: $(node --version)"
echo "npm: $(npm --version)"
echo "Sistema: $(uname -a | cut -d' ' -f1-3)"
echo ""

# 6. URLs de Acceso
echo "════════════════════════════════════════════════════════"
echo "🌐 URLS DE ACCESO"
echo "════════════════════════════════════════════════════════"
echo "Sitio Principal:      http://localhost:3000/"
echo "Sanity Studio:        http://localhost:3000/admin"
echo "Demo Nota:            http://localhost:3000/nota/demo"
echo ""

# 7. Próximos pasos
echo "════════════════════════════════════════════════════════"
echo "📝 PRÓXIMOS PASOS"
echo "════════════════════════════════════════════════════════"
echo "1. Abre Sanity Studio: http://localhost:3000/admin"
echo "2. Auténticate con tu cuenta Sanity"
echo "3. Click '+Create' → Selecciona 'Notas'"
echo "4. Rellena título, slug, etiqueta, imágenes y contenido"
echo "5. Click 'Publish'"
echo "6. ¡Verá tu nota en http://localhost:3000/"
echo ""

echo "════════════════════════════════════════════════════════"
echo "✅ Sistema listo para usar!"
echo "════════════════════════════════════════════════════════"
