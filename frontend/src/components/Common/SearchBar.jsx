import React, { useState } from "react";
import { useContext } from "react";
import { HiMagnifyingGlass,HiMiniXMark  } from "react-icons/hi2";
import { shopDataContext } from "../../context/ShopContext";
import { useSearchParams } from 'react-router-dom';

const SearchBar = ({textColor}) => {
  const [searchterm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const {getFilteredProducts} = useContext(shopDataContext);
  const [searchParams, setSearchParams] = useSearchParams();


  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
     e.preventDefault();
      if (searchterm.trim() === "") return;

    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("search", searchterm);
    setSearchParams(newParams);

    // Fetch products
    getFilteredProducts({ search: searchterm });

    setIsOpen(false);
  };

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-200 ${
      isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
      {isOpen ? (
        <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              value={searchterm}
              onChange={(e) => setSearchTerm (e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
          {/* Search icon */}
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-800">
             <HiMagnifyingGlass className="h-6 w-6"/>  
          </button>
          </div>
          {/* close icon */}
          <button type="button" onClick={handleSearchToggle} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800">
              <HiMiniXMark className="h-6 w-6"/>
          </button>
        </form>
      ) : (
        <button onClick={handleSearchToggle} className={`text-black hover:text-yellow-500 ${textColor}`}>
          <HiMagnifyingGlass className="h-6 w-6"/>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
