import type { SaveSnapshot } from "../lib/save";

type SaveSummaryCardProps = {
  emptyLabel?: string;
  save: SaveSnapshot | null;
  title: string;
};

export function SaveSummaryCard({
  emptyLabel = "Nenhum save local disponivel.",
  save,
  title,
}: SaveSummaryCardProps) {
  if (!save) {
    return (
      <div className="route-note">
        <p className="route-note__label">{title}</p>
        <p className="route-note__text">{emptyLabel}</p>
      </div>
    );
  }

  return (
    <div className="route-note">
      <p className="route-note__label">{title}</p>
      <div className="save-summary-grid">
        <p className="route-note__text">
          Perfil: {save.profileName} | Sessoes: {save.sessionCount}
        </p>
        <p className="route-note__text">
          {save.activeRun.seasonLabel}, dia {save.activeRun.day}/{save.activeRun.runLengthDays} |
          Tiles: {save.activeRun.tilesPlaced}
        </p>
        <p className="route-note__text">
          Moedas: {save.activeRun.resources.coins} | Sementes: {save.activeRun.resources.seeds} |
          Energia: {save.activeRun.resources.energy}
        </p>
        <p className="route-note__text">
          Fase: {save.activeRun.phase} | Aluguel: {save.activeRun.rentDue} | Loja:{" "}
          {save.meta.collectionCoins}
        </p>
        <p className="route-note__text">Ultima acao: {save.lastActionLabel}</p>
      </div>
    </div>
  );
}
