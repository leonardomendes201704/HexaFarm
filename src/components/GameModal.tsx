import type { MouseEvent, PropsWithChildren } from "react";

type GameModalProps = PropsWithChildren<{
  onClose: () => void;
  shortcut: string;
  title: string;
}>;

export function GameModal({ children, onClose, shortcut, title }: GameModalProps) {
  const handlePanelClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="game-modal-backdrop" onClick={onClose} role="presentation">
      <section
        aria-label={title}
        aria-modal="true"
        className="game-modal"
        onClick={handlePanelClick}
        role="dialog"
      >
        <header className="game-modal__header">
          <div className="game-modal__heading">
            <p className="game-modal__eyebrow">Atalho {shortcut}</p>
            <h2 className="game-modal__title">{title}</h2>
          </div>

          <button className="game-modal__close" onClick={onClose} type="button">
            Fechar
          </button>
        </header>

        <div className="game-modal__body">{children}</div>
      </section>
    </div>
  );
}
