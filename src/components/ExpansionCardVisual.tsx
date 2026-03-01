import {
  getCardEyebrowLabel,
  getCoinYieldLabel,
  type ExpansionCard,
} from "../lib/prototypeDeck";

type ExpansionCardVisualProps = {
  card: ExpansionCard;
};

export function ExpansionCardVisual({ card }: ExpansionCardVisualProps) {
  return (
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
}
