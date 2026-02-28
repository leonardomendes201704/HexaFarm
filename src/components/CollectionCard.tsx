import type { ReactNode } from "react";
import { CardTooltip } from "./CardTooltip";
import type { CardDefinition } from "../lib/prototypeDeck";

type CollectionCardProps = {
  actions: ReactNode;
  card: CardDefinition;
  locked?: boolean;
  metaLines: string[];
  tooltipPlacement?: "top" | "bottom" | "side-auto";
};

export function CollectionCard({
  actions,
  card,
  locked = false,
  metaLines,
  tooltipPlacement = "side-auto",
}: CollectionCardProps) {
  return (
    <article
      className={`collection-card collection-card--${card.tileType} collection-card--${card.cardKind} ${
        locked ? "is-locked" : ""
      }`.trim()}
    >
      <div className={`collection-card__art collection-card__art--${card.tileType}`}>
        {card.artAssetPath ? (
          <img alt="" aria-hidden="true" className="collection-card__art-image" src={card.artAssetPath} />
        ) : null}
        <span className="collection-card__cost">{card.energyCost}</span>
        <span className={`collection-card__yield ${card.coinYield < 0 ? "is-negative" : "is-positive"}`}>
          {card.coinYield >= 0 ? "+" : ""}
          {card.coinYield}/dia
        </span>
      </div>

      <div className="collection-card__copy">
        <strong className="collection-card__title">{card.name}</strong>
        {metaLines.map((line, index) => (
          <span className="collection-card__meta" key={`${card.id}::meta-${index}`}>
            {line}
          </span>
        ))}
      </div>

      {actions}
      <CardTooltip card={card} placement={tooltipPlacement} />
    </article>
  );
}
