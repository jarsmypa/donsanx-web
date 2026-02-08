#!/usr/bin/env node

/**
 * Script para verificar y reportar imágenes sin optimizar
 * Uso: node check-image-optimization.js
 */

const fs = require('fs');
const path = require('path');

const PORTFOLIO_DIR = path.join(__dirname, 'DONSANX WEB', 'public', 'portfolio');
const ASSETS_DIR = path.join(__dirname, 'DONSANX WEB', 'public', 'assets');

function getImageInfo(directory) {
  if (!fs.existsSync(directory)) {
    return { total: 0, webp: 0, unoptimized: [] };
  }

  const files = fs.readdirSync(directory);
  const webpCount = files.filter(f => f.endsWith('.webp')).length;
  const unoptimized = files.filter(f => 
    /\.(jpg|jpeg|png|gif)$/i.test(f)
  );

  let totalSize = 0;
  let webpSize = 0;
  let unoptimizedSize = 0;

  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    const size = stats.size;

    if (file.endsWith('.webp')) {
      webpSize += size;
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
      unoptimizedSize += size;
    }
    totalSize += size;
  });

  return {
    total: files.length,
    webp: webpCount,
    unoptimized: unoptimized,
    totalSize,
    webpSize,
    unoptimizedSize,
    optimizationRate: webpCount > 0 ? ((webpCount / (webpCount + unoptimized.length)) * 100).toFixed(1) : '0'
  };
}

console.log('\n📊 REPORTE DE OPTIMIZACIÓN DE IMÁGENES\n');
console.log('═'.repeat(70));

const portfolioInfo = getImageInfo(PORTFOLIO_DIR);
console.log(`\n📁 Portfolio (${PORTFOLIO_DIR})`);
console.log(`   Total de imágenes: ${portfolioInfo.total}`);
console.log(`   ✓ Optimizadas (.webp): ${portfolioInfo.webp}`);
console.log(`   ✗ Sin optimizar: ${portfolioInfo.unoptimized.length}`);
console.log(`   Tasa de optimización: ${portfolioInfo.optimizationRate}%`);
console.log(`   Tamaño total: ${(portfolioInfo.totalSize / 1024 / 1024).toFixed(2)}MB`);
console.log(`   Tamaño WebP: ${(portfolioInfo.webpSize / 1024 / 1024).toFixed(2)}MB`);
console.log(`   Tamaño sin optimizar: ${(portfolioInfo.unoptimizedSize / 1024 / 1024).toFixed(2)}MB`);

if (portfolioInfo.unoptimized.length > 0) {
  console.log('\n   ⚠️  Imágenes sin optimizar:');
  portfolioInfo.unoptimized.forEach(file => {
    const filePath = path.join(PORTFOLIO_DIR, file);
    const stats = fs.statSync(filePath);
    console.log(`      - ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
  });
}

const assetsInfo = getImageInfo(ASSETS_DIR);
console.log(`\n📁 Assets (${ASSETS_DIR})`);
console.log(`   Total de imágenes: ${assetsInfo.total}`);
console.log(`   ✓ Optimizadas (.webp): ${assetsInfo.webp}`);
console.log(`   ✗ Sin optimizar: ${assetsInfo.unoptimized.length}`);
console.log(`   Tasa de optimización: ${assetsInfo.optimizationRate}%`);

if (assetsInfo.unoptimized.length > 0) {
  console.log('\n   ⚠️  Imágenes sin optimizar:');
  assetsInfo.unoptimized.forEach(file => {
    const filePath = path.join(ASSETS_DIR, file);
    const stats = fs.statSync(filePath);
    console.log(`      - ${file} (${(stats.size / 1024).toFixed(1)}KB)`);
  });
}

// Resumen total
const totalUnoptimized = portfolioInfo.unoptimized.length + assetsInfo.unoptimized.length;
console.log('\n' + '═'.repeat(70));
console.log(`\n📈 RESUMEN TOTAL`);
console.log(`   Imágenes optimizadas: ${portfolioInfo.webp + assetsInfo.webp}`);
console.log(`   Imágenes sin optimizar: ${totalUnoptimized}`);
console.log(`   Tasa general de optimización: ${((portfolioInfo.webp + assetsInfo.webp) / (portfolioInfo.total + assetsInfo.total) * 100).toFixed(1)}%`);

if (totalUnoptimized === 0) {
  console.log('\n✅ ¡Todas las imágenes están optimizadas!');
} else {
  console.log(`\n⚠️  Hay ${totalUnoptimized} imágenes que necesitan optimizarse.`);
  console.log('   Ejecuta: node optimize-images.js');
}

console.log('\n');
