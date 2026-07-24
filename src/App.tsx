import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate zoom scale based on scroll position (e.g., zooms up to 50x)
  const scale = 1 + scrollY * 0.05;

  // Calculate background color transition (from 0 to 255)
  // Let's say it fully turns white after 500px of scrolling
  const colorVal = Math.min(255, (scrollY / 500) * 255);
  const backgroundColor = `rgb(${colorVal}, ${colorVal}, ${colorVal})`;

  return (
    <div className="scroll-container">
      <div className="sticky-container" style={{ backgroundColor }}>
        <h1
          className="background-text"
          style={{ transform: `scale(${scale})` }}
        >
          MIZAN
        </h1>
        <img
          src="/images/mizan_rbg.png"
          className="full-screen-image"
          alt="mizan"
        />
      </div>
    </div>
  )
}

export default App
