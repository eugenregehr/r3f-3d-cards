import { Plane } from '@react-three/drei'
import { useMemo } from 'react'
import { DoubleSide } from 'three'
import { useDispatch, useSelector } from 'react-redux'

import { setCardActive } from '../../lib/appSlice'
import Card from '../Card/Card'
import { RootState } from '../../lib/store'

function RoundedBoxBackground(layout) {
  return (
    <Plane args={[layout.cardWidth, layout.cardHeight]} position={[0, 0, -0.1]}>
      <meshPhongMaterial color={'#2c2f36'} specular={'#27292e'} side={DoubleSide} />
    </Plane>
  )
}

export default function CreateCards({ layout, setCameraPosition, data, closeCard }) {
  const { cardActive, cardZoom, colsNumber, cardsYOffset } = useSelector(
    (state: RootState) => state.app.common
  )
  const dispatch = useDispatch()

  const handleCardClick = (index, x, y) => {
    setCameraPosition([x, y, cardZoom])
    dispatch(setCardActive(index))
  }

  const cardPositions = useMemo(() => {
    return data.map((_, index) => {
      const col = index % colsNumber
      const row = Math.floor(index / colsNumber)
      const x = col * (layout.cardWidth + layout.gapX) - layout.xOffset
      const y = -(row * (layout.cardHeight + layout.gapY)) + cardsYOffset
      return { x, y }
    })
  }, [colsNumber, layout, cardsYOffset])

  return data.map((data, index) => {
    const position = cardPositions[index]

    return (
      <Card
        key={index}
        roundedBoxBackground={RoundedBoxBackground(layout)}
        position={[position.x, position.y, 0]}
        cardActive={cardActive === index}
        closeCard={closeCard}
        data={data}
        onClick={() => handleCardClick(index, position.x, position.y)}
      />
    )
  })
}
