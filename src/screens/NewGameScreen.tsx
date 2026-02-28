import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { Link, Navigate } from "react-router-dom";
import { CollectionCard } from "../components/CollectionCard";
import { ExpansionHand } from "../components/ExpansionHand";
import { GameModal } from "../components/GameModal";
import { SaveSummaryCard } from "../components/SaveSummaryCard";
import { Stage3DCanvas } from "../components/Stage3DCanvas";
import {
  applyCropToTile,
  createExpandedTile,
  getFrontierSlots,
  type HexCoord,
  type HexTile,
} from "../lib/hexGrid";
import {
  addCardToDeckSelection,
  canPlantCropOnTile,
  createDeckStateFromSelection,
  createStarterDeckSelection,
  DECK_SIZE,
  HAND_SIZE,
  discardHandOnly,
  discardHandAndRefill,
  getCardComboTargetsLabel,
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
  getRunDailyCoinYieldLabel,
  prepareNextRun,
  PROTOTYPE_BASE_ENERGY,
  PROTOTYPE_RUN_LENGTH_DAYS,
  purchaseOwnedCard,
  registerCropPlanting,
  registerPrototypeExpansion,
  startConfiguredRun,
  type SavePlacedTileState,
  type SaveSnapshot,
} from "../lib/save";

type HudModalId = "help" | "menu" | "status" | null;
const COIN_COUNTER_COUNT_DURATION_MS = 980;
const COIN_COUNTER_FLY_DURATION_MS = 520;
const DAY_RESOLUTION_DURATION_MS = COIN_COUNTER_COUNT_DURATION_MS + COIN_COUNTER_FLY_DURATION_MS;
const HAND_DISCARD_ANIMATION_SPEED = 0.5;
const HAND_DISCARD_ANIMATION_BASE_DURATION_MS = 640;
const HAND_DISCARD_ANIMATION_DURATION_MS = Math.round(
  HAND_DISCARD_ANIMATION_BASE_DURATION_MS / HAND_DISCARD_ANIMATION_SPEED,
);
const HAND_DRAW_ANIMATION_DURATION_MS = 420;
const WEEK_DAY_LABELS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"] as const;

type CoinCounterFlyOffset = {
  x: number;
  y: number;
};

function getCardMetaLine(card: ReturnType<typeof getCardLibrary>[number]) {
  if (card.cardKind === "crop") {
    const comboTargetsLabel = getCardComboTargetsLabel(card);

    return `Combo em ${comboTargetsLabel ?? "solo fertil"} | Bonus ${card.coinYield >= 0 ? "+" : ""}${card.coinYield}/dia`;
  }

  return `Rendimento ${card.coinYield >= 0 ? "+" : ""}${card.coinYield}/dia`;
}

function hasPlayableTarget(
  card: ReturnType<typeof getCardLibrary>[number],
  frontierSlots: HexCoord[],
  tiles: HexTile[],
) {
  if (card.cardKind === "crop") {
    return tiles.some((tile) => canPlantCropOnTile(card, tile));
  }

  return frontierSlots.length > 0;
}

function createBoardState(placedTiles: SavePlacedTileState[] = []) {
  const boardTiles: HexTile[] = [
    {
      baseCoinYield: 0,
      cropYieldBonus: 0,
      dailyCoinYield: 0,
      id: "0:0",
      plantedCropCardId: null,
      plantedCropName: null,
      q: 0,
      r: 0,
      sourceCardId: null,
      tileType: "home",
    },
    ...placedTiles.map((tile) => ({
      baseCoinYield: tile.baseCoinYield ?? tile.dailyCoinYield - (tile.cropYieldBonus ?? 0),
      cropYieldBonus: tile.cropYieldBonus ?? 0,
      dailyCoinYield: tile.dailyCoinYield,
      id: `${tile.q}:${tile.r}`,
      plantedCropCardId: tile.plantedCropCardId ?? null,
      plantedCropName: tile.plantedCropName ?? null,
      q: tile.q,
      r: tile.r,
      sourceCardId: tile.cardId,
      tileType: tile.tileType,
    })),
  ];

  return {
    selectedTileId: boardTiles[boardTiles.length - 1]?.id ?? boardTiles[0]?.id ?? null,
    tiles: boardTiles,
  };
}

export function NewGameScreen() {
  const initialSave = getSavedRun();
  const initialDeckSelection = initialSave?.activeRun.deckCardIds ?? createStarterDeckSelection();
  const initialBoardState = createBoardState(initialSave?.activeRun.placedTiles ?? []);

  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(initialSave);
  const [tiles, setTiles] = useState<HexTile[]>(initialBoardState.tiles);
  const [selectedTileId, setSelectedTileId] = useState<string | null>(initialBoardState.selectedTileId);
  const [deckSelection, setDeckSelection] = useState<string[]>(initialDeckSelection);
  const [deckState, setDeckState] = useState<PrototypeDeckState>(() =>
    createDeckStateFromSelection(initialDeckSelection),
  );
  const [armedCardId, setArmedCardId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<HudModalId>(null);
  const [activeDrawCardIndex, setActiveDrawCardIndex] = useState<number | null>(null);
  const [coinCounterDisplayValue, setCoinCounterDisplayValue] = useState(0);
  const [coinCounterFlyOffset, setCoinCounterFlyOffset] = useState<CoinCounterFlyOffset>({
    x: 0,
    y: 0,
  });
  const [coinResolutionDelta, setCoinResolutionDelta] = useState<number | null>(null);
  const [drawnHandCardCount, setDrawnHandCardCount] = useState(HAND_SIZE);
  const [isCoinCounterFlying, setIsCoinCounterFlying] = useState(false);
  const [isDrawingHand, setIsDrawingHand] = useState(false);
  const [isDiscardingHand, setIsDiscardingHand] = useState(false);
  const [isResolvingDay, setIsResolvingDay] = useState(false);
  const [showHighlights, setShowHighlights] = useState(true);
  const [showSurfaceAccents, setShowSurfaceAccents] = useState(true);
  const [showTopPlateau, setShowTopPlateau] = useState(true);
  const coinBadgeRef = useRef<HTMLSpanElement | null>(null);
  const coinCounterAnimationFrameRef = useRef<number | null>(null);
  const dayResolutionTimeoutRef = useRef<number | null>(null);
  const handDrawTimeoutRef = useRef<number | null>(null);
  const handDiscardTimeoutRef = useRef<number | null>(null);

  const collectionCards = useMemo(() => getCardLibrary(), []);
  const ownedCollectionCards = useMemo(
    () =>
      collectionCards.filter(
        (card) => getOwnedQuantity(savedRun?.meta.ownedCards ?? [], card.id) > 0,
      ),
    [collectionCards, savedRun],
  );
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
  const dailyCoinYieldLabel = getRunDailyCoinYieldLabel(savedRun.activeRun);
  const coinBurstParticles = useMemo(() => {
    if (coinResolutionDelta === null) {
      return [];
    }

    const viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth;
    const viewportHeight = typeof window === "undefined" ? 900 : window.innerHeight;
    const spreadRadius = Math.min(viewportWidth, viewportHeight);
    const particleCount = Math.max(14, Math.min(40, Math.abs(coinResolutionDelta) * 4));

    return Array.from({ length: particleCount }, (_, index) => {
      const angle = (Math.PI * 2 * index) / particleCount;
      const distance =
        spreadRadius * 0.26 +
        (index % 5) * 36 +
        ((index * 17) % Math.max(120, Math.round(spreadRadius * 0.12)));
      const size = 24 + (index % 4) * 5;

      return {
        id: `coin-particle-${index}`,
        offsetX: Math.cos(angle) * distance,
        offsetY: Math.sin(angle) * distance,
        rotation: (index * 37) % 360,
        scale: 0.94 + ((index % 5) * 0.1),
        size,
      };
    });
  }, [coinResolutionDelta]);
  const currentWeekDayIndex = Math.min(
    Math.max(savedRun.activeRun.day - 1, 0),
    WEEK_DAY_LABELS.length - 1,
  );
  const playableCardInstanceIds = useMemo(() => {
    if (!canRunGameplay || isResolvingDay) {
      return [] as string[];
    }

    return deckState.hand
      .filter(
        (card) => availableEnergy >= card.energyCost && hasPlayableTarget(card, frontierSlots, tiles),
      )
      .map((card) => card.instanceId);
  }, [availableEnergy, canRunGameplay, deckState.hand, frontierSlots, isResolvingDay, tiles]);
  const playableCardInstanceIdSet = useMemo(
    () => new Set(playableCardInstanceIds),
    [playableCardInstanceIds],
  );
  const cropTargetTileIds = useMemo(() => {
    if (!armedCard || armedCard.cardKind !== "crop") {
      return [] as string[];
    }

    return tiles
      .filter((tile) => canPlantCropOnTile(armedCard, tile))
      .map((tile) => tile.id);
  }, [armedCard, tiles]);

  const applyBoardState = (placedTiles: SavePlacedTileState[] = []) => {
    const nextBoardState = createBoardState(placedTiles);

    setTiles(nextBoardState.tiles);
    setSelectedTileId(nextBoardState.selectedTileId);
  };

  const syncRunFromSave = (nextSave: SaveSnapshot) => {
    setSavedRun(nextSave);
    setDeckSelection(nextSave.activeRun.deckCardIds);
    setDeckState(createDeckStateFromSelection(nextSave.activeRun.deckCardIds));
    setActiveDrawCardIndex(null);
    setArmedCardId(null);
    setCoinCounterDisplayValue(0);
    setCoinResolutionDelta(null);
    setDrawnHandCardCount(HAND_SIZE);
    setIsCoinCounterFlying(false);
    setIsDrawingHand(false);
    applyBoardState(nextSave.activeRun.placedTiles);
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

      if (pressedKey === "l") {
        setShowHighlights((currentValue) => !currentValue);
      }

      if (pressedKey === "s") {
        setShowSurfaceAccents((currentValue) => !currentValue);
      }

      if (pressedKey === "t") {
        setShowTopPlateau((currentValue) => !currentValue);
      }

      if (pressedKey === "e") {
        handleEndDay();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [phase, savedRun, deckState, isDiscardingHand, isResolvingDay]);

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
    if (!canRunGameplay || isResolvingDay) {
      return;
    }

    const selectedCard = deckState.hand.find((card) => card.instanceId === cardId);

    if (!selectedCard || !playableCardInstanceIdSet.has(cardId)) {
      return;
    }

    setArmedCardId((currentCardId) => (currentCardId === cardId ? null : cardId));
  };

  const handlePlaceTile = (slot: HexCoord) => {
    if (
      !canRunGameplay ||
      isResolvingDay ||
      !armedCard ||
      armedCard.cardKind !== "tile" ||
      armedCard.energyCost > availableEnergy
    ) {
      return;
    }

    const createdTile = createExpandedTile(
      tiles,
      slot,
      armedCard.tileType,
      armedCard.coinYield,
      armedCard.id,
    );
    const placedTile: SavePlacedTileState = {
      cardId: armedCard.id,
      dailyCoinYield: armedCard.coinYield,
      q: createdTile.q,
      r: createdTile.r,
      tileType: createdTile.tileType,
    };
    const updatedSave = registerPrototypeExpansion(placedTile, armedCard.energyCost);
    const { nextState } = playExpansionCard(deckState, armedCard.instanceId);

    setTiles((currentTiles) => [...currentTiles, createdTile]);
    setSelectedTileId(createdTile.id);
    setDeckState(nextState);
    setArmedCardId(null);
    setSavedRun(updatedSave);
  };

  const handlePlantCrop = (tileId: string) => {
    if (
      !canRunGameplay ||
      isResolvingDay ||
      !armedCard ||
      armedCard.cardKind !== "crop" ||
      armedCard.energyCost > availableEnergy
    ) {
      return;
    }

    const targetTile = tiles.find((tile) => tile.id === tileId);

    if (!targetTile || !canPlantCropOnTile(armedCard, targetTile)) {
      return;
    }

    const plantedTile = applyCropToTile(targetTile, armedCard.id, armedCard.name, armedCard.coinYield);
    const updatedSave = registerCropPlanting(
      tileId,
      armedCard.id,
      armedCard.name,
      armedCard.coinYield,
      armedCard.energyCost,
    );
    const { nextState } = playExpansionCard(deckState, armedCard.instanceId);

    setTiles((currentTiles) =>
      currentTiles.map((tile) => (tile.id === tileId ? plantedTile : tile)),
    );
    setSelectedTileId(tileId);
    setDeckState(nextState);
    setArmedCardId(null);
    setSavedRun(updatedSave);
  };

  const finishHandDrawAnimation = () => {
    setActiveDrawCardIndex(null);
    setDrawnHandCardCount(HAND_SIZE);
    setIsDrawingHand(false);
    setIsResolvingDay(false);
  };

  const clearCoinResolutionAnimation = () => {
    if (coinCounterAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(coinCounterAnimationFrameRef.current);
      coinCounterAnimationFrameRef.current = null;
    }
  };

  const startHandDrawAnimation = (nextHandCount: number) => {
    if (handDrawTimeoutRef.current !== null) {
      window.clearTimeout(handDrawTimeoutRef.current);
      handDrawTimeoutRef.current = null;
    }

    if (nextHandCount <= 0) {
      finishHandDrawAnimation();
      return;
    }

    setDrawnHandCardCount(0);
    setIsDrawingHand(true);

    const animateNextDraw = (index: number) => {
      setActiveDrawCardIndex(index);
      handDrawTimeoutRef.current = window.setTimeout(() => {
        setDrawnHandCardCount(index + 1);

        if (index + 1 >= nextHandCount) {
          handDrawTimeoutRef.current = window.setTimeout(() => {
            handDrawTimeoutRef.current = null;
            finishHandDrawAnimation();
          }, 70);

          return;
        }

        animateNextDraw(index + 1);
      }, HAND_DRAW_ANIMATION_DURATION_MS);
    };

    animateNextDraw(0);
  };

  const finalizeEndDay = (shouldRefillHand: boolean) => {
    let nextDeckState: PrototypeDeckState | null = null;

    if (shouldRefillHand) {
      nextDeckState = discardHandAndRefill(deckState);
      setDeckState(nextDeckState);
    }

    const updatedSave = advancePrototypeDay();

    setActiveDrawCardIndex(null);
    setActiveModal(null);
    setArmedCardId(null);
    setCoinCounterDisplayValue(0);
    setCoinResolutionDelta(null);
    setDrawnHandCardCount(shouldRefillHand ? 0 : HAND_SIZE);
    setIsCoinCounterFlying(false);
    setIsDiscardingHand(false);
    setSavedRun(updatedSave);

    if (dayResolutionTimeoutRef.current !== null) {
      window.clearTimeout(dayResolutionTimeoutRef.current);
      dayResolutionTimeoutRef.current = null;
    }

    clearCoinResolutionAnimation();

    if (!shouldRefillHand) {
      setIsDrawingHand(false);
      setIsResolvingDay(false);
      return;
    }

    startHandDrawAnimation(nextDeckState?.hand.length ?? 0);
  };

  const beginYieldResolution = (
    shouldRefillHand: boolean,
    dayCoinDelta: number,
  ) => {
    if (dayCoinDelta === 0) {
      finalizeEndDay(shouldRefillHand);
      return;
    }

    clearCoinResolutionAnimation();
    setCoinCounterDisplayValue(0);
    setCoinResolutionDelta(dayCoinDelta);
    setIsCoinCounterFlying(false);

    const badgeBounds = coinBadgeRef.current?.getBoundingClientRect();
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    setCoinCounterFlyOffset({
      x: badgeBounds ? badgeBounds.left + badgeBounds.width / 2 - viewportCenterX : 320,
      y: badgeBounds ? badgeBounds.top + badgeBounds.height / 2 - viewportCenterY : -220,
    });

    const animationStartTime = performance.now();

    const animateCoinCounter = (frameTime: number) => {
      const progress = Math.min(
        1,
        (frameTime - animationStartTime) / COIN_COUNTER_COUNT_DURATION_MS,
      );

      setCoinCounterDisplayValue(Math.round(dayCoinDelta * progress));

      if (progress < 1) {
        coinCounterAnimationFrameRef.current = window.requestAnimationFrame(animateCoinCounter);
        return;
      }

      setCoinCounterDisplayValue(dayCoinDelta);
      setIsCoinCounterFlying(true);
      coinCounterAnimationFrameRef.current = null;
    };

    coinCounterAnimationFrameRef.current = window.requestAnimationFrame(animateCoinCounter);
    dayResolutionTimeoutRef.current = window.setTimeout(() => {
      finalizeEndDay(shouldRefillHand);
    }, DAY_RESOLUTION_DURATION_MS);
  };

  const handleEndDay = () => {
    if (!canRunGameplay || isResolvingDay || isDiscardingHand) {
      return;
    }

    const isRunEnding = savedRun.activeRun.day >= PROTOTYPE_RUN_LENGTH_DAYS;
    const shouldRefillHand = !isRunEnding;
    const dayCoinDelta = savedRun.activeRun.placedTiles.reduce(
      (totalCoins, tile) => totalCoins + tile.dailyCoinYield,
      0,
    );

    if (dayResolutionTimeoutRef.current !== null) {
      window.clearTimeout(dayResolutionTimeoutRef.current);
      dayResolutionTimeoutRef.current = null;
    }

    if (handDiscardTimeoutRef.current !== null) {
      window.clearTimeout(handDiscardTimeoutRef.current);
      handDiscardTimeoutRef.current = null;
    }

    setActiveModal(null);
    setArmedCardId(null);
    setIsResolvingDay(true);

    if (deckState.hand.length === 0) {
      beginYieldResolution(shouldRefillHand, dayCoinDelta);
      return;
    }

    setIsDiscardingHand(true);
    handDiscardTimeoutRef.current = window.setTimeout(() => {
      setDeckState((currentDeckState) => discardHandOnly(currentDeckState));
      setIsDiscardingHand(false);
      handDiscardTimeoutRef.current = null;
      beginYieldResolution(shouldRefillHand, dayCoinDelta);
    }, HAND_DISCARD_ANIMATION_DURATION_MS);
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

  useEffect(() => {
    return () => {
      if (dayResolutionTimeoutRef.current !== null) {
        window.clearTimeout(dayResolutionTimeoutRef.current);
      }

      clearCoinResolutionAnimation();

      if (handDrawTimeoutRef.current !== null) {
        window.clearTimeout(handDrawTimeoutRef.current);
      }

      if (handDiscardTimeoutRef.current !== null) {
        window.clearTimeout(handDiscardTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className={`gameplay-screen ${phase !== "running" ? "is-overlayed" : ""}`}>
      <div className="gameplay-screen__sky" />
      <div className="gameplay-screen__haze gameplay-screen__haze--left" />
      <div className="gameplay-screen__haze gameplay-screen__haze--right" />

      <header className="gameplay-hud">
        <div className="gameplay-hud__cluster">
          <button
            className="hud-button"
            disabled={!canRunGameplay || isResolvingDay}
            onClick={() => setActiveModal((currentModal) => (currentModal === "menu" ? null : "menu"))}
            type="button"
          >
            <span className="hud-button__key">M</span>
            <span>Menu</span>
          </button>

          <button
            className="hud-button"
            disabled={!canRunGameplay || isResolvingDay}
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
            disabled={!canRunGameplay || isResolvingDay}
            onClick={() => setActiveModal((currentModal) => (currentModal === "help" ? null : "help"))}
            type="button"
          >
            <span className="hud-button__key">H</span>
            <span>Ajuda</span>
          </button>
        </div>

        <div aria-label="Calendario da run" className="gameplay-weekline" role="list">
          {WEEK_DAY_LABELS.map((weekDayLabel, index) => (
            <span
              className={`gameplay-weekline__day ${index === currentWeekDayIndex ? "is-current" : ""}`}
              key={weekDayLabel}
              role="listitem"
            >
              {weekDayLabel}
            </span>
          ))}
        </div>

        <div className="gameplay-hud__cluster gameplay-hud__cluster--right">
          <span className="hud-pill">Aluguel {savedRun.activeRun.rentDue}</span>
          <span className="hud-pill" ref={coinBadgeRef}>
            Moedas {savedRun.activeRun.resources.coins}
          </span>
          <span className="hud-pill">Energia {availableEnergy}</span>
          <button
            className="hud-button hud-button--action"
            disabled={!canRunGameplay || isResolvingDay}
            onClick={handleEndDay}
            type="button"
          >
            <span className="hud-button__key">E</span>
            <span>{isResolvingDay ? "Resolvendo..." : "Fim do Dia"}</span>
          </button>
        </div>
      </header>

      {coinResolutionDelta !== null ? (
        <div
          aria-hidden="true"
          className={`day-coin-overlay ${
            coinResolutionDelta < 0 ? "is-negative" : "is-positive"
          } ${isCoinCounterFlying ? "is-flying" : ""}`}
        >
          <div className="day-coin-overlay__burst">
            {coinBurstParticles.map((particle) => (
              <span
                className="day-coin-overlay__particle"
                key={particle.id}
                style={
                  {
                    "--coin-particle-rotation": `${particle.rotation}deg`,
                    "--coin-particle-scale": particle.scale,
                    "--coin-particle-size": `${particle.size}px`,
                    "--coin-particle-x": `${particle.offsetX}px`,
                    "--coin-particle-y": `${particle.offsetY}px`,
                  } as CSSProperties
                }
              />
            ))}
          </div>

          <div
            className="day-coin-overlay__counter"
            style={
              {
                "--coin-counter-fly-x": `${coinCounterFlyOffset.x}px`,
                "--coin-counter-fly-y": `${coinCounterFlyOffset.y}px`,
              } as CSSProperties
            }
          >
            <span className="day-coin-overlay__counter-label">Moedas do Dia</span>
            <strong className="day-coin-overlay__counter-value">
              {coinResolutionDelta >= 0 ? "+" : ""}
              {coinCounterDisplayValue}
            </strong>
          </div>
        </div>
      ) : null}

      <div className="gameplay-stage">
        <div className="gameplay-stage__status">
          {armedCard ? (
            <div className="status-orb status-orb--active">
              <span className="status-orb__label">Carta armada</span>
              <strong className="status-orb__value">{armedCard.name}</strong>
            </div>
          ) : null}

          <div className="status-strip">
            <span className="status-strip__item">Run {savedRun.meta.completedRuns + 1}</span>
          </div>
        </div>

        <div className="gameplay-stage__canvas-shell">
          <Stage3DCanvas
            cropArmed={canRunGameplay && !isResolvingDay && armedCard?.cardKind === "crop"}
            cropTargetTileIds={cropTargetTileIds}
            expansionArmed={canRunGameplay && !isResolvingDay && armedCard?.cardKind === "tile"}
            frontierSlots={frontierSlots}
            interactionLocked={isResolvingDay}
            onPlantCrop={handlePlantCrop}
            onPlaceTile={handlePlaceTile}
            onSelectTile={setSelectedTileId}
            selectedTileId={selectedTileId}
            showHighlights={showHighlights}
            showSurfaceAccents={showSurfaceAccents}
            showTopPlateau={showTopPlateau}
            tiles={tiles}
          />
        </div>
      </div>

      {canRunGameplay ? (
        <ExpansionHand
          activeDrawCardIndex={activeDrawCardIndex}
          armedCardId={armedCardId}
          availableEnergy={availableEnergy}
          discardAnimationDurationMs={HAND_DISCARD_ANIMATION_DURATION_MS}
          drawAnimationDurationMs={HAND_DRAW_ANIMATION_DURATION_MS}
          drawnHandCardCount={drawnHandCardCount}
          discardCount={deckState.discardPile.length}
          drawCount={deckState.drawPile.length}
          hand={deckState.hand}
          isDrawing={isDrawingHand}
          isDiscarding={isDiscardingHand}
          onSelectCard={handleSelectCard}
          playableCardInstanceIds={playableCardInstanceIds}
        />
      ) : null}

      {phase === "deckbuilding" ? (
        <GameModal
          bodyClassName="game-modal__body--deckbuilder"
          dismissible={false}
          onClose={() => undefined}
          panelClassName="game-modal--fixed-body game-modal--deckbuilder-panel"
          showShortcut={false}
          size="wide"
          shortcut="Deck"
          title="Montar Baralho da Run"
        >
          <div className="builder-panel builder-panel--deck">
            <div className="builder-panel__summary">
              <div className="builder-panel__hero">
                <span className="builder-chip">Escolha {DECK_SIZE} cartas</span>
                <span className="builder-chip">Possuidas {savedRun.meta.ownedCards.reduce((total, card) => total + card.quantity, 0)}</span>
              </div>
            </div>

            <div className="collection-grid">
              {ownedCollectionCards.map((card) => {
                const ownedQuantity = getOwnedQuantity(savedRun.meta.ownedCards, card.id);
                const selectedQuantity = getSelectedQuantity(deckSelection, card.id);
                const canAddMore = selectedDeckCount < DECK_SIZE && selectedQuantity < ownedQuantity;

                return (
                  <CollectionCard
                    actions={
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
                    }
                    card={card}
                    key={card.id}
                    metaLines={[
                      `Possui ${ownedQuantity} | No deck ${selectedQuantity}`,
                      getCardMetaLine(card),
                    ]}
                  />
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
                  <CollectionCard
                    actions={
                      <button
                        className="collection-card__button collection-card__button--primary"
                        disabled={!canBuy}
                        onClick={() => handleBuyCard(card.id)}
                        type="button"
                      >
                        Comprar
                      </button>
                    }
                    card={card}
                    key={`shop-${card.id}`}
                    metaLines={[
                      `Preco ${card.purchaseCost} | Possui ${ownedQuantity}`,
                      getCardMetaLine(card),
                    ]}
                  />
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
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Rendimento</span>
                <strong className="game-modal__stat-value">{dailyCoinYieldLabel}</strong>
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
                <p className="game-modal__tip-text">Fecha o dia, sobe moedinhas por tile e, no dia 7, resolve o aluguel.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">L</span>
                <p className="game-modal__tip-text">Oculta ou mostra os highlights de selecao, hover e alvo sobre tiles e slots.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">S</span>
                <p className="game-modal__tip-text">Oculta ou mostra os slabs do terreno para depuracao visual do stage 3D.</p>
              </div>
              <div className="game-modal__tip">
                <span className="game-modal__tip-key">T</span>
                <p className="game-modal__tip-text">Oculta ou mostra a tampa superior clara dos tiles, mantendo so as laterais do prisma.</p>
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
