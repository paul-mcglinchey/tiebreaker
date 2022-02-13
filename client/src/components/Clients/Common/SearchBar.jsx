import { SearchIcon } from "@heroicons/react/solid";

const SearchBar = ({ filters, setFilters }) => {

  const handleChange = (value) => {
    setFilters({
      ...filters, clientName: { ...filters.clientName, value: value }
    });
  }

  return (
    <div className="py-1 flex justify-between items-center text-gray-400 space-x-4 bg-gray-800 px-4 sm:rounded-md shadowj">
      <div className="flex flex-grow space-x-4 items-center">
        <input onChange={(e) => handleChange(e.target.value)} className="flex flex-1 px-2 my-2 bg-transparent outline-none focus:outline-none text-gray-400" />
        <SearchIcon className="w-6 h-6" />
      </div>
    </div>
  )
}

export default SearchBar;