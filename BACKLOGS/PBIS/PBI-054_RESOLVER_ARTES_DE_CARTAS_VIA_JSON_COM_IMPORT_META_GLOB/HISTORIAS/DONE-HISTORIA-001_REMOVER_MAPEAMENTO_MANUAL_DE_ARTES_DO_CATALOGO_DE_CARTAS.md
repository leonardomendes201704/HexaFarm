# HISTORIA-001 - Remover Mapeamento Manual de Artes do Catalogo de Cartas

## Tipo

Historia

## Status

Concluido

## Objetivo

Fazer com que o catalogo de cartas dependa apenas do nome do arquivo definido no JSON, sem duplicar esse conhecimento em um mapa manual no codigo.

## Criterios de Aceitacao

- o `prototypeDeck` nao possui mais imports individuais de cada arte
- as artes sao resolvidas automaticamente a partir da pasta `assets/cards`
- cartas com arquivo presente passam a exibir arte sem precisar editar um mapa manual

## Tasks Concluidas

- `DONE-TASK-001`
