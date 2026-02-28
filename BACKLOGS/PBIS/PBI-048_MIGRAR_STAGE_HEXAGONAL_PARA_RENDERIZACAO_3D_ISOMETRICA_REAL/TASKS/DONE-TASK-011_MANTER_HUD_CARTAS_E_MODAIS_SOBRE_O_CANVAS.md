# TASK-011 - Manter HUD, Cartas e Modais Sobre o Canvas

## Status

Concluido

## Objetivo

Garantir que overlays 2D continuem intactos sobre a nova camada 3D.

## Implementacao

- o canvas 3D passou a ocupar uma camada-base explicita do stage
- o `gameplay-screen` passou a usar `isolation` para estabilizar a pilha visual
- HUD, mao e modais permanecem em camadas superiores ao canvas

## Resultado Esperado

O canvas 3D fica formalmente na base do stage, enquanto a interface 2D continua claramente sobreposta e funcional.
