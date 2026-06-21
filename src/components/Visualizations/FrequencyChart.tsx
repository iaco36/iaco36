import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { FFTResult } from '../../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface FrequencyChartProps {
  fftResult: FFTResult | null;
  useLogScale: boolean;
}

export function FrequencyChart({ fftResult, useLogScale }: FrequencyChartProps) {
  if (!fftResult || fftResult.frequencies.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-50 rounded border flex items-center justify-center text-gray-400">
        Generate FFT to view frequency spectrum
      </div>
    );
  }

  // Downsample for display if necessary
  const maxPoints = 2000;
  let displayFrequencies = fftResult.frequencies;
  let displayMagnitudes = fftResult.magnitude;
  let step = 1;

  if (fftResult.frequencies.length > maxPoints) {
    step = Math.ceil(fftResult.frequencies.length / maxPoints);
    displayFrequencies = fftResult.frequencies.filter((_, i) => i % step === 0);
    displayMagnitudes = fftResult.magnitude.filter((_, i) => i % step === 0);
  }

  // Normalize magnitude
  const maxMagnitude = Math.max(...displayMagnitudes);
  const normalizedMagnitudes = displayMagnitudes.map(m => maxMagnitude > 0 ? m / maxMagnitude : 0);

  const data = {
    labels: displayFrequencies.map(f => f.toFixed(1)),
    datasets: [
      {
        label: 'Frequency Spectrum',
        data: normalizedMagnitudes,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 1,
        pointRadius: 0,
        tension: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: useLogScale ? 'Frequency Spectrum (Log Scale)' : 'Frequency Spectrum',
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequency (Hz)',
        },
        type: useLogScale ? 'logarithmic' : 'linear',
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Normalized Magnitude',
        },
        min: 0,
        max: 1,
      },
    },
  };

  return (
    <div className="w-full h-96 bg-white rounded border p-4">
      <Line data={data} options={options} />
    </div>
  );
}
