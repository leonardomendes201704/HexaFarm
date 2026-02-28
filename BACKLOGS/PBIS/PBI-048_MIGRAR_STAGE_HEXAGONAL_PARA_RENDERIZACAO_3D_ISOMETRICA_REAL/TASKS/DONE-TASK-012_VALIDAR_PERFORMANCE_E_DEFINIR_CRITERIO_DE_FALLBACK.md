# TASK-012 - Validar Performance e Definir Criterio de Fallback

## Status

Concluido

## Objetivo

Medir o custo da renderizacao 3D e definir limites praticos para manter o jogo responsivo no browser.

## Implementacao

- definido um limiar de fallback por quantidade de tiles e fronteiras no stage
- acima desse limite o canvas reduz `dpr` e desliga detalhes secundarios de superficie e cultivo
- a politica de fallback ficou centralizada no proprio `Stage3DCanvas`

## Resultado Esperado

Quando a cena 3D cresce demais, o stage reduz detalhes automaticamente para manter a responsividade do browser.
