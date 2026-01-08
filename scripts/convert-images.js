const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const IMAGES_DIR = path.join(PUBLIC_DIR, 'images');

// Service area locations for SEO
const locations = [
  'jacksonville-fl',
  'nocatee-fl',
  'ponte-vedra-beach-fl',
  'st-augustine-fl',
  'jacksonville-beach-fl',
  'atlantic-beach-fl',
  'orange-park-fl',
  'middleburg-fl',
  'fernandina-beach-fl',
  'yulee-fl'
];

// Image categorization based on content analysis
const imageCategories = {
  exterior: [
    'PHOTO-2025-11-17-09-59-16.jpg',
    'PHOTO-2025-11-17-09-59-16(1).jpg',
    'PHOTO-2025-11-17-09-59-16(2).jpg',
    'PHOTO-2025-11-17-09-59-16(3).jpg',
    'PHOTO-2025-11-17-09-59-16(4).jpg',
    'PHOTO-2025-11-17-09-59-17(3).jpg',
    'PHOTO-2025-11-17-09-59-20.jpg',
    'PHOTO-2025-11-17-09-59-20(1).jpg',
    'PHOTO-2025-11-17-09-59-20(2).jpg',
    'PHOTO-2025-11-17-09-59-20(3).jpg',
    'PHOTO-2025-11-17-09-59-20(4).jpg',
    'PHOTO-2025-11-17-09-59-21(1).jpg',
    'exterior-painting-jacksonville-beach.jpg',
    'exterior-painting-jacksonville-fl.jpg',
    'exterior-painting-orange-park-florida.jpg',
    'exterior-painting-services-nocatee.jpg',
    'ponte-vedra-exterior-painer.jpg',
  ],
  commercial: [
    'PHOTO-2025-11-17-09-59-17.jpg',
    'PHOTO-2025-11-17-09-59-17(1).jpg',
    'PHOTO-2025-11-17-09-59-17(2).jpg',
    'PHOTO-2025-11-17-09-59-17(4).jpg',
    'PHOTO-2025-11-17-09-59-17(5).jpg',
    'PHOTO-2025-11-17-09-59-17(6).jpg',
    'PHOTO-2025-11-17-09-59-17(7).jpg',
    'PHOTO-2025-11-17-09-59-18.jpg',
    'PHOTO-2025-11-17-09-59-18(1).jpg',
    'PHOTO-2025-11-17-09-59-18(2).jpg',
    'PHOTO-2025-11-17-09-59-18(3).jpg',
    'PHOTO-2025-11-17-09-59-18(4).jpg',
    'PHOTO-2025-11-17-09-59-18(5).jpg',
    'PHOTO-2025-11-17-09-59-18(6).jpg',
    'PHOTO-2025-11-17-09-59-19.jpg',
  ],
  interior: [
    'PHOTO-2025-11-17-09-59-21.jpg',
    'PHOTO-2025-11-17-09-59-21(2).jpg',
    'PHOTO-2025-11-17-09-59-21(3).jpg',
    'PHOTO-2025-11-17-09-59-21(4).jpg',
    'PHOTO-2025-11-17-09-59-21(5).jpg',
    'PHOTO-2025-11-17-09-59-21(6).jpg',
    'PHOTO-2025-11-17-09-59-22.jpg',
    'PHOTO-2025-11-17-09-59-22(1).jpg',
    'PHOTO-2025-11-17-09-59-22(2).jpg',
    'PHOTO-2025-11-17-09-59-22(3).jpg',
    'PHOTO-2025-11-17-09-59-22(4).jpg',
    'PHOTO-2025-11-17-09-59-22(5).jpg',
    'PHOTO-2025-11-17-09-59-22(6).jpg',
    'PHOTO-2025-11-17-09-59-22(7).jpg',
    'Wall-Painting-Services.jpg',
  ],
  cabinet: [
    'painted cabinets.jpg',
    'PHOTO-2025-11-17-09-59-23.jpg',
  ],
  deck: [
    'Deck-Painting-Services.png',
  ],
  logo: [
    'Paint-Techs-US-logo-1.png',
  ]
};

// Create folder structure
const folders = ['exterior', 'interior', 'commercial', 'cabinet', 'deck', 'logo', 'hero', 'gallery'];

async function createFolders() {
  for (const folder of folders) {
    const folderPath = path.join(IMAGES_DIR, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`Created folder: ${folderPath}`);
    }
  }
}

async function convertAndOrganize() {
  console.log('Starting image conversion and organization...\n');

  await createFolders();

  let totalConverted = 0;

  for (const [category, files] of Object.entries(imageCategories)) {
    console.log(`\nProcessing ${category} images...`);
    let index = 1;

    for (const file of files) {
      const sourcePath = path.join(PUBLIC_DIR, file);

      if (!fs.existsSync(sourcePath)) {
        console.log(`  Skipping (not found): ${file}`);
        continue;
      }

      // Generate SEO-friendly filename
      const location = locations[index % locations.length];
      let seoName;

      if (category === 'logo') {
        seoName = 'paint-techs-llc-logo';
      } else if (category === 'deck') {
        seoName = `deck-painting-services-${location}`;
      } else if (file.includes('before') || file.includes('after') || file.includes('09-59-21') || file.includes('09-59-22') || file.includes('09-59-23') || file.includes('cabinets')) {
        // Before/after images
        seoName = `${category}-painting-before-after-${location}-${index}`;
      } else {
        seoName = `${category}-painting-${location}-${index}`;
      }

      const outputPath = path.join(IMAGES_DIR, category, `${seoName}.webp`);

      try {
        await sharp(sourcePath)
          .webp({ quality: 85 })
          .toFile(outputPath);

        console.log(`  Converted: ${file} -> ${category}/${seoName}.webp`);
        totalConverted++;
        index++;
      } catch (err) {
        console.error(`  Error converting ${file}:`, err.message);
      }
    }
  }

  // Also create hero images from best exterior shots
  console.log('\nCreating hero images...');
  const heroSources = [
    'PHOTO-2025-11-17-09-59-20.jpg',
    'PHOTO-2025-11-17-09-59-20(1).jpg',
    'exterior-painting-jacksonville-fl.jpg',
  ];

  let heroIndex = 1;
  for (const file of heroSources) {
    const sourcePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(sourcePath)) {
      const outputPath = path.join(IMAGES_DIR, 'hero', `hero-painting-jacksonville-fl-${heroIndex}.webp`);
      try {
        await sharp(sourcePath)
          .webp({ quality: 90 })
          .resize(1920, 1080, { fit: 'cover' })
          .toFile(outputPath);
        console.log(`  Created hero image: hero-painting-jacksonville-fl-${heroIndex}.webp`);
        heroIndex++;
      } catch (err) {
        console.error(`  Error creating hero image:`, err.message);
      }
    }
  }

  // Create gallery images (smaller, optimized versions)
  console.log('\nCreating gallery thumbnails...');
  const allImages = Object.values(imageCategories).flat();
  let galleryIndex = 1;

  for (const file of allImages.slice(0, 20)) { // First 20 images for gallery
    const sourcePath = path.join(PUBLIC_DIR, file);
    if (fs.existsSync(sourcePath)) {
      const location = locations[galleryIndex % locations.length];
      const outputPath = path.join(IMAGES_DIR, 'gallery', `painting-project-${location}-${galleryIndex}.webp`);
      try {
        await sharp(sourcePath)
          .webp({ quality: 80 })
          .resize(800, 600, { fit: 'cover' })
          .toFile(outputPath);
        console.log(`  Created gallery image: painting-project-${location}-${galleryIndex}.webp`);
        galleryIndex++;
      } catch (err) {
        console.error(`  Error creating gallery image:`, err.message);
      }
    }
  }

  console.log(`\n✅ Conversion complete! Total images converted: ${totalConverted}`);
  console.log('\nNew folder structure:');
  console.log('public/images/');
  for (const folder of folders) {
    const folderPath = path.join(IMAGES_DIR, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      console.log(`  └── ${folder}/ (${files.length} files)`);
    }
  }
}

convertAndOrganize().catch(console.error);
