import React, { useState } from 'react';
import { TemporalChart } from './components/Visualizations/TemporalChart';
import { FrequencyChart } from './components/Visualizations/FrequencyChart';
import { ControlPanel } from './components/Panels/ControlPanel';
import { calculateFFT } from './utils/fftCalculator';
import { SignalData, FFTResult } from './types';

function App() {
  const [signal, setSignal] = useState<SignalData | null>(null);
  const [fftResult, setFFTResult] = useState<FFTResult | null>(null);
  const [windowType, setWindowType] = useState<'hann' | 'hamming' | 'rectangular'>('hann');
  const [logScale, setLogScale] = useState(false);

  const handleSignalLoaded = (newSignal: SignalData) => {
    setSignal(newSignal);
    const fft = calculateFFT(newSignal, windowType);
    setFFTResult(fft);
  };

  const handleWindowTypeChange = (type: 'hann' | 'hamming' | 'rectangular') => {
    setWindowType(type);
    if (signal) {
      const fft = calculateFFT(signal, type);
      setFFTResult(fft);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Fourier Transform Visualizer</h1>
        <p className="text-gray-600 mb-8">Explore frequency domain analysis of signals, audio, and images</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Control Panel */}
          <div className="lg:col-span-1">
            <ControlPanel
              onSignalLoaded={handleSignalLoaded}
              onWindowTypeChange={handleWindowTypeChange}
              windowType={windowType}
              onLogScaleToggle={setLogScale}
              logScaleEnabled={logScale}
            />
          </div>

          {/* Charts */}
          <div className="lg:col-span-3 space-y-8">
            <TemporalChart signal={signal} />
            <FrequencyChart fftResult={fftResult} useLogScale={logScale} />

            {signal && (
              <div className="bg-white p-4 rounded border">
                <h3 className="font-semibold mb-3">Signal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Sample Rate</p>
                    <p className="font-mono font-semibold">{signal.sampleRate} Hz</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Duration</p>
                    <p className="font-mono font-semibold">{signal.duration.toFixed(3)} s</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Samples</p>
                    <p className="font-mono font-semibold">{signal.samples.length}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Window Function</p>
                    <p className="font-mono font-semibold capitalize">{windowType}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
