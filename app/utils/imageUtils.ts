// Finds the most common pixel color in an image, used to tint the preview
// background so it blends with the uploaded screenshot.
export const getDominantColor = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas 2D context"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

      // Sample a subset of pixels for large images to keep this fast. `data`
      // holds 4 bytes (RGBA) per pixel, so the stride is always a multiple of 4.
      let stride = 4; // every pixel
      if (data.length > 1_000_000) stride = 4 * 1000; // 1MP+: every 1000th pixel
      else if (data.length > 10_000) stride = 4 * 25; // 100K+: every 25th pixel

      const colorCounts: Record<string, number> = {};
      let maxCount = 0;
      let dominantColor = "rgb(0,0,0)";

      for (let i = 0; i < data.length; i += stride) {
        const rgb = `rgb(${data[i]},${data[i + 1]},${data[i + 2]})`;
        const count = (colorCounts[rgb] = (colorCounts[rgb] || 0) + 1);
        if (count > maxCount) {
          maxCount = count;
          dominantColor = rgb;
        }
      }

      resolve(dominantColor);
    };

    img.onerror = () => reject(new Error("Failed to load image"));
  });
};
