import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MoviesList from '../components/MovieList';

const Home = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="container mx-auto px-4">
      <SearchBar onSearch={(q) => setQuery(q)} />
      <MoviesList query={query} />
    </div>
  );
};

export default Home;
