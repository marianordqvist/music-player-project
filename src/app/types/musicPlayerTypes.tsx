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
  isPaused: boolean;
  track: string;
  artist: string;
  duration: number;
  position: number;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}

export interface SpotifySDKInterface {
  device_id: string;
  paused: boolean;
  duration: number;
  position: number;
  track_window: {
    current_track: {
      name: string;
      artists: { name: string }[];
    };
  };
}
