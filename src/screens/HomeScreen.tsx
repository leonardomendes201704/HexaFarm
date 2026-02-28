import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TitleScreen } from "../components/TitleScreen";
import { createNewSave, getSavedRun, type SaveSnapshot, continueSavedRun } from "../lib/save";

export function HomeScreen() {
  const navigate = useNavigate();
  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(null);

  useEffect(() => {
    setSavedRun(getSavedRun());
  }, []);

  const handleNewGame = () => {
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
  const feedbackMessage = savedRun
    ? `Save em fase ${savedRun.activeRun.phase}, dia ${savedRun.activeRun.day}/${savedRun.activeRun.runLengthDays}. Aluguel atual: ${savedRun.activeRun.rentDue}.`
    : "Nenhum save ativo. Use Novo Jogo para criar a primeira run persistida no navegador.";
  const saveSummaryLabel = savedRun
    ? `Perfil ${savedRun.profileName} | ${savedRun.activeRun.resources.coins} moedas | Loja ${savedRun.meta.collectionCoins}`
    : null;

  return (
    <TitleScreen
      canContinue={canContinue}
      feedbackMessage={feedbackMessage}
      onContinue={handleContinue}
      onNewGame={handleNewGame}
      onOpenOptions={handleOpenOptions}
      saveSummaryLabel={saveSummaryLabel}
    />
  );
}
