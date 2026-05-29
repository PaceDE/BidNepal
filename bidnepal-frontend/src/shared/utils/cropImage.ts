export const cropImage = async (
    image: string,
    containerRef: React.RefObject<HTMLElement | null>,
    zoom: number,
    dragX: number,
    dragY: number,
): Promise<File | null> => {
    const img = new Image();
    img.src = image;
    await img.decode();

    const container = containerRef.current;
    if (!container) return null

    const { width: cW, height: cH } = container.getBoundingClientRect();
    const { naturalWidth: natW, naturalHeight: natH } = img;

    const scale = Math.min(cW / natW, cH / natH);
    const paintW = natW * scale;
    const paintH = natH * scale;

    const pcX = cW / 2;
    const pcY = cH / 2;

    const boxSize = cH;
    const boxLeft = (cW - boxSize) / 2 + dragX;
    const boxTop = (cH - boxSize) / 2 + dragY;

    const sx = ((boxLeft - pcX) / zoom + pcX - (pcX - paintW / 2)) / paintW * natW;
    const sy = ((boxTop - pcY) / zoom + pcY - (pcY - paintH / 2)) / paintH * natH;
    const sSize = (boxSize / zoom) / paintW * natW;

    const OUTPUT = 240;
    const out = Math.min(Math.round(sSize), OUTPUT * 2);

    const canvas = document.createElement("canvas");
    canvas.width = out;
    canvas.height = out;

    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, sx, sy, sSize, sSize, 0, 0, out, out);

    const file = await new Promise<File | null>((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) return resolve(null);
            const file = new File([blob], "dp.jpeg", { type: "image/jpeg" });
            resolve(file);
        });
    });
    return file
};