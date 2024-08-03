export interface MusicCardInterface {
  id?: number;
  artist: string;
  song?: string;
  songName: string;
  image: string;
}

export interface MusicCardState {
  cards: MusicCardInterface[];
  loading: boolean;
  error: string | null;
}
