import { SignalData } from '../types';

export async function decodeAudioFile(file: File): Promise<SignalData> {
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const channelData = audioBuffer.getChannelData(0);
  const samples = Array.from(channelData);

  return {
    samples,
    sampleRate: audioBuffer.sampleRate,
    duration: audioBuffer.duration
  };
}

export async function recordAudio(durationMs: number): Promise<SignalData> {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

        const samples: number[] = [];

        scriptProcessor.onaudioprocess = (event) => {
          const input = event.inputBuffer.getChannelData(0);
          samples.push(...Array.from(input));
        };

        mediaStreamSource.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        setTimeout(() => {
          scriptProcessor.disconnect();
          mediaStreamSource.disconnect();
          stream.getTracks().forEach(track => track.stop());

          resolve({
            samples,
            sampleRate: audioContext.sampleRate,
            duration: durationMs / 1000
          });
        }, durationMs);
      })
      .catch(reject);
  });
}

export function getFrequencyDomain(
  audioBuffer: AudioBuffer,
  windowSize: number = 2048
): { frequencies: number[]; magnitudes: number[] } {
  const analyser = new AnalyserNode(
    new (window.AudioContext || (window as any).webkitAudioContext)()
  );
  analyser.fftSize = windowSize;

  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);

  const nyquist = audioBuffer.sampleRate / 2;
  const frequencies: number[] = [];
  const magnitudes: number[] = [];

  for (let i = 0; i < dataArray.length; i++) {
    frequencies.push((i / dataArray.length) * nyquist);
    magnitudes.push(dataArray[i] / 255);
  }

  return { frequencies, magnitudes };
}
