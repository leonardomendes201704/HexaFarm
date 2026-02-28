# TASK-002 - Criar Canvas 3D Dentro do Stage

## Status

Concluido

## Objetivo

Montar o canvas 3D na area do mapa sem quebrar HUD, modais e mao.

## Implementacao

- criado o componente `Stage3DCanvas`
- o novo canvas 3D foi inserido por tras do mapa atual dentro de `gameplay-stage`
- o canvas nao captura interacoes ainda e fica com `pointer-events: none`
- HUD, modais e mao permanecem em suas camadas 2D atuais

## Resultado Esperado

O stage passa a conter um canvas 3D real montado na viewport de jogo, sem alterar ainda a logica de clique e renderizacao do mapa atual.
