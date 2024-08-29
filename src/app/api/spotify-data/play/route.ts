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
  const { uris, device_id } = await request.json();

  if (!uris || !device_id) {
    return NextResponse.json(
      { error: "uris and device_id must be provided" },
      { status: 400 }
    );
  }

  try {
    //transfer and play specified track on given device
    const playingTrack = await playTrack(accessToken, uris, device_id);
    return NextResponse.json(playingTrack);
  } catch (error) {
    console.error("Error Spotify Play: " + error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "Failed" });
  }
}
