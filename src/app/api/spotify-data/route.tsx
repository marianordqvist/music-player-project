"use server";
import { NextResponse } from "next/server";
import { auth } from "../../../../authconfig";
import { getGenres, getTracksByGenres } from "../../../_lib/SpotifyService";

export async function GET() {
  // Step 1: Check session and extract accessToken
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized to fetch top songs" },
      { status: 401 }
    );
  }

  const accessToken = session.accessToken;

  try {
    // fetch and shuffle genres
    const genres = await getGenres(accessToken);
    // console.log("Genres fetched:", genres);

    const selectedGenres = genres.sort(() => 0.5 - Math.random()).slice(0, 8);
    // console.log("Selected genres:", selectedGenres);

    // fetch tracks from those genres
    const tracks = await getTracksByGenres(selectedGenres, accessToken);
    console.log("Final sorted tracks:", tracks);

    return NextResponse.json(tracks);
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch data" },
      { status: 500 }
    );
  }
}
