"use client";
import { useBoardStore } from "@/store/board-store";
import { Search } from "lucide-react";
import React from "react";

function SearchBar() {
  const [serachString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);
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
        value={serachString}
        onChange={(e) => setSearchString(e.target.value)}
        className="outline-none bg-transparent flex-1"
      />
      <button type="submit" className="hidden" />
    </form>
  );
}

export default SearchBar;
