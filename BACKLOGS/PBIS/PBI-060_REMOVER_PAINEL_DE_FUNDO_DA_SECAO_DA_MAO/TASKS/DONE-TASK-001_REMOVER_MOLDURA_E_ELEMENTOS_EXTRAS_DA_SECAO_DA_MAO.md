# TASK-001 - Remover Moldura e Elementos Extras da Secao da Mao

## Status

Concluido

## Objetivo

Deixar a area da mao composta apenas por cartas e pilhas, sem o painel translucido por tras.

## Implementacao

- a secao da mao deixou de renderizar o chip `Sem alvo`
- o contêiner da mão perdeu fundo, blur, sombra, borda arredondada e padding
- a estrutura de layout das cartas e das pilhas foi preservada

## Resultado Esperado

O stage fica mais visivel por tras da mao, e restam na base da tela apenas as cartas e as pilhas de compra e descarte.
