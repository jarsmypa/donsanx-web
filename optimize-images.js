#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const portfolioDir = path.join(__dirname, 'DONSANX WEB', 'public', 'portfolio');
const assetsDir = path.join(__dirname, 'DONSANX WEB', 'public', 'assets');

async function optimizeImages(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directorio no encontrado: ${directory}`);
    return 0;
  }

  const files = fs.readdirSync(directory);
  let optimizedCount = 0;
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;

  for (const file of files) {
    const filePath = path.join(directory, file);
    const ext = path.extname(file).toLowerCase();
    
    // Solo procesar imágenes
    if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      continue;
    }

    try {
      const stats = fs.statSync(filePath);
      const originalSize = stats.size;
      totalOriginalSize += originalSize;

      // Nombre del nuevo archivo sin extensión
      const nameWithoutExt = path.basename(file, ext);
      const webpPath = path.join(directory, `${nameWithoutExt}.webp`);

      // Si ya existe el webp, no procesar
      if (fs.existsSync(webpPath)) {
        const webpStats = fs.statSync(webpPath);
        totalOptimizedSize += webpStats.size;
        console.log(`✓ ${file} (ya optimizado: ${(webpStats.size / 1024).toFixed(1)}KB)`);
        optimizedCount++;
        continue;
      }

      // Convertir a WebP con optimización
      await sharp(filePath)
        .webp({ quality: 80, effort: 6 }) // quality: 80 es buena relación calidad/tamaño
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      const reduction = ((1 - webpStats.size / originalSize) * 100).toFixed(1);
      
      totalOptimizedSize += webpStats.size;

      console.log(
        `✓ ${file.padEnd(50)} ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(webpStats.size / 1024).toFixed(1)}KB (${reduction}% menor)`
      );

      optimizedCount++;
    } catch (error) {
      console.error(`✗ Error procesando ${file}:`, error.message);
    }
  }

  return { optimizedCount, totalOriginalSize, totalOptimizedSize };
}

async function main() {
  console.log('🖼️  Iniciando optimización de imágenes...\n');

  let totalOriginal = 0;
  let totalOptimized = 0;
  let totalOptimizedCount = 0;

  // Procesar carpeta portfolio
  console.log(`📁 Procesando: ${portfolioDir}`);
  const portfolioResults = await optimizeImages(portfolioDir);
  totalOriginal += portfolioResults.totalOriginalSize;
  totalOptimized += portfolioResults.totalOptimizedSize;
  totalOptimizedCount += portfolioResults.optimizedCount;
  console.log(`   Total: ${portfolioResults.optimizedCount} imágenes procesadas\n`);

  // Procesar carpeta assets si existe
  if (fs.existsSync(assetsDir)) {
    console.log(`📁 Procesando: ${assetsDir}`);
    const assetsResults = await optimizeImages(assetsDir);
    totalOriginal += assetsResults.totalOriginalSize;
    totalOptimized += assetsResults.totalOptimizedSize;
    totalOptimizedCount += assetsResults.optimizedCount;
    console.log(`   Total: ${assetsResults.optimizedCount} imágenes procesadas\n`);
  }

  // Resumen final
  console.log('═'.repeat(70));
  console.log('📊 RESUMEN DE OPTIMIZACIÓN');
  console.log('═'.repeat(70));
  console.log(`Total de imágenes procesadas: ${totalOptimizedCount}`);
  console.log(`Tamaño original: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Tamaño optimizado: ${(totalOptimized / 1024 / 1024).toFixed(2)}MB`);
  const totalReduction = ((1 - totalOptimized / totalOriginal) * 100).toFixed(1);
  console.log(`Reducción total: ${totalReduction}%`);
  console.log('═'.repeat(70));
  console.log('\n✅ Optimización completada!');
  console.log('\n📝 PRÓXIMOS PASOS:');
  console.log('1. Actualiza tu código para usar las imágenes .webp en lugar de .jpg/.png');
  console.log('2. Considera usar <picture> tag para soporte de navegadores antiguos:');
  console.log('   <picture>');
  console.log('     <source srcSet="image.webp" type="image/webp">');
  console.log('     <img src="image.jpg" alt="...">');
  console.log('   </picture>');
  console.log('\n3. Las imágenes originales aún están disponibles si necesitas cambiar calidad.\n');
}

main().catch(console.error);
