# CHANGELOG - HexaFarm

Este arquivo registra o historico auditavel das mudancas do projeto.

## Como registrar novas entradas

Cada entrega deve adicionar ou atualizar uma entrada com:

- data
- titulo da entrega
- resumo do que foi feito
- arquivos principais afetados
- vinculos de backlog, quando existirem
- validacao executada
- status de commit e push

Se a entrega nao tiver item de backlog associado, isso deve ser declarado.

---

## 2026-02-28 - Implementacao do PBI-005 do sistema inicial de cartas de expansao

### Resumo

Foi implementada a primeira mao de cartas de expansao do prototipo, substituindo o gatilho de expansao por botao unico por um ciclo minimo de deck, compra e descarte.

### Entregas realizadas

- criacao do `EPICO-004` e do backlog completo do `PBI-005`
- definicao do modelo inicial de cartas de expansao
- associacao entre cada carta e um tipo especifico de tile
- implementacao do ciclo minimo de deck, mao, compra e descarte
- criacao do componente visual da mao de cartas
- integracao da selecao da carta ao prototipo do mapa
- uso da carta para definir o tile criado na expansao
- conclusao do `PBI-005` e do `EPICO-004`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-004_FUNDACAO_DO_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO.md`
- `BACKLOGS/PBIS/PBI-005_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO/DONE-PBI-005_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO.md`
- `BACKLOGS/PBIS/PBI-005_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-005_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO/TASKS/DONE-*`
- `src/lib/prototypeDeck.ts`
- `src/lib/hexGrid.ts`
- `src/components/ExpansionHand.tsx`
- `src/components/HexMapPrototype.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-004 - Fundacao do Sistema Inicial de Cartas de Expansao`
- `PBI-005 - Sistema Inicial de Cartas de Expansao`
- `HISTORIA-001 - Definir o Modelo Inicial das Cartas de Expansao`
- `HISTORIA-002 - Implementar o Ciclo Minimo de Deck, Mao e Descarte`
- `HISTORIA-003 - Conectar a Selecao de Carta a Expansao do Mapa`

### Tasks executadas

- `TASK-001 - Definir Tipos e Dados das Cartas de Expansao`
- `TASK-002 - Associar Cartas a Tipos de Tile`
- `TASK-003 - Implementar Deck Minimo e Compra Inicial`
- `TASK-004 - Renderizar a Mao e Atualizar Descarte`
- `TASK-005 - Armar Expansao a partir da Carta Selecionada`
- `TASK-006 - Criar Tile Correspondente a Carta Jogada`

### Validacao executada

- `npm run build`
- verificacao manual da integracao entre a mao de cartas e o mapa

### Resultado da validacao

- build concluido com sucesso
- a expansao agora depende de uma carta selecionada
- a mao e atualizada apos cada jogada
- o tile criado corresponde ao tipo da carta utilizada

### Commit e push

- esta entrada corresponde a entrega do `PBI-005` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-004 do mapa hexagonal isometrico

### Resumo

Foi implementado o primeiro prototipo do mapa hexagonal isometrico fake 3D no fluxo de `Novo Jogo`, incluindo fronteiras validas e uma acao simples de expansao de tiles.

### Entregas realizadas

- criacao do `EPICO-003` e do backlog completo do `PBI-004`
- definicao de um modulo puro para coordenadas e regras basicas do grid hexagonal
- criacao do componente visual do tabuleiro hexagonal
- renderizacao do prototipo dentro da tela de `Novo Jogo`
- adicao da acao `Usar Carta: Abrir Clareira`
- adicao de fronteiras clicaveis para expansao
- atualizacao do save minimo ao adicionar novos tiles
- conclusao do `PBI-004` e do `EPICO-003`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-003_FUNDACAO_DO_MAPA_HEXAGONAL_ISOMETRICO.md`
- `BACKLOGS/PBIS/PBI-004_PROTOTIPO_DO_MAPA_HEXAGONAL_ISOMETRICO/DONE-PBI-004_PROTOTIPO_DO_MAPA_HEXAGONAL_ISOMETRICO.md`
- `BACKLOGS/PBIS/PBI-004_PROTOTIPO_DO_MAPA_HEXAGONAL_ISOMETRICO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-004_PROTOTIPO_DO_MAPA_HEXAGONAL_ISOMETRICO/TASKS/DONE-*`
- `src/lib/hexGrid.ts`
- `src/lib/save.ts`
- `src/components/FlowScreen.tsx`
- `src/components/HexMapPrototype.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-003 - Fundacao do Mapa Hexagonal Isometrico`
- `PBI-004 - Prototipo do Mapa Hexagonal Isometrico`
- `HISTORIA-001 - Estruturar o Modelo Inicial do Grid Hexagonal`
- `HISTORIA-002 - Renderizar o Mapa Hexagonal Fake 3D no Fluxo de Novo Jogo`
- `HISTORIA-003 - Permitir Expansao Simples de Tiles e Refletir no Save`

### Tasks executadas

- `TASK-001 - Definir Tipos e Coordenadas do Grid`
- `TASK-002 - Calcular Fronteiras Validas de Expansao`
- `TASK-003 - Renderizar Tabuleiro Hexagonal na Tela de Novo Jogo`
- `TASK-004 - Estilizar Leitura Isometrica Fake 3D`
- `TASK-005 - Adicionar Acao de Expansao Simples`
- `TASK-006 - Atualizar Metadados do Save apos Expansao`

### Validacao executada

- `npm run build`
- verificacao manual da estrutura do backlog e da tela de `Novo Jogo`

### Resultado da validacao

- build concluido com sucesso
- o fluxo `Novo Jogo` agora exibe um tabuleiro hexagonal visivel
- um novo tile pode ser adicionado em fronteiras validas
- o save reflete o aumento de tiles colocados

### Commit e push

- esta entrada corresponde a entrega do `PBI-004` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-003 de save local minimo

### Resumo

Foi implementado o primeiro sistema real de save local do projeto, substituindo o stub anterior por um modelo versionado, com migracao, leitura, escrita, exibicao na interface e limpeza manual do save.

### Entregas realizadas

- criacao do `EPICO-002` e do backlog completo do `PBI-003`
- definicao de um contrato versionado para o save local
- suporte a migracao automatica do formato stub anterior
- leitura e escrita reais no `localStorage`
- integracao do save com a home, `Novo Jogo` e `Continuar`
- exibicao de resumo persistido da run nas telas de fluxo
- criacao de uma acao de `Limpar Save Local` em `Opcoes`
- conclusao do `PBI-003` e do `EPICO-002`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-002_PERSISTENCIA_LOCAL_E_CONTINUIDADE_DE_RUN.md`
- `BACKLOGS/PBIS/PBI-003_SISTEMA_MINIMO_DE_SAVE_LOCAL/DONE-PBI-003_SISTEMA_MINIMO_DE_SAVE_LOCAL.md`
- `BACKLOGS/PBIS/PBI-003_SISTEMA_MINIMO_DE_SAVE_LOCAL/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-003_SISTEMA_MINIMO_DE_SAVE_LOCAL/TASKS/DONE-*`
- `src/lib/save.ts`
- `src/components/TitleScreen.tsx`
- `src/components/SaveSummaryCard.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/screens/ContinueScreen.tsx`
- `src/screens/OptionsScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-002 - Persistencia Local e Continuidade de Run`
- `PBI-003 - Sistema Minimo de Save Local`
- `HISTORIA-001 - Definir Modelo Versionado de Save e Persistencia`
- `HISTORIA-002 - Integrar Novo Jogo e Continuar ao Save Real`
- `HISTORIA-003 - Expor Estado e Limpeza do Save na UI`

### Tasks executadas

- `TASK-001 - Definir Contrato do Save Versionado`
- `TASK-002 - Implementar Leitura, Escrita e Migracao do Save`
- `TASK-003 - Integrar Home ao Save Real`
- `TASK-004 - Exibir Resumo Real no Fluxo de Continuar`
- `TASK-005 - Adicionar Acao de Limpar Save em Opcoes`
- `TASK-006 - Refletir Estado do Save nas Telas de Fluxo`

### Validacao executada

- `npm run build`
- verificacao manual do fluxo de save e da estrutura de backlog

### Resultado da validacao

- build concluido com sucesso
- o save antigo pode ser migrado para o novo formato
- `Continuar` depende de um save valido
- `Opcoes` pode limpar o save e invalidar a continuidade

### Commit e push

- esta entrada corresponde a entrega do `PBI-003` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Regra de resumo do que validar em execucao por task

### Resumo

Foi adicionada uma nova regra de entrega: toda task implementada deve terminar com um resumo claro do que deve ser visto em execucao para validar a mudanca.

### Entregas realizadas

- formalizacao da exigencia de resumo de validacao em execucao na diretriz de implementacao
- formalizacao da mesma regra no padrao do backlog
- definicao do bloco `O que voce deve ver na execucao` como parte esperada do fechamento de task

### Arquivos principais criados ou alterados

- `Documentacao/DIRETRIZ_DE_IMPLEMENTACAO.md`
- `BACKLOGS/README.md`
- `CHANGELOG.md`

### Vinculos de backlog

- sem item funcional de backlog associado
- mudanca de governanca aplicada como diretriz operacional do repositorio

### Validacao executada

- `npm run build`
- verificacao manual das diretrizes atualizadas

### Resultado da validacao

- build concluido com sucesso
- a regra de fechamento de task agora exige resumo observavel de validacao em execucao

### Commit e push

- esta entrada corresponde a uma mudanca de governanca e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Convencao de conclusao com prefixo DONE-

### Resumo

Foi definida uma nova regra de governanca para backlog: itens concluidos passam a ser marcados no proprio nome do arquivo com prefixo `DONE-`.

### Entregas realizadas

- formalizacao da regra de conclusao por prefixo `DONE-` na diretriz de implementacao
- formalizacao da regra no `BACKLOGS/README.md`
- renomeacao dos arquivos concluidos de tasks, historias e PBIs ja entregues
- ajuste dos PBIs concluidos para status `Concluido`
- manutencao da rastreabilidade com os IDs logicos preservados dentro do backlog

### Arquivos principais criados ou alterados

- `Documentacao/DIRETRIZ_DE_IMPLEMENTACAO.md`
- `BACKLOGS/README.md`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/DONE-PBI-001_TELA_INICIAL_HEXAFARM.md`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/TASKS/DONE-*`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/DONE-PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO.md`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/TASKS/DONE-*`
- `CHANGELOG.md`

### Vinculos de backlog

- `PBI-001 - Tela Inicial do Jogo HexaFarm`
- `PBI-002 - Estrutura Base de Navegacao Entre Telas`

### Validacao executada

- `npm run build`
- verificacao manual da estrutura de backlog apos renomeacao

### Resultado da validacao

- build concluido com sucesso
- arquivos concluidos do backlog agora seguem o padrao `DONE-`
- IDs logicos dos itens foram preservados no conteudo dos documentos

### Commit e push

- esta entrada corresponde a entrega de governanca do backlog e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-002 de navegacao base

### Resumo

Foi implementada a primeira estrutura real de navegacao do frontend, separando a home das rotas iniciais de `Novo Jogo`, `Continuar` e `Opcoes`.

### Entregas realizadas

- criacao do backlog do `PBI-002` com historias e tasks
- fechamento do `EPICO-001` como concluido
- adicao de `react-router-dom` ao frontend
- configuracao de `BrowserRouter` e da arvore de rotas do app
- extracao da home para uma screen dedicada
- conexao dos botoes principais da home a rotas reais
- criacao de telas placeholder para `Novo Jogo`, `Continuar` e `Opcoes`
- protecao da rota `Continuar` quando nao existir save
- reaproveitamento do save local stub para suportar navegacao

### Arquivos principais criados ou alterados

- `package.json`
- `package-lock.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/components/TitleScreen.tsx`
- `src/components/FlowScreen.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/screens/ContinueScreen.tsx`
- `src/screens/OptionsScreen.tsx`
- `src/lib/save.ts`
- `src/styles.css`
- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-001_EXPERIENCIA_INICIAL_E_ENTRADA_NO_JOGO.md`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/DONE-PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO.md`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/HISTORIAS/*`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/TASKS/*`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-001 - Experiencia Inicial e Entrada no Jogo`
- `PBI-002 - Estrutura Base de Navegacao Entre Telas`
- `HISTORIA-001 - Configurar a Base de Roteamento do Aplicativo`
- `HISTORIA-002 - Conectar a Home as Rotas Principais`
- `HISTORIA-003 - Criar Telas Placeholder dos Fluxos Iniciais`

### Tasks executadas

- `TASK-001 - Adicionar Estrutura de Roteamento`
- `TASK-002 - Estruturar Rotas Raiz do App`
- `TASK-003 - Conectar Acoes da Home a Navegacao`
- `TASK-004 - Criar Tela Placeholder de Novo Jogo`
- `TASK-005 - Criar Tela Placeholder de Continuar`
- `TASK-006 - Criar Tela Placeholder de Opcoes`

### Validacao executada

- `npm install react-router-dom`
- `npm run build`
- verificacao manual das rotas, arquivos e da rastreabilidade do backlog

### Resultado da validacao

- build concluido com sucesso
- rotas iniciais compiladas sem erros
- `Continuar` permanece protegido por verificacao de save

### Commit e push

- esta entrada corresponde a entrega do `PBI-002` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-001 da tela inicial

### Resumo

Foi implementada a primeira versao funcional do frontend de `HexaFarm`, incluindo a base do app web e a tela inicial jogavel do `PBI-001`.

### Entregas realizadas

- criacao da base tecnica com `Vite + React + TypeScript`
- criacao do ponto de entrada da aplicacao e configuracao de build
- implementacao da tela inicial com layout responsivo
- criacao de identidade visual inicial com composicao estilizada e atmosfera cozy
- implementacao dos botoes `Novo Jogo`, `Continuar` e `Opcoes`
- criacao de adaptador simples de save em `localStorage`
- habilitacao dinamica do botao `Continuar` conforme a existencia de save
- criacao de painel stub de `Opcoes`
- ajuste do pipeline de build para evitar artefatos desnecessarios de typecheck
- registro da execucao dentro do PBI-001

### Arquivos principais criados ou alterados

- `.gitignore`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/components/TitleScreen.tsx`
- `src/lib/save.ts`
- `src/styles.css`
- `src/vite-env.d.ts`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/DONE-PBI-001_TELA_INICIAL_HEXAFARM.md`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-001 - Experiencia Inicial e Entrada no Jogo`
- `PBI-001 - Tela Inicial do Jogo HexaFarm`
- `HISTORIA-001 - Estruturar Identidade Visual e Composicao da Tela Inicial`
- `HISTORIA-002 - Implementar Acoes Principais de Entrada`
- `HISTORIA-003 - Controlar Continuar por Save Local`
- `HISTORIA-004 - Garantir Responsividade e Polimento Inicial`

### Tasks executadas

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

### Validacao executada

- `npm install`
- `npm run build`
- verificacao manual da estrutura gerada e da relacao entre PBI e implementacao

### Resultado da validacao

- build concluido com sucesso
- bundle de producao gerado em `dist/`
- sem erros de TypeScript durante o build
- sem gerar artefatos de configuracao fora do que deve ir para o repositorio

### Commit e push

- esta entrada corresponde a entrega do `PBI-001` e deve ser fechada com commit e push apos a atualizacao do changelog
## 2026-02-28 - Fundacao inicial do projeto e governanca de rastreabilidade

### Resumo

Foi consolidada a base documental inicial do projeto, organizada a estrutura de backlog e formalizada a regra de rastreabilidade obrigatoria para entregas futuras.

### Entregas realizadas

- criacao do GDD inicial do projeto
- criacao da diretriz de implementacao
- criacao da estrutura de backlog com epico, PBI, historias e tasks do primeiro item
- inicializacao do repositorio Git local
- configuracao do `origin` no GitHub
- primeiro commit e primeiro push para `main`
- formalizacao da exigencia de documentacao, changelog, validacao tecnica, commit e push ao fim de cada entrega

### Arquivos principais criados ou alterados

- `Documentacao/GDD_HEXAFARM.md`
- `Documentacao/DIRETRIZ_DE_IMPLEMENTACAO.md`
- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-001_EXPERIENCIA_INICIAL_E_ENTRADA_NO_JOGO.md`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/DONE-PBI-001_TELA_INICIAL_HEXAFARM.md`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/HISTORIAS/*`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/TASKS/*`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-001 - Experiencia Inicial e Entrada no Jogo`
- `PBI-001 - Tela Inicial do Jogo HexaFarm`

### Observacao de governanca

Parte desta entrada cobre mudancas de processo e governanca do repositorio. Nesse caso, a rastreabilidade e feita por documentacao institucional, mesmo quando nao houver um item funcional especifico de produto.

### Validacao executada

- build nao aplicavel nesta entrega, pois o repositorio ainda nao possui sistema de build configurado
- verificacao manual da estrutura de pastas e arquivos
- verificacao da configuracao do repositorio Git e do remote `origin`

### Commit e push

- commit local anterior realizado: `6d58676 - Add initial game documentation and backlog structure`
- commit e push desta entrega devem ser consultados no historico Git do repositorio
