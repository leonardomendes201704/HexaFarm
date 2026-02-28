import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppAudio } from "../audio/AppAudioProvider";
import { GameModal } from "../components/GameModal";
import { TitleScreen } from "../components/TitleScreen";
import { requestGameFullscreen } from "../lib/browserFullscreen";
import { createNewSave, getSavedRun, type SaveSnapshot, continueSavedRun } from "../lib/save";

export function HomeScreen() {
  const navigate = useNavigate();
  const { ensureBgmPlayback, hasUnlockedBgm } = useAppAudio();
  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(null);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(() => !hasUnlockedBgm);

  useEffect(() => {
    setSavedRun(getSavedRun());
  }, []);

  useEffect(() => {
    if (hasUnlockedBgm) {
      setIsWelcomeModalOpen(false);
    }
  }, [hasUnlockedBgm]);

  const handleDismissWelcomeModal = () => {
    void requestGameFullscreen();
    setIsWelcomeModalOpen(false);
    void ensureBgmPlayback();
  };

  const handleNewGame = async () => {
    await requestGameFullscreen();

    const freshSave = createNewSave();

    setSavedRun(freshSave);
    navigate("/run/new");
  };

  const handleContinue = () => {
    if (!savedRun) {
      return;
    }

    const updatedSave = continueSavedRun();

    setSavedRun(updatedSave);
    navigate("/run/continue");
  };

  const handleOpenOptions = () => {
    navigate("/options");
  };

  const canContinue = savedRun !== null;

  return (
    <>
      <TitleScreen
        canContinue={canContinue}
        onContinue={handleContinue}
        onNewGame={handleNewGame}
        onOpenOptions={handleOpenOptions}
      />

      {isWelcomeModalOpen ? (
        <GameModal onClose={handleDismissWelcomeModal} shortcut="BGM" title="Bem-vindo a HexaFarm">
          <div className="game-modal__stack">
            <div className="route-note">
              <p className="route-note__label">Boas-vindas</p>
              <p className="route-note__text">
                Feche este modal para entrar em tela cheia e iniciar a musica ambiente da jornada.
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
