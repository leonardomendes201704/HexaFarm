# DONE-PBI-061 - Animar Descarte da Mao no Fim do Dia

## Status

Concluido

## Objetivo

Adicionar uma animacao na secao da mao para que, ao acionar `Fim do Dia`, as cartas se fechem como um leque e sigam visualmente para a pilha de descarte antes da resolucao normal da run.

## Historias

- `DONE-HISTORIA-001`: animar a transicao visual da mao para o descarte no fechamento do dia

## Validacao

- `npm run build`

## Resultado esperado

- a mao converge para o centro e anima em direcao a pilha de descarte
- a pilha de descarte recebe destaque durante a transicao
- o refill da mao continua acontecendo apenas apos a resolucao do turno
