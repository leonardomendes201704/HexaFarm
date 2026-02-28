import { useState } from "react";
import { FlowScreen } from "../components/FlowScreen";
import { SaveSummaryCard } from "../components/SaveSummaryCard";
import { clearSavedRun, getSavedRun, type SaveSnapshot } from "../lib/save";

export function OptionsScreen() {
  const [savedRun, setSavedRun] = useState<SaveSnapshot | null>(() => getSavedRun());
  const [feedbackMessage, setFeedbackMessage] = useState(
    "Ajustes gerais e gerenciamento do save local ficam centralizados aqui.",
  );

  const handleClearSave = () => {
    clearSavedRun();
    setSavedRun(null);
    setFeedbackMessage("Save local removido. Ao voltar para a home, o botao Continuar deve ficar desabilitado.");
  };

  return (
    <FlowScreen
      description="As opcoes agora exibem o estado atual do save e oferecem um ponto direto para limpar o progresso local."
      detail="Isso torna o ciclo de persistencia validavel sem depender de devtools. O jogador consegue criar, ler e apagar o save a partir da propria interface."
      eyebrow="Opcoes"
      highlights={["Save visivel", "Limpeza local", "Validacao direta"]}
      title="Painel de Ajustes"
    >
      <SaveSummaryCard
        emptyLabel="Nenhum save local ativo. Volte para a home e use Novo Jogo para criar um."
        save={savedRun}
        title="Estado do save"
      />

      <div className="options-card">
        <div className="options-card__row">
          <span>Musica ambiente</span>
          <span className="pill">Stub</span>
        </div>
        <div className="options-card__row">
          <span>Efeitos de interface</span>
          <span className="pill">Ativo</span>
        </div>
        <div className="options-card__row">
          <span>Qualidade visual</span>
          <span className="pill">Leve</span>
        </div>
      </div>

      <button
        className="button button--danger"
        disabled={!savedRun}
        onClick={handleClearSave}
        type="button"
      >
        Limpar Save Local
      </button>

      <p className="route-note__text">{feedbackMessage}</p>
    </FlowScreen>
  );
}
