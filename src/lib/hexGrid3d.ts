import type { HexCoord } from "./hexGrid";

export const HEX_WORLD_RADIUS = 1;
export const HEX_WORLD_TILE_HEIGHT = 0.72;
export const HEX_WORLD_HORIZONTAL_STEP = HEX_WORLD_RADIUS * 1.5;
export const HEX_WORLD_DEPTH_STEP = Math.sqrt(3) * HEX_WORLD_RADIUS;

export function projectAxialToWorld(
  { q, r }: HexCoord,
  elevation = 0,
): [number, number, number] {
  const x = q * HEX_WORLD_HORIZONTAL_STEP;
  const z = (r + q / 2) * HEX_WORLD_DEPTH_STEP;

  return [x, elevation, z];
}

export function getHexWorldSpan(size: number) {
  return {
    depth: Math.max(size * HEX_WORLD_DEPTH_STEP, HEX_WORLD_DEPTH_STEP),
    width: Math.max(size * HEX_WORLD_HORIZONTAL_STEP, HEX_WORLD_HORIZONTAL_STEP),
  };
}
