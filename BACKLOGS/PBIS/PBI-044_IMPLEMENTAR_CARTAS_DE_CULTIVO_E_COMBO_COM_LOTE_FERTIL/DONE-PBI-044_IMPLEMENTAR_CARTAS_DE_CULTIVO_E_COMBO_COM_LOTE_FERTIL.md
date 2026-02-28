# PBI-044 - Implementar Cartas de Cultivo e Combo com Lote Fertil

## Tipo

PBI

## Status

Concluido

## Epic Vinculado

- `EPICO-035 - Sistema de Cultivo em Solos Ferteis`

## Objetivo

Criar cartas de cultivo como `Milho`, `Abobora` e `Tomate`, e permitir que elas sejam jogadas sobre um tile `Lote Fertil` existente no mapa, alterando visualmente e economicamente esse tile.

## Historias

- `HISTORIA-001 - Criar Cartas de Cultivo no Catalogo`
- `HISTORIA-002 - Permitir Plantio em Tile Compativel`
- `HISTORIA-003 - Exibir a Cultura Plantada no Mapa`

## Criterios de Aceitacao

- novas cartas de cultivo existem no `json`
- `Lote Fertil` aceita plantio quando esta no mapa
- `Milho`, `Abobora` e `Tomate` so podem ser jogados em alvo compativel
- o tile passa a mostrar a cultura plantada
- o rendimento diario do tile inclui o bonus do cultivo

## Resultado

- o sistema de combo entre cultivo e solo fertil foi integrado ao loop da run
- o mapa agora suporta tiles com cultura plantada e rendimento combinado
