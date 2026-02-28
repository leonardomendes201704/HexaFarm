# EPICO-006 - Ciclo Minimo de Turno e Energia

## Tipo

Epico

## Objetivo

Introduzir um loop minimo de turno na tela principal, com energia limitada por dia e uma acao explicita de fim de dia para renovar recursos e manter o ritmo de jogada.

## Problema que Este Epico Resolve

O prototipo atual permite expansao continua sem custo real de acao. Isso valida o spatial deckbuilder, mas ainda nao cria cadencia de turno nem decisao de custo.

## Valor de Negocio

- aproxima o prototipo do loop incremental/deckbuilder esperado
- cria limite de acao por dia sem adicionar complexidade excessiva
- prepara a base para upgrades, passivos e producao por turno

## Resultado Esperado

Cada carta consome energia, a jogada trava ao zerar a energia e o jogador encerra o dia para recarregar energia e renovar a mao.

## PBIs Vinculados

- `PBI-007 - Energia e Ciclo Minimo de Dia`

## PBIs Futuros Naturais

- `PBI-008 - Producao passiva e recompensa ao fim do dia`

## Criterios de Sucesso do Epico

1. Cartas passam a exigir energia para serem usadas.
2. O jogador nao consegue expandir indefinidamente no mesmo dia.
3. Existe uma acao clara de fim de dia.
4. A interface deixa o estado do turno legivel.

## Dependencias

- `DONE-PBI-006`

## Status

- Status: Concluido
