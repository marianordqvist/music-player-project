import { auth } from "../../../../../authconfig";
import { NextResponse } from "next/server";
import { saveToSpotifyLibrary } from "@/_lib/SpotifyService";

export async function PUT(request: Request) {
  // authenticate
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized to play songs" },
      { status: 401 }
    );
  }

  const accessToken = session.accessToken;

  // get ids
  const { ids } = await request.json();

  try {
    //pause track
    const pausedTrack = await saveToSpotifyLibrary(accessToken, ids);
    return NextResponse.json(pausedTrack);
  } catch (error) {
    console.error("Error Spotify save: " + error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "Failed" });
  }
}
