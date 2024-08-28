// export interface TrackInterface {
//   title: string;
//   imageUrl: string;
// }

export interface MusicPlayerInterface {
  volume: number;
  status:
    | "idle"
    | "playing"
    | "paused"
    | "error"
    | "pending"
    | "success"
    | "rejected";
  device_id: string;
  uris: string;
  error: string | null;
  isActive: boolean;
  playingTrack: {
    name: string;
  };
}

interface SpotifyPlaybackState {
  position: number;
  duration: number;
  paused: boolean;
  track: {
    uri: string;
    name: string;
    artists: Array<{ name: string }>;
    album: { name: string };
    // ... other track properties
  };
  context: {
    uri: string;
    type: string;
  };
  // ... other properties
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}
