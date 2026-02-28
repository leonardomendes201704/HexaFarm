import homeBackgroundVideo from "../assets/home-background-menu.mp4";
import menuBackgroundImage from "../assets/background-menu-hexafarm.png";

type TitleScreenProps = {
  canContinue: boolean;
  onContinue: () => void;
  onNewGame: () => void;
  onOpenOptions: () => void;
};

export function TitleScreen({
  canContinue,
  onContinue,
  onNewGame,
  onOpenOptions,
}: TitleScreenProps) {
  return (
    <div className="screen-shell">
      <div aria-hidden="true" className="screen-shell__background">
        <video
          autoPlay
          className="screen-shell__background-video"
          loop
          muted
          playsInline
          poster={menuBackgroundImage}
          preload="auto"
        >
          <source src={homeBackgroundVideo} type="video/mp4" />
        </video>
      </div>
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
          </div>
        </section>

        <section className="menu-panel" aria-label="Menu principal">
          <div className="menu-panel__header">
            <p className="eyebrow">Inicio da Jornada</p>
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
        </section>
      </main>
    </div>
  );
}
