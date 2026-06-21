import FFT from 'fft.js';
import { SignalData, FFTResult, WindowingOptions } from '../types';

function applyWindow(samples: number[], windowType: 'hann' | 'hamming' | 'rectangular'): number[] {
  const n = samples.length;
  const windowed = [...samples];

  if (windowType === 'rectangular') {
    return windowed;
  }

  for (let i = 0; i < n; i++) {
    let window = 1;
    if (windowType === 'hann') {
      window = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
    } else if (windowType === 'hamming') {
      window = 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (n - 1));
    }
    windowed[i] *= window;
  }

  return windowed;
}

function nextPowerOf2(n: number): number {
  return Math.pow(2, Math.ceil(Math.log2(n)));
}

export function calculateFFT(
  signalData: SignalData,
  windowType: 'hann' | 'hamming' | 'rectangular' = 'hann'
): FFTResult {
  const samples = signalData.samples;
  const sampleRate = signalData.sampleRate;

  if (samples.length === 0) {
    return {
      magnitude: [],
      phase: [],
      frequencies: []
    };
  }

  // Apply window function
  const windowed = applyWindow(samples, windowType);

  // Pad to next power of 2
  const fftSize = nextPowerOf2(windowed.length);
  const padded = [...windowed, ...new Array(fftSize - windowed.length).fill(0)];

  // Calculate FFT
  const fft = new FFT(fftSize);
  const spectrum = fft.createComplexArray();

  // Copy real values
  for (let i = 0; i < padded.length; i++) {
    spectrum[i * 2] = padded[i];
  }

  // Perform FFT
  fft.forward(spectrum);

  // Extract magnitude and phase
  const magnitude: number[] = [];
  const phase: number[] = [];
  const frequencies: number[] = [];

  const nyquist = sampleRate / 2;
  const freqResolution = sampleRate / fftSize;

  for (let i = 0; i < fftSize / 2; i++) {
    const real = spectrum[i * 2];
    const imag = spectrum[i * 2 + 1];

    magnitude.push(Math.sqrt(real * real + imag * imag) / (fftSize / 2));
    phase.push(Math.atan2(imag, real));
    frequencies.push(i * freqResolution);
  }

  return {
    magnitude,
    phase,
    frequencies
  };
}

export function getMagnitudeDb(magnitude: number[]): number[] {
  const min = Math.min(...magnitude.filter(m => m > 0));
  return magnitude.map(m => (m > 0 ? 20 * Math.log10(m / min) : -100));
}
