import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import type { HexCoord, HexTile } from "../lib/hexGrid";
import { getTileLabel } from "../lib/hexGrid";

export type TileYieldBurst = {
  tileId: string;
  yieldValue: number;
};

type HexMapPrototypeProps = {
  cropArmed: boolean;
  cropTargetTileIds: string[];
  expansionArmed: boolean;
  frontierSlots: HexCoord[];
  interactionLocked?: boolean;
  onPlantCrop: (tileId: string) => void;
  onPlaceTile: (slot: HexCoord) => void;
  onSelectTile: (tileId: string) => void;
  selectedTileId: string | null;
  tiles: HexTile[];
  yieldBursts: TileYieldBurst[];
};

const HEX_SIDE = 60;
const HEX_WIDTH = HEX_SIDE * 2;
const HEX_HEIGHT = Math.sqrt(3) * HEX_SIDE;
const HEX_HORIZONTAL_STEP = HEX_WIDTH * 0.75;
const HEX_BOARD_PADDING = 72;
const HEX_BOARD_CENTER_OFFSET_Y = -50;

function projectHexCoord({ q, r }: HexCoord) {
  return {
    x: q * HEX_HORIZONTAL_STEP,
    y: (r + q / 2) * HEX_HEIGHT,
  };
}

export function HexMapPrototype({
  cropArmed,
  cropTargetTileIds,
  expansionArmed,
  frontierSlots,
  interactionLocked = false,
  onPlantCrop,
  onPlaceTile,
  onSelectTile,
  selectedTileId,
  tiles,
  yieldBursts,
}: HexMapPrototypeProps) {
  const dragOriginRef = useRef<{ x: number; y: number } | null>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const dragOrigin = dragOriginRef.current;

      if (!dragOrigin) {
        return;
      }

      const deltaX = event.clientX - dragOrigin.x;
      const deltaY = event.clientY - dragOrigin.y;

      dragOriginRef.current = {
        x: event.clientX,
        y: event.clientY,
      };

      setPanOffset((currentOffset) => ({
        x: currentOffset.x + deltaX,
        y: currentOffset.y + deltaY,
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
    if (interactionLocked) {
      return;
    }

    if (event.button !== 2) {
      return;
    }

    event.preventDefault();

    dragOriginRef.current = {
      x: event.clientX,
      y: event.clientY,
    };

    setIsPanning(true);
  };

  return (
    <section className="hex-prototype">
      <div
        className={`hex-board-shell ${isPanning ? "is-panning" : ""} ${interactionLocked ? "is-locked" : ""}`}
        onContextMenu={(event) => event.preventDefault()}
        onMouseDown={handlePanStart}
        title="Arraste com o botao direito do mouse para mover o mapa."
      >
        <div className="hex-board-viewport">
          <div
            className="hex-board"
            style={{
              height: `${boardGeometry.height}px`,
              transform: `translate(-50%, -50%) translate(${panOffset.x}px, ${panOffset.y + HEX_BOARD_CENTER_OFFSET_Y}px)`,
              width: `${boardGeometry.width}px`,
            }}
          >
            {frontierSlots.map((slot) => {
              const position = projectHexCoord(slot);

              return (
                <button
                  className={`hex-node hex-node--slot ${expansionArmed ? "is-armed" : ""}`}
                  disabled={!expansionArmed || interactionLocked}
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
              const canPlantCropOnTile = cropArmed && cropTargetTileIds.includes(tile.id);

              return (
                <button
                  className={`hex-node hex-node--tile hex-node--${tile.tileType} ${
                    selectedTileId === tile.id ? "is-selected" : ""
                  } ${canPlantCropOnTile ? "is-crop-target" : ""}`}
                  disabled={interactionLocked}
                  key={tile.id}
                  onClick={() => {
                    if (canPlantCropOnTile) {
                      onPlantCrop(tile.id);
                      return;
                    }

                    onSelectTile(tile.id);
                  }}
                  style={{
                    transform: `translate(${position.x + boardGeometry.offsetX}px, ${position.y + boardGeometry.offsetY}px)`,
                  }}
                  type="button"
                >
                  <span className="hex-node__surface">
                    <span className="hex-node__badge-stack">
                      <span className="hex-node__label">{getTileLabel(tile.tileType)}</span>
                      {tile.plantedCropName ? (
                        <span className="hex-node__crop-badge">{tile.plantedCropName}</span>
                      ) : null}
                    </span>
                  </span>
                </button>
              );
            })}

            {yieldBursts.map((burst) => {
              const tile = tiles.find((candidateTile) => candidateTile.id === burst.tileId);

              if (!tile) {
                return null;
              }

              const position = projectHexCoord(tile);
              const coinCount = Math.max(1, Math.min(Math.abs(burst.yieldValue), 5));
              const isNegative = burst.yieldValue < 0;

              return (
                <div
                  className={`tile-yield-burst ${isNegative ? "is-negative" : "is-positive"}`}
                  key={`yield-${burst.tileId}`}
                  style={{
                    left: `${position.x + boardGeometry.offsetX + HEX_WIDTH / 2}px`,
                    top: `${position.y + boardGeometry.offsetY + HEX_HEIGHT / 2}px`,
                  }}
                >
                  <div className="tile-yield-burst__coins">
                    {Array.from({ length: coinCount }, (_, index) => (
                      <span
                        className="tile-yield-burst__coin"
                        key={`${burst.tileId}-coin-${index}`}
                        style={{ animationDelay: `${index * 80}ms` }}
                      />
                    ))}
                  </div>
                  <span className="tile-yield-burst__label">
                    {burst.yieldValue >= 0 ? "+" : ""}
                    {burst.yieldValue}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
