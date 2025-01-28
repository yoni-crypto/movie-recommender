import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex justify-center my-6">
            <input
                type="text"
                placeholder="Search for movies or TV shows..."
                className="border rounded-l-md px-4 py-2 w-1/2 focus:outline-none focus:ring focus:ring-blue-300"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600"
            >
                Search
            </button>
        </form>
    );
};

export default SearchBar;
