import { useCursor } from '@react-three/drei'
import gsap from 'gsap'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import CardRotation from './CardRotation'
import CardBackground from './CardBackground'
import { useScrollControl } from '../Camera/useScrollControl'
import CardTitle from './CardTitle'

interface CardProps {
  position: Array<number>
  cardActive: boolean
  onClick: (event: React.MouseEvent) => void
  roundedBoxBackground: JSX.Element
  closeCard: boolean
  data: object
}

export default function Card(props: CardProps) {
  const { position, cardActive, onClick, roundedBoxBackground, closeCard, data } = props

  const cardRef = useRef<THREE.Group>()
  const [hovered, setHovered] = useState(false)

  // Events
  useCursor(hovered, 'pointer')

  const handleCardClick = useCallback(
    (e) => {
      onClick(e)
      e.stopPropagation()
    },
    [onClick]
  )

  const handlePointerOver = useCallback(() => {
    setHovered(true)
  }, [])
  const handlePointerOut = useCallback(() => {
    setHovered(false)
  }, [])

  const [scrollY] = useScrollControl()

  useEffect(() => {
    let timeoutId
    if (scrollY) {
      timeoutId = setTimeout(() => {
        setHovered(false)
      }, 0)
    }
    return () => clearTimeout(timeoutId)
  }, [scrollY])

  // Animation
  useEffect(() => {
    if (cardActive) {
      gsap.to(cardRef.current.rotation, {
        x: Math.PI,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'power2.inOut',
      })
    } else if (!cardActive) {
      gsap.to(cardRef.current.rotation, {
        x: 0,
        duration: 1,
        ease: 'power2.inOut',
      })
    }
  }, [cardActive])

  return (
    <>
      <CardRotation cardActive={cardActive} card={cardRef} hovered={hovered} />
      <group position={position} ref={cardRef}>
        <group
          onClick={handleCardClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          {roundedBoxBackground}
          <CardBackground position={[0, 0, -0.2]} data={data} closeCard={closeCard} />
          <CardTitle data={data} position={[0, 0, 0]} />
        </group>
      </group>
    </>
  )
}
