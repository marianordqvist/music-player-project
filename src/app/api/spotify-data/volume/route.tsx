import { setPlaybackVolume } from "@/_lib/SpotifyService";
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

  // parse request body
  const { volume } = await request.json();

  if (!volume) {
    return NextResponse.json(
      { error: "device_id and volume must be provided" },
      { status: 400 }
    );
  }

  try {
    const newVolume = await setPlaybackVolume(accessToken, volume);
    return NextResponse.json(newVolume);
  } catch (error) {
    console.error("Error Spotify Play: " + error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "Failed" });
  }
}
