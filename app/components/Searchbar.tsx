import React from 'react';
import SearchIcon from '../assets/magnifying-glass.svg';

type SearchbarProps = {
  filters: { search: string; [key: string]: any }
  setFilters: React.Dispatch<React.SetStateAction<any>>
}

function Searchbar (
  { filters, setFilters }: SearchbarProps)  {
  //const [searchTerm, setSearchTerm] = useState('')
  // "lift state up"
  function handleInputChange(input: string) {
    setFilters((prev:any) => ({
      ...prev,
      search: input,
    }))
  }

  return (
    <>
      <div className="inline-flex items-center">
        <div className="relative w-72">
          <input
            className="w-full h-10 pt-3 pb-3 pl-4 pr-4 rounded-full
            font-black font-nunito
            bg-[#FFFDEE]
            text-[#2D2D2D]
            font-open-sans
            font-normal
            focus:outline-[#FCBF3A]"
            type='text'
            placeholder='Search Places'
            id='location-search-bar'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange(e.target.value);
            }}
            value={filters.search}
          />
          <img
            src={SearchIcon}
            alt='search icon'
            id='search-icon'
            className='absolute right-3 top-1/2 -translate-y-1/2 h-6 w-auto pointer-events-none'
          />
        </div>
      </div>
    </>
  )
}

export default Searchbar
