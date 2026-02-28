# TASK-001 - Implementar Toggle do Topo Claro dos Tiles 3D

## Status

Concluido

## Objetivo

Adicionar um atalho de teclado para ocultar ou mostrar a malha superior clara dos prismas hexagonais.

## Implementacao

- foi criado um estado local para controlar a visibilidade da tampa superior dos prismas
- o atalho `T` alterna esse estado durante a run
- o `Stage3DCanvas` passou a aceitar a flag de exibicao do topo
- o `HexPrismMesh3D` passou a renderizar a malha superior de forma condicional
- a ajuda da run foi atualizada com a nova tecla

## Resultado Esperado

Ao pressionar `T` durante a run, a tampa superior clara dos tiles e slots desaparece e reaparece sem afetar as laterais do prisma.
