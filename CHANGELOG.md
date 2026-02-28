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
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/PBI-001_TELA_INICIAL_HEXAFARM.md`
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
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/PBI-001_TELA_INICIAL_HEXAFARM.md`
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
