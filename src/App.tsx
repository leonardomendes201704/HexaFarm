import { useEffect, useState } from "react";
import { TitleScreen } from "./components/TitleScreen";
import { createNewSave, hasSavedRun, touchSave } from "./lib/save";

function App() {
  const [canContinue, setCanContinue] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Escolha como voce quer iniciar sua proxima colheita.",
  );

  useEffect(() => {
    setCanContinue(hasSavedRun());
  }, []);

  const handleNewGame = () => {
    const createdSave = createNewSave();

    setCanContinue(true);
    setShowOptions(false);
    setFeedbackMessage(
      `Nova jornada preparada em ${new Date(createdSave.createdAt).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })}. O botao Continuar foi habilitado com um save inicial.`,
    );
  };

  const handleContinue = () => {
    if (!canContinue) {
      return;
    }

    const activeSave = touchSave();

    setShowOptions(false);
    setFeedbackMessage(
      `Save local encontrado. Stub de continuidade atualizado em ${new Date(activeSave.lastOpenedAt).toLocaleTimeString(
        "pt-BR",
        {
          hour: "2-digit",
          minute: "2-digit",
        },
      )}.`,
    );
  };

  const handleOptions = () => {
    setShowOptions((currentValue) => !currentValue);
    setFeedbackMessage(
      showOptions
        ? "Painel de opcoes recolhido."
        : "Painel de opcoes aberto. Os ajustes detalhados entrarao em um PBI futuro.",
    );
  };

  return (
    <TitleScreen
      canContinue={canContinue}
      feedbackMessage={feedbackMessage}
      onContinue={handleContinue}
      onNewGame={handleNewGame}
      onToggleOptions={handleOptions}
      showOptions={showOptions}
    />
  );
}

export default App;

