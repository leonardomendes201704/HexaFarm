import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TitleScreen } from "../components/TitleScreen";
import { createNewSave, hasSavedRun, touchSave } from "../lib/save";

export function HomeScreen() {
  const navigate = useNavigate();
  const [canContinue, setCanContinue] = useState(false);

  useEffect(() => {
    setCanContinue(hasSavedRun());
  }, []);

  const handleNewGame = () => {
    createNewSave();
    setCanContinue(true);
    navigate("/run/new");
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    touchSave();
    navigate("/run/continue");
  };

  const handleOpenOptions = () => {
    navigate("/options");
  };

  const feedbackMessage = canContinue
    ? "Seu ultimo save local esta pronto para retomada. A navegacao agora separa a home dos fluxos iniciais."
    : "Crie uma nova jornada para habilitar Continue e abrir o primeiro fluxo desacoplado da home.";

  return (
    <TitleScreen
      canContinue={canContinue}
      feedbackMessage={feedbackMessage}
      onContinue={handleContinue}
      onNewGame={handleNewGame}
      onOpenOptions={handleOpenOptions}
    />
  );
}
