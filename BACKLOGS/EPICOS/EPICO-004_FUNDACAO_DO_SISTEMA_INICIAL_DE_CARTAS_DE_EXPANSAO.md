# EPICO-004 - Fundacao do Sistema Inicial de Cartas de Expansao

## Tipo

Epico

## Objetivo

Substituir a interacao de expansao por botao unico por um primeiro sistema de cartas de expansao, aproximando o prototipo do loop de deckbuilder espacial de `HexaFarm`.

## Problema que Este Epico Resolve

Sem cartas reais, a expansao do mapa ainda funciona como um controle tecnico. Isso nao valida o comportamento central do jogo, em que a expansao deve ser mediada por cartas.

## Valor de Negocio

- aproxima o prototipo do core loop real
- introduz a primeira camada de deckbuilder
- prepara a base para mao, compra, descarte e futuras sinergias

## Resultado Esperado

No fluxo de `Novo Jogo`, o jogador deve ver uma mao inicial de cartas de expansao, selecionar uma carta e usá-la para adicionar um tile ao mapa.

## PBIs Vinculados

- `PBI-005 - Sistema Inicial de Cartas de Expansao`

## PBIs Futuros Naturais

- `PBI-006 - Custos, energia e ciclo de turno minimo`

## Criterios de Sucesso do Epico

1. Existe uma mao inicial de cartas visivel.
2. Cada carta representa um tipo de expansao.
3. Jogar uma carta influencia o tile criado.
4. O sistema ja possui compra e descarte minimos.

## Dependencias

- `DONE-PBI-004`

## Status

- Status: Concluido
- Data de fechamento base: 2026-02-28
