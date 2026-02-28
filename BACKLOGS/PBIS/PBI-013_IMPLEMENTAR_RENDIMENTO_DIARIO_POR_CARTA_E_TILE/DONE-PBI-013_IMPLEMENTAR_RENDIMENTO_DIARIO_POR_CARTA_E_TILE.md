# PBI-013 - Implementar Rendimento Diario por Carta e Tile

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-012 - Economia de Rendimento Diario dos Tiles`

## Titulo

Fazer cada carta carregar um rendimento e aplicar essa producao no fim do dia

## Objetivo

Adicionar rendimento diario por carta, persistir esse rendimento nos tiles colocados e aplicar o resultado ao fechar cada dia da run.

## Criterios de Aceitacao

1. Cada carta exibe seu rendimento diario, positivo ou negativo.
2. Tiles colocados preservam o rendimento da carta que os criou.
3. O fim do dia aplica o rendimento acumulado do mapa antes de avancar.
4. O aluguel do ultimo dia considera o rendimento do proprio dia.
5. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Definir rendimento diario nas cartas`
- `HISTORIA-002 - Persistir tiles com rendimento na run`
- `HISTORIA-003 - Aplicar producao diaria ao fechar o dia`

## Tasks Derivadas

- `TASK-001` ate `TASK-006`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Core

## Status de Execucao

- Status: Concluido

## Valor Entregue

Esse PBI introduz a primeira economia passiva real da run, baseada no mapa e diretamente ligada ao deck que o jogador escolhe.
