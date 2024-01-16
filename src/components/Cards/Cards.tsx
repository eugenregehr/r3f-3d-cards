import { useMemo, useRef } from 'react'
import { Plane } from '@react-three/drei'
import { useDispatch, useSelector } from 'react-redux'

import { setCardActive } from '../../lib/appSlice'
import { calculateLayout } from './CardsLayoutCalculations'
import CreateCards from './CardsCreation'
import { RootState } from '../../lib/store'

export default function Cards({ setCameraPosition, setCameraRotation, data }) {
  const planeRef = useRef()
  const { colsNumber } = useSelector((state: RootState) => state.app.common)
  const layout = useMemo(() => calculateLayout(colsNumber), [colsNumber])
  const dispatch = useDispatch()

  const onBackgroundClick = (e) => {
    e.stopPropagation()
    dispatch(setCardActive(false))
    setCameraPosition(null)
    setCameraRotation(null)
  }

  return (
    <group>
      <Plane args={[50, 50]} position={[0, 0, -3]} onClick={onBackgroundClick} ref={planeRef}>
        <meshBasicMaterial visible={false} />
      </Plane>
      <CreateCards
        data={data}
        layout={layout}
        setCameraPosition={setCameraPosition}
        closeCard={onBackgroundClick}
      />
    </group>
  )
}
