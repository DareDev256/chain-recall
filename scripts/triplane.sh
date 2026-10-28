#!/usr/bin/env bash
# triplane.sh — Render 3-pane split-screen from 3 Seedance landing clips.
#
# Usage:
#   ./scripts/triplane.sh <hk.mp4> <sh.mp4> <ldn.mp4> [output.mp4]
#
# Output: 1920x1080 with three 640x1080 panes side-by-side, 1px hairline separators.
# Audio: dropped (this is a silent demo intro).
#
# Default output path: public/mashup/triplane-landing.mp4
set -euo pipefail

HK="${1:-}"; SH="${2:-}"; LDN="${3:-}"
OUT="${4:-public/mashup/triplane-landing.mp4}"

if [ -z "$HK" ] || [ -z "$SH" ] || [ -z "$LDN" ]; then
  echo "Usage: $0 <hk.mp4> <sh.mp4> <ldn.mp4> [output.mp4]" >&2
  exit 1
fi

for f in "$HK" "$SH" "$LDN"; do
  [ -f "$f" ] || { echo "Missing: $f" >&2; exit 1; }
done

mkdir -p "$(dirname "$OUT")"

# Match longest input — pad shorter clips with their last frame.
ffmpeg -y -hide_banner -loglevel error \
  -i "$HK" -i "$SH" -i "$LDN" \
  -filter_complex "\
[0:v]scale=640:1080:force_original_aspect_ratio=increase,crop=640:1080,setsar=1,format=yuv420p[v0]; \
[1:v]scale=640:1080:force_original_aspect_ratio=increase,crop=640:1080,setsar=1,format=yuv420p[v1]; \
[2:v]scale=640:1080:force_original_aspect_ratio=increase,crop=640:1080,setsar=1,format=yuv420p[v2]; \
[v0][v1]hstack=inputs=2[left]; \
[left][v2]hstack=inputs=2[stacked]; \
[stacked]drawbox=x=639:y=0:w=2:h=1080:color=#1a1a1a@0.6:t=fill,\
drawbox=x=1279:y=0:w=2:h=1080:color=#1a1a1a@0.6:t=fill[out]" \
  -map "[out]" -c:v libx264 -pix_fmt yuv420p -preset slow -crf 20 -movflags +faststart -an \
  "$OUT"

dur=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT" 2>/dev/null)
size=$(ls -lh "$OUT" | awk '{print $5}')
echo "✓ $OUT — ${dur}s — ${size}"
