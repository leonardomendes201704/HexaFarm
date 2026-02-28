# PBI-054 - Resolver Artes de Cartas via JSON com import.meta.glob

## Tipo

PBI

## Status

Concluido

## Epic Vinculado

- `EPICO-033 - Estruturacao Data-Driven do Catalogo de Cartas`

## Objetivo

Eliminar o mapeamento manual de artes das cartas e usar apenas o `imageAssetName` do catalogo JSON como fonte de verdade.

## Escopo

- substituir imports manuais por descoberta automatica de assets
- resolver as artes por nome de arquivo vindo do JSON
- manter compatibilidade com o catalogo atual sem alterar a UI

## Encerramento

- `DONE-HISTORIA-001 - Remover Mapeamento Manual de Artes do Catalogo de Cartas`
