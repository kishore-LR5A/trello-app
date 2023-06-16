"use client";
import { Search } from "lucide-react";
import React from "react";

function SearchBar() {
  return (
    <form
      action=""
      className="flex space-x-3 bg-gray-200 rounded-md px-2 py-1 flex-1 md:flex-initial"
    >
      <Search size={28} className="text-black" />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search ..."
        className="outline-none bg-transparent flex-1"
      />
      <button type="submit" className="hidden" />
    </form>
  );
}

export default SearchBar;
