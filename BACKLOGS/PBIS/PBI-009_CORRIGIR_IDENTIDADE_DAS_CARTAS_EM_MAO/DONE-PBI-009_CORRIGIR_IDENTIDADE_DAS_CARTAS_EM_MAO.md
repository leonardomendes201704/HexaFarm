# PBI-009 - Corrigir Identidade das Cartas em Mao

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-008 - Estabilizacao do Loop de Cartas`

## Titulo

Corrigir chaves duplicadas e identidade de copias de cartas na mao

## Objetivo

Garantir que copias da mesma carta usem uma identidade unica por instancia durante a run, evitando erros de renderizacao e falhas de selecao ou descarte.

## Contexto

Com o deck de 24 cartas, a run passou a conter varias copias da mesma carta. O fluxo anterior usava o ID do catalogo como chave e como referencia de jogada, causando conflitos no React e na propria logica.

## Escopo

- criar identidade unica por instancia de carta na run
- ajustar a mao para renderizar com chaves unicas
- ajustar selecao e jogada para usar a instancia, nao o ID do catalogo
- manter o deck persistido baseado no ID do catalogo

## Criterios de Aceitacao

1. A mao nao gera mais warnings de `duplicate key`.
2. Cartas repetidas podem coexistir na mao sem conflitar.
3. Jogar uma copia nao remove outras copias iguais da mao.
4. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Criar instancia unica para cada copia de carta`
- `HISTORIA-002 - Ajustar renderizacao e interacao da mao`

## Tasks Derivadas

- `TASK-001` ate `TASK-004`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Core

## Status de Execucao

- Status: Concluido

## Valor Entregue

Esse PBI estabiliza o loop central de cartas, garantindo que copias repetidas funcionem corretamente em renderizacao, selecao e descarte.
