import { FlowScreen } from "../components/FlowScreen";

export function OptionsScreen() {
  return (
    <FlowScreen
      description="As opcoes agora vivem em sua propria rota. O conteudo ainda e inicial, mas a estrutura de navegacao ja esta pronta para receber configuracoes reais."
      detail="Separar opcoes da home evita acoplamento visual e libera a tela inicial para focar no ponto de entrada principal do jogo."
      eyebrow="Opcoes"
      highlights={["Rota dedicada", "Stub funcional", "Retorno simples"]}
      title="Painel de Ajustes"
    >
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
    </FlowScreen>
  );
}
