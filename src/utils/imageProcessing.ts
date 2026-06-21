import { SignalData } from '../types';

export async function extractSignalFromImage(
  file: File,
  extractionType: 'horizontal' | 'vertical' = 'horizontal'
): Promise<SignalData> {
  const imageUrl = URL.createObjectURL(file);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      const samples: number[] = [];

      if (extractionType === 'horizontal') {
        const middleRow = Math.floor(img.height / 2);
        for (let x = 0; x < img.width; x++) {
          const idx = (middleRow * img.width + x) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3 / 255;
          samples.push(gray);
        }
      } else {
        const middleCol = Math.floor(img.width / 2);
        for (let y = 0; y < img.height; y++) {
          const idx = (y * img.width + middleCol) * 4;
          const gray = (data[idx] + data[idx + 1] + data[idx + 2]) / 3 / 255;
          samples.push(gray);
        }
      }

      URL.revokeObjectURL(imageUrl);

      resolve({
        samples,
        sampleRate: img.width,
        duration: 1
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      reject(new Error('Failed to load image'));
    };

    img.src = imageUrl;
  });
}
