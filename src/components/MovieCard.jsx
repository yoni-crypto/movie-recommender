import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
    <div className="bg-white shadow-md rounded-md overflow-hidden">
        <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-64 object-cover"
        />
        <div className="p-4">
            <h3 className="text-lg font-bold">{movie.Title}</h3>
            <Link
                to={`/movie/${movie.imdbID}`}
                className="text-blue-500 hover:underline"
            >
                View Details
            </Link>
        </div>
    </div>
);

export default MovieCard;
