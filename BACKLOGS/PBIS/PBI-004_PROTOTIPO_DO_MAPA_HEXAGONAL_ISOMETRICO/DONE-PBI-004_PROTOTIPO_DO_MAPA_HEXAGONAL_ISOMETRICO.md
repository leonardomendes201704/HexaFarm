# PBI-004 - Prototipo do Mapa Hexagonal Isometrico

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-003 - Fundacao do Mapa Hexagonal Isometrico`

## Titulo

Implementar o primeiro prototipo do mapa hexagonal isometrico em `HexaFarm`

## Objetivo

Criar um prototipo visual e interativo do tabuleiro hexagonal no fluxo de `Novo Jogo`, validando leitura isometrica fake 3D e a capacidade de adicionar tiles ao mapa.

## Contexto

O projeto ja possui tela inicial, navegacao base e save local minimo. O proximo passo e validar o principal diferencial do jogo: um mapa hexagonal espacial que cresce durante a run.

## Escopo

- renderizar um tabuleiro hexagonal fake 3D/isometrico
- exibir tiles ocupados e slots de fronteira
- permitir uma acao de expansao simples
- adicionar um tile ao clicar em uma fronteira valida
- refletir a expansao em metadados basicos do save
- manter a interface clara em browser

## Fora de Escopo

- deck completo de cartas
- regras finais de adjacencia
- camera 3D real
- react-three-fiber
- mapa persistido completo no save
- combate ou sistemas de run avancados

## Requisitos Funcionais

1. A tela de `Novo Jogo` deve exibir um mapa hexagonal visivel.
2. O mapa deve conter ao menos um tile inicial.
3. Devem existir fronteiras validas para expansao.
4. O usuario deve conseguir ativar uma acao de expansao.
5. O usuario deve conseguir adicionar um novo tile clicando em uma fronteira.
6. O save deve refletir o numero de tiles colocados.

## Criterios de Aceitacao

1. O fluxo `Novo Jogo` deixa de ser apenas um placeholder textual.
2. O usuario visualiza um tabuleiro hexagonal estilizado.
3. O usuario distingue tiles colocados de slots disponiveis.
4. Ao usar a acao de expansao, um novo tile e adicionado ao mapa.
5. O contador de tiles no save e atualizado.
6. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Estruturar o modelo inicial do grid hexagonal`
- `HISTORIA-002 - Renderizar o mapa hexagonal fake 3D no fluxo de Novo Jogo`
- `HISTORIA-003 - Permitir expansao simples de tiles e refletir no save`

## Tasks Derivadas

- `TASK-001` ate `TASK-006`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Core

## Status de Execucao

- Status: Concluido
- Data da entrega base: 2026-02-28
- Build validado: Sim
- Marcador de arquivo: `DONE-`

## Implementacao Realizada

Esta entrega implementou:

- modelo inicial de grid hexagonal em coordenadas axiais
- calculo de fronteiras validas de expansao
- renderizacao de um tabuleiro hexagonal fake 3D/isometrico
- acao simples de expansao para adicionar novos tiles
- atualizacao de metadados minimos do save ao expandir
- integracao do prototipo ao fluxo de `Novo Jogo`

## Tasks Executadas Nesta Entrega

- `TASK-001 - Definir Tipos e Coordenadas do Grid`
- `TASK-002 - Calcular Fronteiras Validas de Expansao`
- `TASK-003 - Renderizar Tabuleiro Hexagonal na Tela de Novo Jogo`
- `TASK-004 - Estilizar Leitura Isometrica Fake 3D`
- `TASK-005 - Adicionar Acao de Expansao Simples`
- `TASK-006 - Atualizar Metadados do Save apos Expansao`

## Valor Entregue

Esse PBI valida o primeiro passo concreto do loop espacial do jogo e transforma o fluxo de `Novo Jogo` em uma base real para o sistema de expansao da fazenda.
