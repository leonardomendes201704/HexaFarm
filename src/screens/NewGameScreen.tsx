import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ExpansionHand } from "../components/ExpansionHand";
import { GameModal } from "../components/GameModal";
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

type HudModalId = "help" | "menu" | "status" | null;

export function NewGameScreen() {
  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(() => getSavedRun());
  const [tiles, setTiles] = useState<HexTile[]>(() =>
    createInitialPrototypeTiles(getSavedRun()?.activeRun.tilesPlaced ?? 1),
  );
  const [selectedTileId, setSelectedTileId] = useState<string | null>(() => tiles[0]?.id ?? null);
  const [deckState, setDeckState] = useState<PrototypeDeckState>(() => createInitialExpansionDeck());
  const [armedCardId, setArmedCardId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<HudModalId>(null);

  const frontierSlots = getFrontierSlots(tiles);
  const selectedTile = tiles.find((tile) => tile.id === selectedTileId) ?? tiles[0] ?? null;
  const armedCard = deckState.hand.find((card) => card.id === armedCardId) ?? null;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const typedElement = event.target as HTMLElement | null;
      const isTypingElement =
        typedElement instanceof HTMLInputElement ||
        typedElement instanceof HTMLTextAreaElement ||
        typedElement?.isContentEditable;

      if (isTypingElement) {
        return;
      }

      const pressedKey = event.key.toLowerCase();

      if (pressedKey === "escape") {
        setActiveModal(null);
        setArmedCardId(null);
        return;
      }

      if (pressedKey === "m") {
        setActiveModal((currentModal) => (currentModal === "menu" ? null : "menu"));
      }

      if (pressedKey === "r") {
        setActiveModal((currentModal) => (currentModal === "status" ? null : "status"));
      }

      if (pressedKey === "h") {
        setActiveModal((currentModal) => (currentModal === "help" ? null : "help"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!savedRun) {
    return <Navigate replace to="/" />;
  }

  const handleSelectCard = (cardId: string) => {
    if (frontierSlots.length === 0) {
      return;
    }

    setArmedCardId((currentCardId) => (currentCardId === cardId ? null : cardId));
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
    <section className="gameplay-screen">
      <div className="gameplay-screen__sky" />
      <div className="gameplay-screen__haze gameplay-screen__haze--left" />
      <div className="gameplay-screen__haze gameplay-screen__haze--right" />

      <header className="gameplay-hud">
        <div className="gameplay-hud__cluster">
          <button
            className="hud-button"
            onClick={() => setActiveModal((currentModal) => (currentModal === "menu" ? null : "menu"))}
            type="button"
          >
            <span className="hud-button__key">M</span>
            <span>Menu</span>
          </button>

          <button
            className="hud-button"
            onClick={() =>
              setActiveModal((currentModal) => (currentModal === "status" ? null : "status"))
            }
            type="button"
          >
            <span className="hud-button__key">R</span>
            <span>Run</span>
          </button>

          <button
            className="hud-button"
            onClick={() => setActiveModal((currentModal) => (currentModal === "help" ? null : "help"))}
            type="button"
          >
            <span className="hud-button__key">H</span>
            <span>Ajuda</span>
          </button>
        </div>

        <div className="gameplay-hud__cluster gameplay-hud__cluster--right">
          <span className="hud-pill">Moedas {savedRun.activeRun.resources.coins}</span>
          <span className="hud-pill">Sementes {savedRun.activeRun.resources.seeds}</span>
          <span className="hud-pill">Energia {savedRun.activeRun.resources.energy}</span>
        </div>
      </header>

      <div className="gameplay-stage">
        <div className="gameplay-stage__status">
          {armedCard ? (
            <div className="status-orb status-orb--active">
              <span className="status-orb__label">Carta armada</span>
              <strong className="status-orb__value">{armedCard.name}</strong>
            </div>
          ) : selectedTile ? (
            <div className="status-orb">
              <span className="status-orb__label">Tile selecionado</span>
              <strong className="status-orb__value">
                {getTileLabel(selectedTile.tileType)} ({selectedTile.q}, {selectedTile.r})
              </strong>
            </div>
          ) : null}

          <div className="status-strip">
            <span className="status-strip__item">Tiles {tiles.length}</span>
            <span className="status-strip__item">Bordas {frontierSlots.length}</span>
          </div>
        </div>

        <ExpansionHand
          armedCardId={armedCardId}
          canPlayCards={frontierSlots.length > 0}
          discardCount={deckState.discardPile.length}
          drawCount={deckState.drawPile.length}
          hand={deckState.hand}
          onSelectCard={handleSelectCard}
        />

        <HexMapPrototype
          expansionArmed={armedCard !== null}
          frontierSlots={frontierSlots}
          onPlaceTile={handlePlaceTile}
          onSelectTile={setSelectedTileId}
          selectedTileId={selectedTileId}
          tiles={tiles}
        />
      </div>

      {activeModal === "menu" ? (
        <GameModal onClose={() => setActiveModal(null)} shortcut="M" title="Menu da Run">
          <div className="game-modal__stack">
            <SaveSummaryCard save={savedRun} title="Run ativa" />

            <div className="game-modal__actions">
              <Link className="game-modal__link game-modal__link--primary" to="/">
                Voltar para a Home
              </Link>
              <button
                className="game-modal__link game-modal__link--ghost"
                onClick={() => setActiveModal(null)}
                type="button"
              >
                Continuar na fazenda
              </button>
            </div>
          </div>
        </GameModal>
      ) : null}

      {activeModal === "status" ? (
        <GameModal onClose={() => setActiveModal(null)} shortcut="R" title="Resumo da Run">
          <div className="game-modal__stack">
            <SaveSummaryCard save={savedRun} title="Progresso salvo" />

            <div className="game-modal__stats">
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Deck</span>
                <strong className="game-modal__stat-value">{deckState.drawPile.length}</strong>
              </div>
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Mao</span>
                <strong className="game-modal__stat-value">{deckState.hand.length}</strong>
              </div>
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Descarte</span>
                <strong className="game-modal__stat-value">{deckState.discardPile.length}</strong>
              </div>
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Fronteiras</span>
                <strong className="game-modal__stat-value">{frontierSlots.length}</strong>
              </div>
            </div>
          </div>
        </GameModal>
      ) : null}

      {activeModal === "help" ? (
        <GameModal onClose={() => setActiveModal(null)} shortcut="H" title="Controles Rapidos">
          <div className="game-modal__stack">
            <div className="game-modal__tip-list">
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">1</span>
                <p className="game-modal__tip-text">Escolha uma carta na mao para armar a expansao.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">2</span>
                <p className="game-modal__tip-text">Clique em uma borda brilhante para criar o novo hex.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">M</span>
                <p className="game-modal__tip-text">Abre o menu. R mostra a run. Esc fecha tudo.</p>
              </div>
            </div>
          </div>
        </GameModal>
      ) : null}
    </section>
  );
}
