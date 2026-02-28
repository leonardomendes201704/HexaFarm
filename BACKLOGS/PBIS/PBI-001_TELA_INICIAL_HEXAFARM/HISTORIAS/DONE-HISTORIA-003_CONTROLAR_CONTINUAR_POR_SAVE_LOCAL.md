# HISTORIA-003 - Controlar Continuar por Save Local

## Tipo

Historia

## Vinculo

- Epico: `EPICO-001`
- PBI: `PBI-001`

## Declaracao

Como jogador, quero que o botao `Continuar` reflita se existe progresso salvo, para entender se posso retomar uma partida sem comportamento confuso.

## Objetivo

Conectar a tela inicial a uma verificacao simples de persistencia para habilitar ou desabilitar o botao `Continuar` com base em save local valido.

## Escopo

- criar adaptador simples de leitura de save
- avaliar existencia de save
- refletir o estado na interface

## Criterios de Aceitacao

1. O botao `Continuar` aparece na tela inicial.
2. Sem save valido, o botao fica desabilitado.
3. Com save valido, o botao fica habilitado.
4. A logica de save nao fica acoplada diretamente ao componente visual.

## Tasks Relacionadas

- `TASK-006`
- `TASK-007`

## Definicao de Pronto

A historia estara pronta quando o estado de `Continuar` responder corretamente ao save local e puder evoluir sem refatoracao estrutural.
