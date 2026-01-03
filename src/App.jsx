import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Header from './components/Header'
import Carousel from './components/Carousel'
import MovieCard from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import { initialize } from './reducers/movieReducer'

const API_KEY = 'e366d974f73ae203397850eadc7bce1f'
const BASE_URL = 'https://api.themoviedb.org/3'

const App = () => {
  const dispatch = useDispatch()
  const movies = useSelector(state => state.movies)
  const selectedMovie = useSelector(state => state.selectedMovie)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
        dispatch(initialize(res.data.results))
      } catch (err) {
        console.error('Failed to load movies', err)
      }
    }
    fetchMovies()
  }, [dispatch])

  if (selectedMovie) return <MovieDetails movieId={selectedMovie.id} />

  return (
    <div style={{ paddingTop: '5rem', maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      <Header />
      <Carousel items={movies.slice(0, 8)} />
      <div className="movie-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}

export default App
