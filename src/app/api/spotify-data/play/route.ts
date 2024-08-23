"use server";
import { auth } from "../../../../../authconfig";
import { NextResponse } from "next/server";
import { playTrack } from "@/_lib/SpotifyService";

export async function PUT(request: Request) {
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized to play songs" },
      { status: 401 }
    );
  }

  // create accesstoken
  const accessToken = session.accessToken;

  //   create trackUri
  const trackUri = await request.json();

  if (!trackUri) {
    return NextResponse.json({ error: "No trackUri provided" }, { status: 400 });
  }

  try {
    const playingTrack = await playTrack(accessToken, trackUri);
    return NextResponse.json(playingTrack);
  } catch (error) {
    console.error("Error Spotify Play: " + error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "Failed" });
  }
}
