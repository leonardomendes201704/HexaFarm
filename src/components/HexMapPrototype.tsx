import { useMemo } from "react";
import type { HexCoord, HexTile } from "../lib/hexGrid";
import { getTileLabel } from "../lib/hexGrid";

type HexMapPrototypeProps = {
  expansionArmed: boolean;
  frontierSlots: HexCoord[];
  onPlaceTile: (slot: HexCoord) => void;
  onSelectTile: (tileId: string) => void;
  selectedTileId: string | null;
  tiles: HexTile[];
};

const HEX_SIDE = 60;
const HEX_WIDTH = HEX_SIDE * 2;
const HEX_HEIGHT = Math.sqrt(3) * HEX_SIDE;
const HEX_HORIZONTAL_STEP = HEX_WIDTH * 0.75;
const HEX_BOARD_PADDING = 72;

function projectHexCoord({ q, r }: HexCoord) {
  return {
    x: q * HEX_HORIZONTAL_STEP,
    y: (r + q / 2) * HEX_HEIGHT,
  };
}

export function HexMapPrototype({
  expansionArmed,
  frontierSlots,
  onPlaceTile,
  onSelectTile,
  selectedTileId,
  tiles,
}: HexMapPrototypeProps) {
  const boardGeometry = useMemo(() => {
    const allCoords = [...tiles, ...frontierSlots];
    const projectedCoords = allCoords.map((coord) => {
      const position = projectHexCoord(coord);

      return {
        bottom: position.y + HEX_HEIGHT,
        left: position.x,
        right: position.x + HEX_WIDTH,
        top: position.y,
      };
    });
    const minX = Math.min(...projectedCoords.map((coord) => coord.left), 0);
    const maxX = Math.max(...projectedCoords.map((coord) => coord.right), HEX_WIDTH);
    const minY = Math.min(...projectedCoords.map((coord) => coord.top), 0);
    const maxY = Math.max(...projectedCoords.map((coord) => coord.bottom), HEX_HEIGHT);

    return {
      height: maxY - minY + HEX_BOARD_PADDING * 2,
      offsetX: HEX_BOARD_PADDING - minX,
      offsetY: HEX_BOARD_PADDING - minY,
      width: maxX - minX + HEX_BOARD_PADDING * 2,
    };
  }, [frontierSlots, tiles]);

  return (
    <section className="hex-prototype">
      <div className="hex-board-shell">
        <div
          className="hex-board"
          style={{
            height: `${boardGeometry.height}px`,
            width: `${boardGeometry.width}px`,
          }}
        >
          {frontierSlots.map((slot) => {
            const position = projectHexCoord(slot);

            return (
              <button
                className={`hex-node hex-node--slot ${expansionArmed ? "is-armed" : ""}`}
                disabled={!expansionArmed}
                key={`slot-${slot.q}-${slot.r}`}
                onClick={() => onPlaceTile(slot)}
                style={{
                  transform: `translate(${position.x + boardGeometry.offsetX}px, ${position.y + boardGeometry.offsetY}px)`,
                }}
                type="button"
              >
                <span className="hex-node__surface">
                  <span className="hex-node__label">+</span>
                </span>
              </button>
            );
          })}

          {tiles.map((tile) => {
            const position = projectHexCoord(tile);

            return (
              <button
                className={`hex-node hex-node--tile hex-node--${tile.tileType} ${
                  selectedTileId === tile.id ? "is-selected" : ""
                }`}
                key={tile.id}
                onClick={() => onSelectTile(tile.id)}
                style={{
                  transform: `translate(${position.x + boardGeometry.offsetX}px, ${position.y + boardGeometry.offsetY}px)`,
                }}
                type="button"
              >
                <span className="hex-node__surface">
                  <span className="hex-node__label">{getTileLabel(tile.tileType)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
