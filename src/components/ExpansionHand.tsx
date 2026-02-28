import type { CSSProperties } from "react";
import { CardTooltip } from "./CardTooltip";
import {
  getCardEyebrowLabel,
  getCoinYieldLabel,
  type ExpansionCard,
} from "../lib/prototypeDeck";

type ExpansionHandProps = {
  armedCardId: string | null;
  availableEnergy: number;
  discardCount: number;
  drawCount: number;
  hand: ExpansionCard[];
  isDiscarding: boolean;
  onSelectCard: (cardId: string) => void;
  playableCardInstanceIds: string[];
};

export function ExpansionHand({
  armedCardId,
  availableEnergy,
  discardCount,
  drawCount,
  hand,
  isDiscarding,
  onSelectCard,
  playableCardInstanceIds,
}: ExpansionHandProps) {
  const handCenter = (hand.length - 1) / 2;
  const playableCardIdSet = new Set(playableCardInstanceIds);

  return (
    <section
      aria-label="Mao de expansao"
      className={`game-hand ${isDiscarding ? "is-discarding" : ""}`}
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
            const discardCollapseX = Math.round(-offsetFromCenter * 34);
            const discardTravelAdjust = Math.round(-offsetFromCenter * 22);
            const discardStaggerMs = Math.round(Math.abs(offsetFromCenter) * 28);

            return (
              <button
                className={`expansion-card expansion-card--${card.tileType} ${
                  card.cardKind === "crop" ? "expansion-card--crop" : "expansion-card--tile"
                } ${
                  armedCardId === card.instanceId ? "is-selected" : ""
                } ${!canAffordCard ? "is-muted" : ""} ${isDiscarding ? "is-discarding" : ""}`}
                aria-label={`${card.name}. ${card.description}`}
                disabled={!canPlayCard || isDiscarding}
                key={card.instanceId}
                onClick={() => onSelectCard(card.instanceId)}
                style={
                  {
                    "--card-rotation": `${rotation}deg`,
                    "--card-vertical-offset": `${verticalLift}px`,
                    "--discard-collapse-x": `${discardCollapseX}px`,
                    "--discard-stagger": `${discardStaggerMs}ms`,
                    "--discard-travel-adjust": `${discardTravelAdjust}px`,
                  } as CSSProperties
                }
                type="button"
              >
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
                <CardTooltip card={card} />
              </button>
            );
          })}
        </div>

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
