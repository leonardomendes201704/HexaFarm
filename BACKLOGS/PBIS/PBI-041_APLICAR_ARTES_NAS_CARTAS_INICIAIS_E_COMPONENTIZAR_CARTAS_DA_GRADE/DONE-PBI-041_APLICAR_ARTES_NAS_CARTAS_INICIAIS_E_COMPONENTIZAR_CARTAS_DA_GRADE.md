# PBI-041 - Aplicar Artes nas Cartas Iniciais e Componentizar Cartas da Grade

## Tipo

PBI

## Status

Concluido

## Epic Vinculado

- `EPICO-032 - Integracao de Artes Reais nas Cartas`

## Objetivo

Adicionar artes reais para `Jardim Macio`, `Canal Raso` e `Trilha Selvagem`, e reduzir duplicacao da interface extraindo as cartas da grade para um componente reutilizavel.

## Historias

- `HISTORIA-001 - Integrar Artes Reais nas Cartas Basicas`
- `HISTORIA-002 - Componentizar Cartas da Colecao e da Loja`

## Criterios de Aceitacao

- `Jardim Macio` exibe a arte real
- `Canal Raso` exibe a arte real
- `Trilha Selvagem` exibe a arte real
- a grade de deckbuilding e a loja usam o mesmo componente de carta
- cartas sem arte continuam com fallback visual

## Resultado

- as tres cartas basicas passaram a usar as artes fornecidas
- `CollectionCard` centraliza a renderizacao reutilizavel da grade
