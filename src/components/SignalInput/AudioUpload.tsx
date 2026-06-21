import React, { useState } from 'react';
import { decodeAudioFile } from '../../utils/audioProcessing';
import { SignalData } from '../../types';
import { Upload } from 'lucide-react';

interface AudioUploadProps {
  onSignalLoaded: (signal: SignalData) => void;
}

export function AudioUpload({ onSignalLoaded }: AudioUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const signal = await decodeAudioFile(file);
      onSignalLoaded(signal);
    } catch (err) {
      setError(`Error loading audio: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition">
        <Upload size={20} />
        <span>Upload Audio File</span>
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          disabled={loading}
          className="hidden"
        />
      </label>
      {loading && <p className="text-sm text-gray-600">Loading audio...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
