# EPICO-037 - Renderizacao 3D Isometrica Real do Stage

## Tipo

Epico

## Objetivo

Migrar a camada de renderizacao do mapa de um prototipo 2D/CSS para um stage 3D real, em perspectiva isometrica, preservando a logica atual de grid, save e cartas.

## Escopo

- adotar uma stack 3D para o stage
- renderizar tiles hexagonais como meshes com volume real
- manter o HUD e a mao como camadas 2D sobre o mapa
- preservar interacoes de selecao, pan e plantio

## Criterio de Conclusao

- o mapa e renderizado em 3D real com leitura isometrica
- o loop atual continua funcional sobre a nova camada visual
- a performance se mantem aceitavel no browser
