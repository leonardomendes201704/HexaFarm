# TASK-001 - Reduzir a Espessura das Meshes dos Tiles 3D

## Status

Concluido

## Objetivo

Deixar a espessura dos tiles 3D em cerca de um terco da altura anterior.

## Implementacao

- criada uma escala explicita de espessura para o stage 3D
- alturas de tiles, base e slots foram recalculadas com fator `1/3`
- detalhes e props foram reposicionados para acompanhar a nova espessura

## Resultado Esperado

O stage passa a exibir tiles visualmente mais finos, com leitura mais leve e sem elementos flutuando acima da malha.
