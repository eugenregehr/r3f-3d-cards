import gsap from 'gsap'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setScrollActive } from '../../lib/appSlice'
import { useScrollControl } from './useScrollControl'
import { RootState } from '../../lib/store'

const AnimateCameraPosition = ({ position, cameraRef }) => {
  const dispatch = useDispatch()
  const { cameraPositionZ } = useSelector((state: RootState) => state.app.common)
  const [lastCameraPosition, setLastCameraPosition] = useState([0, 0, 0])
  const { scrollActive } = useSelector((state: RootState) => state.app.common)
  const [scrollY, setScrollY] = useScrollControl()

  const animateCameraPosition = useCallback(
    (newPosition: Array<number>, activateScroll: boolean) => {
      gsap.to(cameraRef.current.position, {
        x: newPosition[0],
        y: newPosition[1],
        z: newPosition[2],
        duration: 1,
        onComplete: () => activateScroll && dispatch(setScrollActive(true)),
      })
    },
    []
  )

  const saveLastCameraPosition = useCallback(() => {
    if (cameraRef.current.position.z >= cameraPositionZ - 0.5) {
      setLastCameraPosition([0, cameraRef.current.position.y, cameraRef.current.position.z])
    }
  }, [])

  useEffect(() => {
    if (position) {
      saveLastCameraPosition()
      dispatch(setScrollActive(false))
      animateCameraPosition(position, false)
    } else if (!scrollActive) {
      setScrollY(lastCameraPosition[1])
      animateCameraPosition(lastCameraPosition, true)
    }
  }, [position])

  return null
}

export default AnimateCameraPosition
