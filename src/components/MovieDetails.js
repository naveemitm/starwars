const MovieDetails = ({ movie }) => {
    if (!movie) {
        return <p>Select a movie to see its details</p>;
    }

    // Calculate average rating
    const ratings = movie.ratings || [];
    const averageRating =
        ratings.length > 0
            ? ratings
                  .map((r) => parseFloat(r.Value.replace('%', '').replace('/10', '')))
                  .reduce((a, b) => a + b, 0) / ratings.length
            : null;

    return (
        <div style={{paddingLeft:'20px'}}>
            <h2>
                Episode {movie.episode_id} - {movie.title}
            </h2>
            <p>{movie.opening_crawl}</p>
            <p>
                <strong>Directed by:</strong> {movie.director}
            </p>
            {movie.poster && <img src={movie.poster} alt={`${movie.title} Poster`} style={{ width: '200px' }} />}
            <div>
                <strong>Average Rating:</strong> {averageRating ? averageRating.toFixed(1) : 'N/A'}
            </div>
            <ul>
                {ratings.map((rating, index) => (
                    <li key={index}>
                        {rating.Source}: {rating.Value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MovieDetails;
