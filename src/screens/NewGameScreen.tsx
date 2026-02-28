import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { ExpansionHand } from "../components/ExpansionHand";
import { GameModal } from "../components/GameModal";
import { HexMapPrototype } from "../components/HexMapPrototype";
import { SaveSummaryCard } from "../components/SaveSummaryCard";
import {
  createExpandedTile,
  createInitialPrototypeTiles,
  getFrontierSlots,
  type HexCoord,
  type HexTile,
} from "../lib/hexGrid";
import {
  addCardToDeckSelection,
  createDeckStateFromSelection,
  createStarterDeckSelection,
  DECK_SIZE,
  discardHandAndRefill,
  getCardLibrary,
  getOwnedQuantity,
  getSelectedQuantity,
  getShopOffers,
  playExpansionCard,
  removeCardFromDeckSelection,
  type PrototypeDeckState,
} from "../lib/prototypeDeck";
import {
  advancePrototypeDay,
  getSavedRun,
  prepareNextRun,
  PROTOTYPE_BASE_ENERGY,
  PROTOTYPE_RUN_LENGTH_DAYS,
  purchaseOwnedCard,
  registerPrototypeExpansion,
  startConfiguredRun,
  type SaveSnapshot,
} from "../lib/save";

type HudModalId = "help" | "menu" | "status" | null;

function createBoardState(tileCount = 1) {
  const boardTiles = createInitialPrototypeTiles(tileCount);

  return {
    selectedTileId: boardTiles[0]?.id ?? null,
    tiles: boardTiles,
  };
}

export function NewGameScreen() {
  const initialSave = getSavedRun();
  const initialDeckSelection = initialSave?.activeRun.deckCardIds ?? createStarterDeckSelection();
  const initialBoardState = createBoardState(initialSave?.activeRun.tilesPlaced ?? 1);

  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(initialSave);
  const [tiles, setTiles] = useState<HexTile[]>(initialBoardState.tiles);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(initialBoardState.selectedTileId);
  const [deckSelection, setDeckSelection] = useState<string[]>(initialDeckSelection);
  const [deckState, setDeckState] = useState<PrototypeDeckState>(() =>
    createDeckStateFromSelection(initialDeckSelection),
  );
  const [armedCardId, setArmedCardId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<HudModalId>(null);

  const collectionCards = useMemo(() => getCardLibrary(), []);
  const frontierSlots = getFrontierSlots(tiles);
  const armedCard = deckState.hand.find((card) => card.instanceId === armedCardId) ?? null;

  if (!savedRun) {
    return <Navigate replace to="/" />;
  }

  const phase = savedRun.activeRun.phase;
  const canRunGameplay = phase === "running";
  const availableEnergy = canRunGameplay ? savedRun.activeRun.resources.energy : 0;
  const selectedDeckCount = deckSelection.length;
  const canStartRun = selectedDeckCount === DECK_SIZE;
  const shopOffers = getShopOffers(savedRun.meta.completedRuns);

  const applyBoardState = (tileCount = 1) => {
    const nextBoardState = createBoardState(tileCount);

    setTiles(nextBoardState.tiles);
    setSelectedTileId(nextBoardState.selectedTileId);
  };

  const syncRunFromSave = (nextSave: SaveSnapshot) => {
    setSavedRun(nextSave);
    setDeckSelection(nextSave.activeRun.deckCardIds);
    setDeckState(createDeckStateFromSelection(nextSave.activeRun.deckCardIds));
    setArmedCardId(null);
    applyBoardState(nextSave.activeRun.tilesPlaced);
  };

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

      if (phase !== "running") {
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

      if (pressedKey === "e") {
        handleEndDay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, savedRun, deckState]);

  const handleAddDeckCard = (cardId: string) => {
    if (phase !== "deckbuilding") {
      return;
    }

    setDeckSelection((currentDeckSelection) =>
      addCardToDeckSelection(currentDeckSelection, savedRun.meta.ownedCards, cardId),
    );
  };

  const handleRemoveDeckCard = (cardId: string) => {
    if (phase !== "deckbuilding") {
      return;
    }

    setDeckSelection((currentDeckSelection) => removeCardFromDeckSelection(currentDeckSelection, cardId));
  };

  const handleStartRun = () => {
    if (!canStartRun) {
      return;
    }

    const updatedSave = startConfiguredRun(deckSelection);

    setActiveModal(null);
    syncRunFromSave(updatedSave);
  };

  const handleSelectCard = (cardId: string) => {
    if (!canRunGameplay || frontierSlots.length === 0) {
      return;
    }

    const selectedCard = deckState.hand.find((card) => card.instanceId === cardId);

    if (!selectedCard || selectedCard.energyCost > availableEnergy) {
      return;
    }

    setArmedCardId((currentCardId) => (currentCardId === cardId ? null : cardId));
  };

  const handlePlaceTile = (slot: HexCoord) => {
    if (!canRunGameplay || !armedCard || armedCard.energyCost > availableEnergy) {
      return;
    }

    const createdTile = createExpandedTile(tiles, slot, armedCard.tileType);
    const updatedSave = registerPrototypeExpansion(createdTile.tileType, armedCard.energyCost);
    const { nextState } = playExpansionCard(deckState, armedCard.instanceId);

    setTiles((currentTiles) => [...currentTiles, createdTile]);
    setSelectedTileId(createdTile.id);
    setDeckState(nextState);
    setArmedCardId(null);
    setSavedRun(updatedSave);
  };

  const handleEndDay = () => {
    if (!canRunGameplay) {
      return;
    }

    const isRunEnding = savedRun.activeRun.day >= PROTOTYPE_RUN_LENGTH_DAYS;

    if (!isRunEnding) {
      setDeckState((currentDeckState) => discardHandAndRefill(currentDeckState));
    }

    const updatedSave = advancePrototypeDay();

    setActiveModal(null);
    setArmedCardId(null);
    setSavedRun(updatedSave);
  };

  const handleBuyCard = (cardId: string) => {
    if (phase !== "shop") {
      return;
    }

    const updatedSave = purchaseOwnedCard(cardId);

    setSavedRun(updatedSave);
  };

  const handlePrepareNextRun = () => {
    const nextDraft = deckSelection.length > 0 ? deckSelection : savedRun.activeRun.deckCardIds;
    const updatedSave = prepareNextRun(nextDraft);

    setActiveModal(null);
    syncRunFromSave(updatedSave);
  };

  return (
    <section className={`gameplay-screen ${phase !== "running" ? "is-overlayed" : ""}`}>
      <div className="gameplay-screen__sky" />
      <div className="gameplay-screen__haze gameplay-screen__haze--left" />
      <div className="gameplay-screen__haze gameplay-screen__haze--right" />

      <header className="gameplay-hud">
        <div className="gameplay-hud__cluster">
          <button
            className="hud-button"
            disabled={!canRunGameplay}
            onClick={() => setActiveModal((currentModal) => (currentModal === "menu" ? null : "menu"))}
            type="button"
          >
            <span className="hud-button__key">M</span>
            <span>Menu</span>
          </button>

          <button
            className="hud-button"
            disabled={!canRunGameplay}
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
            disabled={!canRunGameplay}
            onClick={() => setActiveModal((currentModal) => (currentModal === "help" ? null : "help"))}
            type="button"
          >
            <span className="hud-button__key">H</span>
            <span>Ajuda</span>
          </button>
        </div>

        <div className="gameplay-hud__cluster gameplay-hud__cluster--right">
          <span className="hud-pill">Dia {savedRun.activeRun.day}</span>
          <span className="hud-pill">Aluguel {savedRun.activeRun.rentDue}</span>
          <span className="hud-pill">Moedas {savedRun.activeRun.resources.coins}</span>
          <span className="hud-pill">Loja {savedRun.meta.collectionCoins}</span>
          <span className="hud-pill">Energia {availableEnergy}</span>
          <button
            className="hud-button hud-button--action"
            disabled={!canRunGameplay}
            onClick={handleEndDay}
            type="button"
          >
            <span className="hud-button__key">E</span>
            <span>Fim do Dia</span>
          </button>
        </div>
      </header>

      <div className="gameplay-stage">
        <div className="gameplay-stage__status">
          {armedCard ? (
            <div className="status-orb status-orb--active">
              <span className="status-orb__label">Carta armada</span>
              <strong className="status-orb__value">{armedCard.name}</strong>
            </div>
          ) : null}

          <div className="status-strip">
            <span className="status-strip__item">Deck {savedRun.activeRun.deckCardIds.length}</span>
            <span className="status-strip__item">Bordas {frontierSlots.length}</span>
            <span className="status-strip__item">Tiles {tiles.length}</span>
            <span className="status-strip__item">Run {savedRun.meta.completedRuns + 1}</span>
          </div>
        </div>

        <HexMapPrototype
          expansionArmed={canRunGameplay && armedCard !== null}
          frontierSlots={frontierSlots}
          onPlaceTile={handlePlaceTile}
          onSelectTile={setSelectedTileId}
          selectedTileId={selectedTileId}
          tiles={tiles}
        />
      </div>

      {canRunGameplay ? (
        <ExpansionHand
          armedCardId={armedCardId}
          availableEnergy={availableEnergy}
          canPlayCards={frontierSlots.length > 0}
          discardCount={deckState.discardPile.length}
          drawCount={deckState.drawPile.length}
          hand={deckState.hand}
          onSelectCard={handleSelectCard}
        />
      ) : null}

      {phase === "deckbuilding" ? (
        <GameModal dismissible={false} onClose={() => undefined} size="wide" shortcut="Deck" title="Montar Baralho da Run">
          <div className="builder-panel">
            <div className="builder-panel__summary">
              <div className="builder-panel__hero">
                <span className="builder-chip">Escolha {DECK_SIZE} cartas</span>
                <span className="builder-chip">Possuidas {savedRun.meta.ownedCards.reduce((total, card) => total + card.quantity, 0)}</span>
                <span className="builder-chip">Aluguel alvo {savedRun.meta.nextRentCost}</span>
              </div>
              <p className="builder-panel__text">
                Monte o deck inicial da run selecionando exatamente {DECK_SIZE} cartas da sua colecao.
              </p>
            </div>

            <div className="collection-grid">
              {collectionCards.map((card) => {
                const ownedQuantity = getOwnedQuantity(savedRun.meta.ownedCards, card.id);
                const selectedQuantity = getSelectedQuantity(deckSelection, card.id);
                const canAddMore = selectedDeckCount < DECK_SIZE && selectedQuantity < ownedQuantity;

                return (
                  <article
                    className={`collection-card collection-card--${card.tileType} ${
                      ownedQuantity === 0 ? "is-locked" : ""
                    }`}
                    key={card.id}
                  >
                    <div className={`collection-card__art collection-card__art--${card.tileType}`}>
                      <span className="collection-card__cost">{card.energyCost}</span>
                    </div>

                    <div className="collection-card__copy">
                      <strong className="collection-card__title">{card.name}</strong>
                      <span className="collection-card__meta">
                        Possui {ownedQuantity} | No deck {selectedQuantity}
                      </span>
                    </div>

                    <div className="collection-card__actions">
                      <button
                        className="collection-card__button"
                        disabled={selectedQuantity === 0}
                        onClick={() => handleRemoveDeckCard(card.id)}
                        type="button"
                      >
                        -
                      </button>
                      <button
                        className="collection-card__button collection-card__button--primary"
                        disabled={!canAddMore}
                        onClick={() => handleAddDeckCard(card.id)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="builder-panel__footer">
              <span className="builder-panel__counter">
                Selecionadas {selectedDeckCount}/{DECK_SIZE}
              </span>
              <button
                className="game-modal__link game-modal__link--primary"
                disabled={!canStartRun}
                onClick={handleStartRun}
                type="button"
              >
                Iniciar Run
              </button>
            </div>
          </div>
        </GameModal>
      ) : null}

      {phase === "shop" ? (
        <GameModal dismissible={false} onClose={() => undefined} size="wide" shortcut="Shop" title="Loja de Fim de Run">
          <div className="builder-panel">
            <div className="builder-panel__summary">
              <div className="builder-panel__hero">
                <span className="builder-chip">
                  {savedRun.activeRun.lastRentPaid ? "Aluguel pago" : "Aluguel falhou"}
                </span>
                <span className="builder-chip">Banco da loja {savedRun.meta.collectionCoins}</span>
                <span className="builder-chip">Proximo aluguel {savedRun.meta.nextRentCost}</span>
              </div>
              <p className="builder-panel__text">
                {savedRun.activeRun.lastRentPaid
                  ? "Voce terminou a run com folga e pode investir em novas cartas."
                  : "A run terminou sem pagar o aluguel. Reforce o baralho antes da proxima tentativa."}
              </p>
            </div>

            <div className="shop-grid">
              {shopOffers.map((card) => {
                const canBuy = savedRun.meta.collectionCoins >= card.purchaseCost;
                const ownedQuantity = getOwnedQuantity(savedRun.meta.ownedCards, card.id);

                return (
                  <article className={`collection-card collection-card--${card.tileType}`} key={`shop-${card.id}`}>
                    <div className={`collection-card__art collection-card__art--${card.tileType}`}>
                      <span className="collection-card__cost">{card.energyCost}</span>
                    </div>

                    <div className="collection-card__copy">
                      <strong className="collection-card__title">{card.name}</strong>
                      <span className="collection-card__meta">
                        Preco {card.purchaseCost} | Possui {ownedQuantity}
                      </span>
                    </div>

                    <button
                      className="collection-card__button collection-card__button--primary"
                      disabled={!canBuy}
                      onClick={() => handleBuyCard(card.id)}
                      type="button"
                    >
                      Comprar
                    </button>
                  </article>
                );
              })}
            </div>

            <div className="builder-panel__footer">
              <span className="builder-panel__counter">
                Run {savedRun.meta.completedRuns} concluida(s)
              </span>
              <button
                className="game-modal__link game-modal__link--primary"
                onClick={handlePrepareNextRun}
                type="button"
              >
                Preparar Proxima Run
              </button>
            </div>
          </div>
        </GameModal>
      ) : null}

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
                <span className="game-modal__stat-label">Dia</span>
                <strong className="game-modal__stat-value">
                  {savedRun.activeRun.day}/{savedRun.activeRun.runLengthDays}
                </strong>
              </div>
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Energia</span>
                <strong className="game-modal__stat-value">
                  {availableEnergy}/{PROTOTYPE_BASE_ENERGY}
                </strong>
              </div>
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Compra</span>
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
                <span className="game-modal__stat-label">Aluguel</span>
                <strong className="game-modal__stat-value">{savedRun.activeRun.rentDue}</strong>
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
                <p className="game-modal__tip-text">Monte 24 cartas no inicio de cada run.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">2</span>
                <p className="game-modal__tip-text">Compre da pilha, jogue e empurre a carta para o descarte.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">RMB</span>
                <p className="game-modal__tip-text">Segure e arraste com o botao direito para mover o mapa sem scroll.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">E</span>
                <p className="game-modal__tip-text">Fecha o dia. No dia 7, resolve o aluguel e abre a loja.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">M</span>
                <p className="game-modal__tip-text">Abre o menu. R mostra a run. H ajuda. Esc fecha tudo.</p>
              </div>
            </div>
          </div>
        </GameModal>
      ) : null}
    </section>
  );
}
