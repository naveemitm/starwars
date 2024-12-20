import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        selectedMovie: null,
    },
    reducers: {
        setMovies: (state, action) => {
            state.list = action.payload;
        },
        selectMovie: (state, action) => {
            state.selectedMovie = action.payload;
        },
    },
});

export const { setMovies, selectMovie } = movieSlice.actions;
export default movieSlice.reducer;
