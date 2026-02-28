# PBI-022 - Adicionar BGM no Menu com Modal de Boas-Vindas

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-021 - Audio de Ambientacao da Home`

## Titulo

Tocar a trilha do menu apos fechar um modal de boas-vindas

## Objetivo

Adicionar um MP3 como musica ambiente da home e iniciar sua reproducao apenas apos o usuario fechar um modal de boas-vindas.

## Criterios de Aceitacao

1. A home exibe um modal de boas-vindas ao abrir.
2. Ao fechar o modal, a trilha do menu comeca a tocar.
3. A musica roda em loop enquanto o usuario permanece na home.
4. Ao sair da home, a musica para.
5. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Integrar Trilha de Menu com Gatilho Manual`

## Tasks Derivadas

- `TASK-001` ate `TASK-004`, detalhadas na pasta `TASKS`

## Prioridade

Media

## Classificacao

UX

## Status de Execucao

- Status: Concluido

## Valor Entregue

Esse PBI adiciona ambiencia sonora a home sem violar o controle de reproducao do navegador, usando o modal como gesto explicito de inicio.
