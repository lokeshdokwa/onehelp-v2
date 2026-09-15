export const AudioService = {
  startEvidenceRecording: async (durationMs: number): Promise<string> => {
    // Stub: record audio
    return new Promise(resolve => setTimeout(() => resolve('audio_path.m4a'), durationMs));
  },
  playSiren: () => {
    // Stub: play loud siren
  },
  stopSiren: () => {
    // Stub
  }
};
