import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { HexPrismMesh3D } from "./HexPrismMesh3D";
import type { HexCoord, HexTile, PrototypeTileType } from "../lib/hexGrid";
import { projectAxialToWorld } from "../lib/hexGrid3d";

const STAGE_3D_CAMERA_POSITION: [number, number, number] = [7.5, 7, 7.5];
const STAGE_3D_CAMERA_LOOK_AT: [number, number, number] = [0, -0.5, 0];
const STAGE_3D_CAMERA_ZOOM = 92;

type Stage3DCanvasProps = {
  frontierSlots: HexCoord[];
  tiles: HexTile[];
};

const TILE_COLOR_BY_TYPE: Record<PrototypeTileType, { body: string; top: string }> = {
  field: { body: "#62a85b", top: "#90df7b" },
  garden: { body: "#d69374", top: "#f4c39d" },
  home: { body: "#d2875f", top: "#f4b890" },
  pond: { body: "#4d8ec2", top: "#79cde8" },
  wild: { body: "#75895b", top: "#9fbd7e" },
};

function TileSurfaceAccent({ tileType }: { tileType: PrototypeTileType }) {
  switch (tileType) {
    case "field":
      return (
        <mesh position={[0, 0.66, 0]}>
          <cylinderGeometry args={[0.46, 0.58, 0.14, 10]} />
          <meshStandardMaterial color="#7ac86a" roughness={0.86} />
        </mesh>
      );
    case "garden":
      return (
        <>
          <mesh position={[0, 0.66, 0]}>
            <cylinderGeometry args={[0.42, 0.54, 0.14, 10]} />
            <meshStandardMaterial color="#f0b48f" roughness={0.82} />
          </mesh>
          <mesh position={[0, 0.78, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#ffd8a8" roughness={0.5} />
          </mesh>
        </>
      );
    case "pond":
      return (
        <mesh position={[0, 0.63, 0]}>
          <cylinderGeometry args={[0.5, 0.62, 0.12, 10]} />
          <meshStandardMaterial color="#8fe2ff" metalness={0.12} roughness={0.22} />
        </mesh>
      );
    case "wild":
      return (
        <>
          <mesh position={[-0.18, 0.7, -0.08]}>
            <cylinderGeometry args={[0.12, 0.18, 0.32, 6]} />
            <meshStandardMaterial color="#93b46e" roughness={0.72} />
          </mesh>
          <mesh position={[0.16, 0.67, 0.1]}>
            <cylinderGeometry args={[0.1, 0.16, 0.26, 6]} />
            <meshStandardMaterial color="#89a865" roughness={0.74} />
          </mesh>
        </>
      );
    case "home":
      return (
        <mesh position={[0, 0.78, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.26, 8]} />
          <meshStandardMaterial color="#f6d9b9" roughness={0.52} />
        </mesh>
      );
    default:
      return null;
  }
}

function CropProp3D({ cropName }: { cropName: string | null }) {
  if (!cropName) {
    return null;
  }

  switch (cropName) {
    case "Milho":
      return (
        <>
          <mesh position={[-0.1, 0.9, 0]}>
            <cylinderGeometry args={[0.05, 0.07, 0.34, 6]} />
            <meshStandardMaterial color="#6cb25d" roughness={0.76} />
          </mesh>
          <mesh position={[-0.1, 1.08, 0]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#ffd468" roughness={0.42} />
          </mesh>
          <mesh position={[0.14, 0.84, -0.06]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.04, 0.06, 0.24, 6]} />
            <meshStandardMaterial color="#72bc61" roughness={0.78} />
          </mesh>
        </>
      );
    case "Abobora":
      return (
        <>
          <mesh position={[0, 0.92, 0]}>
            <sphereGeometry args={[0.18, 14, 14]} />
            <meshStandardMaterial color="#f49a3b" roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.08, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.12, 6]} />
            <meshStandardMaterial color="#6b9b4f" roughness={0.72} />
          </mesh>
        </>
      );
    case "Tomate":
      return (
        <>
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.28, 6]} />
            <meshStandardMaterial color="#62a35c" roughness={0.76} />
          </mesh>
          <mesh position={[-0.1, 0.84, 0.08]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#e95a4f" roughness={0.44} />
          </mesh>
          <mesh position={[0.12, 0.86, -0.02]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color="#ef6a5d" roughness={0.42} />
          </mesh>
        </>
      );
    default:
      return (
        <mesh position={[0, 0.92, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#fff2c2" roughness={0.4} />
        </mesh>
      );
  }
}

function Stage3DBackdrop({ frontierSlots, tiles }: Stage3DCanvasProps) {
  const worldCoords = [...tiles, ...frontierSlots];
  const planeSize = Math.max(22, worldCoords.length * 1.8);

  return (
    <>
      <ambientLight intensity={1.35} />
      <directionalLight color="#fff3cf" intensity={1.8} position={[6, 8, 5]} />
      <directionalLight color="#ffd8ef" intensity={0.7} position={[-5, 4, -4]} />

      <mesh position={[0, -1.45, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[planeSize, planeSize]} />
        <meshStandardMaterial color="#f5dfb8" opacity={0.2} transparent />
      </mesh>

      {frontierSlots.map((slot) => {
        const [x, y, z] = projectAxialToWorld(slot, -0.08);

        return (
          <HexPrismMesh3D
            bodyColor="#e9d6b0"
            height={0.22}
            key={`slot-3d-${slot.q}-${slot.r}`}
            opacity={0.34}
            position={[x, y, z]}
            radius={0.92}
            topColor="#fff4db"
          />
        );
      })}

      {tiles.map((tile) => {
        const [x, y, z] = projectAxialToWorld(tile, 0);
        const tileColors = TILE_COLOR_BY_TYPE[tile.tileType];

        return (
          <HexPrismMesh3D
            bodyColor={tileColors.body}
            height={tile.tileType === "home" ? 0.82 : 0.72}
            key={`tile-3d-${tile.id}`}
            position={[x, y, z]}
            radius={1}
            topColor={tileColors.top}
          >
            <TileSurfaceAccent tileType={tile.tileType} />
            <CropProp3D cropName={tile.plantedCropName} />
          </HexPrismMesh3D>
        );
      })}
    </>
  );
}

export function Stage3DCanvas({ frontierSlots, tiles }: Stage3DCanvasProps) {
  return (
    <div aria-hidden="true" className="stage-3d-canvas">
      <Canvas
        dpr={[1, 1.5]}
        frameloop="demand"
        gl={{ alpha: true, antialias: true }}
      >
        <OrthographicCamera
          far={100}
          makeDefault
          near={0.1}
          onUpdate={(camera) => {
            camera.lookAt(...STAGE_3D_CAMERA_LOOK_AT);
            camera.updateProjectionMatrix();
          }}
          position={STAGE_3D_CAMERA_POSITION}
          zoom={STAGE_3D_CAMERA_ZOOM}
        />
        <Stage3DBackdrop frontierSlots={frontierSlots} tiles={tiles} />
      </Canvas>
    </div>
  );
}
