import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => (
    <Link to={`/movie/${movie.imdbID}`} className="bg-white shadow-md rounded-sm overflow-hidden"> {/* Changed to rounded-sm */}
        <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-36 lg:h-48 object-cover" // Keeps image height consistent
        />
        {/* Title displayed on larger screens */}
        <div className="p-2 hidden md:block"> {/* Reduced padding */}
            <h3 className="text-lg font-bold ">{movie.Title}</h3> {/* Title visible on medium and larger screens */}
        </div>
    </Link>
);

export default MovieCard;
