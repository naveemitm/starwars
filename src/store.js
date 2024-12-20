// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './redux/movieSlice';

const store = configureStore({
    reducer: {
        movies: movieReducer, 
    },
});

export default store;
