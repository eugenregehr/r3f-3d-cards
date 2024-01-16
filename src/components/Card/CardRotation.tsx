import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Matrix4, Quaternion, Vector3 } from 'three'
import { useSelector } from 'react-redux'

import { useScrollControl } from '../Camera/useScrollControl'
import { RootState } from '../../lib/store'

export default function CardRotation({ card, cardActive, hovered }) {
  const { cardRotationActive } = useSelector((state: RootState) => state.app.common)
  const [scrollY] = useScrollControl()
  const damping = useRef(0.1)
  const initialQuaternion = useMemo(() => new Quaternion(), [])
  const upVector = useMemo(() => new Vector3(0, 1, 0), [])

  useFrame(({ pointer, viewport }) => {
    if (cardRotationActive) {
      const currentPos = card.current.position

      if (hovered && !cardActive) {
        // Zielposition berechnen
        const targetX = (pointer.x * viewport.width) / 2
        const targetY = (pointer.y * viewport.height) / 2 + scrollY
        const targetPosition = new Vector3(
          currentPos.x + (targetX - currentPos.x) * damping.current,
          currentPos.y + (targetY - currentPos.y) * damping.current,
          1.5
        )

        // Zielquaternion berechnen
        const targetQuaternion = new Quaternion().setFromRotationMatrix(
          new Matrix4().lookAt(targetPosition, currentPos, upVector)
        )

        if (!card.current.quaternion.equals(targetQuaternion)) {
          card.current.quaternion.slerp(targetQuaternion, 0.1)
        }
      } else if (!hovered && !cardActive) {
        if (!card.current.quaternion.equals(initialQuaternion)) {
          card.current.quaternion.slerp(initialQuaternion, 0.1)
        }
      }
    }
  })

  return null
}
