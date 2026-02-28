# PBI-007 - Energia e Ciclo Minimo de Dia

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-006 - Ciclo Minimo de Turno e Energia`

## Titulo

Adicionar custo de energia por carta e uma acao de fim de dia com renovacao da mao

## Objetivo

Criar o primeiro loop de turno jogavel do prototipo, limitando a quantidade de acoes por dia e exigindo um reset controlado da jogada via `Fim do Dia`.

## Contexto

O mapa, a mao e a expansao por cartas ja estao funcionais. O proximo passo e introduzir custo e cadencia para a jogada deixar de ser infinita.

## Escopo

- adicionar custo de energia as cartas de expansao
- impedir uso de cartas sem energia suficiente
- criar acao de `Fim do Dia`
- renovar energia ao fim do dia
- renovar a mao ao fim do dia
- refletir o novo estado no HUD e no modal da run

## Fora de Escopo

- economia completa por turno
- producao automatica por tile
- buffs de estrutura
- upgrades permanentes de energia
- balanceamento final

## Requisitos Funcionais

1. Cada carta deve ter custo de energia.
2. O jogador nao pode usar carta sem energia suficiente.
3. O jogo deve oferecer uma acao clara de `Fim do Dia`.
4. Ao encerrar o dia, a energia deve ser restaurada.
5. Ao encerrar o dia, a mao deve ser renovada.
6. O dia atual deve ficar visivel na interface.

## Criterios de Aceitacao

1. Usar uma carta reduz a energia da run.
2. Cartas insuficientes em energia ficam bloqueadas.
3. `Fim do Dia` aumenta o dia atual.
4. `Fim do Dia` restaura a energia base.
5. `Fim do Dia` renova a mao sem quebrar o deck atual.
6. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Aplicar custo de energia nas cartas`
- `HISTORIA-002 - Implementar fim de dia e renovacao do turno`
- `HISTORIA-003 - Expor estado do turno na interface`

## Tasks Derivadas

- `TASK-001` ate `TASK-006`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Core

## Status de Execucao

- Status: Concluido

## Valor Entregue

Esse PBI introduz a primeira camada real de decisao por turno, criando custo, limite de acao e ritmo minimo para o prototipo com energia, fim de dia e renovacao da mao.
