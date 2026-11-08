const fs = require('fs');

// 1. In index.html, remove the hero avatar circle (hero-avatar-box)
let index = fs.readFileSync('c:/xampp/htdocs/Portfolio/index.html', 'utf8');
index = index.replace(/<div class="hero-avatar-box">[\s\S]*?<\/div>\s*/, '');
// Also remove preload of image if user doesn't have an image on index page anymore
index = index.replace(/<link rel="preload" as="image"[^>]*\/>\s*/, '');
fs.writeFileSync('c:/xampp/htdocs/Portfolio/index.html', index, 'utf8');

// 2. In about.html, ensure the avatar image displays properly
let about = fs.readFileSync('c:/xampp/htdocs/Portfolio/about.html', 'utf8');
const b64 = 'data:image/jpeg;base64,' + fs.readFileSync('c:/xampp/htdocs/Portfolio/images/profile.jpg').toString('base64');

about = about.replace(
  /<div class="avatar-box">[\s\S]*?<\/div>/,
  `<div class="avatar-box">\n                <img src="${b64}" alt="Profile Photo" class="avatar-img" width="160" height="160" fetchpriority="high" />\n              </div>`
);

about = about.replace(
  /<link rel="preload" as="image"[^>]*\/>/,
  `<link rel="preload" as="image" href="${b64}" fetchpriority="high" />`
);

fs.writeFileSync('c:/xampp/htdocs/Portfolio/about.html', about, 'utf8');

console.log('Done! hero-avatar-box removed from index.html, base64 applied to about.html');

