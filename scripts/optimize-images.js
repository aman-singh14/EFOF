const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

// Images to optimize with their target dimensions
const imagesToOptimize = [
  {
    input: 'rishal melvani.png',
    outputs: [
      { name: 'rishal-melvani-sm.webp', width: 200, height: 333, format: 'webp', quality: 95 },
      { name: 'rishal-melvani-md.webp', width: 400, height: 667, format: 'webp', quality: 95 },
      { name: 'rishal-melvani-lg.webp', width: 600, height: 1000, format: 'webp', quality: 95 },
    ]
  },
  {
    input: 'ishaan singh.png',
    outputs: [
      { name: 'ishaan-singh-sm.webp', width: 200, height: 300, format: 'webp', quality: 95 },
      { name: 'ishaan-singh-md.webp', width: 400, height: 600, format: 'webp', quality: 95 },
      { name: 'ishaan-singh-lg.webp', width: 600, height: 900, format: 'webp', quality: 95 },
    ]
  },
  {
    input: 'EFOF Logo 2.png',
    outputs: [
      { name: 'efof-logo-black-sm.webp', width: 120, height: 68, format: 'webp' },
      { name: 'efof-logo-black-md.webp', width: 180, height: 101, format: 'webp' },
      { name: 'efof-logo-black-lg.webp', width: 250, height: 141, format: 'webp' },
    ]
  },
  {
    input: 'White EFOF Logo.png',
    outputs: [
      { name: 'efof-logo-white-sm.webp', width: 120, height: 68, format: 'webp' },
      { name: 'efof-logo-white-md.webp', width: 180, height: 101, format: 'webp' },
      { name: 'efof-logo-white-lg.webp', width: 250, height: 141, format: 'webp' },
      { name: 'efof-logo-white-transparent-sm.webp', width: 120, height: 68, format: 'webp', transparent: true },
      { name: 'efof-logo-white-transparent-md.webp', width: 180, height: 101, format: 'webp', transparent: true },
      { name: 'efof-logo-white-transparent-lg.webp', width: 250, height: 141, format: 'webp', transparent: true },
    ]
  }
];

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  // Create optimized directory if it doesn't exist
  const optimizedDir = path.join(publicDir, 'optimized');
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir);
  }

  for (const imageConfig of imagesToOptimize) {
    const inputPath = path.join(publicDir, imageConfig.input);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`Warning: ${imageConfig.input} not found, skipping...`);
      continue;
    }

    console.log(`Processing ${imageConfig.input}...`);

    for (const output of imageConfig.outputs) {
      const outputPath = path.join(optimizedDir, output.name);
      
      try {
        let sharpInstance = sharp(inputPath)
          .resize(output.width, output.height, {
            fit: 'contain',
            position: 'center',
            background: output.transparent ? { r: 0, g: 0, b: 0, alpha: 0 } : { r: 255, g: 255, b: 255, alpha: 1 }
          });

        if (output.transparent) {
          sharpInstance = sharpInstance.png({ compressionLevel: 9 }).webp({ 
            quality: output.quality || 95,
            lossless: true
          });
        } else {
          sharpInstance = sharpInstance.webp({ quality: output.quality || 85 });
        }

        await sharpInstance.toFile(outputPath);
        
        console.log(`✓ Created ${output.name} (${output.width}x${output.height})${output.transparent ? ' [transparent]' : ''}`);
      } catch (error) {
        console.error(`✗ Failed to create ${output.name}:`, error.message);
      }
    }
  }

  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);