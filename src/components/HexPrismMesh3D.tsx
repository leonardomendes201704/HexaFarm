import type { ReactNode } from "react";
import type { ThreeEvent } from "@react-three/fiber";

type HexPrismMesh3DProps = {
  bodyColor: string;
  children?: ReactNode;
  height?: number;
  highlightColor?: string;
  onClick?: (event: ThreeEvent<MouseEvent>) => void;
  onPointerOut?: (event: ThreeEvent<PointerEvent>) => void;
  onPointerOver?: (event: ThreeEvent<PointerEvent>) => void;
  opacity?: number;
  position: [number, number, number];
  radius?: number;
  topColor?: string;
};

const DEFAULT_HEX_RADIUS = 1;
const DEFAULT_HEX_HEIGHT = 0.24;

export function HexPrismMesh3D({
  bodyColor,
  children,
  height = DEFAULT_HEX_HEIGHT,
  highlightColor,
  onClick,
  onPointerOut,
  onPointerOver,
  opacity = 1,
  position,
  radius = DEFAULT_HEX_RADIUS,
  topColor,
}: HexPrismMesh3DProps) {
  const [x, y, z] = position;
  const hexRotation: [number, number, number] = [0, Math.PI / 6, 0];
  const plateauHeight = Math.max(height * 0.32, 0.04);
  const highlightHeight = Math.max(height * 0.12, 0.02);
  const highlightClearance = Math.max(height * 0.08, 0.012);

  return (
    <group
      onClick={onClick}
      onPointerOut={onPointerOut}
      onPointerOver={onPointerOver}
      position={[x, y, z]}
    >
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

      {highlightColor ? (
        <mesh
          position={[0, height + highlightClearance + highlightHeight / 2, 0]}
          rotation={hexRotation}
        >
          <cylinderGeometry args={[radius * 1.06, radius * 1.06, highlightHeight, 6]} />
          <meshStandardMaterial
            color={highlightColor}
            emissive={highlightColor}
            emissiveIntensity={0.3}
            opacity={0.7}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
            roughness={0.3}
            transparent
          />
        </mesh>
      ) : null}

      {children}
    </group>
  );
}
