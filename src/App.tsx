import { Canvas, AmbientLightProbeProps } from '@react-three/fiber'
import { useRef, useState } from 'react'

import Cards from './components/Cards/Cards'
import { CameraControl } from './components/Camera/CameraControl'
import Light from './components/Light'
import Loader from './components/Loader/Loader'
import data from './components/data'
import BreakpointListener from './components/BreakpointListener'
import AnimationFrame from './components/AnimationFrame'
import { useSelector } from 'react-redux'
import { RootState } from './lib/store'
import * as THREE from 'three'

export default function App() {
  const lightRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [cameraPostion, setCameraPosition] = useState(null)
  const [cameraRotation, setCameraRotation] = useState(null)
  const { currentBreakpointLoaded } = useSelector((state: RootState) => state.app)

  return (
    <div className="h-screen w-screen bg-black">
      {loading && <Loader />}
      <Canvas className="z-0" onCreated={() => setLoading(false)}>
        <BreakpointListener />

        {currentBreakpointLoaded && (
          <>
            <AnimationFrame lightRef={lightRef} />
            <Light ref={lightRef} />
            <color attach="background" args={['#000']} />

            <ambientLight
              //@ts-ignore
              intensity={2.5}
            />
            <Cards
              setCameraPosition={setCameraPosition}
              setCameraRotation={setCameraRotation}
              data={data}
            />
            {/* <OrbitControls /> */}
            <CameraControl position={cameraPostion} rotation={cameraRotation} />
          </>
        )}
      </Canvas>
    </div>
  )
}
