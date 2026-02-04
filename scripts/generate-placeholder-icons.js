#!/usr/bin/env node
/**
 * Generate placeholder PWA icons
 * Creates simple colored PNG files for development
 *
 * For production, use generate-icons.sh with ImageMagick
 * or a design tool to create proper icons from icon.svg
 */

const fs = require('fs')
const path = require('path')

const SIZES = [72, 96, 128, 144, 152, 192, 384, 512]
const DEST = path.join(__dirname, '..', 'public', 'icons')

// Simple 1x1 terracotta PNG (base64)
// This creates valid minimal PNGs that can be used as placeholders
function createPlaceholderPNG(size) {
  // PNG header for a simple colored image
  // Using terracotta color #C4704E
  const width = size
  const height = size

  // Create a simple PNG with IHDR, IDAT, IEND chunks
  // This is a minimal valid PNG structure

  // For simplicity, we'll create a data URL style placeholder
  // that Next.js can handle during build

  const header = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A  // PNG signature
  ])

  // IHDR chunk
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)   // width
  ihdrData.writeUInt32BE(height, 4)  // height
  ihdrData.writeUInt8(8, 8)          // bit depth
  ihdrData.writeUInt8(2, 9)          // color type (RGB)
  ihdrData.writeUInt8(0, 10)         // compression
  ihdrData.writeUInt8(0, 11)         // filter
  ihdrData.writeUInt8(0, 12)         // interlace

  const ihdrCrc = crc32(Buffer.concat([Buffer.from('IHDR'), ihdrData]))
  const ihdr = Buffer.alloc(12 + ihdrData.length)
  ihdr.writeUInt32BE(ihdrData.length, 0)
  ihdr.write('IHDR', 4)
  ihdrData.copy(ihdr, 8)
  ihdr.writeUInt32BE(ihdrCrc, 8 + ihdrData.length)

  // IDAT chunk - compressed image data
  // Create raw RGB data (terracotta color)
  const rawData = []
  for (let y = 0; y < height; y++) {
    rawData.push(0) // filter byte
    for (let x = 0; x < width; x++) {
      rawData.push(0xC4, 0x70, 0x4E) // RGB terracotta
    }
  }

  const zlib = require('zlib')
  const compressed = zlib.deflateSync(Buffer.from(rawData))

  const idatCrc = crc32(Buffer.concat([Buffer.from('IDAT'), compressed]))
  const idat = Buffer.alloc(12 + compressed.length)
  idat.writeUInt32BE(compressed.length, 0)
  idat.write('IDAT', 4)
  compressed.copy(idat, 8)
  idat.writeUInt32BE(idatCrc, 8 + compressed.length)

  // IEND chunk
  const iendCrc = crc32(Buffer.from('IEND'))
  const iend = Buffer.from([
    0x00, 0x00, 0x00, 0x00,  // length
    0x49, 0x45, 0x4E, 0x44,  // IEND
    (iendCrc >>> 24) & 0xFF,
    (iendCrc >>> 16) & 0xFF,
    (iendCrc >>> 8) & 0xFF,
    iendCrc & 0xFF
  ])

  return Buffer.concat([header, ihdr, idat, iend])
}

// CRC32 implementation for PNG
function crc32(data) {
  let crc = 0xFFFFFFFF
  const table = []

  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[i] = c
  }

  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xFF] ^ (crc >>> 8)
  }

  return (crc ^ 0xFFFFFFFF) >>> 0
}

// Ensure directory exists
if (!fs.existsSync(DEST)) {
  fs.mkdirSync(DEST, { recursive: true })
}

// Generate icons
console.log('Generating placeholder PWA icons...')

for (const size of SIZES) {
  const filename = `icon-${size}x${size}.png`
  const filepath = path.join(DEST, filename)
  const png = createPlaceholderPNG(size)
  fs.writeFileSync(filepath, png)
  console.log(`  Created ${filename}`)
}

console.log('\nDone! For production icons:')
console.log('  1. Install ImageMagick: brew install imagemagick')
console.log('  2. Run: ./scripts/generate-icons.sh')
