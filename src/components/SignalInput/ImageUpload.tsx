import React, { useState } from 'react';
import { extractSignalFromImage } from '../../utils/imageProcessing';
import { SignalData } from '../../types';
import { Upload } from 'lucide-react';

interface ImageUploadProps {
  onSignalLoaded: (signal: SignalData) => void;
}

export function ImageUpload({ onSignalLoaded }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractionType, setExtractionType] = useState<'horizontal' | 'vertical'>('horizontal');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    try {
      const signal = await extractSignalFromImage(file, extractionType);
      onSignalLoaded(signal);
    } catch (err) {
      setError(`Error loading image: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 bg-white p-4 rounded border">
      <h3 className="font-semibold">Load Image</h3>

      <div>
        <label className="block text-sm font-medium mb-2">Extraction Direction</label>
        <select
          value={extractionType}
          onChange={(e) => setExtractionType(e.target.value as 'horizontal' | 'vertical')}
          className="w-full px-2 py-1 border rounded text-sm"
        >
          <option value="horizontal">Horizontal (Middle Row)</option>
          <option value="vertical">Vertical (Middle Column)</option>
        </select>
      </div>

      <label className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600 transition">
        <Upload size={20} />
        <span>Upload Image</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={loading}
          className="hidden"
        />
      </label>

      {loading && <p className="text-sm text-gray-600">Loading image...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
