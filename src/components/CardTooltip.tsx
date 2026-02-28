import { getTileLabel } from "../lib/hexGrid";
import { getCoinYieldLabel, type CardDefinition } from "../lib/prototypeDeck";

type CardTooltipProps = {
  card: Pick<CardDefinition, "coinYield" | "description" | "energyCost" | "name" | "tileType">;
};

export function CardTooltip({ card }: CardTooltipProps) {
  const tileLabel = getTileLabel(card.tileType);

  return (
    <span aria-hidden="true" className="card-tooltip">
      <span className="card-tooltip__eyebrow">
        {tileLabel} • {card.energyCost} energia
      </span>
      <strong className="card-tooltip__title">{card.name}</strong>
      <span className="card-tooltip__text">{card.description}</span>
      <span className="card-tooltip__effect">
        Ao jogar: adiciona 1 tile de {tileLabel.toLowerCase()} em uma borda livre do mapa.
      </span>
      <span className={`card-tooltip__yield ${card.coinYield < 0 ? "is-negative" : "is-positive"}`}>
        Rendimento {getCoinYieldLabel(card.coinYield)} no fim do dia.
      </span>
    </span>
  );
}
