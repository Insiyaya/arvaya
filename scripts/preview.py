from PIL import Image
OUT = "/Users/consutladd/arvaya/public"
SP = "/private/tmp/claude-501/-Users-consutladd-arvaya/b513de57-4aac-4042-bbb8-15f970836099/scratchpad"
base = Image.open(f"{OUT}/hero-base.png").convert("RGBA")
hand = Image.open(f"{OUT}/hero-hand.png").convert("RGBA")
stick = Image.open(f"{OUT}/hero-stick.png").convert("RGBA")
# recomposite (should look ~ like original)
comp = base.copy(); comp.alpha_composite(stick); comp.alpha_composite(hand)
comp.convert("RGB").save(f"{SP}/prev_recomposite.png")
# base alone
base.convert("RGB").save(f"{SP}/prev_base.png")
# hand on checkerboard
def checker(im):
    bg = Image.new("RGBA", im.size, (255,255,255,255))
    d = 40
    from PIL import ImageDraw
    dr = ImageDraw.Draw(bg)
    for y in range(0, im.size[1], d):
        for x in range(0, im.size[0], d):
            if (x//d + y//d) % 2 == 0:
                dr.rectangle([x,y,x+d,y+d], fill=(210,210,210,255))
    bg.alpha_composite(im); return bg.convert("RGB")
checker(hand).save(f"{SP}/prev_hand.png")
checker(stick).save(f"{SP}/prev_stick.png")
print("ok")
