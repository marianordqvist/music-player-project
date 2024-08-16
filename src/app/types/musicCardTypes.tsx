export interface CardComponentInterface {
  key: string;
  cardId: string;
  image?: string;
  songName: string;
  artist: string;
  genre: string;
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
}

export interface ApiCardInterface {
  album?: Album;
  name: string;
  artists: Artist[];
  genre: string;
}
