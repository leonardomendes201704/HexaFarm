import type { CSSProperties } from "react";
import { getTileLabel } from "../lib/hexGrid";
import { getCoinYieldLabel, type ExpansionCard } from "../lib/prototypeDeck";

type ExpansionHandProps = {
  armedCardId: string | null;
  availableEnergy: number;
  canPlayCards: boolean;
  discardCount: number;
  drawCount: number;
  hand: ExpansionCard[];
  onSelectCard: (cardId: string) => void;
};

export function ExpansionHand({
  armedCardId,
  availableEnergy,
  canPlayCards,
  discardCount,
  drawCount,
  hand,
  onSelectCard,
}: ExpansionHandProps) {
  const handCenter = (hand.length - 1) / 2;

  return (
    <section aria-label="Mao de expansao" className="game-hand">
      <div className="game-hand__meta">
        <span className="game-hand__counter">Compra {drawCount}</span>
        <span className="game-hand__counter">Descarte {discardCount}</span>
        {!canPlayCards ? <span className="game-hand__counter">Sem fronteira</span> : null}
      </div>

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
            const canPlayCard = canPlayCards && canAffordCard;

            return (
              <button
                className={`expansion-card expansion-card--${card.tileType} ${
                  armedCardId === card.instanceId ? "is-selected" : ""
                } ${!canAffordCard ? "is-muted" : ""}`}
                aria-label={`${card.name}. ${card.description}`}
                disabled={!canPlayCard}
                key={card.instanceId}
                onClick={() => onSelectCard(card.instanceId)}
                style={
                  {
                    "--card-rotation": `${rotation}deg`,
                    "--card-vertical-offset": `${verticalLift}px`,
                  } as CSSProperties
                }
                title={card.description}
                type="button"
              >
                <span className="expansion-card__frame">
                  <span className={`expansion-card__art expansion-card__art--${card.tileType}`}>
                    <span className="expansion-card__cost">{card.energyCost}</span>
                    <span
                      className={`expansion-card__yield ${
                        card.coinYield < 0 ? "is-negative" : "is-positive"
                      }`}
                    >
                      {getCoinYieldLabel(card.coinYield)}
                    </span>
                    <span className="expansion-card__spark expansion-card__spark--left" />
                    <span className="expansion-card__spark expansion-card__spark--right" />
                    <span className={`expansion-card__icon expansion-card__icon--${card.tileType}`}>
                      <span className="expansion-card__icon-core" />
                    </span>
                  </span>

                  <span className="expansion-card__footer">
                    <span className="expansion-card__eyebrow">{getTileLabel(card.tileType)}</span>
                    <strong className="expansion-card__title">{card.name}</strong>
                    <span className="expansion-card__yield-text">
                      Rendimento {getCoinYieldLabel(card.coinYield)}
                    </span>
                  </span>
                </span>
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
