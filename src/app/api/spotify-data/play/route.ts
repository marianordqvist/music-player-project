"use server";
import { auth } from "../../../../../authconfig";
import { NextResponse } from "next/server";
import { playTrack } from "@/_lib/SpotifyService";

export async function GET(request: Request) {
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized to play songs" },
      { status: 401 }
    );
  }

  const token = session.accessToken;

  // Send the token in the response body
  return NextResponse.json({ token });
}

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
  const { uris, device_id, position_ms } = await request.json();

  console.log(position_ms);

  if (!uris || !device_id) {
    return NextResponse.json(
      { error: "uris, device_id and position_ms must be provided" },
      { status: 400 }
    );
  }

  try {
    //transfer and play specified track on given device
    const playingTrack = await playTrack(accessToken, uris, device_id, position_ms);
    return NextResponse.json(playingTrack);
  } catch (error) {
    console.error("Error Spotify Play: " + error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "Failed" });
  }
}
