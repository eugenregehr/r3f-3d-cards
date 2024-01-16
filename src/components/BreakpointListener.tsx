import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useThree } from '@react-three/fiber'

import { setViewportSize } from '../lib/appSlice'

function BreakpointListener() {
  const dispatch = useDispatch()
  const { size } = useThree()

  useEffect(() => {
    const handleResize = () => {
      const portraitModeIsActive = size.width < size.height

      if (window.innerWidth < 768) {
        dispatch(setViewportSize('mobile'))
      } else if (portraitModeIsActive) {
        dispatch(setViewportSize('tablet'))
      } else {
        dispatch(setViewportSize('desktop'))
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return null
}

export default BreakpointListener
