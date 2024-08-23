export interface TrackInterface {
  title: string;
  imageUrl: string;
}

export interface MusicPlayerInterface {
  isPlaying: boolean;
  currentTrack?: TrackInterface;
  volume: number;
  trackUri: string | null;
  status: "idle" | "pending" | "succeeded" | "rejected";
  // currentTime: number;
  // volume: number;
  // isMuted: boolean;
}
