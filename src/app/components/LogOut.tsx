import React from "react";
import { signOut } from "../../../authconfig";

const LogOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className="bg-zinc-300 p-3 rounded-2xl m-10">
        Sign Out
      </button>
    </form>
  );
};

export default LogOut;
