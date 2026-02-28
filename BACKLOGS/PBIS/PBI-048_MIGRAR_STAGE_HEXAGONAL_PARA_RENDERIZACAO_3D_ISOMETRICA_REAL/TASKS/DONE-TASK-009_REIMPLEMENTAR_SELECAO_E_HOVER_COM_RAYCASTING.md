# TASK-009 - Reimplementar Selecao e Hover com Raycasting

## Status

Concluido

## Objetivo

Permitir interacao precisa com tiles e slots no mapa 3D.

## Implementacao

- a camada 3D passou a receber e tratar os callbacks de clique do mapa
- tiles e slots agora usam eventos de raycasting do `react-three-fiber`
- hover e selecao visual foram reimplementados com destaque na malha 3D
- a tela de jogo deixou de depender do `HexMapPrototype` como camada principal do stage

## Resultado Esperado

O clique e o hover do tabuleiro passam a acontecer diretamente na malha 3D, sem depender da antiga camada 2D do mapa.
