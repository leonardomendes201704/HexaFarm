# TASK-006 - Renderizar Tiles e Slots do Save Atual no Stage 3D

## Status

Concluido

## Objetivo

Ler o estado atual do mapa e desenhar tiles ocupados e fronteiras no novo stage.

## Implementacao

- o `Stage3DCanvas` passou a receber `tiles` e `frontierSlots`
- os tiles atuais da run agora sao renderizados como prismas 3D reais
- os slots de expansao tambem sao espelhados como prismas baixos e translucidos
- o stage 3D agora reflete diretamente o estado do save atual

## Resultado Esperado

O canvas 3D deixa de ser apenas estrutural e passa a espelhar visualmente o mapa atual da run.
