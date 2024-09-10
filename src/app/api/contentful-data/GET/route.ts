import { client } from "@/_lib/ContentfulClient";
import { NextRequest, NextResponse } from "next/server";

// get updated entry
export async function GET(request: NextRequest) {
  const updatedEntry = await client
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then((space) => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID))
    .then((environment) => environment.getEntry(process.env.CONTENTFUL_ENTRY_ID));

  return NextResponse.json(updatedEntry);
}
