import { TrackInterface } from "../app/types/TrackTypes";
const SPOTIFY_API_URL = "https://api.spotify.com/v1";

// Fetch 10 genres
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
    throw new Error(`Failed to fetch genres`);
  }

  const data = await response.json();

  return data.genres;
};

// Fetch 10 artists from those genres
export const getTracksByGenres = async (genres: string[], accessToken: string) => {
  const trackPromises = genres.map(async (genre) => {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=genre:${genre}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Check if the response is not OK (e.g., status is not 200-299)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch tracks for genre: ${genre} (status: ${response.status})`
      );
    }

    const data = await response.json();
    return data.tracks.items.map((track: TrackInterface) => ({
      ...track,
      genre, //To add each genre to each track object
    }));
  });

  // Wait for all the track fetching promises to resolve
  const tracksArrays = await Promise.all(trackPromises);

  // Flatten the array of arrays into a single array of tracks
  return tracksArrays.flat();
};
