import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { HexPrismMesh3D } from "./HexPrismMesh3D";
import { projectAxialToWorld } from "../lib/hexGrid3d";

const STAGE_3D_CAMERA_POSITION: [number, number, number] = [7.5, 7, 7.5];
const STAGE_3D_CAMERA_LOOK_AT: [number, number, number] = [0, -0.5, 0];
const STAGE_3D_CAMERA_ZOOM = 92;

function Stage3DBackdrop() {
  const [centerX, centerY, centerZ] = projectAxialToWorld({ q: 0, r: 0 }, -0.45);

  return (
    <>
      <ambientLight intensity={1.35} />
      <directionalLight color="#fff3cf" intensity={1.8} position={[6, 8, 5]} />
      <directionalLight color="#ffd8ef" intensity={0.7} position={[-5, 4, -4]} />

      <mesh position={[0, -1.45, -0.6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[22, 22]} />
        <meshStandardMaterial color="#f5dfb8" opacity={0.2} transparent />
      </mesh>

      <HexPrismMesh3D
        bodyColor="#d2875f"
        height={0.82}
        position={[centerX, centerY, centerZ]}
        radius={1}
        topColor="#f4b890"
      />
    </>
  );
}

export function Stage3DCanvas() {
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
        <Stage3DBackdrop />
      </Canvas>
    </div>
  );
}
