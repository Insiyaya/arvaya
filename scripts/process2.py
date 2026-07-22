#!/usr/bin/env python3
"""Layer the TRANSPARENT illustration for animation.
Background is already transparent, so no inpainting of the bg is needed — we just
delete the hand+stick from the base (patching only the soup surface they covered),
and cut the hand and stick as separate transparent layers."""
import numpy as np
import cv2
from PIL import Image, ImageDraw, ImageFilter

SRC = "/Users/consutladd/arvaya/assets/ChatGPT Image Jul 21, 2026, 05_08_01 AM.png"
OUT = "/Users/consutladd/arvaya/public"

img = Image.open(SRC).convert("RGBA")
W, H = img.size
arr = np.array(img)
img_alpha = arr[:, :, 3]
print("size", W, H)

# --- traced polygons (lower-right of HAND kept ABOVE the stick top ~y376) ---
# Generous: engulf the whole upper-right arm/sleeve up to the top edge (the area
# above the arm is transparent anyway). Stays above the oil bottle (y>410) and the
# stick top (y>360 near x1035).
HAND = [(695,515),(695,375),(740,300),(800,240),(880,175),(970,120),(1000,90),(1000,0),
        (1536,0),(1536,410),(1420,410),(1310,405),(1205,398),(1115,388),(1035,360),
        (988,368),(942,392),(898,430),(858,470),(818,500),(762,510)]
STICK = [(1029,374),(1053,392),(898,622),(868,602)]

def poly(points, blur=0):
    m = Image.new("L", (W, H), 0)
    ImageDraw.Draw(m).polygon(points, fill=255)
    if blur:
        m = m.filter(ImageFilter.GaussianBlur(blur))
    return np.array(m)

hand_soft = poly(HAND, blur=2)
stick_soft = poly(STICK, blur=1)
hand_hard = poly(HAND)
stick_hard = poly(STICK)

# --- base: delete hand + stick, keep everything else (bg already transparent) ---
remove = (hand_hard > 128) | (stick_hard > 128)
remove = cv2.dilate(remove.astype(np.uint8) * 255, np.ones((5, 5), np.uint8), 2) > 128
base = arr.copy()
base[remove, 3] = 0

# patch the soup surface the hand/stick covered: within the pot opening, inpaint the
# removed pixels from surrounding soup so no transparent hole shows in the broth.
yy, xx = np.mgrid[0:H, 0:W]
cx, cy, ra, rb = 765, 552, 285, 85
pot = ((xx - cx) / ra) ** 2 + ((yy - cy) / rb) ** 2 <= 1.0
hole = remove & pot
if hole.any():
    rgb = cv2.cvtColor(base[:, :, :3], cv2.COLOR_RGB2BGR)
    filled = cv2.inpaint(rgb, hole.astype(np.uint8) * 255, 6, cv2.INPAINT_TELEA)
    base[:, :, :3] = cv2.cvtColor(filled, cv2.COLOR_BGR2RGB)
    base[hole, 3] = 255
    print("patched soup holes:", int(hole.sum()))

# --- cut layers: use the illustration's OWN alpha (crisp edges) within each poly ---
def cut(soft_mask, subtract):
    a = np.minimum(img_alpha, soft_mask)          # image edges ∩ polygon
    if subtract is not None:
        a = np.where(subtract > 128, 0, a)         # remove overlap (e.g. stick from hand)
    out = arr.copy()
    out[:, :, 3] = a
    return out

hand_arr = cut(hand_soft, stick_hard)   # hand minus any stick overlap
stick_arr = cut(stick_soft, None)

# --- extend the canvas so the clipped mortar (left) and bowl (bottom) are whole ---
# pad every layer identically to keep them aligned when stacked.
L, Bpad = 55, 32
def pad(a):
    return cv2.copyMakeBorder(a, 0, Bpad, L, 0, cv2.BORDER_CONSTANT, value=(0, 0, 0, 0))

base = pad(base)
hand_arr = pad(hand_arr)
stick_arr = pad(stick_arr)
H2, W2 = base.shape[:2]
bal = base[:, :, 3]

# mortar: mirror its right half about the symmetry axis into the cut-left region
xc = 140 + L
for y in range(555, 826):
    for x in range(0, xc):
        if bal[y, x] < 30:
            src = 2 * xc - x
            if 0 <= src < W2 and bal[y, src] >= 30:
                base[y, x] = base[y, src]
# bowl (bottom-centre): paint a rounded WOODEN base (not the green contents) to
# complete the clipped bowl. Elliptical profile, wood colour with a base shadow.
xcb, rx, ry, yc = 934 + L, 118, 104, 928   # ellipse for the bowl's outer body
wood_top = np.array([138, 96, 38], np.uint8)     # lit wood
wood_bot = np.array([92, 58, 20], np.uint8)      # shaded base
for x in range(xcb - rx, xcb + rx):
    if not (0 <= x < W2):
        continue
    dx = (x - xcb) / rx
    if abs(dx) >= 1:
        continue
    yt = int(yc + ry * (1 - dx * dx) ** 0.5)      # ellipse bottom for this column
    col = np.where(base[:, x, 3] >= 30)[0]
    if not col.size:
        continue
    ybot = col.max()                              # current lowest opaque pixel
    for y in range(ybot + 1, min(yt, H2)):
        f = (y - ybot) / max(1, yt - ybot)        # 0 at wall -> 1 at base
        base[y, x, :3] = (wood_top * (1 - f) + wood_bot * f).astype(np.uint8)
        base[y, x, 3] = 255

# Clear any stray hand fragment left in the base above the pot (the hand's own
# knuckle highlight sat just outside the cutout mask and stayed static while the
# hand moved). This corridor is empty otherwise; the pot rim is well below y=380.
base[0:380, 600:1200, 3] = 0

Image.fromarray(base, "RGBA").save(f"{OUT}/hero-base.png")
Image.fromarray(hand_arr, "RGBA").save(f"{OUT}/hero-hand.png")
Image.fromarray(stick_arr, "RGBA").save(f"{OUT}/hero-stick.png")
print(f"wrote 3 layers at {W2}x{H2}")
print("done")
