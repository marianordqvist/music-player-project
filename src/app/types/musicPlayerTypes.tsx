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
  device_id: void;
  trackUri: void;
  error: string | null;
  isActive: boolean;
  player: null;
}

export interface MusicPlayerApiInterface {
  device_id: void;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any;
    Spotify: any;
  }
}
