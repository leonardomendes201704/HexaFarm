# PBI-002 - Estrutura Base de Navegacao Entre Telas

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-001 - Experiencia Inicial e Entrada no Jogo`

## Titulo

Criar a estrutura base de navegacao entre telas do jogo `HexaFarm`

## Objetivo

Implementar a navegacao inicial entre a tela de entrada e os fluxos basicos de `Novo Jogo`, `Continuar` e `Opcoes`, preparando o frontend para evoluir sem acoplamento excessivo em uma unica tela.

## Contexto

O `PBI-001` validou a tela inicial e os botoes principais, mas ainda tratava o fluxo em uma unica view. O proximo passo e separar a entrada em rotas reais para sustentar o crescimento do jogo e das futuras telas.

## Escopo

- adicionar estrutura de roteamento ao app
- manter a tela inicial como rota principal
- criar rotas base para `Novo Jogo`, `Continuar` e `Opcoes`
- permitir retorno claro para a tela inicial
- preservar a leitura visual do projeto

## Fora de Escopo

- gameplay real da run
- tela final do mapa hexagonal
- configuracoes completas
- sistema completo de carregamento de save
- navegacao profunda de meta-progressao

## Requisitos Funcionais

1. A aplicacao deve possuir uma rota inicial para a tela de entrada.
2. A acao `Novo Jogo` deve navegar para uma tela dedicada.
3. A acao `Continuar` deve navegar para uma tela dedicada quando houver save.
4. A acao `Opcoes` deve navegar para uma tela dedicada.
5. As telas secundarias devem permitir retorno para a home.
6. A navegacao deve manter a base pronta para crescimento futuro.

## Criterios de Aceitacao

1. A home continua sendo a primeira tela do app.
2. Os botoes principais da home disparam navegacao real.
3. `Continuar` permanece desabilitado sem save.
4. Com save valido, `Continuar` navega para a tela correspondente.
5. Existe uma tela de `Opcoes` separada da home.
6. O build continua valido apos a introducao do roteamento.

## Historias Derivadas

- `HISTORIA-001 - Configurar a base de roteamento do aplicativo`
- `HISTORIA-002 - Conectar a tela inicial as rotas principais`
- `HISTORIA-003 - Criar telas placeholder para os fluxos iniciais`

## Tasks Derivadas

- `TASK-001` ate `TASK-006`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Support

## Status de Execucao

- Status: Concluido
- Data da entrega base: 2026-02-28
- Build validado: Sim
- Marcador de arquivo: `DONE-`

## Implementacao Realizada

Esta entrega implementou:

- roteamento inicial com `react-router-dom`
- separacao da home em uma screen dedicada
- rotas reais para `Novo Jogo`, `Continuar` e `Opcoes`
- protecao simples da rota `Continuar` por save local
- telas placeholder desacopladas da home
- retorno claro para a tela inicial

## Tasks Executadas Nesta Entrega

- `TASK-001 - Adicionar Estrutura de Roteamento`
- `TASK-002 - Estruturar Rotas Raiz do App`
- `TASK-003 - Conectar Acoes da Home a Navegacao`
- `TASK-004 - Criar Tela Placeholder de Novo Jogo`
- `TASK-005 - Criar Tela Placeholder de Continuar`
- `TASK-006 - Criar Tela Placeholder de Opcoes`

## Valor Entregue

Esse PBI separa responsabilidades da home e cria a primeira camada real de navegacao do frontend, reduzindo acoplamento e preparando o projeto para as proximas features.
