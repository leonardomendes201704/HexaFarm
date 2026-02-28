type HexPrismMesh3DProps = {
  bodyColor: string;
  height?: number;
  opacity?: number;
  position: [number, number, number];
  radius?: number;
  topColor?: string;
};

const DEFAULT_HEX_RADIUS = 1;
const DEFAULT_HEX_HEIGHT = 0.72;

export function HexPrismMesh3D({
  bodyColor,
  height = DEFAULT_HEX_HEIGHT,
  opacity = 1,
  position,
  radius = DEFAULT_HEX_RADIUS,
  topColor,
}: HexPrismMesh3DProps) {
  const [x, y, z] = position;
  const hexRotation: [number, number, number] = [0, Math.PI / 6, 0];
  const plateauHeight = Math.max(height * 0.32, 0.14);

  return (
    <group position={[x, y, z]}>
      <mesh position={[0, height / 2, 0]} rotation={hexRotation}>
        <cylinderGeometry args={[radius, radius, height, 6]} />
        <meshStandardMaterial
          color={bodyColor}
          metalness={0.04}
          opacity={opacity}
          roughness={0.62}
          transparent={opacity < 1}
        />
      </mesh>

      <mesh position={[0, height - plateauHeight / 2, 0]} rotation={hexRotation}>
        <cylinderGeometry args={[radius * 0.9, radius * 0.9, plateauHeight, 6]} />
        <meshStandardMaterial
          color={topColor ?? bodyColor}
          metalness={0.02}
          opacity={opacity}
          roughness={0.54}
          transparent={opacity < 1}
        />
      </mesh>
    </group>
  );
}
