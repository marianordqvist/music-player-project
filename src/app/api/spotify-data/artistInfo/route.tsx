import { auth } from "@/../authconfig";
import { NextRequest, NextResponse } from "next/server";
import { getArtistInfo, getArtistTopTracks } from "@/_lib/SpotifyService";

interface topTracksInterface {
  track: {
    name: string;
  };
  name: string;
}

// fetch data about artist from Spotify
export async function GET(request: NextRequest) {
  // authenticate
  const session = await auth();

  if (!session || !session.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized to play songs" },
      { status: 401 }
    );
  }

  const accessToken = session.accessToken;

  // fetch artistId from frontend
  const url = new URL(request.url);
  const artistId = url.searchParams.get("artistId");

  if (!artistId) {
    return NextResponse.json(
      { error: "ArtistId must be provided" },
      { status: 400 }
    );
  }

  try {
    //fetch info about artist
    const artistInfo = await getArtistInfo(accessToken, artistId);
    const artistTopTracks = await getArtistTopTracks(accessToken, artistId);
    const topTracksNames = artistTopTracks.tracks
      .map((track: topTracksInterface) => track.name)
      .slice(0, 5);

    // Include artistId in the returned artistInfo object
    const artistInfoFinal = {
      artistId,
      ...artistInfo,
      topTracks: topTracksNames,
    };

    console.log("artistInfoFinal" + JSON.stringify(artistInfoFinal));

    return NextResponse.json(artistInfoFinal);
  } catch (error) {
    console.error("Error Artist Info: " + error);
    if (error instanceof Error) return NextResponse.json({ error: error.message });
  }
}
