import Image from "next/image";
import React from "react";
import SearchBar from "./searchbar";
import Profile from "./profile";

function Header() {
  return (
    <div className="px-2 py-3 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-gray-500/10">
      <div className="absolute top-0 left-0 w-full h-2/5 bg-gradient-to-br from-pink-400 to-blue-400 filter blur-2xl opacity-50 -z-50" />
      {/* image */}
      <Image
        src="https://a.trellocdn.com/prgb/dist/images/header-logo-2x.01ef898811a879595cea.png"
        alt="Trello"
        width={100}
        height={50}
        className="cursor-pointer bg-black rounded-md"
      />
      {/* search + avatar */}
      <div className="flex-1 flex justify-end items-center space-x-3 w-full md:w-auto">
        <SearchBar />
        <Profile />
      </div>
    </div>
  );
}

export default Header;
