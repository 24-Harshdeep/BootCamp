import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './reducers/movieReducer'
import selectedMovieReducer from './reducers/selectedMovieReducer'

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    selectedMovie: selectedMovieReducer,
  },
})
