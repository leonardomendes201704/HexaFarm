import { Navigate } from "react-router-dom";
import { FlowScreen } from "../components/FlowScreen";
import { SaveSummaryCard } from "../components/SaveSummaryCard";
import { getSavedRun } from "../lib/save";

export function ContinueScreen() {
  const savedRun = getSavedRun();

  if (!savedRun) {
    return <Navigate replace to="/" />;
  }

  return (
    <FlowScreen
      description="O fluxo de continuidade agora consome um save local versionado e exibe o estado persistido da run."
      detail="A rota de continuidade le o save salvo, mostra metadados reais e continua protegida quando nao existe um estado valido."
      eyebrow="Continuar"
      highlights={["Rota protegida", "Save real", "Resumo persistido"]}
      title="Retomar Jornada"
    >
      <SaveSummaryCard save={savedRun} title="Save carregado" />
    </FlowScreen>
  );
}
