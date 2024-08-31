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

  // parse request body
  const { device_id } = await request.json();
  console.log("device_id in route:" + device_id);

  if (!device_id) {
    return NextResponse.json(
      { error: "device_id must be provided" },
      { status: 400 }
    );
  }

  try {
    //transfer and play specified track on given device
    const pausedTrack = await pauseTrack(accessToken, device_id);
    // console.log("returned from playingTrack: " + playingTrack);
    return NextResponse.json(pausedTrack);
  } catch (error) {
    console.error("Error Spotify Play: " + error);
    if (error instanceof Error)
      return NextResponse.json({ error: error.message || "Failed" });
  }
}
