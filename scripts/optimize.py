from PIL import Image
OUT = "/Users/consutladd/arvaya/public"
TARGET_W = 1280
def opt(name_png, name_webp, has_alpha):
    im = Image.open(f"{OUT}/{name_png}")
    w, h = im.size
    nh = int(h * TARGET_W / w)
    im = im.resize((TARGET_W, nh), Image.LANCZOS)
    if has_alpha:
        im.convert("RGBA").save(f"{OUT}/{name_webp}", "WEBP", quality=88, method=6)
    else:
        im.convert("RGB").save(f"{OUT}/{name_webp}", "WEBP", quality=82, method=6)
    import os
    print(f"{name_webp}: {os.path.getsize(f'{OUT}/{name_webp}')//1024} KB ({TARGET_W}x{nh})")
opt("hero-base.png",  "hero-base.webp",  True)
opt("hero-hand.png",  "hero-hand.webp",  True)
opt("hero-stick.png", "hero-stick.webp", True)
