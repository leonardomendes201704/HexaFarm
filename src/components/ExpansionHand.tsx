import type { CSSProperties } from "react";
import { getTileLabel } from "../lib/hexGrid";
import type { ExpansionCard } from "../lib/prototypeDeck";

type ExpansionHandProps = {
  armedCardId: string | null;
  canPlayCards: boolean;
  discardCount: number;
  drawCount: number;
  hand: ExpansionCard[];
  onSelectCard: (cardId: string) => void;
};

export function ExpansionHand({
  armedCardId,
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
        <span className="game-hand__counter">Deck {drawCount}</span>
        <span className="game-hand__counter">Descarte {discardCount}</span>
        {!canPlayCards ? <span className="game-hand__counter">Sem fronteira</span> : null}
      </div>

      <div className="game-hand__fan">
        {hand.map((card, index) => {
          const offsetFromCenter = index - handCenter;
          const rotation = offsetFromCenter * 7;
          const verticalLift = Math.abs(offsetFromCenter) * 12;

          return (
            <button
              className={`expansion-card expansion-card--${card.tileType} ${
                armedCardId === card.id ? "is-selected" : ""
              }`}
              aria-label={`${card.name}. ${card.description}`}
              disabled={!canPlayCards}
              key={card.id}
              onClick={() => onSelectCard(card.id)}
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
                  <span className="expansion-card__spark expansion-card__spark--left" />
                  <span className="expansion-card__spark expansion-card__spark--right" />
                  <span className={`expansion-card__icon expansion-card__icon--${card.tileType}`}>
                    <span className="expansion-card__icon-core" />
                  </span>
                </span>

                <span className="expansion-card__footer">
                  <span className="expansion-card__eyebrow">{getTileLabel(card.tileType)}</span>
                  <strong className="expansion-card__title">{card.name}</strong>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
