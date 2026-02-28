# PBI-043 - Tornar o BGM Global e Continuo Entre Telas

## Tipo

PBI

## Status

Concluido

## Epic Vinculado

- `EPICO-034 - Persistencia Global do BGM da Jornada`

## Objetivo

Fazer a trilha ambiente tocar durante todo o jogo em loop, sem interrupcao e sem reset ao trocar de tela.

## Historias

- `HISTORIA-001 - Extrair o Controle de Audio para o Nivel da Aplicacao`
- `HISTORIA-002 - Remover a Dependencia de Audio Local da Home`

## Criterios de Aceitacao

- o BGM e controlado acima das rotas
- a home nao recria mais o `Audio` localmente
- ao navegar entre home, run e opcoes, a musica nao para nem reinicia
- a trilha segue em loop apos ser iniciada

## Resultado

- `AppAudioProvider` passou a controlar o BGM globalmente
- a home apenas desbloqueia o playback no primeiro gesto
