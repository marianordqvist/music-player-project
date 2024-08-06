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
