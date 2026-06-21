import React, { useState } from 'react';
import { recordAudio } from '../../utils/audioProcessing';
import { SignalData } from '../../types';
import { Mic, Square } from 'lucide-react';

interface AudioRecorderProps {
  onSignalLoaded: (signal: SignalData) => void;
}

export function AudioRecorder({ onSignalLoaded }: AudioRecorderProps) {
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartRecording = async () => {
    setRecording(true);
    setError(null);

    try {
      const signal = await recordAudio(3000);
      onSignalLoaded(signal);
    } catch (err) {
      setError(`Recording error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setRecording(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleStartRecording}
        disabled={recording}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
      >
        {recording ? <Square size={20} /> : <Mic size={20} />}
        <span>{recording ? 'Recording... (3s)' : 'Record from Microphone'}</span>
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
