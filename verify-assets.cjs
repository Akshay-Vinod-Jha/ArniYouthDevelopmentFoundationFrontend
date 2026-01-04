#!/usr/bin/env node

/**
 * Verification script to check static assets configuration
 * Run this before deploying to Vercel
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const REQUIRED_FILES = [
  'favicon.png',
  'default-avatar.png',
  'aydf_gallery',
  'logo_type_photo'
];

console.log('🔍 Verifying static assets configuration...\n');

let hasErrors = false;

// Check if public directory exists
if (!fs.existsSync(PUBLIC_DIR)) {
  console.error('❌ ERROR: public/ directory does not exist!');
  hasErrors = true;
} else {
  console.log('✅ public/ directory exists');
}

// Check required files
REQUIRED_FILES.forEach(file => {
  const filePath = path.join(PUBLIC_DIR, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const type = stats.isDirectory() ? 'directory' : 'file';
    console.log(`✅ ${file} (${type}) exists`);
  } else {
    console.error(`❌ ERROR: ${file} is missing!`);
    hasErrors = true;
  }
});

// Count gallery images
const galleryPath = path.join(PUBLIC_DIR, 'aydf_gallery');
if (fs.existsSync(galleryPath)) {
  const images = fs.readdirSync(galleryPath).filter(f => f.match(/\.(jpg|jpeg|png|gif)$/i));
  console.log(`📸 Found ${images.length} images in aydf_gallery/`);
  if (images.length === 0) {
    console.warn('⚠️  WARNING: No images found in aydf_gallery/');
  }
}

// Check index.html for correct favicon reference
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath)) {
  const content = fs.readFileSync(indexPath, 'utf8');
  if (content.includes('href="/favicon.png"')) {
    console.log('✅ index.html has correct favicon reference');
  } else {
    console.error('❌ ERROR: index.html favicon reference is incorrect!');
    hasErrors = true;
  }
}

console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('❌ Verification FAILED! Please fix the errors above.');
  process.exit(1);
} else {
  console.log('✅ All checks passed! Ready for deployment.');
  process.exit(0);
}
