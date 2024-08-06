import React from "react";
import { signIn } from "../../../authconfig";

export default function login() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("spotify", { redirectTo: "/dashboard" });
      }}
    >
      <button className="bg-zinc-300 p-3 rounded-2xl m-10" type="submit">
        Sign in with Spotify
      </button>
    </form>
  );
}

// scopes we will need:
// streaming
//  ? user-read-playback-state, user-modify-playback-state, (see what they are playing)
// user-follow-modify, user-follow-read,
// user-library-modify, user-library-read,

// 1. request user authorization
// 2. make api calls with access token
