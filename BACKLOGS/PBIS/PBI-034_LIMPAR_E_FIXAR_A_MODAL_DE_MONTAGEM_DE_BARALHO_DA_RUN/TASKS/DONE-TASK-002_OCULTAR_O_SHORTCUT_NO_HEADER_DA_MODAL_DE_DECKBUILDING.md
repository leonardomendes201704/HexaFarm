# TASK-002 - Ocultar o Shortcut no Header da Modal de Deckbuilding

## Tipo

Task

## Status

Concluido

## Historia Vinculada

- `HISTORIA-001 - Enxugar e Estruturar a Modal de Deckbuilding`

## Objetivo

Remover somente nessa modal o texto `Atalho Deck`, sem afetar os demais modais.

## Conclusao

- `GameModal` passou a suportar ocultar o shortcut no header
- modal de deckbuilding usa essa variacao

## Validacao em Execucao

- o texto `Atalho Deck` nao deve aparecer em `Montar Baralho da Run`
- os outros modais continuam podendo exibir shortcut normalmente
