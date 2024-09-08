export const getDominantColor = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject("Could not get canvas context");
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const colorCounts: { [key: string]: number } = {};
      let maxCount = 0;
      let dominantColor = 'rgb(0, 0, 0)';

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const rgb = `rgb(${r},${g},${b})`;

        if (colorCounts[rgb]) {
          colorCounts[rgb]++;
        } else {
          colorCounts[rgb] = 1;
        }

        if (colorCounts[rgb] > maxCount) {
          maxCount = colorCounts[rgb];
          dominantColor = rgb;
        }
      }

      resolve(dominantColor);
    };

    img.onerror = () => {
      reject("Error loading image");
    };
  });
};