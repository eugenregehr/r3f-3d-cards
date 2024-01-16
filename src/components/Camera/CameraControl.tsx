import { useRef } from 'react'
import { PerspectiveCamera } from '@react-three/drei'
import { useSelector } from 'react-redux'

import AnimateCameraPosition from './AnimateCameraPosition'
import AnimateCameraRotation from './AnimateCameraRotation'
import { RootState } from '../../lib/store'

export function CameraControl({ position, rotation }) {
  const cameraRef = useRef()
  const { cameraPositionZ } = useSelector((state: RootState) => state.app.common)

  return (
    <>
      <AnimateCameraPosition position={position} cameraRef={cameraRef} />
      <AnimateCameraRotation rotation={rotation} cameraRef={cameraRef} />
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, cameraPositionZ]} />
    </>
  )
}
