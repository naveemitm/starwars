import { render, screen, fireEvent } from '@testing-library/react';
import MovieList from './MovieList';

test('renders movie list and handles selection', () => {
    const movies = [
        { title: 'A New Hope', episode_id: 4, release_date: '1977-05-25' },
        { title: 'The Empire Strikes Back', episode_id: 5, release_date: '1980-05-21' },
    ];
    const onSelect = jest.fn();

    render(<MovieList movies={movies} onSelect={onSelect} />);

    expect(screen.getByText('A New Hope')).toBeInTheDocument();
    fireEvent.click(screen.getByText('The Empire Strikes Back'));
    expect(onSelect).toHaveBeenCalledWith(movies[1]);
});
