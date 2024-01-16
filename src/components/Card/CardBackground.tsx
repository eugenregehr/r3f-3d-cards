import { useTexture } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { BackSide, TextureLoader } from 'three'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'

export default function CardBackground({ position, closeCard, data }) {
  const iconTexture = useTexture('icons/close-icon.png')
  const [iconPosition, setIconPosition] = useState([0, -0.95, -0.1])
  const [iconSize, setIconSize] = useState([0.15, 0.15])
  const { currentBreakpoint } = useSelector((state: RootState) => state.app)
  const imageTexture = useLoader(TextureLoader, data.image_url)
  imageTexture.flipY = false

  useEffect(() => {
    if (currentBreakpoint === 'mobile') {
      setIconPosition([0, -1.2, -0.1])
      setIconSize([0.3, 0.3])
    }
  }, [currentBreakpoint])

  return (
    <group position={position}>
      <mesh position={iconPosition} onClick={closeCard}>
        <planeGeometry args={iconSize} />
        <meshBasicMaterial map={iconTexture} side={BackSide} transparent opacity={0.3} />
      </mesh>
      <mesh scale={0.9}>
        <planeGeometry args={[3.1, 1.75]} />
        <meshBasicMaterial map={imageTexture} side={BackSide} />
      </mesh>
    </group>
  )
}
