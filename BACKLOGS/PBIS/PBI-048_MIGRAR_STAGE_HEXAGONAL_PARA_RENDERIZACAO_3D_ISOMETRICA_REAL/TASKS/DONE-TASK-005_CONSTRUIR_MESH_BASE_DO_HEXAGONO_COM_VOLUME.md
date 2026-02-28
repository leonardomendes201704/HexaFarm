# TASK-005 - Construir Mesh Base do Hexagono com Volume

## Status

Concluido

## Objetivo

Criar o prisma hexagonal reutilizavel que sera a base visual dos tiles.

## Implementacao

- criado o componente reutilizavel `HexPrismMesh3D`
- a malha usa prisma hexagonal com volume real e topo destacado
- o stage 3D base ja passou a usar essa malha no lugar do placeholder direto

## Resultado Esperado

O projeto passa a ter um componente reutilizavel de hexagono 3D com volume, pronto para ser instanciado por tiles e slots.
