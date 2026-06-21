export interface SignalData {
  samples: number[];
  sampleRate: number;
  duration: number;
}

export interface FFTResult {
  magnitude: number[];
  phase: number[];
  frequencies: number[];
}

export interface WindowingOptions {
  type: 'hann' | 'hamming' | 'rectangular';
  size: number;
}

export type InputSource = 'audio-upload' | 'microphone' | 'signal-generator' | 'image';
