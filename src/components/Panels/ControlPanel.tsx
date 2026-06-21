import React from 'react';
import { AudioUpload } from '../SignalInput/AudioUpload';
import { AudioRecorder } from '../SignalInput/AudioRecorder';
import { SignalGenerator } from '../SignalInput/SignalGenerator';
import { ImageUpload } from '../SignalInput/ImageUpload';
import { SignalData } from '../../types';

interface ControlPanelProps {
  onSignalLoaded: (signal: SignalData) => void;
  onWindowTypeChange: (type: 'hann' | 'hamming' | 'rectangular') => void;
  windowType: 'hann' | 'hamming' | 'rectangular';
  onLogScaleToggle: (enabled: boolean) => void;
  logScaleEnabled: boolean;
}

export function ControlPanel({
  onSignalLoaded,
  onWindowTypeChange,
  windowType,
  onLogScaleToggle,
  logScaleEnabled
}: ControlPanelProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg font-bold">Signal Input</h2>
        <AudioUpload onSignalLoaded={onSignalLoaded} />
        <AudioRecorder onSignalLoaded={onSignalLoaded} />
      </div>

      <SignalGenerator onSignalLoaded={onSignalLoaded} />

      <ImageUpload onSignalLoaded={onSignalLoaded} />

      <div className="bg-white p-4 rounded border space-y-4">
        <h3 className="font-semibold">FFT Settings</h3>

        <div>
          <label className="block text-sm font-medium mb-2">Window Function</label>
          <select
            value={windowType}
            onChange={(e) => onWindowTypeChange(e.target.value as 'hann' | 'hamming' | 'rectangular')}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="rectangular">Rectangular</option>
            <option value="hann">Hann</option>
            <option value="hamming">Hamming</option>
          </select>
          <p className="text-xs text-gray-600 mt-1">Hann and Hamming reduce spectral leakage</p>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={logScaleEnabled}
              onChange={(e) => onLogScaleToggle(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm">Log Scale for Frequency</span>
          </label>
        </div>
      </div>
    </div>
  );
}
