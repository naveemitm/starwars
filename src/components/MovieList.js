import React from 'react';

const MovieList = ({ movies, onSelectMovie }) => {
    return (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
            {movies.map((movie) => (
                <li
                    key={movie.episode_id}
                    onClick={() => onSelectMovie(movie)}
                    style={{
                        cursor: 'pointer',
                        padding: '10px',
                        borderBottom: '1px solid #ccc',
                        marginBottom: '5px',
                    }}
                >
                    <strong>Episode {movie.episode_id}</strong> - {movie.title}
                    
                    <small style={{float:'right'}}>{movie.release_date}</small>
                </li>
            ))}
        </ul>
    );
};

export default MovieList;
