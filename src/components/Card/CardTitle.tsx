import { Text } from '@react-three/drei'

const CardTitle = ({ data, position }) => {
  const fontTitleStyle = { color: data.text_color, fontSize: 0.15, letterSpacing: -0.02 }
  return (
    <group position={position}>
      <Text position={[0, 0, 0]} {...fontTitleStyle} anchorX="center" anchorY="middle">
        {data.title}
      </Text>
    </group>
  )
}

export default CardTitle
