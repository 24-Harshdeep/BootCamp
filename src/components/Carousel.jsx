import React, { useState } from 'react'

const Carousel = ({ items = [] }) => {
  const [index, setIndex] = useState(0)

  if (!items || items.length === 0) return null

  const prev = () => setIndex((index - 1 + items.length) % items.length)
  const next = () => setIndex((index + 1) % items.length)

  return (
    <div style={{
      position: 'relative',
      height: '320px',
      overflow: 'hidden',
      marginTop: '5rem'
    }}>
      {items.map((item, i) => (
        <img
          key={item.id}
          src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`}
          alt={item.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            transition: 'opacity 0.4s ease',
            opacity: i === index ? 1 : 0
          }}
        />
      ))}
      <button onClick={prev} style={{ position: 'absolute', left: '1rem', top: '50%' ,backgroundColor:'black', border:'none',color:'white'}}>prev</button>
      <button onClick={next} style={{ position: 'absolute', right: '1rem', top: '50%' ,backgroundColor:'black', border:'none',color:'white'}}>next</button>
    </div>
  )
}
export default Carousel
