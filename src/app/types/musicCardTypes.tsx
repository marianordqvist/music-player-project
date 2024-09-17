export interface CardComponentInterface {
  image?: string;
  songName: string;
  artist: string;
  genre: string;
  onPlay: () => void;
  onSave: () => void;
  cardId: string;
}

// api types for card
export interface Image {
  url: string;
}

export interface Album {
  images?: Image[];
}

export interface Artist {
  name: string;
  id: string;
}

export interface ApiCardInterface {
  album?: Album;
  name: string;
  artists: Artist[];
  genre: string;
  uri: string;
  id: string;
  ids: string;
}
