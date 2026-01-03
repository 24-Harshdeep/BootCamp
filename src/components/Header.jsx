import React from 'react'

const Header = ({ title = 'Movie Showcase' }) => {
  return (
    <header className="site-header" style={{
      background: 'linear-gradient(90deg, rgba(141, 146, 240, 0.12), rgba(173, 177, 252, 0.25))',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '1rem', position: 'fixed', top: 0, width: '100%', zIndex: 1000
    }}>
      <h1>{title}</h1>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <a href="#">Home</a>
        <a href="#">Movies</a>
      </nav>
    </header>
  )
}
export default Header
