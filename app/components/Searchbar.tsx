import React from 'react';

type SearchbarProps = {
  filters: { search: string; [key: string]: any };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
};

function Searchbar({ filters, setFilters }: SearchbarProps) {
  const safeFilters = filters || { search: "" };
  return (
    <div className="inline-flex items-center">
      <div className="relative w-72">
        <input
          className="w-full h-10 pt-3 pb-3 pl-4 pr-4 rounded-full font-black font-nunito bg-[#F8F9FF] text-[#2D2D2D] font-open-sans font-normal outline outline-[#B5D4F4] outline-4"
          type="text"
          placeholder="Search Places"
          id="location-search-bar"
          value={safeFilters.search}
          onChange={e => setFilters({ ...safeFilters, search: e.target.value })}
        />
        <img
          src="/magnifying-glass.png"
          alt="search icon"
          id="search-icon"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-auto pointer-events-none"
        />
      </div>
    </div>
  );
}

export default Searchbar;
