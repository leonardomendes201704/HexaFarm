# TASK-001 - Implementar Toggle de Slabs 3D por Atalho

## Status

Concluido

## Objetivo

Adicionar um atalho de teclado para ocultar ou mostrar os acentos de superficie dos tiles 3D em tempo real.

## Implementacao

- foi criado um estado local na tela da run para controlar a exibicao dos slabs
- o atalho `S` alterna esse estado durante a fase `running`
- o `Stage3DCanvas` passou a aceitar a flag de visibilidade dos slabs
- a renderizacao dos `TileSurfaceAccent` respeita o toggle sem afetar os crops
- a ajuda da run foi atualizada com a nova tecla

## Resultado Esperado

Ao pressionar `S` durante a run, os slabs do terreno desaparecem e reaparecem sem interromper a interacao do stage 3D.
