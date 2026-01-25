const sharp = require('sharp');
const path = require('path');

async function convertSVGtoPNG() {
    // Convert main icon
    await sharp(path.join(__dirname, 'assets', 'icon.svg'))
        .resize(1024, 1024)
        .png()
        .toFile(path.join(__dirname, 'assets', 'icon.png'));

    // Convert adaptive icon
    await sharp(path.join(__dirname, 'assets', 'adaptive-icon.svg'))
        .resize(1024, 1024)
        .png()
        .toFile(path.join(__dirname, 'assets', 'adaptive-icon.png'));

    // Convert favicon
    await sharp(path.join(__dirname, 'assets', 'favicon.svg'))
        .resize(512, 512)
        .png()
        .toFile(path.join(__dirname, 'assets', 'favicon.png'));

    // Create splash icon
    await sharp(path.join(__dirname, 'assets', 'icon.svg'))
        .resize(1242, 1242)
        .png()
        .toFile(path.join(__dirname, 'assets', 'splash-icon.png'));

    console.log('All icons have been converted successfully!');
}

convertSVGtoPNG().catch(console.error);