# TASK-002 - Migrar o Tooltip para uma Camada Fixa Global

## Tipo

Task

## Status

Concluido

## Historia Vinculada

- `HISTORIA-001 - Expandir a Modal de Deckbuilding e Desacoplar os Tooltips do Container`

## Objetivo

Fazer o tooltip sair do container rolavel e ser renderizado acima de toda a interface.

## Conclusao

- `CardTooltip` passou a usar portal em `document.body`
- tooltip ficou em `position: fixed` com `z-index` alto

## Validacao em Execucao

- o tooltip deve aparecer acima da modal e de qualquer grid
- o tooltip nao deve ser cortado pelo container da grade
