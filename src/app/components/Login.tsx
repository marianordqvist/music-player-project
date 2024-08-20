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
      <div className="flex justify-center h-screen">
        <button className="bg-zinc-300 h-16 p-4 mt-40 rounded-2xl" type="submit">
          Sign in with Spotify
        </button>
      </div>
    </form>
  );
}
