import { Navigate } from "react-router-dom";
import { FlowScreen } from "../components/FlowScreen";
import { SaveSummaryCard } from "../components/SaveSummaryCard";
import { getSavedRun } from "../lib/save";

export function NewGameScreen() {
  const savedRun = getSavedRun();

  if (!savedRun) {
    return <Navigate replace to="/" />;
  }

  return (
    <FlowScreen
      description="A preparacao da run agora cria um save local minimo real. Isso torna o fluxo de entrada persistente e pronto para sustentar o mapa hexagonal."
      detail="O save deixa de ser um stub solto e passa a carregar metadados versionados da run. Esse contrato sera reaproveitado quando o gameplay entrar."
      eyebrow="Novo Jogo"
      highlights={["Save versionado", "Run persistida", "Pronto para evolucao"]}
      title="Nova Jornada Persistida"
    >
      <SaveSummaryCard save={savedRun} title="Save criado" />
    </FlowScreen>
  );
}
