# PBI-050 - Corrigir Z-Fighting das Meshes Superficiais 3D

## Tipo

PBI

## Status

Concluido

## Epic Vinculado

- `EPICO-037 - Renderizacao 3D Isometrica Real do Stage`

## Objetivo

Eliminar o flicker visual das meshes que ficam sobre o topo dos tiles 3D durante o pan e a navegacao da camera.

## Escopo

- afastar visualmente as meshes de overlay da superficie do tile
- aplicar ajuste de profundidade nos materiais mais suscetiveis a z-fighting
- preservar a leitura visual dos detalhes de terreno e highlights

## Encerramento

- `DONE-HISTORIA-001 - Elevar e Desacoplar Meshes Superficiais do Topo do Tile`
