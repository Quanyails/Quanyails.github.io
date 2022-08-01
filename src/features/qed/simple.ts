// Simple edge detection: check neighboring pixels for different values.
import type { Pixel } from "features/qed/matrix";
import { getPixelMatrix } from "features/qed/matrix";

export const drawSimple = (
  canvasIn: HTMLCanvasElement,
  canvasOut: HTMLCanvasElement
) => {
  const w = canvasIn.width;
  const h = canvasIn.height;
  const canvas2dIn = canvasIn.getContext("2d") as CanvasRenderingContext2D;
  const canvas2dOut = canvasOut.getContext("2d") as CanvasRenderingContext2D;

  const selection = canvas2dIn.getImageData(0, 0, w, h);
  const matrix = getPixelMatrix(selection);

  // Iterate through all but edge pixels.
  for (let x = 0; x < w - 1; x++) {
    for (let y = 0; y < h - 1; y++) {
      const currentPixel = matrix.get(x, y) as Pixel;
      const downPixel = matrix.get(x + 1, y) as Pixel;
      const rightPixel = matrix.get(x, y + 1) as Pixel;

      // Pixels match, no edge.
      if (
        currentPixel.r === downPixel.r &&
        currentPixel.g === downPixel.g &&
        currentPixel.b === downPixel.b &&
        currentPixel.a === downPixel.a &&
        //
        currentPixel.r === rightPixel.r &&
        currentPixel.g === rightPixel.g &&
        currentPixel.b === rightPixel.b &&
        currentPixel.a === rightPixel.a
      ) {
        canvas2dOut.fillStyle = "#ffffff"; // white
        canvas2dOut.fillRect(x, y, 1, 1);
      }
      // Pixels don't match, edge.
      else {
        canvas2dOut.fillStyle = "#000000"; // black
        canvas2dOut.fillRect(x, y, 1, 1);
      }
    }
  }
};