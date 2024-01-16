import { useFrame } from '@react-three/fiber'
import { Vector3 } from 'three'
import { useScrollControl } from './Camera/useScrollControl'
import { useCameraZoom } from './Camera/useCameraZoom'
import { useSelector } from 'react-redux'
import { RootState } from '../lib/store'
import * as THREE from 'three'

interface AnimationFrameProps {
  lightRef: React.RefObject<THREE.SpotLight> // or the appropriate type for your ref
}

export default function AnimationFrame({ lightRef }: AnimationFrameProps) {
  const [scrollY] = useScrollControl()
  const { scrollActive } = useSelector((state: RootState) => state.app.common)
  const { currentBreakpoint } = useSelector((state: RootState) => state.app)
  const { targetZ } = useCameraZoom()

  useFrame(({ camera, pointer, viewport }) => {
    lightRef.current.target.position.lerp(
      new Vector3((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2 + scrollY, 0),
      0.2
    )
    lightRef.current.position.lerp(
      new Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2 + scrollY,
        lightRef.current.position.z
      ),
      0.2
    )

    // Camera Movement
    if (scrollActive && targetZ) {
      // console.log(targetZ);
      const camPosZ =
        currentBreakpoint == 'mobile' || currentBreakpoint == 'tablet' ? camera.position.z : targetZ
      camera.position.lerp(new Vector3(camera.position.x, scrollY, camPosZ), 0.1)
    }
  })
  return null
}
