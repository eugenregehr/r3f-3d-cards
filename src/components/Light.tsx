import { SpotLight } from '@react-three/drei'
import { forwardRef } from 'react'
import * as THREE from 'three'

const Light = forwardRef<THREE.SpotLight>((props, ref) => {
  return (
    <SpotLight
      ref={ref}
      position={[0, 0, 10]}
      //@ts-ignore
      distance={20}
      intensity={50}
      anglePower={5}
      angle={0.15}
      penumbra={1}
      // debug
    />
  )
})

export default Light
