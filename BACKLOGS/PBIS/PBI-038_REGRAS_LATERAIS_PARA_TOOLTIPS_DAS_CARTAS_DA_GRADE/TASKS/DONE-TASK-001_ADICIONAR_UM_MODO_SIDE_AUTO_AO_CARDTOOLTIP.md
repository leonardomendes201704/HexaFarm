# TASK-001 - Adicionar um Modo Side-Auto ao CardTooltip

## Tipo

Task

## Status

Concluido

## Historia Vinculada

- `HISTORIA-001 - Reposicionar Horizontalmente os Tooltips da Grade`

## Objetivo

Criar uma regra automatica no tooltip para decidir se ele abre para a direita ou para a esquerda.

## Conclusao

- `CardTooltip` passou a aceitar `placement=\"side-auto\"`
- o componente calcula automaticamente o lado de abertura

## Validacao em Execucao

- em cartas da metade esquerda, o tooltip deve abrir para a direita
- em cartas da metade direita, o tooltip deve abrir para a esquerda
