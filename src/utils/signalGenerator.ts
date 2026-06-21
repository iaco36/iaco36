import { SignalData } from '../types';

export function generateSineWave(
  frequency: number,
  duration: number,
  sampleRate: number = 44100,
  amplitude: number = 1
): SignalData {
  const samples: number[] = [];
  const numSamples = duration * sampleRate;

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    samples.push(amplitude * Math.sin(2 * Math.PI * frequency * t));
  }

  return {
    samples,
    sampleRate,
    duration
  };
}

export function generateSquareWave(
  frequency: number,
  duration: number,
  sampleRate: number = 44100,
  amplitude: number = 1
): SignalData {
  const samples: number[] = [];
  const numSamples = duration * sampleRate;
  const period = sampleRate / frequency;

  for (let i = 0; i < numSamples; i++) {
    const phase = (i % period) / period;
    samples.push(phase < 0.5 ? amplitude : -amplitude);
  }

  return {
    samples,
    sampleRate,
    duration
  };
}

export function generateSawtoothWave(
  frequency: number,
  duration: number,
  sampleRate: number = 44100,
  amplitude: number = 1
): SignalData {
  const samples: number[] = [];
  const numSamples = duration * sampleRate;
  const period = sampleRate / frequency;

  for (let i = 0; i < numSamples; i++) {
    const phase = (i % period) / period;
    samples.push(amplitude * (2 * phase - 1));
  }

  return {
    samples,
    sampleRate,
    duration
  };
}

export function generateTriangleWave(
  frequency: number,
  duration: number,
  sampleRate: number = 44100,
  amplitude: number = 1
): SignalData {
  const samples: number[] = [];
  const numSamples = duration * sampleRate;
  const period = sampleRate / frequency;

  for (let i = 0; i < numSamples; i++) {
    const phase = (i % period) / period;
    let value: number;
    if (phase < 0.25) {
      value = 4 * phase;
    } else if (phase < 0.75) {
      value = 2 - 4 * phase;
    } else {
      value = 4 * phase - 4;
    }
    samples.push(amplitude * value);
  }

  return {
    samples,
    sampleRate,
    duration
  };
}

export function combinateSignals(...signals: SignalData[]): SignalData {
  if (signals.length === 0) {
    return { samples: [], sampleRate: 44100, duration: 0 };
  }

  const maxLength = Math.max(...signals.map(s => s.samples.length));
  const sampleRate = signals[0].sampleRate;
  const combined: number[] = new Array(maxLength).fill(0);

  for (const signal of signals) {
    for (let i = 0; i < signal.samples.length; i++) {
      combined[i] += signal.samples[i] / signals.length;
    }
  }

  return {
    samples: combined,
    sampleRate,
    duration: maxLength / sampleRate
  };
}
