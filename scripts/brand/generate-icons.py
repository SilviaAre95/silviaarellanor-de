"""Regenerate the raster icon set from the swallow mark.

Usage: python3 scripts/brand/generate-icons.py
No third-party dependencies; png.py is a minimal local PNG codec.
"""
import struct, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import png

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, 'logo-swallow-1024.png')
# §7: the mark MUST switch to compact below 64px — the four nested ribbon bands
# collapse into noise at icon sizes. The small rasters come from the mono mark
# instead, which is one solid shape and still reads as a swallow at 16px.
SRC_SMALL = os.path.join(HERE, 'logo-swallow-mono-1024.png')
PUB = os.path.normpath(os.path.join(HERE, '..', '..', 'public'))

FOAM = (0xF4, 0xF2, 0xE7)

w, h, master = png.read_png(SRC)
ws, hs, master_small = png.read_png(SRC_SMALL)
assert (ws, hs) == (w, h), 'both masters must share one geometry'
print('master', w, h)

# Pad once at full resolution, then downsample — padding after resizing would
# resample twice and soften the small sizes.
padded = png.pad(w, h, master, 0.06)      # favicons: tight crop
padded_sm = png.pad(w, h, master_small, 0.06)  # mono, for 32px and below
padded_lg = png.pad(w, h, master, 0.11)   # touch / maskable icons: more air

cache = {}


def tile(size, src, bg=FOAM):
    key = (size, id(src))
    if key not in cache:
        cache[key] = png.resize(w, h, src, size, size)
    return png.flatten(size, size, cache[key], bg)


targets = [
    ('favicon-16x16.png', 16, padded_sm),
    ('favicon-32x32.png', 32, padded_sm),
    ('apple-touch-icon.png', 180, padded_lg),
    ('android-chrome-192x192.png', 192, padded_lg),
    ('android-chrome-512x512.png', 512, padded_lg),
]

for name, size, src in targets:
    px = tile(size, src)
    n = png.write_png(os.path.join(PUB, name), size, size, px)
    print(f'  {name:32} {size}x{size}  {n} bytes')

# favicon.ico — PNG-compressed entries at 16/32/48, supported everywhere since IE11.
ico_sizes = [16, 32, 48]
blobs = []
for s in ico_sizes:
    tmp = f'/tmp/_ico_{s}.png'
    png.write_png(tmp, s, s, tile(s, padded_sm if s <= 32 else padded))
    blobs.append(open(tmp, 'rb').read())
    os.remove(tmp)

hdr = struct.pack('<HHH', 0, 1, len(blobs))
offset = 6 + 16 * len(blobs)
entries, data = b'', b''
for s, blob in zip(ico_sizes, blobs):
    entries += struct.pack('<BBBBHHII', s, s, 0, 0, 1, 32, len(blob), offset)
    data += blob
    offset += len(blob)
open(os.path.join(PUB, 'favicon.ico'), 'wb').write(hdr + entries + data)
print(f'  {"favicon.ico":32} {ico_sizes}  {len(hdr + entries + data)} bytes')
