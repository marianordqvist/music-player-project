import { client } from "@/_lib/ContentfulClient";
import { NextRequest, NextResponse } from "next/server";
import { Environment, Space, Entry } from "contentful-management";

// update contentful entry
export async function PUT(request: NextRequest) {
  try {
    const { artistInfo } = await request.json();

    if (!artistInfo) {
      return NextResponse.json(
        { error: "ArtistInfo must be provided" },
        { status: 400 }
      );
    }

    // Update Contentful entry with Spotify data
    const updateEntry = client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space: Space) =>
        space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID as string)
      )
      .then((environment: Environment) =>
        environment.getEntry(process.env.CONTENTFUL_ENTRY_ID as string)
      )
      .then((entry: Entry) => {
        entry.fields.artistname["en-US"] = artistInfo.name;
        entry.fields.followers["en-US"] = artistInfo.followers.total;
        entry.fields.popularity["en-US"] = artistInfo.popularity;
        entry.fields.genres["en-US"] = artistInfo.genres;
        entry.fields.readMore["en-US"] = artistInfo.external_urls.spotify;
        entry.fields.imageUrl["en-US"] = artistInfo.images[1].url;
        return entry.update();
      })
      .catch(console.error);

    return NextResponse.json({ message: "Contentful entry updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update Contentful entry" },
      { status: 500 }
    );
  }
}
