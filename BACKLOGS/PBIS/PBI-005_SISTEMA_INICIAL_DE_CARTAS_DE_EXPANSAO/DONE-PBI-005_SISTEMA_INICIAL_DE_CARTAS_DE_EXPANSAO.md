# PBI-005 - Sistema Inicial de Cartas de Expansao

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-004 - Fundacao do Sistema Inicial de Cartas de Expansao`

## Titulo

Implementar um sistema inicial de cartas de expansao para o prototipo de `HexaFarm`

## Objetivo

Introduzir uma mao minima de cartas de expansao que substitua o botao unico de crescimento do mapa, conectando cada carta a um tipo de tile e a um ciclo simples de compra e descarte.

## Contexto

O mapa hexagonal isometrico ja existe e aceita expansao simples. O proximo passo e fazer a expansao acontecer por cartas, aproximando o prototipo do conceito de deckbuilder espacial.

## Escopo

- definir um conjunto inicial de cartas de expansao
- criar um deck minimo com compra, mao e descarte
- exibir a mao na tela de `Novo Jogo`
- permitir selecionar uma carta para armar a expansao
- consumir a carta ao colocar um tile
- repor a mao de forma simples apos o uso

## Fora de Escopo

- raridade de cartas
- custo de energia
- exaustao
- combos complexos
- deck persistido no save
- recompensas e drafts

## Requisitos Funcionais

1. O fluxo `Novo Jogo` deve mostrar uma mao de cartas.
2. Cada carta deve indicar o tipo de tile que ela cria.
3. O jogador deve conseguir selecionar uma carta para armar a expansao.
4. Ao colocar um tile, a carta usada deve sair da mao.
5. O sistema deve repor a mao com uma nova compra simples.
6. O tipo do tile criado deve refletir a carta usada.

## Criterios de Aceitacao

1. O botao unico de expansao deixa de ser o principal gatilho da feature.
2. A mao inicial de cartas aparece na tela.
3. O jogador consegue escolher uma carta e depois uma fronteira.
4. O tile criado corresponde ao tipo da carta escolhida.
5. A mao e atualizada apos o uso da carta.
6. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Definir o modelo inicial das cartas de expansao`
- `HISTORIA-002 - Implementar o ciclo minimo de deck, mao e descarte`
- `HISTORIA-003 - Conectar a selecao de carta a expansao do mapa`

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

- modelo inicial de cartas de expansao com dados proprios
- associacao direta entre carta e tipo de tile criado
- ciclo minimo de deck, mao, compra e descarte
- renderizacao da mao na tela de `Novo Jogo`
- selecao de carta para armar a expansao
- consumo da carta ao criar o tile correspondente

## Tasks Executadas Nesta Entrega

- `TASK-001 - Definir Tipos e Dados das Cartas de Expansao`
- `TASK-002 - Associar Cartas a Tipos de Tile`
- `TASK-003 - Implementar Deck Minimo e Compra Inicial`
- `TASK-004 - Renderizar a Mao e Atualizar Descarte`
- `TASK-005 - Armar Expansao a partir da Carta Selecionada`
- `TASK-006 - Criar Tile Correspondente a Carta Jogada`

## Valor Entregue

Esse PBI introduz a primeira camada real de deckbuilder no prototipo e faz a expansao do mapa depender de cartas, nao apenas de um controle tecnico.
