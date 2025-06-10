import React from 'react'

interface SearchBarProps {
    className?: string;
    onSearch?: (query: string) => void;
}

function SearchBar({ className = '', onSearch }: SearchBarProps) {
    const [query, setQuery] = React.useState('');

     // ฟังก์ชันสำหรับการกด Enter
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <div className={`search-bar ${className} `}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ค้นหา"
                onKeyDown={handleKeyDown}
                className=' border border-[#E9E6E6] rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            
        </div>
    );
}


export default SearchBar
