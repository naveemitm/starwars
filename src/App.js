import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import FilterSortBar from './components/FilterSortBar';

const App = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        // Fetch movies from SWAPI
        axios.get('https://swapi.py4e.com/api/films/?format=json')
            .then((response) => {
                const sortedMovies = response.data.results.sort((a, b) => a.episode_id - b.episode_id);
                setMovies(sortedMovies);
                setFilteredMovies(sortedMovies);
            })
            .catch((error) => console.error('Error fetching movies:', error));
    }, []);

    const handleSearch = (query) => {
        const filtered = movies.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMovies(filtered);
    };

    const handleSort = (sortBy) => {
      const sorted = [...filteredMovies].sort((a, b) => {
          if (sortBy === 'year') {
              return new Date(a.release_date) - new Date(b.release_date);
          } else if (sortBy === 'ratings') {
              const aRating = a.ratings
                  ? a.ratings.map((r) => parseFloat(r.Value.replace('%', '').replace('/10', ''))).reduce((x, y) => x + y, 0) /
                    a.ratings.length
                  : 0;
              const bRating = b.ratings
                  ? b.ratings.map((r) => parseFloat(r.Value.replace('%', '').replace('/10', ''))).reduce((x, y) => x + y, 0) /
                    b.ratings.length
                  : 0;
              return bRating - aRating; // Sort descending
          }
          return a.episode_id - b.episode_id;
      });
      setFilteredMovies(sorted);
  };
  

  const fetchMovieDetails = async (movie) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/`, {
            params: {
                apikey: 'b9a5e69d',
                t: movie.title,
            },
        });

        console.log('OMDB Response:', response.data);

        if (response.data && response.data.Response === 'True') {
            return {
                poster: response.data.Poster,
                ratings: response.data.Ratings || [], // Ensure ratings are an array
            };
        }
    } catch (error) {
        console.error('Error fetching movie details from OMDB:', error);
    }
    return { poster: null, ratings: [] };
};

  
  // Fetch additional details when selecting a movie
  const handleSelectMovie = async (movie) => {
      const details = await fetchMovieDetails(movie);
      setSelectedMovie({ ...movie, ...details });
  };

  
    return (
      <div>
      <FilterSortBar onSearch={handleSearch} onSort={handleSort} />
        <div style={{ display: 'flex', padding: '20px' }}>
          
            <div style={{ flex: "1 1 30%",borderTop: "1px solid", borderRight: "1px solid",paddingRight: "16px"}}>
                
                <MovieList movies={filteredMovies} onSelectMovie={handleSelectMovie} />
            </div>
            <div style={{ flex: 2,borderTop: "1px solid", borderRight: "1px solid"}}>
                <MovieDetails movie={selectedMovie} />
            </div>
        </div>
        </div>
    );
};

export default App;
