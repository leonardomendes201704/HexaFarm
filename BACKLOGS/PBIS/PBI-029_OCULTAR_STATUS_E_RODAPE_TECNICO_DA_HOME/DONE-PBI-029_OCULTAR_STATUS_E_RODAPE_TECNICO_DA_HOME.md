# PBI-029 - Ocultar Status e Rodape Tecnico da Home

## Tipo

PBI

## Status

Concluido

## Epic Vinculado

- `EPICO-024 - Limpeza de Informacao da Home`

## Objetivo

Remover da home o status textual de save e o rodape tecnico de PBIs, deixando a tela inicial mais limpa e mais proxima de uma interface de jogo.

## Historias

- `HISTORIA-001 - Remover Telemetria e Rodape de Implementacao da Home`

## Criterios de Aceitacao

- o texto `Save local detectado` nao aparece na home
- o texto `Nenhum save local encontrado` nao aparece na home
- os textos tecnicos de rodape de PBI nao aparecem na home
- o botao `Continuar` continua refletindo a existencia de save apenas pelo estado habilitado ou desabilitado

## Resultado

- home com menos ruido textual
- informacao de disponibilidade de `Continuar` mantida apenas pela interacao do botao
