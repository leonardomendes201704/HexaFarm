import { useState } from "react";
import { Navigate } from "react-router-dom";
import { FlowScreen } from "../components/FlowScreen";
import { HexMapPrototype } from "../components/HexMapPrototype";
import { SaveSummaryCard } from "../components/SaveSummaryCard";
import {
  createExpandedTile,
  createInitialPrototypeTiles,
  getFrontierSlots,
  getTileLabel,
  type HexCoord,
  type HexTile,
} from "../lib/hexGrid";
import { getSavedRun, registerPrototypeExpansion, type SaveSnapshot } from "../lib/save";

export function NewGameScreen() {
  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(() => getSavedRun());
  const [tiles, setTiles] = useState<HexTile[]>(() =>
    createInitialPrototypeTiles(getSavedRun()?.activeRun.tilesPlaced ?? 1),
  );
  const [selectedTileId, setSelectedTileId] = useState<string | null>(() => tiles[0]?.id ?? null);
  const [expansionArmed, setExpansionArmed] = useState(false);

  if (!savedRun) {
    return <Navigate replace to="/" />;
  }

  const frontierSlots = getFrontierSlots(tiles);
  const selectedTile = tiles.find((tile) => tile.id === selectedTileId) ?? tiles[0] ?? null;

  const handleArmExpansion = () => {
    if (frontierSlots.length === 0) {
      return;
    }

    setExpansionArmed(true);
  };

  const handlePlaceTile = (slot: HexCoord) => {
    if (!expansionArmed) {
      return;
    }

    const createdTile = createExpandedTile(tiles, slot);
    const updatedSave = registerPrototypeExpansion(createdTile.tileType);

    setTiles((currentTiles) => [...currentTiles, createdTile]);
    setSelectedTileId(createdTile.id);
    setExpansionArmed(false);
    setSavedRun(updatedSave);
  };

  return (
    <FlowScreen
      description="A preparacao da run agora exibe o primeiro tabuleiro hexagonal do projeto. O foco desta entrega e validar leitura isometrica fake 3D e expansao basica por tile."
      detail="Este prototipo ainda nao e o mapa final da run, mas ja prova a estrutura central: um grid hexagonal com fronteiras validas e crescimento visual a partir de uma acao de expansao."
      eyebrow="Novo Jogo"
      highlights={["Mapa hexagonal", "Expansao basica", "Fake 3D"]}
      statusItems={[
        { label: "Home", value: "Ativa" },
        { label: "Rotas base", value: "Prontas" },
        { label: "Mapa hexagonal", value: "Ativo" },
        { label: "Expansao", value: "Prototipo" },
      ]}
      title="Prototipo da Fazenda Hexagonal"
    >
      <SaveSummaryCard save={savedRun} title="Run ativa" />

      <HexMapPrototype
        expansionArmed={expansionArmed}
        frontierSlots={frontierSlots}
        onArmExpansion={handleArmExpansion}
        onPlaceTile={handlePlaceTile}
        onSelectTile={setSelectedTileId}
        selectedTileId={selectedTileId}
        tiles={tiles}
      />

      <div className="route-note">
        <p className="route-note__label">Tile selecionado</p>
        {selectedTile ? (
          <>
            <p className="route-note__text">
              {getTileLabel(selectedTile.tileType)} em ({selectedTile.q}, {selectedTile.r})
            </p>
            <p className="route-note__text">
              Fronteiras abertas: {frontierSlots.length} | Tiles colocados nesta sessao:{" "}
              {tiles.length}
            </p>
          </>
        ) : (
          <p className="route-note__text">Nenhum tile selecionado.</p>
        )}
      </div>
    </FlowScreen>
  );
}
