import React from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedMovie } from '../reducers/selectedMovieReducer'

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch()

  const handleClick = () => dispatch(setSelectedMovie(movie))

  return (
    <article
      onClick={handleClick}
      className="movie-card"
      style={{
        cursor: 'pointer',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(30, 28, 28, 0.15)',
        transition: 'transform 0.3s',
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={movie.title}
        style={{ width: '100%', height: '300px', objectFit: 'cover' }}
      />
      <div style={{ padding: '0.75rem' }}>
        <h3>{movie.title}</h3>
        <p>{movie.overview ? `${movie.overview.slice(0, 120)}...` : ''}</p>
      </div>
    </article>
  )
}
export default MovieCard
