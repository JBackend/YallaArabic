#!/bin/bash
# Generate PWA icons from SVG source
# Requires: ImageMagick (brew install imagemagick)

SOURCE="public/icons/icon.svg"
DEST="public/icons"

SIZES=(72 96 128 144 152 192 384 512)

for size in "${SIZES[@]}"; do
  echo "Generating ${size}x${size} icon..."
  convert -background none -density 1200 "$SOURCE" -resize "${size}x${size}" "$DEST/icon-${size}x${size}.png"
done

# Generate favicon
convert -background none -density 1200 "$SOURCE" -resize "32x32" "public/favicon.ico"

echo "Done! Generated ${#SIZES[@]} icons and favicon."
