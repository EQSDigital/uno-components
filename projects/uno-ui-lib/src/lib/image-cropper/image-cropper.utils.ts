/**
 * "exif" utilitary functions
 */
export function resetExifOrientation(srcBase64: string): Promise<string> {
    try {
        const exifRotation = getExifRotation(srcBase64);
        if (exifRotation > 1) {
            return transformBase64BasedOnExifRotation(srcBase64, exifRotation);
        } else {
            return Promise.resolve(srcBase64);
        }
    } catch (ex) {
        return Promise.reject(ex);
    }
}

export function transformBase64BasedOnExifRotation(srcBase64: string, exifRotation: number): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = function () {
            const width = img.width;
            const height = img.height;
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                if (4 < exifRotation && exifRotation < 9) {
                    canvas.width = height;
                    canvas.height = width;
                } else {
                    canvas.width = width;
                    canvas.height = height;
                }
                transformCanvas(ctx, exifRotation, width, height);
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL());
            } else {
                reject(new Error('No context'));
            }
        };
        img.src = srcBase64;
    });
}

function getExifRotation(imageBase64: string): number {
    const view = new DataView(base64ToArrayBuffer(imageBase64));

    if (view.getUint16(0, false) !== 0xFFD8) {
        return -2;
    }

    const length = view.byteLength;
    let offset = 2;
    while (offset < length) {
        if (view.getUint16(offset + 2, false) <= 8) {
            return -1;
        }

        const marker = view.getUint16(offset, false);
        offset += 2;

        if (marker === 0xFFE1) {
            if (view.getUint32(offset += 2, false) !== 0x45786966) {
                return -1;
            }

            const little = view.getUint16(offset += 6, false) === 0x4949;
            offset += view.getUint32(offset + 4, little);
            const tags = view.getUint16(offset, little);
            offset += 2;

            for (let i = 0; i < tags; i++) {
                if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                    return view.getUint16(offset + (i * 12) + 8, little);
                }
            }

        } else if ((marker & 0xFF00) !== 0xFF00) {
            // it's reaaly a needed bitwise op and not a typo (like "bool1 & bool2" instead of "bool1 && bool2")
            break;
        } else {
            offset += view.getUint16(offset, false);
        }
    }

    return -1;
}

function base64ToArrayBuffer(imageBase64: string) {
    imageBase64 = imageBase64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    const binaryString = atob(imageBase64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);


    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
}

function transformCanvas(ctx: any, orientation: number, width: number, height: number) {
    switch (orientation) {
        case 2:
            ctx.transform(-1, 0, 0, 1, width, 0);
            break;
        case 3:
            ctx.transform(-1, 0, 0, -1, width, height);
            break;
        case 4:
            ctx.transform(1, 0, 0, -1, 0, height);
            break;
        case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            ctx.transform(0, 1, -1, 0, height, 0);
            break;
        case 7:
            ctx.transform(0, -1, -1, 0, height, width);
            break;
        case 8:
            ctx.transform(0, -1, 1, 0, 0, width);
            break;
    }
}

/*
 * Hermite resize - fast image resize/resample using Hermite filter.
 * https://github.com/viliusle/Hermite-resize
 */
export function resizeCanvas(canvas: HTMLCanvasElement, width: number, height: number, resizeCanvasFlag = true) {
    const width_source = canvas.width;
    const height_source = canvas.height;
    width = Math.round(width);
    height = Math.round(height);

    const ratio_w = width_source / width;
    const ratio_h = height_source / height;
    const ratio_w_half = Math.ceil(ratio_w / 2);
    const ratio_h_half = Math.ceil(ratio_h / 2);

    const ctx = canvas.getContext('2d');
    if (ctx) {
        const img = ctx.getImageData(0, 0, width_source, height_source);
        const img2 = ctx.createImageData(width, height);
        const data = img.data;
        const data2 = img2.data;

        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
                const x2 = (i + j * width) * 4;
                const center_y = j * ratio_h;
                let weight = 0;
                let weights = 0;
                let weights_alpha = 0;
                let gx_r = 0;
                let gx_g = 0;
                let gx_b = 0;
                let gx_a = 0;

                const xx_start = Math.floor(i * ratio_w);
                const yy_start = Math.floor(j * ratio_h);
                let xx_stop = Math.ceil((i + 1) * ratio_w);
                let yy_stop = Math.ceil((j + 1) * ratio_h);
                xx_stop = Math.min(xx_stop, width_source);
                yy_stop = Math.min(yy_stop, height_source);

                for (let yy = yy_start; yy < yy_stop; yy++) {
                    const dy = Math.abs(center_y - yy) / ratio_h_half;
                    const center_x = i * ratio_w;
                    const w0 = dy * dy; // pre-calc part of w
                    for (let xx = xx_start; xx < xx_stop; xx++) {
                        const dx = Math.abs(center_x - xx) / ratio_w_half;
                        const w = Math.sqrt(w0 + dx * dx);
                        if (w >= 1) {
                            // pixel too far
                            continue;
                        }
                        // hermite filter
                        weight = 2 * w * w * w - 3 * w * w + 1;
                        const pos_x = 4 * (xx + yy * width_source);
                        // alpha
                        gx_a += weight * data[pos_x + 3];
                        weights_alpha += weight;
                        // colors
                        if (data[pos_x + 3] < 255) { weight = weight * data[pos_x + 3] / 250; }
                        gx_r += weight * data[pos_x];
                        gx_g += weight * data[pos_x + 1];
                        gx_b += weight * data[pos_x + 2];
                        weights += weight;
                    }
                }
                data2[x2] = gx_r / weights;
                data2[x2 + 1] = gx_g / weights;
                data2[x2 + 2] = gx_b / weights;
                data2[x2 + 3] = gx_a / weights_alpha;
            }
        }
        // clear and resize canvas
        if (resizeCanvasFlag) {
            canvas.width = width;
            canvas.height = height;
        } else {
            ctx.clearRect(0, 0, width_source, height_source);
        }

        // draw
        ctx.putImageData(img2, 0, 0);
    }
}
