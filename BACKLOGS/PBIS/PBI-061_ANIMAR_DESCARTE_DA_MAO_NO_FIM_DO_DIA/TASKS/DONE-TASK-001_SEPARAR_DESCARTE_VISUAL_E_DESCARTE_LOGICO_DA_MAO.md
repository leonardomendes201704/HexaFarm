# DONE-TASK-001 - Separar Descarte Visual e Descarte Logico da Mao

## Status

Concluido

## Implementacao

- criacao da funcao `discardHandOnly` para mover a mao ao descarte sem refill imediato
- ajuste do fluxo de `Fim do Dia` para executar primeiro a animacao da mao e depois a resolucao do turno

## O que voce deve ver na execucao

- ao clicar em `Fim do Dia`, a mao nao some instantaneamente
- a transicao visual acontece antes do refill e antes do proximo dia aparecer
