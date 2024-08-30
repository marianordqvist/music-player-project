import React from "react";
import { signIn, auth } from "../../../authconfig";
import { redirect } from "next/navigation";

export default async function login() {
  // if user is already logged in, they should be redirected to dashboard
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <form
        action={async () => {
          "use server";
          await signIn("spotify", { redirectTo: "/dashboard" });
        }}
      >
        <button
          className="bg-orange-300 h-16 p-4 text-black rounded-xl font-bold"
          type="submit"
        >
          Sign in with Spotify
        </button>
      </form>
    </>
  );
}
