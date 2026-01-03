import { createSlice } from '@reduxjs/toolkit'

const selectedMovieSlice = createSlice({
  name: 'selectedMovie',
  initialState: null,
  reducers: {
    setSelectedMovie: (state, action) => action.payload,
    clearSelectedMovie: () => null,
  },
})

export const { setSelectedMovie, clearSelectedMovie } = selectedMovieSlice.actions
export default selectedMovieSlice.reducer
