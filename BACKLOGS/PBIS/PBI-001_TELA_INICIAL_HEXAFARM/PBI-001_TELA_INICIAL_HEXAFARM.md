# PBI-001 - Tela Inicial do Jogo HexaFarm

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-001 - Experiencia Inicial e Entrada no Jogo`

## Titulo

Criar a tela de inicio principal do jogo `HexaFarm`

## Objetivo

Implementar a primeira tela do jogo, responsavel por apresentar a identidade visual inicial de `HexaFarm` e oferecer os pontos de entrada principais para a experiencia no browser.

Essa tela deve comunicar com clareza:

- nome do jogo
- tom cozy/cute
- inicio de uma nova jornada
- continuidade de progresso salvo, quando existir

## Contexto

De acordo com o GDD e a diretriz de implementacao, a interface precisa reforcar o conceito central de um jogo cozy, estilizado e legivel em ambiente web. A tela inicial e a primeira impressao do projeto e deve preparar o jogador para o loop principal sem introduzir complexidade desnecessaria.

Este PBI e de suporte, mas tem prioridade alta porque estabelece:

- identidade do produto
- estrutura inicial de navegacao
- base para futuras telas

## Escopo

Criar uma tela inicial com:

- logo ou titulo textual `HexaFarm`
- botao `Novo Jogo`
- botao `Continuar` (desabilitado se nao houver save)
- botao `Configuracoes` ou `Opcoes`
- botao `Sair` opcional apenas se fizer sentido para a plataforma
- fundo visual coerente com o universo do jogo
- layout responsivo para desktop e mobile

## Fora de Escopo

Este PBI nao inclui:

- implementacao completa de configuracoes
- sistema completo de saves
- tutorial
- selecao de personagem
- tela de meta-progressao
- renderizacao do mapa jogavel

Se necessario, os botoes podem apontar para handlers temporarios, stubs ou rotas placeholder.

## Requisitos Funcionais

1. Exibir o nome `HexaFarm` em destaque.
2. Permitir iniciar um novo jogo por meio do botao `Novo Jogo`.
3. Exibir o botao `Continuar`.
4. O botao `Continuar` deve refletir a existencia de save local:
5. Habilitado quando houver save valido.
6. Desabilitado quando nao houver save.
7. Exibir acesso a `Configuracoes` ou `Opcoes`.
8. A tela deve carregar corretamente no browser sem depender do loop principal do jogo estar pronto.

## Requisitos de UX/UI

1. A tela deve transmitir atmosfera cozy, cute e convidativa.
2. O titulo do jogo deve ser o elemento mais dominante da composicao.
3. Os botoes principais devem ter hierarquia visual clara.
4. A interface deve ter leitura limpa em resolucoes comuns de desktop e mobile.
5. O visual nao deve parecer generico; deve haver uma direcao intencional e coerente com a proposta do jogo.
6. A navegacao inicial deve ser obvia sem exigir tutorial.

## Criterios de Aceitacao

1. Ao abrir a aplicacao, a tela inicial e exibida como primeira tela visivel.
2. O nome `HexaFarm` aparece de forma destacada e legivel.
3. O usuario consegue acionar `Novo Jogo`.
4. O usuario visualiza `Continuar`, e seu estado muda corretamente conforme a existencia de save.
5. O usuario visualiza `Configuracoes` ou `Opcoes`.
6. O layout permanece utilizavel em desktop e mobile.
7. A tela transmite claramente o tom cozy/cute do produto.
8. A tela pode ser integrada ao restante do fluxo sem refatoracao estrutural relevante.

## Consideracoes Tecnicas

- A tela deve ser implementada em React.
- O componente deve ser desacoplado da logica central de gameplay.
- A verificacao de save deve vir de uma camada de persistencia ou adaptador simples, e nao de logica embutida na UI.
- Se houver navegacao, preferir rotas ou estado de tela simples e previsivel.
- Animacoes devem ser leves e nao bloquear interacao.

## Dependencias

Dependencias minimas:

- estrutura base do app React
- rota inicial ou tela raiz
- adaptador simples para leitura de save local (mesmo que mockado)

## Historias Derivadas

- `HISTORIA-001 - Estruturar identidade visual e composicao da tela inicial`
- `HISTORIA-002 - Implementar acoes principais de entrada`
- `HISTORIA-003 - Controlar o estado do botao Continuar por save local`
- `HISTORIA-004 - Garantir responsividade e polimento inicial`

## Tasks Derivadas

- `TASK-001` ate `TASK-010`, detalhadas na pasta `TASKS`

## Riscos

- Tornar a tela generica demais e descaracterizar a identidade do jogo.
- Acoplar a tela inicial ao sistema final de save antes da hora.
- Gastar tempo excessivo em polimento visual antes da estrutura de navegacao estar pronta.

## Definicao de Pronto

Este PBI estara pronto quando:

- a tela inicial existir e abrir como entrada principal da aplicacao
- os botoes principais estiverem visiveis e funcionais
- o estado de `Continuar` responder ao save local
- o layout estiver adequado para web
- a base estiver pronta para conectar as proximas telas

## Prioridade

Alta

## Classificacao

Support

## Status de Execucao

- Status: Implementado
- Data da entrega base: 2026-02-28
- Build validado: Sim

## Implementacao Realizada

Esta entrega implementou a base funcional do `PBI-001` com:

- bootstrap do app web em `Vite + React + TypeScript`
- tela inicial responsiva com identidade visual inicial de `HexaFarm`
- acoes de `Novo Jogo`, `Continuar` e `Opcoes`
- adaptador simples de save local em `localStorage`
- habilitacao dinamica do botao `Continuar`
- painel stub de `Opcoes`

## Tasks Executadas Nesta Entrega

- `TASK-001 - Criar Tela Raiz e Ponto de Entrada`
- `TASK-002 - Montar Layout Base da Tela Inicial`
- `TASK-003 - Implementar Titulo e Branding Base`
- `TASK-004 - Implementar Menu Principal e Botoes`
- `TASK-005 - Conectar Acao de Novo Jogo`
- `TASK-006 - Criar Adaptador de Leitura de Save`
- `TASK-007 - Implementar Estado do Botao Continuar`
- `TASK-008 - Criar Acesso Stub de Configuracoes`
- `TASK-009 - Ajustar Responsividade e Acessibilidade Inicial`
- `TASK-010 - Aplicar Fundo Visual e Microanimacoes Leves`

## Valor Entregue

Esse PBI entrega a primeira camada de identidade e navegacao do produto. Ele nao valida o core loop sozinho, mas cria a porta de entrada correta para o jogo e organiza a estrutura inicial da experiencia do usuario.

## Proximos PBIs Naturais

1. PBI-002 - Estrutura base de navegacao entre telas
2. PBI-003 - Sistema minimo de save local
3. PBI-004 - Prototipo do mapa hexagonal isometrico
