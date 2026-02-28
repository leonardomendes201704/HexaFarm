# TASK-001 - Implementar Toggle de Highlights 3D por Atalho

## Status

Concluido

## Objetivo

Adicionar um atalho de teclado para ocultar ou mostrar os highlights de selecao, hover e alvo do stage 3D.

## Implementacao

- foi criado um estado local para controlar a exibicao dos highlights
- o atalho `L` alterna esse estado durante a run
- o `Stage3DCanvas` passou a aceitar uma flag de visibilidade dos highlights
- tiles e slots deixam de receber `highlightColor` quando o toggle esta desligado
- a ajuda da run foi atualizada com a nova tecla

## Resultado Esperado

Ao pressionar `L` durante a run, os glows de highlight desaparecem e reaparecem sem afetar a interacao do mapa.
