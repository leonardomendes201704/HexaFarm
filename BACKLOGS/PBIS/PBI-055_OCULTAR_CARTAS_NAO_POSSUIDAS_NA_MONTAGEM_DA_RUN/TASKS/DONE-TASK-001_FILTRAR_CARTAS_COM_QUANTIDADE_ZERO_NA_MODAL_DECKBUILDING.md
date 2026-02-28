# TASK-001 - Filtrar Cartas com Quantidade Zero na Modal Deckbuilding

## Status

Concluido

## Objetivo

Mostrar na montagem da run apenas cartas que tenham quantidade possuida maior que zero.

## Implementacao

- foi criada uma lista derivada apenas com cartas possuidas
- a grade da modal `Montar Baralho da Run` passou a iterar essa lista filtrada
- a exibicao de estados `locked` deixou de ser necessaria nessa modal

## Resultado Esperado

Cartas ainda nao compradas desaparecem da tela de montagem da run e ficam visiveis apenas na loja quando aparecerem como oferta.
