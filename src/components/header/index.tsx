import Image from "next/image";
import React from "react";
import SearchBar from "./searchbar";
import Profile from "./profile";

function Header() {
  return (
    <div className="px-2 py-3 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 bg-gray-500/10">
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
