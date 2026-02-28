import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { getTileLabel } from "../lib/hexGrid";
import { getCoinYieldLabel, type CardDefinition } from "../lib/prototypeDeck";

type CardTooltipProps = {
  card: Pick<CardDefinition, "coinYield" | "description" | "energyCost" | "name" | "tileType">;
  placement?: "top" | "bottom" | "side-auto";
};

type TooltipLayout = {
  left: number;
  top: number;
  variant: "is-top" | "is-bottom" | "is-right" | "is-left";
};

const TOOLTIP_WIDTH = 300;
const TOOLTIP_MARGIN = 20;
const TOOLTIP_ESTIMATED_HALF_HEIGHT = 110;

export function CardTooltip({ card, placement = "top" }: CardTooltipProps) {
  const tileLabel = getTileLabel(card.tileType);
  const [isVisible, setIsVisible] = useState(false);
  const [layout, setLayout] = useState<TooltipLayout | null>(null);
  const [anchorElement, setAnchorElement] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    const parentElement = anchorElement?.parentElement;

    if (!parentElement) {
      return undefined;
    }

    const updateLayout = () => {
      const cardBounds = parentElement.getBoundingClientRect();
      const maxTooltipWidth = Math.min(TOOLTIP_WIDTH, window.innerWidth - 48);
      const centeredLeft = cardBounds.left + cardBounds.width / 2;
      const centeredTop = cardBounds.top + cardBounds.height / 2;

      if (placement === "side-auto") {
        const opensRight = centeredLeft <= window.innerWidth / 2;
        const rightAnchor = Math.min(
          cardBounds.right + TOOLTIP_MARGIN,
          window.innerWidth - 24 - maxTooltipWidth,
        );
        const leftAnchor = Math.max(cardBounds.left - TOOLTIP_MARGIN, 24 + maxTooltipWidth);
        const sideTop = Math.min(
          Math.max(centeredTop, 24 + TOOLTIP_ESTIMATED_HALF_HEIGHT),
          window.innerHeight - 24 - TOOLTIP_ESTIMATED_HALF_HEIGHT,
        );

        setLayout({
          left: opensRight ? rightAnchor : leftAnchor,
          top: sideTop,
          variant: opensRight ? "is-right" : "is-left",
        });
        return;
      }

      const minLeft = 24 + maxTooltipWidth / 2;
      const maxLeft = window.innerWidth - 24 - maxTooltipWidth / 2;
      const nextLeft = Math.min(Math.max(centeredLeft, minLeft), Math.max(minLeft, maxLeft));
      const nextTop =
        placement === "bottom"
          ? cardBounds.bottom + TOOLTIP_MARGIN
          : cardBounds.top - TOOLTIP_MARGIN;

      setLayout({
        left: nextLeft,
        top: nextTop,
        variant: placement === "bottom" ? "is-bottom" : "is-top",
      });
    };

    const handleShow = () => {
      updateLayout();
      setIsVisible(true);
    };

    const handleHide = () => {
      setIsVisible(false);
    };

    parentElement.addEventListener("pointerenter", handleShow);
    parentElement.addEventListener("pointerleave", handleHide);
    parentElement.addEventListener("focusin", handleShow);
    parentElement.addEventListener("focusout", handleHide);

    return () => {
      parentElement.removeEventListener("pointerenter", handleShow);
      parentElement.removeEventListener("pointerleave", handleHide);
      parentElement.removeEventListener("focusin", handleShow);
      parentElement.removeEventListener("focusout", handleHide);
    };
  }, [anchorElement, placement]);

  useEffect(() => {
    if (!isVisible || !anchorElement?.parentElement) {
      return undefined;
    }

    const updateLayout = () => {
      const parentElement = anchorElement.parentElement;

      if (!parentElement) {
        return;
      }

      const cardBounds = parentElement.getBoundingClientRect();
      const maxTooltipWidth = Math.min(TOOLTIP_WIDTH, window.innerWidth - 48);
      const centeredLeft = cardBounds.left + cardBounds.width / 2;
      const centeredTop = cardBounds.top + cardBounds.height / 2;

      if (placement === "side-auto") {
        const opensRight = centeredLeft <= window.innerWidth / 2;
        const rightAnchor = Math.min(
          cardBounds.right + TOOLTIP_MARGIN,
          window.innerWidth - 24 - maxTooltipWidth,
        );
        const leftAnchor = Math.max(cardBounds.left - TOOLTIP_MARGIN, 24 + maxTooltipWidth);
        const sideTop = Math.min(
          Math.max(centeredTop, 24 + TOOLTIP_ESTIMATED_HALF_HEIGHT),
          window.innerHeight - 24 - TOOLTIP_ESTIMATED_HALF_HEIGHT,
        );

        setLayout({
          left: opensRight ? rightAnchor : leftAnchor,
          top: sideTop,
          variant: opensRight ? "is-right" : "is-left",
        });
        return;
      }

      const minLeft = 24 + maxTooltipWidth / 2;
      const maxLeft = window.innerWidth - 24 - maxTooltipWidth / 2;
      const nextLeft = Math.min(Math.max(centeredLeft, minLeft), Math.max(minLeft, maxLeft));
      const nextTop =
        placement === "bottom"
          ? cardBounds.bottom + TOOLTIP_MARGIN
          : cardBounds.top - TOOLTIP_MARGIN;

      setLayout({
        left: nextLeft,
        top: nextTop,
        variant: placement === "bottom" ? "is-bottom" : "is-top",
      });
    };

    window.addEventListener("resize", updateLayout);
    window.addEventListener("scroll", updateLayout, true);

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("scroll", updateLayout, true);
    };
  }, [anchorElement, isVisible, placement]);

  const tooltipStyle = layout
    ? ({
        left: `${layout.left}px`,
        top: `${layout.top}px`,
      } as CSSProperties)
    : undefined;

  return (
    <>
      <span aria-hidden="true" className="card-tooltip-anchor" ref={setAnchorElement} />
      {isVisible && layout
        ? createPortal(
            <span aria-hidden="true" className={`card-tooltip ${layout.variant}`} style={tooltipStyle}>
              <span className="card-tooltip__eyebrow">
                {tileLabel} - {card.energyCost} energia
              </span>
              <strong className="card-tooltip__title">{card.name}</strong>
              <span className="card-tooltip__text">{card.description}</span>
              <span className="card-tooltip__effect">
                Ao jogar: adiciona 1 tile de {tileLabel.toLowerCase()} em uma borda livre do mapa.
              </span>
              <span className={`card-tooltip__yield ${card.coinYield < 0 ? "is-negative" : "is-positive"}`}>
                Rendimento {getCoinYieldLabel(card.coinYield)} no fim do dia.
              </span>
            </span>,
            document.body,
          )
        : null}
    </>
  );
}
