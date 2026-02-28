export type PrototypeTileType = "field" | "garden" | "home" | "pond" | "wild";
export type ExpansionTileType = Exclude<PrototypeTileType, "home">;

export type HexCoord = {
  q: number;
  r: number;
};

export type HexTile = HexCoord & {
  id: string;
  tileType: PrototypeTileType;
};

const HEX_DIRECTIONS: HexCoord[] = [
  { q: 1, r: 0 },
  { q: 1, r: -1 },
  { q: 0, r: -1 },
  { q: -1, r: 0 },
  { q: -1, r: 1 },
  { q: 0, r: 1 },
];

function getHexDistance({ q, r }: HexCoord) {
  return Math.max(Math.abs(q), Math.abs(r), Math.abs(-q - r));
}

export function getHexKey({ q, r }: HexCoord) {
  return `${q}:${r}`;
}

export function getTileLabel(tileType: PrototypeTileType) {
  switch (tileType) {
    case "home":
      return "Base";
    case "field":
      return "Campo";
    case "garden":
      return "Jardim";
    case "pond":
      return "Lago";
    case "wild":
      return "Bosque";
    default:
      return "Tile";
  }
}

function getNextPrototypeTileType(index: number): ExpansionTileType {
  const cycle: ExpansionTileType[] = ["field", "garden", "pond", "wild"];

  return cycle[index % cycle.length];
}

export function getFrontierSlots(tiles: HexTile[]) {
  const occupiedKeys = new Set(tiles.map((tile) => tile.id));
  const frontierByKey = new Map<string, HexCoord>();

  tiles.forEach((tile) => {
    HEX_DIRECTIONS.forEach((direction) => {
      const candidateSlot = {
        q: tile.q + direction.q,
        r: tile.r + direction.r,
      };
      const candidateKey = getHexKey(candidateSlot);

      if (occupiedKeys.has(candidateKey) || frontierByKey.has(candidateKey)) {
        return;
      }

      frontierByKey.set(candidateKey, candidateSlot);
    });
  });

  return [...frontierByKey.values()].sort((leftSlot, rightSlot) => {
    const distanceDelta = getHexDistance(leftSlot) - getHexDistance(rightSlot);

    if (distanceDelta !== 0) {
      return distanceDelta;
    }

    if (leftSlot.q !== rightSlot.q) {
      return leftSlot.q - rightSlot.q;
    }

    return leftSlot.r - rightSlot.r;
  });
}

export function createInitialPrototypeTiles(tileCount: number) {
  const normalizedTileCount = Math.max(tileCount, 1);
  const tiles: HexTile[] = [
    {
      id: getHexKey({ q: 0, r: 0 }),
      q: 0,
      r: 0,
      tileType: "home",
    },
  ];

  while (tiles.length < normalizedTileCount) {
    const [nextFrontier] = getFrontierSlots(tiles);

    if (!nextFrontier) {
      break;
    }

    tiles.push({
      id: getHexKey(nextFrontier),
      q: nextFrontier.q,
      r: nextFrontier.r,
      tileType: getNextPrototypeTileType(tiles.length - 1),
    });
  }

  return tiles;
}

export function createExpandedTile(
  tiles: HexTile[],
  frontierSlot: HexCoord,
  tileType: ExpansionTileType,
): HexTile & { tileType: ExpansionTileType } {
  return {
    id: getHexKey(frontierSlot),
    q: frontierSlot.q,
    r: frontierSlot.r,
    tileType,
  };
}
