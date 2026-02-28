# EPICO-013 - Feedback Visual de Coleta no Fim do Dia

## Tipo

Epico

## Objetivo

Transformar o fechamento do dia em uma resolucao visual clara, mostrando a coleta de moedas diretamente sobre cada tile antes da atualizacao do saldo da run.

## Problema que Este Epico Resolve

O rendimento diario ja existia na economia da run, mas era aplicado de forma silenciosa. Isso enfraquecia a leitura do valor de cada tile e deixava o fim do dia sem feedback concreto.

## Valor de Negocio

- reforca a legibilidade do loop incremental
- comunica visualmente o valor do mapa construido
- deixa o fechamento do dia com sensacao real de recompensa e coleta

## Resultado Esperado

Ao encerrar o dia, cada tile com rendimento gera uma pequena animacao de moedas subindo, e so depois o saldo de moedas da run e atualizado.

## PBIs Vinculados

- `PBI-014 - Animar Moedas de Rendimento no Fim do Dia`

## Dependencias

- `DONE-PBI-011`
- `DONE-PBI-013`

## Status

- Status: Concluido
