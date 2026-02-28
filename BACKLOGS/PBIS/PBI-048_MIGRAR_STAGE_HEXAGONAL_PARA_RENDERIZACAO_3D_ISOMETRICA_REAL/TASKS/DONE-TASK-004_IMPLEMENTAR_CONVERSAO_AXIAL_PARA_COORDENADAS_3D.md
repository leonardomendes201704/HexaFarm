# TASK-004 - Implementar Conversao Axial para Coordenadas 3D

## Status

Concluido

## Objetivo

Transformar as coordenadas axiais do grid atual em posicoes do mundo 3D.

## Implementacao

- criado o modulo `hexGrid3d.ts`
- definidas constantes de raio, altura e espacamento do hexagono no mundo 3D
- implementada a conversao axial flat-top para coordenadas `[x, y, z]`
- a base do stage 3D ja passa a usar essa conversao como referencia

## Resultado Esperado

O projeto passa a ter uma funcao centralizada para traduzir o grid logico atual em posicoes coerentes do mundo 3D.
