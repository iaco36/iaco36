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
import { SignalData } from '../../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TemporalChartProps {
  signal: SignalData | null;
}

export function TemporalChart({ signal }: TemporalChartProps) {
  if (!signal || signal.samples.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-50 rounded border flex items-center justify-center text-gray-400">
        Load a signal to view temporal domain
      </div>
    );
  }

  // Downsample for display if necessary
  const maxPoints = 2000;
  let displaySamples = signal.samples;
  let step = 1;

  if (signal.samples.length > maxPoints) {
    step = Math.ceil(signal.samples.length / maxPoints);
    displaySamples = signal.samples.filter((_, i) => i % step === 0);
  }

  const timeAxis = displaySamples.map((_, i) => {
    const time = (i * step) / signal.sampleRate;
    return time.toFixed(3);
  });

  const data = {
    labels: timeAxis,
    datasets: [
      {
        label: 'Signal (Temporal Domain)',
        data: displaySamples,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
        text: 'Temporal Domain',
      },
      legend: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (seconds)',
        },
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amplitude',
        },
      },
    },
  };

  return (
    <div className="w-full h-96 bg-white rounded border p-4">
      <Line data={data} options={options} />
    </div>
  );
}
