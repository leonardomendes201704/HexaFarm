# PBI-047 - Compensar Centro Vertical do Stage com Variavel Ajustavel

## Tipo

PBI

## Status

Concluido

## Epic Vinculado

- `EPICO-036 - Refinamento do HUD Superior e Ocupacao Total do Stage`

## Objetivo

Subir visualmente o centro do grid hexagonal para compensar a presenca da secao de cartas no rodape, deixando esse ajuste controlado por uma variavel simples.

## Historias

- `HISTORIA-001 - Adicionar Offset Vertical Ajustavel ao Centro do Board`

## Criterios de Aceitacao

- o board fica cerca de 50px mais alto na composicao
- o valor e controlado por uma constante clara no codigo
- o pan continua funcionando normalmente sobre esse novo centro

## Resultado

- o centro visual do mapa foi deslocado para cima
- o ajuste ficou centralizado em uma variavel dedicada no componente do mapa
