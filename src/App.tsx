import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import './App.css'

function Model({ scrollY }: { scrollY: number }) {
  const { scene } = useGLTF('/3d/mizan3d-optimized.glb')
  const modelRef = useRef<THREE.Object3D>(null)
  const { viewport } = useThree()

  useFrame(() => {
    if (modelRef.current) {
      // Rotate along the horizontal axis (X axis) based on scroll, inverted
      modelRef.current.rotation.x = -scrollY * 0.01;
    }
  })

  // Responsive adjustments based on viewport 3D units width
  const scale = Math.min(3.5, viewport.width * 0.7); // Scale down on smaller screens
  const posX = viewport.width < 5 ? -0.06 : -0.6;      // Center on mobile

  return (
    <primitive ref={modelRef} object={scene} position={[posX, 0, 0]} scale={scale} />
  )
}

useGLTF.preload('/3d/mizan3d-optimized.glb')

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
          mizan
        </h1>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10 }}>
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={1.5} />
            <Environment preset="city" />
            <Model scrollY={scrollY} />
          </Canvas>
        </div>
      </div>
    </div>
  )
}

export default App
