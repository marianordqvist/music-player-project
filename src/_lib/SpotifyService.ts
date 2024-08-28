import { TrackInterface } from "../app/types/TrackTypes";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

// MusicCard info fetch

// Fetch genres
export const getGenres = async (accessToken: string) => {
  const response = await fetch(
    `${SPOTIFY_API_URL}/recommendations/available-genre-seeds`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch genres.  (status: ${response.status})`);
  }

  const data = await response.json();
  return data.genres;
};

// Fetch tracks from those genres
export const getTracksByGenres = async (genres: string[], accessToken: string) => {
  const trackPromises = genres.map(async (genre) => {
    const response = await fetch(
      `${SPOTIFY_API_URL}/search?q=genre:${genre}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch tracks for genre: ${genre} (status: ${response.status})`
      );
    }

    const data = await response.json();

    return data.tracks.items.map((track: TrackInterface) => ({
      ...track,
      genre,
    }));
  });

  // Wait for all the track fetching promises to resolve
  const tracksArrays = await Promise.all(trackPromises);

  // Flatten the array of arrays into a single array of tracks
  return tracksArrays.flat();
};

// start playing song
export const playTrack = async (
  accessToken: string,
  uris: string,
  device_id: string
) => {
  const response = await fetch(
    `${SPOTIFY_API_URL}/me/player/play?device_id=${device_id}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [uris] }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to play track (status ${response.status})`);
  }

  return response.json();
};
