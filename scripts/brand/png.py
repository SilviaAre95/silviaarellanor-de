"""Minimal PNG read/write + box-filter resize. No third-party deps available."""
import struct, zlib


def read_png(path):
    d = open(path, 'rb').read()
    assert d[:8] == b'\x89PNG\r\n\x1a\n', 'not a png'
    pos, idat, pal, trns = 8, [], None, None
    w = h = bd = ct = None
    while pos < len(d):
        ln = struct.unpack('>I', d[pos:pos + 4])[0]
        typ = d[pos + 4:pos + 8]
        body = d[pos + 8:pos + 8 + ln]
        if typ == b'IHDR':
            w, h, bd, ct, comp, filt, il = struct.unpack('>IIBBBBB', body)
            assert bd == 8 and il == 0, f'only 8-bit non-interlaced (got {bd}, il={il})'
        elif typ == b'PLTE':
            pal = body
        elif typ == b'tRNS':
            trns = body
        elif typ == b'IDAT':
            idat.append(body)
        elif typ == b'IEND':
            break
        pos += 12 + ln
    raw = zlib.decompress(b''.join(idat))

    nch = {0: 1, 2: 3, 3: 1, 4: 2, 6: 4}[ct]
    stride = w * nch
    out = bytearray(stride * h)
    prev = bytearray(stride)
    p = 0
    for y in range(h):
        f = raw[p]; p += 1
        line = bytearray(raw[p:p + stride]); p += stride
        if f == 1:
            for i in range(nch, stride):
                line[i] = (line[i] + line[i - nch]) & 255
        elif f == 2:
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 255
        elif f == 3:
            for i in range(stride):
                a = line[i - nch] if i >= nch else 0
                line[i] = (line[i] + ((a + prev[i]) >> 1)) & 255
        elif f == 4:
            for i in range(stride):
                a = line[i - nch] if i >= nch else 0
                b = prev[i]
                c = prev[i - nch] if i >= nch else 0
                pp = a + b - c
                pa, pb, pc = abs(pp - a), abs(pp - b), abs(pp - c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 255
        out[y * stride:(y + 1) * stride] = line
        prev = line

    # normalise to RGBA
    rgba = bytearray(w * h * 4)
    for i in range(w * h):
        if ct == 6:
            rgba[i * 4:i * 4 + 4] = out[i * 4:i * 4 + 4]
        elif ct == 2:
            rgba[i * 4:i * 4 + 3] = out[i * 3:i * 3 + 3]; rgba[i * 4 + 3] = 255
        elif ct == 0:
            g = out[i]; rgba[i * 4:i * 4 + 3] = bytes([g, g, g]); rgba[i * 4 + 3] = 255
        elif ct == 4:
            g = out[i * 2]; rgba[i * 4:i * 4 + 3] = bytes([g, g, g]); rgba[i * 4 + 3] = out[i * 2 + 1]
        elif ct == 3:
            idx = out[i]
            rgba[i * 4:i * 4 + 3] = pal[idx * 3:idx * 3 + 3]
            rgba[i * 4 + 3] = trns[idx] if trns and idx < len(trns) else 255
    return w, h, rgba


def write_png(path, w, h, rgba):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw += rgba[y * w * 4:(y + 1) * w * 4]
    comp = zlib.compress(bytes(raw), 9)

    def chunk(typ, body):
        return (struct.pack('>I', len(body)) + typ + body
                + struct.pack('>I', zlib.crc32(typ + body) & 0xffffffff))

    data = (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 6, 0, 0, 0))
            + chunk(b'IDAT', comp)
            + chunk(b'IEND', b''))
    open(path, 'wb').write(data)
    return len(data)


def resize(w, h, rgba, nw, nh):
    """Box filter over premultiplied alpha, so transparent pixels don't bleed."""
    out = bytearray(nw * nh * 4)
    for oy in range(nh):
        y0, y1 = oy * h // nh, max(oy * h // nh + 1, (oy + 1) * h // nh)
        for ox in range(nw):
            x0, x1 = ox * w // nw, max(ox * w // nw + 1, (ox + 1) * w // nw)
            r = g = b = a = n = 0
            for y in range(y0, y1):
                base = y * w * 4
                for x in range(x0, x1):
                    i = base + x * 4
                    al = rgba[i + 3]
                    r += rgba[i] * al; g += rgba[i + 1] * al; b += rgba[i + 2] * al
                    a += al; n += 1
            o = (oy * nw + ox) * 4
            if a:
                out[o] = min(255, r // a); out[o + 1] = min(255, g // a); out[o + 2] = min(255, b // a)
            out[o + 3] = a // n
    return out


def flatten(w, h, rgba, bg):
    """Composite over an opaque background colour."""
    br, bg_, bb = bg
    out = bytearray(w * h * 4)
    for i in range(w * h):
        a = rgba[i * 4 + 3]
        for c, bc in enumerate((br, bg_, bb)):
            out[i * 4 + c] = (rgba[i * 4 + c] * a + bc * (255 - a)) // 255
        out[i * 4 + 3] = 255
    return out


def pad(w, h, rgba, frac):
    """Inset the artwork by frac of the canvas on every side (transparent margin)."""
    inner = int(round(w * (1 - 2 * frac)))
    small = resize(w, h, rgba, inner, inner)
    off = (w - inner) // 2
    out = bytearray(w * h * 4)
    for y in range(inner):
        src = y * inner * 4
        dst = ((y + off) * w + off) * 4
        out[dst:dst + inner * 4] = small[src:src + inner * 4]
    return out
