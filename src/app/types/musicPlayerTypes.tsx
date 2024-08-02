export interface TrackInterface {
  title: string;
  imageUrl: string;
}

export interface MusicPlayerInterface {
  isPlaying: boolean;
  currentTrack: TrackInterface;
  // currentTime: number;
  // volume: number;
  // isMuted: boolean;
}
