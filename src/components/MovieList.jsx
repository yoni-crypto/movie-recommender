import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MoviesList = ({ query }) => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [type, setType] = useState('movie');

    const apiKey = process.env.REACT_APP_OMDB_API_KEY;

    const fetchMovies = useCallback(async () => {
        const allMovies = [];
        const numberOfPagesToFetch = 3; // Number of pages to fetch to get more movies

        try {
            // Loop to fetch multiple pages
            for (let i = 1; i <= numberOfPagesToFetch; i++) {
                const response = await axios.get(
                    `https://www.omdbapi.com/?s=${query || 'action'}&type=${type}&page=${i}&apikey=${apiKey}`
                );

                if (response.data.Response === 'True') {
                    allMovies.push(...response.data.Search);
                    setTotalResults(parseInt(response.data.totalResults, 10)); // Only update total results once
                }
            }
            setMovies(allMovies); // Set combined movie results
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }, [query, type, apiKey]);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    const handleTypeChange = (newType) => {
        setType(newType);
        setPage(1);
    };

    const totalPages = Math.ceil(totalResults / 30); // Adjust total pages accordingly

    return (
        <div className="container mx-auto px-2 lg:px-4 py-2">
            {/* Category Filter */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs lg:text-lg font-bold">Movies & TV Shows</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleTypeChange('movie')}
                        className={`px-3 py-1 rounded ${type === 'movie' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-sm'}`}
                    >
                        Movies
                    </button>
                    <button
                        onClick={() => handleTypeChange('series')}
                        className={`px-3 py-1 rounded ${type === 'series' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-sm'}`}
                    >
                        TV Series
                    </button>
                </div>
            </div>

            {/* Movie Cards */}
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4"> {/* 3 on small screens, 6 on larger screens */}
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No results found. Try a different search.
                    </p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 space-x-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages || 1}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MoviesList;
