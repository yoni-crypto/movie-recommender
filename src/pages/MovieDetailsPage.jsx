import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            const apiKey = process.env.REACT_APP_OMDB_API_KEY;
            const response = await axios.get(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`);
            setMovie(response.data);
        };

        fetchMovieDetails();
    }, [id]);

    return (
        movie && (
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full md:w-1/3 rounded-md"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-4">{movie.Title}</h1>
                        <p className="text-gray-700">{movie.Plot}</p>
                        <div className="mt-4">
                            <p>
                                <span className="font-bold">Released:</span> {movie.Released}
                            </p>
                            <p>
                                <span className="font-bold">Genre:</span> {movie.Genre}
                            </p>
                            <p>
                                <span className="font-bold">Director:</span> {movie.Director}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default MovieDetailsPage;
