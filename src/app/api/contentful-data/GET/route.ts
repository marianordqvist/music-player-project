import { client } from "@/_lib/ContentfulClient";
import { NextRequest, NextResponse } from "next/server";
import { Environment, Space } from "contentful-management";

// get updated entry
export async function GET(request: NextRequest) {
  try {
    const updatedEntry = await client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space: Space) =>
        space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT_ID as string)
      )
      .then((environment: Environment) =>
        environment.getEntry(process.env.CONTENTFUL_ENTRY_ID as string)
      );

    return NextResponse.json(updatedEntry);
  } catch (error) {
    throw error;
  }
}
