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
  return (
    <section className="card-hand-panel">
      <div className="card-hand-panel__header">
        <div>
          <p className="route-note__label">Mao de Expansao</p>
          <p className="route-note__text">
            Selecione uma carta para armar a expansao. Cada carta define o tipo do proximo tile.
          </p>
        </div>

        <div className="card-hand-panel__counts">
          <span className="pill">Deck: {drawCount}</span>
          <span className="pill">Descarte: {discardCount}</span>
        </div>
      </div>

      <div className="card-hand-grid">
        {hand.map((card) => (
          <button
            className={`expansion-card expansion-card--${card.tileType} ${
              armedCardId === card.id ? "is-selected" : ""
            }`}
            disabled={!canPlayCards}
            key={card.id}
            onClick={() => onSelectCard(card.id)}
            type="button"
          >
            <span className="expansion-card__eyebrow">{getTileLabel(card.tileType)}</span>
            <strong className="expansion-card__title">{card.name}</strong>
            <span className="expansion-card__description">{card.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
