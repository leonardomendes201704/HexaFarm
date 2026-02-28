# TASK-001 - Elevar Overlays e Aplicar Polygon Offset

## Status

Concluido

## Objetivo

Corrigir z-fighting das meshes superficiais acima dos tiles 3D.

## Implementacao

- highlights foram elevados com uma folga real acima do topo do tile
- materiais de highlight e de overlays mais colados ao topo ganharam `polygonOffset`
- detalhes de superficie passaram a usar uma folga explicita acima da superficie

## Resultado Esperado

Os overlays e detalhes visuais deixam de cintilar durante o pan e passam a parecer desacoplados da superficie do tile.
