import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/store'

export const useCameraZoom = () => {
  const { cameraPositionZ } = useSelector((state: RootState) => state.app.common)
  const [targetZ, setTargetZ] = useState(cameraPositionZ)

  useEffect(() => {
    if (targetZ) {
      const onScroll = (e) => {
        const zoomIntensity = 4
        const deltaZ = Math.abs(e.deltaY) * 0.01 * zoomIntensity
        const updateTargetZ = cameraPositionZ + deltaZ
        setTargetZ(
          Math.min(Math.max(updateTargetZ, -(cameraPositionZ + 0.7)), cameraPositionZ + 0.7)
        )
      }

      window.addEventListener('wheel', onScroll)
      return () => {
        window.removeEventListener('wheel', onScroll)
      }
    }
  }, [targetZ])

  return { targetZ }
}
