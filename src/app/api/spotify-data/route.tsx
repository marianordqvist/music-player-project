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

    const selectedTracks = [];
    const requiredSelectedTracks = 6;

    while (
      selectedTracks.length < requiredSelectedTracks &&
      shuffledGenres.length > 0
    ) {
      // create a new array which contains the first element of shuffledGenres
      const currentGenre = shuffledGenres.shift();

      // fetches a new song for that genre
      const tracksByGenre = await getTracksByGenres([currentGenre], accessToken);

      // filter tracks for current genre (to be able to display genre on the card)
      const tracksForGenre = tracksByGenre.filter(
        (track) => track.genre === currentGenre
      );

      if (tracksForGenre.length > 0) {
        // shuffle songs and select one track
        const shuffledTracks = shuffleArray(tracksForGenre);
        // add first track to selectedTracksArray
        selectedTracks.push(shuffledTracks[0]);
      } else {
        console.warn(`No tracks found for genre: ${currentGenre}`);
      }
    }

    // check if we ended up with fewer than required tracks and handle it
    if (selectedTracks.length < requiredSelectedTracks) {
      console.error(`only ${selectedTracks.length} tracks could be found`);
    }

    console.log("final selected tracks: " + selectedTracks);
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
