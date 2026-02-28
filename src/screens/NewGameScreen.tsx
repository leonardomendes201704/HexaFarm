import { FlowScreen } from "../components/FlowScreen";

export function NewGameScreen() {
  return (
    <FlowScreen
      description="A preparacao da run agora possui sua propria rota. O proximo passo vai substituir esse placeholder pelo setup real da fazenda hexagonal."
      detail="Ao sair da home, o frontend ja trata a jornada como um fluxo proprio. Isso reduz acoplamento e prepara a integracao com a tela do mapa."
      eyebrow="Novo Jogo"
      highlights={["Rota dedicada", "Save inicial", "Pronto para setup da run"]}
      title="Nova Jornada Preparada"
    >
      <div className="route-note">
        <p className="route-note__label">Estado atual</p>
        <p className="route-note__text">
          Um save stub foi criado antes da navegacao. O mapa, o deck inicial e a selecao de seed
          entram nos proximos PBIs.
        </p>
      </div>
    </FlowScreen>
  );
}
