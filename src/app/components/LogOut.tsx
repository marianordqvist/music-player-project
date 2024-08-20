import React from "react";
import { signOut } from "../../../authconfig";
import { IoIosLogOut } from "react-icons/io";

const LogOut = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button type="submit" className="bg-zinc-300 p-2 rounded-full">
        <IoIosLogOut size="24" />
      </button>
    </form>
  );
};

export default LogOut;
