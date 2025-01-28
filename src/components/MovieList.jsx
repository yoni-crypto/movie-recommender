import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const MoviesList = ({ query }) => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [type, setType] = useState('movie'); 

    const apiKey = process.env.REACT_APP_OMDB_API_KEY;

    useEffect(() => {
        fetchMovies();
    }, [query, type, page]);

    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                `https://www.omdbapi.com/?s=${query || 'batman'}&type=${type}&page=${page}&apikey=${apiKey}`
            );
            if (response.data.Response === 'True') {
                setMovies(response.data.Search);
                setTotalResults(parseInt(response.data.totalResults, 20));
            } else {
                setMovies([]);
                setTotalResults(0);
            }
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleTypeChange = (newType) => {
        setType(newType);
        setPage(1); // Reset to first page when category changes
    };

    const totalPages = Math.ceil(totalResults / 10);

    return (
        <div className="container mx-auto px-4 py-6">
            {/* Category Filter */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Movies & TV Shows</h2>
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleTypeChange('movie')}
                        className={`px-4 py-2 rounded ${type === 'movie' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        Movies
                    </button>
                    <button
                        onClick={() => handleTypeChange('series')}
                        className={`px-4 py-2 rounded ${type === 'series' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                            }`}
                    >
                        TV Series
                    </button>
                </div>
            </div>

            {/* Movie Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {movies.length > 0 ? (
                    movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
                ) : (
                    <p className="col-span-4 text-center text-gray-500">
                        No results found. Try a different search.
                    </p>
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'
                        }`}
                >
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages || 1}
                </span>
                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MoviesList;
