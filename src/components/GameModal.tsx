import type { MouseEvent, PropsWithChildren } from "react";

type GameModalProps = PropsWithChildren<{
  bodyClassName?: string;
  dismissible?: boolean;
  onClose: () => void;
  panelClassName?: string;
  showShortcut?: boolean;
  size?: "regular" | "wide";
  shortcut: string;
  title: string;
}>;

export function GameModal({
  bodyClassName,
  children,
  dismissible = true,
  onClose,
  panelClassName,
  showShortcut = true,
  shortcut,
  size = "regular",
  title,
}: GameModalProps) {
  const handlePanelClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleBackdropClick = () => {
    if (!dismissible) {
      return;
    }

    onClose();
  };

  return (
    <div className="game-modal-backdrop" onClick={handleBackdropClick} role="presentation">
      <section
        aria-label={title}
        aria-modal="true"
        className={`game-modal ${size === "wide" ? "game-modal--wide" : ""} ${panelClassName ?? ""}`.trim()}
        onClick={handlePanelClick}
        role="dialog"
      >
        <header className="game-modal__header">
          <div className="game-modal__heading">
            {showShortcut ? <p className="game-modal__eyebrow">Atalho {shortcut}</p> : null}
            <h2 className="game-modal__title">{title}</h2>
          </div>

          {dismissible ? (
            <button className="game-modal__close" onClick={onClose} type="button">
              Fechar
            </button>
          ) : null}
        </header>

        <div className={`game-modal__body ${bodyClassName ?? ""}`.trim()}>{children}</div>
      </section>
    </div>
  );
}
