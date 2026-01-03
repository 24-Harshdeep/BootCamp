import { createSlice } from '@reduxjs/toolkit'

const movieSlice = createSlice({
  name: 'movies',
  initialState: [],
  reducers: {
    initialize: (state, action) => action.payload,
  },
})

export const { initialize } = movieSlice.actions
export default movieSlice.reducer
