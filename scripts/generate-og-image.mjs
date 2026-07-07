import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const inputPath = path.join(rootDir, 'public', 'images', 'tedd-schreiner-hero.jpg');
const outputPath = path.join(rootDir, 'public', 'images', 'social-preview.jpg');
const siteDataPath = path.join(rootDir, 'src', 'content', 'site', 'main.json');

const width = 1200;
const height = 630;

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const siteData = JSON.parse(await readFile(siteDataPath, 'utf8'));
const title = siteData.hero?.title || siteData.name;
const kicker = siteData.domain;
const claim = (siteData.socialPreview?.claim || []).map((item) => escapeXml(item.toUpperCase())).join(' &#183; ');
const headline = siteData.socialPreview?.headline || siteData.hero?.headline || '';
const headlineLines = headline.includes(', ')
  ? headline.split(/,\s+/, 2).map((line, index) => (index === 0 ? `${line},` : line))
  : [headline];
const initials = siteData.name
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part[0]?.toUpperCase())
  .join('');

const headlineMarkup = headlineLines
  .map((line, index) => {
    const y = 326 + index * 46;

    return `<text x="72" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="800" fill="#fffaf3">${escapeXml(line)}</text>`;
  })
  .join('');

const overlay = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#151312" stop-opacity="0.9" />
      <stop offset="0.42" stop-color="#151312" stop-opacity="0.74" />
      <stop offset="0.72" stop-color="#151312" stop-opacity="0.3" />
      <stop offset="1" stop-color="#151312" stop-opacity="0.08" />
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#fff7ed" stroke-opacity="0.07" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#shade)" />
  <rect width="1200" height="630" fill="url(#grid)" />
  <rect width="1200" height="630" fill="#151312" opacity="0.04" />
  <g transform="translate(72 70) scale(0.92)">
    <rect width="64" height="64" rx="14" fill="#fff7ed" />
    <text x="32" y="39" fill="#24201d" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" letter-spacing="0.5" text-anchor="middle">${escapeXml(initials)}</text>
  </g>
  <text x="72" y="178" font-family="Arial, Helvetica, sans-serif" font-size="21" font-weight="850" letter-spacing="4" fill="#d6a15f">${claim}</text>
  <text x="72" y="256" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#fffaf3">${escapeXml(title)}</text>
  ${headlineMarkup}
  <line x1="72" y1="444" x2="548" y2="444" stroke="#9b5b24" stroke-width="4" stroke-linecap="round" />
  <text x="72" y="494" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500" fill="#d8d0c7">${escapeXml(kicker)}</text>
</svg>`;

const image = await sharp(inputPath)
  .resize(width, height, { fit: 'cover', position: 'right top' })
  .modulate({ saturation: 0.82, brightness: 0.86 })
  .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toBuffer();

if (process.argv.includes('--check')) {
  const currentImage = await readFile(outputPath);

  if (!currentImage.equals(image)) {
    console.error(`${path.relative(rootDir, outputPath)} is out of date. Run npm run generate:og.`);
    process.exit(1);
  }

  console.log(`${path.relative(rootDir, outputPath)} is up to date.`);
} else {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, image);

  console.log(`Generated ${path.relative(rootDir, outputPath)} (${width}x${height})`);
}
