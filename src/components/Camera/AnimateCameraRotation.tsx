import gsap from 'gsap'
import { useCallback, useEffect } from 'react'

import { setScrollActive } from '../../lib/appSlice'
import { useDispatch } from 'react-redux'

const AnimateCameraRotation = ({ rotation, cameraRef }) => {
  const dispatch = useDispatch()

  const animateCameraRotation = useCallback((newRotation: Array<number>) => {
    gsap.to(cameraRef.current.rotation, {
      x: newRotation[0],
      y: newRotation[1],
      z: newRotation[2],
      duration: 1,
    })
  }, [])

  useEffect(() => {
    if (rotation) {
      dispatch(setScrollActive(false))
      animateCameraRotation(rotation)
    } else {
      animateCameraRotation([0, 0, 0])
    }
  }, [rotation])

  return null
}

export default AnimateCameraRotation
