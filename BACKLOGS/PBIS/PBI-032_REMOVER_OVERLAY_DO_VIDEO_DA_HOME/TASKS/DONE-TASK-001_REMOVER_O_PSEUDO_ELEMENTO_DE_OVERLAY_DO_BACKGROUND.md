# TASK-001 - Remover o Pseudo-Elemento de Overlay do Background

## Tipo

Task

## Status

Concluido

## Historia Vinculada

- `HISTORIA-001 - Eliminar a Camada Escura Sobre o Video da Home`

## Objetivo

Eliminar a regra CSS que desenhava a camada escura por cima do video da home.

## Conclusao

- seletor `.screen-shell__background::after` removido do CSS

## Validacao em Execucao

- o fundo da home deve parecer mais claro imediatamente
- a camada escura sobre o video nao deve mais existir
