import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameModal } from "../components/GameModal";
import { TitleScreen } from "../components/TitleScreen";
import homeMenuBgmTrack from "../assets/home-bgm-blocklight-horizon.mp3";
import { requestGameFullscreen } from "../lib/browserFullscreen";
import { createNewSave, getSavedRun, type SaveSnapshot, continueSavedRun } from "../lib/save";

export function HomeScreen() {
  const navigate = useNavigate();
  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(null);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(true);
  const homeBgmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setSavedRun(getSavedRun());
  }, []);

  useEffect(() => {
    const homeBgm = new Audio(homeMenuBgmTrack);

    homeBgm.loop = true;
    homeBgm.volume = 0.32;
    homeBgmRef.current = homeBgm;

    return () => {
      homeBgm.pause();
      homeBgm.currentTime = 0;

      if (homeBgmRef.current === homeBgm) {
        homeBgmRef.current = null;
      }
    };
  }, []);

  const stopHomeBgm = () => {
    const homeBgm = homeBgmRef.current;

    if (!homeBgm) {
      return;
    }

    homeBgm.pause();
    homeBgm.currentTime = 0;
  };

  const handleDismissWelcomeModal = () => {
    void requestGameFullscreen();
    setIsWelcomeModalOpen(false);

    const homeBgm = homeBgmRef.current;

    if (!homeBgm) {
      return;
    }

    homeBgm.currentTime = 0;
    void homeBgm.play().catch(() => undefined);
  };

  const handleNewGame = async () => {
    stopHomeBgm();
    await requestGameFullscreen();

    const freshSave = createNewSave();

    setSavedRun(freshSave);
    navigate("/run/new");
  };

  const handleContinue = () => {
    if (!savedRun) {
      return;
    }

    stopHomeBgm();
    const updatedSave = continueSavedRun();

    setSavedRun(updatedSave);
    navigate("/run/continue");
  };

  const handleOpenOptions = () => {
    stopHomeBgm();
    navigate("/options");
  };

  const canContinue = savedRun !== null;
  const feedbackMessage = savedRun
    ? `Save em fase ${savedRun.activeRun.phase}, dia ${savedRun.activeRun.day}/${savedRun.activeRun.runLengthDays}. Aluguel atual: ${savedRun.activeRun.rentDue}.`
    : "Nenhum save ativo. Use Novo Jogo para criar a primeira run persistida no navegador.";
  const saveSummaryLabel = savedRun
    ? `Perfil ${savedRun.profileName} | ${savedRun.activeRun.resources.coins} moedas | Loja ${savedRun.meta.collectionCoins}`
    : null;

  return (
    <>
      <TitleScreen
        canContinue={canContinue}
        feedbackMessage={feedbackMessage}
        onContinue={handleContinue}
        onNewGame={handleNewGame}
        onOpenOptions={handleOpenOptions}
        saveSummaryLabel={saveSummaryLabel}
      />

      {isWelcomeModalOpen ? (
        <GameModal onClose={handleDismissWelcomeModal} shortcut="BGM" title="Bem-vindo a HexaFarm">
          <div className="game-modal__stack">
            <div className="route-note">
              <p className="route-note__label">Boas-vindas</p>
              <p className="route-note__text">
                Feche este modal para entrar em tela cheia e iniciar a musica ambiente do menu.
              </p>
            </div>

            <div className="game-modal__stats">
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Trilha</span>
                <strong className="game-modal__stat-value">Blocklight Horizon</strong>
              </div>
              <div className="game-modal__stat-card">
                <span className="game-modal__stat-label">Acao</span>
                <strong className="game-modal__stat-value">Fechar para tocar e abrir</strong>
              </div>
            </div>
          </div>
        </GameModal>
      ) : null}
    </>
  );
}
