import React, { useState } from 'react';
import {
  generateSineWave,
  generateSquareWave,
  generateSawtoothWave,
  generateTriangleWave,
  combinateSignals
} from '../../utils/signalGenerator';
import { SignalData } from '../../types';
import { RotateCw } from 'lucide-react';

interface SignalGeneratorProps {
  onSignalLoaded: (signal: SignalData) => void;
}

type WaveType = 'sine' | 'square' | 'sawtooth' | 'triangle';

interface WaveConfig {
  type: WaveType;
  frequency: number;
  amplitude: number;
  enabled: boolean;
}

export function SignalGenerator({ onSignalLoaded }: SignalGeneratorProps) {
  const [duration, setDuration] = useState(1);
  const [waves, setWaves] = useState<WaveConfig[]>([
    { type: 'sine', frequency: 440, amplitude: 0.5, enabled: true },
  ]);

  const generateWave = (config: WaveConfig): SignalData | null => {
    if (!config.enabled) return null;

    switch (config.type) {
      case 'sine':
        return generateSineWave(config.frequency, duration, 44100, config.amplitude);
      case 'square':
        return generateSquareWave(config.frequency, duration, 44100, config.amplitude);
      case 'sawtooth':
        return generateSawtoothWave(config.frequency, duration, 44100, config.amplitude);
      case 'triangle':
        return generateTriangleWave(config.frequency, duration, 44100, config.amplitude);
    }
  };

  const handleGenerate = () => {
    const signals = waves
      .map(generateWave)
      .filter((s): s is SignalData => s !== null);

    if (signals.length === 0) return;

    const combined = signals.length === 1 ? signals[0] : combinateSignals(...signals);
    onSignalLoaded(combined);
  };

  const updateWave = (index: number, updates: Partial<WaveConfig>) => {
    const newWaves = [...waves];
    newWaves[index] = { ...newWaves[index], ...updates };
    setWaves(newWaves);
  };

  const addWave = () => {
    setWaves([
      ...waves,
      { type: 'sine', frequency: 440, amplitude: 0.5, enabled: true }
    ]);
  };

  const removeWave = (index: number) => {
    if (waves.length > 1) {
      setWaves(waves.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-4 bg-white p-4 rounded border">
      <h3 className="font-semibold">Signal Generator</h3>

      <div>
        <label className="block text-sm font-medium">Duration (seconds)</label>
        <input
          type="number"
          min="0.1"
          max="10"
          step="0.1"
          value={duration}
          onChange={(e) => setDuration(parseFloat(e.target.value))}
          className="w-full px-2 py-1 border rounded"
        />
      </div>

      <div className="space-y-3">
        {waves.map((wave, idx) => (
          <div key={idx} className="p-3 bg-gray-50 rounded border space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={wave.enabled}
                onChange={(e) => updateWave(idx, { enabled: e.target.checked })}
                className="w-4 h-4"
              />
              <select
                value={wave.type}
                onChange={(e) => updateWave(idx, { type: e.target.value as WaveType })}
                className="flex-1 px-2 py-1 border rounded text-sm"
              >
                <option value="sine">Sine</option>
                <option value="square">Square</option>
                <option value="sawtooth">Sawtooth</option>
                <option value="triangle">Triangle</option>
              </select>
              {waves.length > 1 && (
                <button
                  onClick={() => removeWave(idx)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <label className="block text-xs font-medium">Frequency (Hz)</label>
                <input
                  type="number"
                  min="1"
                  max="20000"
                  value={wave.frequency}
                  onChange={(e) => updateWave(idx, { frequency: parseFloat(e.target.value) })}
                  className="w-full px-2 py-1 border rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-medium">Amplitude</label>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  value={wave.amplitude}
                  onChange={(e) => updateWave(idx, { amplitude: parseFloat(e.target.value) })}
                  className="w-full px-2 py-1 border rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={addWave}
          className="flex-1 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
        >
          Add Wave
        </button>
        <button
          onClick={handleGenerate}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          <RotateCw size={18} />
          <span>Generate</span>
        </button>
      </div>
    </div>
  );
}
