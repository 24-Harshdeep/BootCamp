import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { clearSelectedMovie } from '../reducers/selectedMovieReducer'

const API_KEY = 'e366d974f73ae203397850eadc7bce1f'
const BASE_URL = 'https://api.themoviedb.org/3'

const MovieDetails = ({ movieId }) => {
  const [details, setDetails] = useState(null)
  const [cast, setCast] = useState([])
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const [detailRes, creditsRes, videosRes] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`),
          axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`),
        ])
        setDetails(detailRes.data)
        setCast(creditsRes.data.cast.slice(0, 6))
        setVideos(videosRes.data.results.filter(v => v.type === 'Trailer'))
      } catch (err) {
        setError('Failed to fetch movie details.')
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [movieId])

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>

  return (
    <div className="modal" style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.9)', color: '#fff', overflowY: 'auto', zIndex: 2000,
      padding: '2rem'
    }}>
      <button onClick={() => dispatch(clearSelectedMovie())}>Close</button>
      <h2>{details.title} ({details.release_date ? details.release_date.slice(0,4) : ''})</h2>
      <p>⭐ {details.vote_average ? details.vote_average.toFixed(1) : ''} | {details.runtime} min</p>
      <p>{details.overview}</p>
      {videos.length > 0 && (
        <iframe
          width="560" height="315"
          src={`https://www.youtube.com/embed/${videos[0].key}`}
          title="Trailer" allowFullScreen
        ></iframe>
      )}
      <h3>Cast</h3>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
        {cast.map(c => (
          <div key={c.id} style={{ width: 140, textAlign: 'center', color: '#fff' }}>
            <img
              src={c.profile_path ? `https://image.tmdb.org/t/p/w185${c.profile_path}` : 'https://via.placeholder.com/185x278?text=No+Image'}
              alt={c.name}
              style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }}
            />
            <div style={{ marginTop: 6 }}>
              <strong>{c.name}</strong>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{c.character}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MovieDetails
