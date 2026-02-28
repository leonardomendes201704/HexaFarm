import type { CSSProperties } from "react";
import { CardTooltip } from "./CardTooltip";
import {
  getCardEyebrowLabel,
  getCoinYieldLabel,
  type ExpansionCard,
} from "../lib/prototypeDeck";

type ExpansionHandProps = {
  activeDrawCardIndex: number | null;
  armedCardId: string | null;
  availableEnergy: number;
  discardAnimationDurationMs: number;
  drawAnimationDurationMs: number;
  drawnHandCardCount: number;
  discardCount: number;
  drawCount: number;
  hand: ExpansionCard[];
  isDrawing: boolean;
  isDiscarding: boolean;
  onSelectCard: (cardId: string) => void;
  playableCardInstanceIds: string[];
};

export function ExpansionHand({
  activeDrawCardIndex,
  armedCardId,
  availableEnergy,
  discardAnimationDurationMs,
  drawAnimationDurationMs,
  drawnHandCardCount,
  discardCount,
  drawCount,
  hand,
  isDrawing,
  isDiscarding,
  onSelectCard,
  playableCardInstanceIds,
}: ExpansionHandProps) {
  const handCenter = (hand.length - 1) / 2;
  const playableCardIdSet = new Set(playableCardInstanceIds);
  const viewportWidth = typeof window === "undefined" ? 1440 : window.innerWidth;
  const isCompactLayout = viewportWidth <= 720;
  const estimatedCardWidth = isCompactLayout
    ? Math.max(viewportWidth * 0.42, 150)
    : Math.min(viewportWidth * 0.18, 188);
  const overlapOffset = isCompactLayout ? 16 : 28;
  const collapseStep = Math.max(Math.round(estimatedCardWidth - overlapOffset), 0);
  const discardCollapseDurationMs = Math.round(discardAnimationDurationMs * 0.53);
  const activeDrawCard =
    activeDrawCardIndex !== null && activeDrawCardIndex >= 0 && activeDrawCardIndex < hand.length
      ? hand[activeDrawCardIndex]
      : null;

  const renderCardFrame = (card: ExpansionCard) => (
    <span className="expansion-card__frame">
      <span className={`expansion-card__art expansion-card__art--${card.tileType}`}>
        {card.artAssetPath ? (
          <img
            alt=""
            aria-hidden="true"
            className="expansion-card__art-image"
            src={card.artAssetPath}
          />
        ) : null}
        <span className="expansion-card__cost">{card.energyCost}</span>
        <span
          className={`expansion-card__yield ${
            card.coinYield < 0 ? "is-negative" : "is-positive"
          }`}
        >
          {getCoinYieldLabel(card.coinYield)}
        </span>
        {!card.artAssetPath ? (
          <>
            <span className="expansion-card__spark expansion-card__spark--left" />
            <span className="expansion-card__spark expansion-card__spark--right" />
            <span className={`expansion-card__icon expansion-card__icon--${card.tileType}`}>
              <span className="expansion-card__icon-core" />
            </span>
          </>
        ) : null}
      </span>

      <span className="expansion-card__footer">
        <span className="expansion-card__eyebrow">{getCardEyebrowLabel(card)}</span>
        <strong className="expansion-card__title">{card.name}</strong>
        <span className="expansion-card__yield-text">
          {card.cardKind === "crop"
            ? `Bonus ${getCoinYieldLabel(card.coinYield)}`
            : `Rendimento ${getCoinYieldLabel(card.coinYield)}`}
        </span>
      </span>
    </span>
  );

  return (
    <section
      aria-label="Mao de expansao"
      className={`game-hand ${isDiscarding ? "is-discarding" : ""} ${isDrawing ? "is-drawing" : ""}`}
      style={
        {
          "--hand-discard-duration": `${discardAnimationDurationMs}ms`,
          "--hand-discard-collapse-duration": `${discardCollapseDurationMs}ms`,
          "--hand-draw-duration": `${drawAnimationDurationMs}ms`,
        } as CSSProperties
      }
    >
      <div className="game-hand__layout">
        <div className="card-pile">
          <div className="card-pile__stack">
            <span className="card-pile__card card-pile__card--back" />
            <span className="card-pile__card card-pile__card--back" />
            <span className="card-pile__card card-pile__card--front">Compra</span>
          </div>
          <span className="card-pile__count">{drawCount}</span>
        </div>

        <div className="game-hand__fan">
          {hand.map((card, index) => {
            const offsetFromCenter = index - handCenter;
            const rotation = offsetFromCenter * 7;
            const verticalLift = Math.abs(offsetFromCenter) * 12;
            const canAffordCard = availableEnergy >= card.energyCost;
            const canPlayCard = playableCardIdSet.has(card.instanceId) && canAffordCard;
            const discardCollapseX = Math.round(-offsetFromCenter * collapseStep);
            const isHiddenInDraw = isDrawing && index >= drawnHandCardCount;

            return (
              <button
                className={`expansion-card expansion-card--${card.tileType} ${
                  card.cardKind === "crop" ? "expansion-card--crop" : "expansion-card--tile"
                } ${
                  armedCardId === card.instanceId ? "is-selected" : ""
                } ${!canAffordCard ? "is-muted" : ""} ${isDiscarding ? "is-discarding" : ""} ${
                  isHiddenInDraw ? "is-hidden-in-draw" : ""
                }`}
                aria-label={`${card.name}. ${card.description}`}
                disabled={!canPlayCard || isDiscarding || isDrawing}
                key={card.instanceId}
                onClick={() => onSelectCard(card.instanceId)}
                style={
                  {
                    "--card-rotation": `${rotation}deg`,
                    "--card-vertical-offset": `${verticalLift}px`,
                    "--discard-collapse-x": `${discardCollapseX}px`,
                    "--draw-target-offset-x": `${Math.round(offsetFromCenter * collapseStep)}px`,
                  } as CSSProperties
                }
                type="button"
              >
                {renderCardFrame(card)}
                <CardTooltip card={card} />
              </button>
            );
          })}
        </div>

        {isDrawing && activeDrawCard ? (
          <div
            aria-hidden="true"
            className={`expansion-card expansion-card--${activeDrawCard.tileType} ${
              activeDrawCard.cardKind === "crop" ? "expansion-card--crop" : "expansion-card--tile"
            } expansion-card--draw-proxy`}
            style={
              {
                "--card-rotation": "0deg",
                "--card-vertical-offset": "0px",
                "--draw-target-offset-x":
                  activeDrawCardIndex !== null
                    ? `${Math.round((activeDrawCardIndex - handCenter) * collapseStep)}px`
                    : "0px",
              } as CSSProperties
            }
          >
            {renderCardFrame(activeDrawCard)}
          </div>
        ) : null}

        {isDiscarding && hand.length > 0 ? (
          <div aria-hidden="true" className="game-hand__discard-proxy">
            <span className="game-hand__discard-proxy-card game-hand__discard-proxy-card--back" />
            <span className="game-hand__discard-proxy-card game-hand__discard-proxy-card--back-secondary" />
            <span className="game-hand__discard-proxy-card game-hand__discard-proxy-card--front" />
          </div>
        ) : null}

        <div className="card-pile">
          <div className="card-pile__stack card-pile__stack--discard">
            <span className="card-pile__card card-pile__card--back" />
            <span className="card-pile__card card-pile__card--back" />
            <span className="card-pile__card card-pile__card--front">Descarte</span>
          </div>
          <span className="card-pile__count">{discardCount}</span>
        </div>
      </div>
    </section>
  );
}
