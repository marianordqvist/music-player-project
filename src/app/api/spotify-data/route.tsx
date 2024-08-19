"use server";
import { NextResponse } from "next/server";
import { auth } from "../../../../authconfig";
import { getGenres, getTracksByGenres } from "../../../_lib/SpotifyService";

export async function GET() {
  // Check session and extract accessToken
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized to fetch songs" },
      { status: 401 }
    );
  }

  // create accesstoken
  const accessToken = session.accessToken;

  // Function to shuffle (Fisher-Yates)
  function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  try {
    // fetch array of genres from spotify
    const genres = await getGenres(accessToken);

    // shuffle genres
    const shuffledGenres = shuffleArray(genres);

    // slice out 6 genres
    const selectedGenres = shuffledGenres.slice(0, 6);

    // fetch 1 track from each of the 6 genres
    const tracks = await getTracksByGenres(selectedGenres, accessToken);

    // shuffle songs
    const shuffledTracks = shuffleArray(tracks);

    // slice out 6 songs
    const selectedTracks = shuffledTracks.slice(0, 6);

    return NextResponse.json(selectedTracks);
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    if (error instanceof Error)
      return NextResponse.json(
        { error: error.message || "Failed to fetch data" },
        { status: 500 }
      );
  }
}
