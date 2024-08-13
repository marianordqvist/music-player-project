"use server";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../authconfig";

export async function GET() {
  // check if user authorized
  const session = await auth();
  console.log("session: ", session);
  if (!session || !session.user.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let token = session.user.id;
  console.log(token);

  // if they are, fetch from spotify
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer + ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Get the error body as text
      console.error("Error response from Spotify:", errorBody);
      throw new Error(`Spotify API responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("error fetching from Spotify", error);
    return NextResponse.json({ error: "failed to fetch data from Spotify" });
  }
}
