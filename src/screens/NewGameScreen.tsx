import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ExpansionHand } from "../components/ExpansionHand";
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
import { createInitialExpansionDeck, playExpansionCard, type PrototypeDeckState } from "../lib/prototypeDeck";
import { getSavedRun, registerPrototypeExpansion, type SaveSnapshot } from "../lib/save";

export function NewGameScreen() {
  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(() => getSavedRun());
  const [tiles, setTiles] = useState<HexTile[]>(() =>
    createInitialPrototypeTiles(getSavedRun()?.activeRun.tilesPlaced ?? 1),
  );
  const [selectedTileId, setSelectedTileId] = useState<string | null>(() => tiles[0]?.id ?? null);
  const [deckState, setDeckState] = useState<PrototypeDeckState>(() => createInitialExpansionDeck());
  const [armedCardId, setArmedCardId] = useState<string | null>(null);

  if (!savedRun) {
    return <Navigate replace to="/" />;
  }

  const frontierSlots = getFrontierSlots(tiles);
  const selectedTile = tiles.find((tile) => tile.id === selectedTileId) ?? tiles[0] ?? null;
  const armedCard = deckState.hand.find((card) => card.id === armedCardId) ?? null;

  const handleSelectCard = (cardId: string) => {
    if (frontierSlots.length === 0) {
      return;
    }

    setArmedCardId(cardId);
  };

  const handlePlaceTile = (slot: HexCoord) => {
    if (!armedCard) {
      return;
    }

    const createdTile = createExpandedTile(tiles, slot, armedCard.tileType);
    const updatedSave = registerPrototypeExpansion(createdTile.tileType);
    const { nextState } = playExpansionCard(deckState, armedCard.id);

    setTiles((currentTiles) => [...currentTiles, createdTile]);
    setSelectedTileId(createdTile.id);
    setDeckState(nextState);
    setArmedCardId(null);
    setSavedRun(updatedSave);
  };

  return (
    <FlowScreen
      description="A expansao do mapa agora passa por cartas reais. O prototipo ja conecta mao, compra simples e descarte ao tabuleiro hexagonal."
      detail="Esta entrega nao implementa o deckbuilder completo, mas valida o nucleo esperado: escolher uma carta e fazer o tipo do tile criado depender dela."
      eyebrow="Novo Jogo"
      highlights={["Mao inicial", "Compra simples", "Carta define tile"]}
      statusItems={[
        { label: "Home", value: "Ativa" },
        { label: "Mapa hexagonal", value: "Ativo" },
        { label: "Cartas de expansao", value: "Ativas" },
        { label: "Deck minimo", value: "Pronto" },
      ]}
      title="Prototipo do Deckbuilder Espacial"
    >
      <SaveSummaryCard save={savedRun} title="Run ativa" />

      <ExpansionHand
        armedCardId={armedCardId}
        canPlayCards={frontierSlots.length > 0}
        discardCount={deckState.discardPile.length}
        drawCount={deckState.drawPile.length}
        hand={deckState.hand}
        onSelectCard={handleSelectCard}
      />

      <HexMapPrototype
        armedCardName={armedCard?.name ?? null}
        expansionArmed={armedCard !== null}
        frontierSlots={frontierSlots}
        onPlaceTile={handlePlaceTile}
        onSelectTile={setSelectedTileId}
        selectedTileId={selectedTileId}
        tiles={tiles}
      />

      <div className="route-note">
        <p className="route-note__label">Estado da jogada</p>
        {armedCard ? (
          <>
            <p className="route-note__text">
              Carta pronta: {armedCard.name} ({getTileLabel(armedCard.tileType)})
            </p>
            <p className="route-note__text">
              Clique em uma fronteira destacada para criar o novo tile correspondente.
            </p>
          </>
        ) : selectedTile ? (
          <>
            <p className="route-note__text">
              Tile selecionado: {getTileLabel(selectedTile.tileType)} em ({selectedTile.q},{" "}
              {selectedTile.r})
            </p>
            <p className="route-note__text">
              Fronteiras abertas: {frontierSlots.length} | Tiles colocados nesta sessao:{" "}
              {tiles.length}
            </p>
          </>
        ) : (
          <p className="route-note__text">Nenhuma carta ou tile selecionado.</p>
        )}
      </div>
    </FlowScreen>
  );
}
