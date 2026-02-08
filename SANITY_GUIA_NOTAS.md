# 📝 Guía de Sanity Studio - Crear Notas

## ✅ Estado Actual

**El sistema ya está completamente configurado y funcionando.** Solo necesitas acceder a Sanity Studio y crear tus notas.

## 🚀 Acceder a Sanity Studio

### En Producción (Digital Ocean)
```
https://admin.donsanx.me
```

### En Desarrollo Local
```
http://localhost:3000/admin
```

## 📖 Cómo Crear una Nueva Nota

### Paso 1: Acceder a Sanity Studio
- Abre [https://admin.donsanx.me](https://admin.donsanx.me) (o tu URL local)
- Inicia sesión con tu cuenta de Sanity

### Paso 2: Crear un Nuevo Documento
1. Haz clic en el botón **"+ Create"** (verde, arriba a la izquierda)
2. Selecciona **"Notas"** (o "post" en inglés)

### Paso 3: Rellenar los Campos

#### Campos Requeridos:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| **Título** | El título de tu nota | "El Caos Digital" |
| **Slug (URL)** | URL amigable (se genera automáticamente) | "el-caos-digital" |
| **Etiqueta** | Categoría de la nota | "Reflexión", "Ensayo", "Tutorial" |
| **Fecha de Publicación** | Cuándo publicar | 2026-01-31 |
| **Imagen de Portada (Miniatura)** | La imagen que aparece en la lista | imagen 16:9 |
| **Imagen de Cabecera (Detalle)** | La imagen grande en la página de detalle | imagen grande |
| **Cuerpo** | El contenido de la nota | Texto, imágenes, formatos |

### Paso 4: Agregar Contenido al Cuerpo

El **Cuerpo** es un campo flexible que permite:

- **Texto formateado:**
  - Párrafos
  - Títulos
  - Negritas e itálicas
  - Listas

- **Imágenes:**
  - Arrastra y suelta imágenes
  - Se optimizan automáticamente
  - Soporta hotspots (enfoque de la imagen)

### Paso 5: Publicar

1. Haz clic en el botón **"Publish"** (verde, arriba a la derecha)
2. La nota aparecerá automáticamente en:
   - **Página principal:** En la sección "ÚLTIMAS NOTAS" (últimas 2 notas)
   - **Página de detalle:** En `/nota/[slug]`

## 🖼️ Requisitos de Imágenes

### Imagen de Portada (Miniatura)
- **Proporción:** 16:9 (horizontal)
- **Tamaño recomendado:** 1200x675 px
- **Formato:** JPG, PNG (JPG más rápido)
- **Aparece en:** Lista de notas en la página principal

### Imagen de Cabecera (Detalle)
- **Proporción:** Cualquiera (se adapta)
- **Tamaño recomendado:** 1920x1080 px o más
- **Formato:** JPG, PNG
- **Aparece en:** Página de detalle de cada nota (arriba)

## 🌐 Cómo Aparecen en la Web

### 1. Lista de Notas (Página Principal)
- Muestra las **últimas 2 notas** publicadas
- Sección: "ÚLTIMAS NOTAS"
- Usa: **Imagen de Portada** + Título + Etiqueta + Fecha

### 2. Página de Detalle
- URL: `https://donsanx.me/nota/[slug]`
- Muestra: **Imagen de Cabecera** + Título + Contenido Completo
- El contenido es el **Cuerpo** con formato

## ⚙️ Configuración Técnica

### ProjectId
```
kexbt74e
```

### Dataset
```
production
```

### API Version
```
2023-05-03
```

### Esquema (Schema)
El documento "Notas" tiene estos campos:
- `title` (string)
- `slug` (slug, se auto-genera)
- `tag` (string)
- `publishedAt` (datetime)
- `mainImage` (image con hotspot)
- `headerImage` (image con hotspot)
- `body` (array de bloques y imágenes)

## 🔍 Ver Datos en Sanity

Si quieres ver todos tus documentos en formato JSON:
1. En Sanity Studio, abre **Vision** (esquina inferior derecha)
2. Ejecuta esta query:
```groq
*[_type == "post"] | order(publishedAt desc)
```

## 🚨 Solución de Problemas

### "No me aparecen mis notas en la web"
1. Asegúrate de haber hecho **Publish** (no solo Save)
2. Recarga la página con `Ctrl+F5`
3. Verifica que la **fecha de publicación no sea en el futuro**

### "Las imágenes no cargan"
1. Asegúrate de que las imágenes están **publicadas** (no en draft)
2. Intenta optimizar la imagen en Sanity
3. Usa formatos soportados (JPG, PNG)

### "El slug está mal generado"
1. Puedes editarlo manualmente
2. Usa solo letras, números y guiones
3. Evita caracteres especiales

## 📚 Próximas Características (Roadmap)

- [ ] Comentarios en notas
- [ ] Reacciones (like, love, etc)
- [ ] Búsqueda de notas
- [ ] Filtro por etiqueta
- [ ] Tabla de contenidos automática

---

¿Preguntas? Revisa la [documentación oficial de Sanity](https://www.sanity.io/docs)
