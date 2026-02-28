type TitleScreenProps = {
  canContinue: boolean;
  feedbackMessage: string;
  onContinue: () => void;
  onNewGame: () => void;
  onOpenOptions: () => void;
};

export function TitleScreen({
  canContinue,
  feedbackMessage,
  onContinue,
  onNewGame,
  onOpenOptions,
}: TitleScreenProps) {
  return (
    <div className="screen-shell">
      <div className="screen-shell__blur screen-shell__blur--left" />
      <div className="screen-shell__blur screen-shell__blur--right" />

      <main className="landing-layout">
        <section className="hero-panel" aria-label="Identidade inicial do jogo">
          <div className="hero-panel__copy">
            <p className="eyebrow">Cozy Deckbuilder Roguelite</p>
            <h1>HexaFarm</h1>
            <p className="hero-panel__description">
              Expanda uma fazenda hexagonal, compre cartas, cultive afinidades e construa uma run
              acolhedora tile por tile.
            </p>

            <div className="hero-panel__highlights">
              <span>Hexagonal</span>
              <span>Isometrico</span>
              <span>Cozy</span>
              <span>Browser-first</span>
            </div>
          </div>

          <div className="hero-panel__scene" aria-hidden="true">
            <div className="hex-scene">
              <div className="hex-tile hex-tile--pond" />
              <div className="hex-tile hex-tile--farm" />
              <div className="hex-tile hex-tile--garden" />
              <div className="hex-sprout hex-sprout--left" />
              <div className="hex-sprout hex-sprout--right" />
              <div className="cottage">
                <span className="cottage__roof" />
                <span className="cottage__body" />
              </div>
            </div>
          </div>
        </section>

        <section className="menu-panel" aria-label="Menu principal">
          <div className="menu-panel__header">
            <p className="eyebrow">Inicio da Jornada</p>
            <p className="menu-panel__status">
              {canContinue ? "Save local detectado" : "Nenhum save local encontrado"}
            </p>
          </div>

          <div className="menu-actions">
            <button className="button button--primary" onClick={onNewGame} type="button">
              Novo Jogo
            </button>

            <button
              className="button button--secondary"
              disabled={!canContinue}
              onClick={onContinue}
              type="button"
            >
              Continuar
            </button>

            <button className="button button--ghost" onClick={onOpenOptions} type="button">
              Opcoes
            </button>
          </div>

          <p className="menu-panel__feedback" role="status">
            {feedbackMessage}
          </p>

          <div className="menu-panel__footer">
            <span>PBI-001 concluido</span>
            <span>PBI-002: navegacao base conectada</span>
          </div>
        </section>
      </main>
    </div>
  );
}
