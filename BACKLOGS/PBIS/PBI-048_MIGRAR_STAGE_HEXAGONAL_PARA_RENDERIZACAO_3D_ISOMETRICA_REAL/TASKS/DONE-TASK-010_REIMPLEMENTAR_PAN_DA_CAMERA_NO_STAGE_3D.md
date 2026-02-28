# TASK-010 - Reimplementar Pan da Camera no Stage 3D

## Status

Concluido

## Objetivo

Substituir o pan do stage 2D por movimentacao adequada da camera no mapa 3D.

## Implementacao

- implementado deslocamento real da camera ortografica do stage 3D
- o arraste com botao direito agora altera o enquadramento do mapa em coordenadas do mundo
- o pan reaproveita uma escala configuravel para traduzir pixels em deslocamento do stage

## Resultado Esperado

O mapa 3D volta a poder ser arrastado com RMB, agora movendo a camera ortografica em vez de mover uma camada 2D.
