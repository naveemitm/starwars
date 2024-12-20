import axios from 'axios';

const BASE_URL = 'https://swapi.py4e.com/api/films/?format=json';

export const fetchMovies = async () => {
    const response = await axios.get(BASE_URL);
    return response.data.results.map((movie) => ({
        title: movie.title,
        episode_id: movie.episode_id,
        release_date: movie.release_date,
        opening_crawl: movie.opening_crawl,
        director: movie.director,
        producer: movie.producer,
    }));
};
