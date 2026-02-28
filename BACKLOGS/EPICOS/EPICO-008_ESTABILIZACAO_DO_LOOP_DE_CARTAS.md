# EPICO-008 - Estabilizacao do Loop de Cartas

## Tipo

Epico

## Objetivo

Corrigir falhas tecnicas que comprometem a identidade das cartas em jogo, especialmente quando o deck possui copias da mesma carta.

## Problema que Este Epico Resolve

O prototipo passou a suportar multiplas copias da mesma carta, mas a interface e a logica ainda estavam tratando o ID do catalogo como identidade unica da instancia na mao.

## Valor de Negocio

- elimina erros de console que atrapalham a jogabilidade
- corrige selecao e descarte de cartas repetidas
- estabiliza a base para cartas com copias no deck

## Resultado Esperado

Cada copia de carta na run passa a ter identidade unica, permitindo renderizacao e jogada corretas mesmo com repeticoes.

## PBIs Vinculados

- `PBI-009 - Corrigir Identidade das Cartas em Mao`

## Dependencias

- `DONE-PBI-008`

## Status

- Status: Concluido
