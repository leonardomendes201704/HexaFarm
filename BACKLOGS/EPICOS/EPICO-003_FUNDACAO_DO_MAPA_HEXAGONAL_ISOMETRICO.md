# EPICO-003 - Fundacao do Mapa Hexagonal Isometrico

## Tipo

Epico

## Objetivo

Estabelecer a primeira base visual e interativa do tabuleiro hexagonal isometrico que sustenta o loop central de `HexaFarm`.

## Problema que Este Epico Resolve

Sem um prototipo do mapa hexagonal, o projeto ainda nao valida o principal diferencial de gameplay: expandir a fazenda com tiles em um tabuleiro espacial.

## Valor de Negocio

- aproxima o produto do high concept central
- valida a leitura visual do grid hexagonal
- cria a base para cartas de expansao e adjacencia

## Resultado Esperado

Ao entrar no fluxo de `Novo Jogo`, o usuario deve visualizar um tabuleiro hexagonal fake 3D/isometrico e conseguir adicionar novos tiles ao mapa por uma acao de expansao.

## PBIs Vinculados

- `PBI-004 - Prototipo do Mapa Hexagonal Isometrico`

## PBIs Futuros Naturais

- `PBI-005 - Sistema inicial de cartas de expansao`

## Criterios de Sucesso do Epico

1. Existe um mapa hexagonal visivel no browser.
2. O jogador consegue reconhecer tiles ocupados e fronteiras validas.
3. Pelo menos uma acao adiciona um tile novo ao mapa.
4. O save local consegue refletir o numero de tiles colocados.

## Dependencias

- `DONE-PBI-003`

## Status

- Status: Concluido
- Data de fechamento base: 2026-02-28
