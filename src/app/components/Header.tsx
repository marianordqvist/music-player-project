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
    <header className="bg-zinc-950 shadow-md ">
      <div className="p-5 flex row text-gray-500 justify-between items-center max-w-[1000px] mx-auto">
        <div
          className={`${borel.variable} font-sans italic text-emerald-400 text-4xl font-borel mt-5`}
        >
          tune in
        </div>
        <div>
          <nav className="flex row items-center font-extrabold gap-3 text-zinc-100">
            <a href="/" className="">
              home
            </a>
            <a href="/blog">blog</a>
            <UserAvatar />
            <LogOut />
          </nav>
        </div>
      </div>
    </header>
  );
}
