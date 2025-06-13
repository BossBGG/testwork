import React from 'react';
import searchIcon from "../../assets/search.png";

interface SearchBarProps {
    className?: string;
    onSearch?: (query: string) => void;
    placeholder?: string;
}

function SearchBar({ className = '', onSearch, placeholder = "ค้นหา" }: SearchBarProps) {
    const [query, setQuery] = React.useState('');

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

    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        
        
        if (onSearch) {
            onSearch(newQuery);
        }
    };

    return (
        <div className={`search-bar relative ${className}`}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img 
                        src={searchIcon} 
                        alt="search" 
                        className="w-4 h-4 text-gray-400" 
                    />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    className="pl-10 pr-4 py-2 w-full border border-[#E9E6E6] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {/* Clear button เมื่อมีข้อความ */}
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            if (onSearch) onSearch('');
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchBar;