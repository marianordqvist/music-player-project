import React from "react";
import UserAvatar from "./userAvatar";
import LogOut from "./LogOut";
import { Borel } from "next/font/google";

const borel = Borel({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-borel",
});

export default function Header() {
  return (
    <header className="bg-zinc-900 bg-opacity-75 shadow-lg">
      <div className="p-5 flex row text-gray-500 justify-between items-center max-w-[1000px] mx-auto">
        <a
          href="/"
          className={`${borel.variable} font-sans italic cursor-pointer text-emerald-400 text-4xl font-borel mt-5`}
        >
          tune.in
        </a>
        <div>
          <nav className="flex row items-center font-extrabold gap-3 text-zinc-100">
            <UserAvatar />
            <LogOut />
          </nav>
        </div>
      </div>
    </header>
  );
}
