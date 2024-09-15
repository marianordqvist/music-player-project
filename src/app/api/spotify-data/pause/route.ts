import { pauseTrack } from "@/_lib/SpotifyService";
import { auth } from "../../../../../authconfig";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized to play songs" },
      { status: 401 }
    );
  }

  const accessToken = session.accessToken;

  try {
    //pause track
    const pausedTrack = await pauseTrack(accessToken);
    return NextResponse.json(pausedTrack);
  } catch (error) {
    console.error("Error Spotify Play: " + error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "Failed" });
  }
}
