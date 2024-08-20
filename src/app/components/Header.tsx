import React from "react";
import UserAvatar from "./userAvatar";
import LogOut from "./LogOut";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="p-5 flex row text-gray-500 justify-between items-center max-w-[1000px] mx-auto">
        <div>Logo</div>
        <div>
          <nav className="flex row items-center gap-3">
            <a href="/" className="">
              Home
            </a>
            <a href="/blog">Blog</a>
            <UserAvatar />
            <LogOut />
          </nav>
        </div>
      </div>
    </header>
  );
}
