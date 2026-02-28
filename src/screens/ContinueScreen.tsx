import { Navigate } from "react-router-dom";
import { FlowScreen } from "../components/FlowScreen";
import { getSavedRun } from "../lib/save";

export function ContinueScreen() {
  const savedRun = getSavedRun();

  if (!savedRun) {
    return <Navigate replace to="/" />;
  }

  const formattedLastOpened = new Date(savedRun.lastOpenedAt).toLocaleString("pt-BR", {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "2-digit",
  });

  return (
    <FlowScreen
      description="O fluxo de continuidade agora e uma tela separada. Isso permite evoluir o carregamento de run sem sobrecarregar a home."
      detail="A rota de continuidade valida a existencia de save antes de abrir. Se nao existir save, a navegacao retorna automaticamente para a tela inicial."
      eyebrow="Continuar"
      highlights={["Rota protegida", "Save validado", "Fluxo preparado"]}
      title="Retomar Jornada"
    >
      <div className="route-note">
        <p className="route-note__label">Save ativo</p>
        <p className="route-note__text">
          Perfil: {savedRun.profileName} | Ultima abertura: {formattedLastOpened}
        </p>
      </div>
    </FlowScreen>
  );
}
