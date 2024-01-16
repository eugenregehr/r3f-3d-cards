import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'

export const useScrollControl = (): [number, React.Dispatch<React.SetStateAction<number>>] => {
  const scrollSpeed = 0.01
  const { scrollHeight } = useSelector((state: RootState) => state.app.common)

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let startY = 0

    const updateScrollY = (delta: number) => {
      setScrollY((prevY) => {
        const newY = prevY + delta * scrollSpeed
        return Math.min(Math.max(newY, scrollHeight), 0) // Beschränkung des Scrollbereichs
      })
    }

    const onWheel = (e) => {
      updateScrollY(-e.deltaY) // Umgekehrte Richtung für das Mausrad
    }

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY
    }

    const onTouchMove = (e) => {
      const deltaY = e.touches[0].clientY - startY
      startY = e.touches[0].clientY
      updateScrollY(deltaY)
    }

    // Event-Listener für Maus- und Touch-Events hinzufügen
    window.addEventListener('wheel', onWheel)
    window.addEventListener('touchstart', onTouchStart)
    window.addEventListener('touchmove', onTouchMove)

    // Cleanup-Funktion
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
    }
  }, [scrollHeight])

  return [scrollY, setScrollY]
}
