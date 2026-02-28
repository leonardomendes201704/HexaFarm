import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import type { OrthographicCamera as ThreeOrthographicCamera } from "three";
import { HexPrismMesh3D } from "./HexPrismMesh3D";
import type { HexCoord, HexTile, PrototypeTileType } from "../lib/hexGrid";
import { projectAxialToWorld } from "../lib/hexGrid3d";

const STAGE_3D_CAMERA_POSITION: [number, number, number] = [7.5, 7, 7.5];
const STAGE_3D_CAMERA_LOOK_AT: [number, number, number] = [0, -0.5, 0];
const STAGE_3D_CAMERA_ZOOM = 92;
const STAGE_3D_PAN_SCALE = 0.012;
const STAGE_3D_REDUCED_DETAIL_THRESHOLD = 28;
const STAGE_3D_TILE_THICKNESS_SCALE = 1 / 3;
const STAGE_3D_TILE_HEIGHT_STANDARD = 0.72 * STAGE_3D_TILE_THICKNESS_SCALE;
const STAGE_3D_TILE_HEIGHT_HOME = 0.82 * STAGE_3D_TILE_THICKNESS_SCALE;
const STAGE_3D_SLOT_HEIGHT = 0.22 * STAGE_3D_TILE_THICKNESS_SCALE;
const STAGE_3D_TILE_TOP_Y = STAGE_3D_TILE_HEIGHT_STANDARD;
const STAGE_3D_HOME_TOP_Y = STAGE_3D_TILE_HEIGHT_HOME;
const STAGE_3D_SURFACE_CLEARANCE = 0.02;

type Stage3DCanvasProps = {
  cropArmed: boolean;
  cropTargetTileIds: string[];
  expansionArmed: boolean;
  frontierSlots: HexCoord[];
  interactionLocked?: boolean;
  onPlantCrop: (tileId: string) => void;
  onPlaceTile: (slot: HexCoord) => void;
  onSelectTile: (tileId: string) => void;
  selectedTileId: string | null;
  showSurfaceAccents?: boolean;
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
        <mesh position={[0, STAGE_3D_TILE_TOP_Y + 0.03 + STAGE_3D_SURFACE_CLEARANCE, 0]}>
          <cylinderGeometry args={[0.46, 0.58, 0.06, 10]} />
          <meshStandardMaterial
            color="#7ac86a"
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
            roughness={0.86}
          />
        </mesh>
      );
    case "garden":
      return (
        <>
          <mesh position={[0, STAGE_3D_TILE_TOP_Y + 0.03 + STAGE_3D_SURFACE_CLEARANCE, 0]}>
            <cylinderGeometry args={[0.42, 0.54, 0.06, 10]} />
            <meshStandardMaterial
              color="#f0b48f"
              polygonOffset
              polygonOffsetFactor={-2}
              polygonOffsetUnits={-2}
              roughness={0.82}
            />
          </mesh>
          <mesh position={[0, STAGE_3D_TILE_TOP_Y + 0.08 + STAGE_3D_SURFACE_CLEARANCE, 0]}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshStandardMaterial color="#ffd8a8" roughness={0.5} />
          </mesh>
        </>
      );
    case "pond":
      return (
        <mesh position={[0, STAGE_3D_TILE_TOP_Y + 0.02 + STAGE_3D_SURFACE_CLEARANCE, 0]}>
          <cylinderGeometry args={[0.5, 0.62, 0.04, 10]} />
          <meshStandardMaterial
            color="#8fe2ff"
            metalness={0.12}
            polygonOffset
            polygonOffsetFactor={-2}
            polygonOffsetUnits={-2}
            roughness={0.22}
          />
        </mesh>
      );
    case "wild":
      return (
        <>
          <mesh
            position={[-0.18, STAGE_3D_TILE_TOP_Y + 0.06 + STAGE_3D_SURFACE_CLEARANCE, -0.08]}
          >
            <cylinderGeometry args={[0.12, 0.18, 0.12, 6]} />
            <meshStandardMaterial color="#93b46e" roughness={0.72} />
          </mesh>
          <mesh
            position={[0.16, STAGE_3D_TILE_TOP_Y + 0.05 + STAGE_3D_SURFACE_CLEARANCE, 0.1]}
          >
            <cylinderGeometry args={[0.1, 0.16, 0.1, 6]} />
            <meshStandardMaterial color="#89a865" roughness={0.74} />
          </mesh>
        </>
      );
    case "home":
      return (
        <mesh position={[0, STAGE_3D_HOME_TOP_Y + 0.06 + STAGE_3D_SURFACE_CLEARANCE, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.12, 8]} />
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
          <mesh position={[-0.1, STAGE_3D_TILE_TOP_Y + 0.1, 0]}>
            <cylinderGeometry args={[0.05, 0.07, 0.18, 6]} />
            <meshStandardMaterial color="#6cb25d" roughness={0.76} />
          </mesh>
          <mesh position={[-0.1, STAGE_3D_TILE_TOP_Y + 0.2, 0]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial color="#ffd468" roughness={0.42} />
          </mesh>
          <mesh position={[0.14, STAGE_3D_TILE_TOP_Y + 0.08, -0.06]} rotation={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.04, 0.06, 0.14, 6]} />
            <meshStandardMaterial color="#72bc61" roughness={0.78} />
          </mesh>
        </>
      );
    case "Abobora":
      return (
        <>
          <mesh position={[0, STAGE_3D_TILE_TOP_Y + 0.1, 0]}>
            <sphereGeometry args={[0.14, 14, 14]} />
            <meshStandardMaterial color="#f49a3b" roughness={0.5} />
          </mesh>
          <mesh position={[0, STAGE_3D_TILE_TOP_Y + 0.2, 0]}>
            <cylinderGeometry args={[0.03, 0.04, 0.12, 6]} />
            <meshStandardMaterial color="#6b9b4f" roughness={0.72} />
          </mesh>
        </>
      );
    case "Tomate":
      return (
        <>
          <mesh position={[0, STAGE_3D_TILE_TOP_Y + 0.11, 0]}>
            <cylinderGeometry args={[0.04, 0.06, 0.18, 6]} />
            <meshStandardMaterial color="#62a35c" roughness={0.76} />
          </mesh>
          <mesh position={[-0.1, STAGE_3D_TILE_TOP_Y + 0.05, 0.08]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#e95a4f" roughness={0.44} />
          </mesh>
          <mesh position={[0.12, STAGE_3D_TILE_TOP_Y + 0.07, -0.02]}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial color="#ef6a5d" roughness={0.42} />
          </mesh>
        </>
      );
    default:
      return (
        <mesh position={[0, STAGE_3D_TILE_TOP_Y + 0.08, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color="#fff2c2" roughness={0.4} />
        </mesh>
      );
  }
}

function Stage3DCamera({ panOffset }: { panOffset: { x: number; z: number } }) {
  const cameraRef = useRef<ThreeOrthographicCamera>(null);

  useEffect(() => {
    if (!cameraRef.current) {
      return;
    }

    cameraRef.current.position.set(
      STAGE_3D_CAMERA_POSITION[0] + panOffset.x,
      STAGE_3D_CAMERA_POSITION[1],
      STAGE_3D_CAMERA_POSITION[2] + panOffset.z,
    );
    cameraRef.current.lookAt(
      STAGE_3D_CAMERA_LOOK_AT[0] + panOffset.x,
      STAGE_3D_CAMERA_LOOK_AT[1],
      STAGE_3D_CAMERA_LOOK_AT[2] + panOffset.z,
    );
    cameraRef.current.updateProjectionMatrix();
  }, [panOffset.x, panOffset.z]);

  return (
    <OrthographicCamera
      far={100}
      makeDefault
      near={0.1}
      position={STAGE_3D_CAMERA_POSITION}
      ref={cameraRef}
      zoom={STAGE_3D_CAMERA_ZOOM}
    />
  );
}

type Stage3DSceneProps = {
  cropArmed: boolean;
  cropTargetTileIds: string[];
  expansionArmed: boolean;
  frontierSlots: HexCoord[];
  hoveredSlotKey: string | null;
  hoveredTileId: string | null;
  interactionLocked: boolean;
  onPlantCrop: (tileId: string) => void;
  onPlaceTile: (slot: HexCoord) => void;
  onSelectTile: (tileId: string) => void;
  selectedTileId: string | null;
  setHoveredSlotKey: (slotKey: string | null) => void;
  setHoveredTileId: (tileId: string | null) => void;
  showSurfaceAccents: boolean;
  useReducedDetail: boolean;
  tiles: HexTile[];
};

function Stage3DScene({
  cropArmed,
  cropTargetTileIds,
  expansionArmed,
  frontierSlots,
  hoveredSlotKey,
  hoveredTileId,
  interactionLocked,
  onPlantCrop,
  onPlaceTile,
  onSelectTile,
  selectedTileId,
  setHoveredSlotKey,
  setHoveredTileId,
  showSurfaceAccents,
  useReducedDetail,
  tiles,
}: Stage3DSceneProps) {
  const cropTargetTileIdSet = new Set(cropTargetTileIds);
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
        const slotKey = `${slot.q}:${slot.r}`;
        const highlightColor =
          expansionArmed && !interactionLocked
            ? hoveredSlotKey === slotKey
              ? "#fff6ca"
              : "#ffe0a6"
            : undefined;

        return (
          <HexPrismMesh3D
            bodyColor="#e9d6b0"
            height={STAGE_3D_SLOT_HEIGHT}
            key={`slot-3d-${slot.q}-${slot.r}`}
            highlightColor={highlightColor}
            opacity={0.34}
            onClick={(event) => {
              event.stopPropagation();

              if (!expansionArmed || interactionLocked) {
                return;
              }

              onPlaceTile(slot);
            }}
            onPointerOut={(event) => {
              event.stopPropagation();
              setHoveredSlotKey(null);
            }}
            onPointerOver={(event) => {
              event.stopPropagation();

              if (!expansionArmed || interactionLocked) {
                return;
              }

              setHoveredSlotKey(slotKey);
            }}
            position={[x, y, z]}
            radius={0.92}
            topColor="#fff4db"
          />
        );
      })}

      {tiles.map((tile) => {
        const [x, y, z] = projectAxialToWorld(tile, 0);
        const tileColors = TILE_COLOR_BY_TYPE[tile.tileType];
        const isCropTarget = cropArmed && cropTargetTileIdSet.has(tile.id);
        const highlightColor =
          selectedTileId === tile.id
            ? "#ffe2b5"
            : isCropTarget
              ? "#fff0a1"
              : hoveredTileId === tile.id
                ? "#d6f1ff"
                : undefined;

        return (
          <HexPrismMesh3D
            bodyColor={tileColors.body}
            height={tile.tileType === "home" ? STAGE_3D_TILE_HEIGHT_HOME : STAGE_3D_TILE_HEIGHT_STANDARD}
            highlightColor={highlightColor}
            key={`tile-3d-${tile.id}`}
            onClick={(event) => {
              event.stopPropagation();

              if (interactionLocked) {
                return;
              }

              if (isCropTarget) {
                onPlantCrop(tile.id);
                return;
              }

              onSelectTile(tile.id);
            }}
            onPointerOut={(event) => {
              event.stopPropagation();
              setHoveredTileId(null);
            }}
            onPointerOver={(event) => {
              event.stopPropagation();

              if (interactionLocked) {
                return;
              }

              setHoveredTileId(tile.id);
            }}
            position={[x, y, z]}
            radius={1}
            topColor={tileColors.top}
          >
            {showSurfaceAccents && !useReducedDetail ? (
              <TileSurfaceAccent tileType={tile.tileType} />
            ) : null}
            {!useReducedDetail ? <CropProp3D cropName={tile.plantedCropName} /> : null}
          </HexPrismMesh3D>
        );
      })}
    </>
  );
}

export function Stage3DCanvas({
  cropArmed,
  cropTargetTileIds,
  expansionArmed,
  frontierSlots,
  interactionLocked = false,
  onPlantCrop,
  onPlaceTile,
  onSelectTile,
  selectedTileId,
  showSurfaceAccents = true,
  tiles,
}: Stage3DCanvasProps) {
  const dragOriginRef = useRef<{ x: number; y: number } | null>(null);
  const [hoveredSlotKey, setHoveredSlotKey] = useState<string | null>(null);
  const [hoveredTileId, setHoveredTileId] = useState<string | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, z: 0 });
  const useReducedDetail = tiles.length + frontierSlots.length > STAGE_3D_REDUCED_DETAIL_THRESHOLD;

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const dragOrigin = dragOriginRef.current;

      if (!dragOrigin) {
        return;
      }

      const deltaX = event.clientX - dragOrigin.x;
      const deltaY = event.clientY - dragOrigin.y;

      dragOriginRef.current = { x: event.clientX, y: event.clientY };
      setPanOffset((currentOffset) => ({
        x: currentOffset.x - deltaX * STAGE_3D_PAN_SCALE,
        z: currentOffset.z - deltaY * STAGE_3D_PAN_SCALE,
      }));
    };

    const handleMouseUp = () => {
      if (!dragOriginRef.current) {
        return;
      }

      dragOriginRef.current = null;
      setIsPanning(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handlePanStart = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (interactionLocked || event.button !== 2) {
      return;
    }

    event.preventDefault();
    dragOriginRef.current = { x: event.clientX, y: event.clientY };
    setIsPanning(true);
  };

  return (
    <div
      className={`stage-3d-canvas ${isPanning ? "is-panning" : ""} ${interactionLocked ? "is-locked" : ""}`}
      onContextMenu={(event) => event.preventDefault()}
      onMouseDown={handlePanStart}
      title="Mapa 3D do stage."
    >
      <Canvas
        dpr={useReducedDetail ? [1, 1] : [1, 1.5]}
        frameloop="demand"
        gl={{ alpha: true, antialias: true }}
      >
        <Stage3DCamera panOffset={panOffset} />
        <Stage3DScene
          cropArmed={cropArmed}
          frontierSlots={frontierSlots}
          cropTargetTileIds={cropTargetTileIds}
          expansionArmed={expansionArmed}
          hoveredSlotKey={hoveredSlotKey}
          hoveredTileId={hoveredTileId}
          interactionLocked={interactionLocked}
          onPlantCrop={onPlantCrop}
          onPlaceTile={onPlaceTile}
          onSelectTile={onSelectTile}
          selectedTileId={selectedTileId}
          setHoveredSlotKey={setHoveredSlotKey}
          setHoveredTileId={setHoveredTileId}
          showSurfaceAccents={showSurfaceAccents}
          useReducedDetail={useReducedDetail}
          tiles={tiles}
        />
      </Canvas>
    </div>
  );
}
