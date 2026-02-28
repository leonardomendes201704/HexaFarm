# PBI-006 - Tela de Jogo Fullscreen com HUD Modal

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-005 - Refinamento da Tela de Jogo e HUD`

## Titulo

Refatorar a tela de `Novo Jogo` para um layout fullscreen com HUD minimo e modais por atalho

## Objetivo

Reduzir a quantidade de texto e paines inline na tela de `Novo Jogo`, transformando o mapa em um palco fullscreen e levando as informacoes de apoio para modais acionados por atalhos e botoes discretos.

## Contexto

O prototipo mecanico esta funcional, mas a interface ainda parece uma tela de teste. O proximo passo e priorizar gamefeel, foco visual e uma organizacao mais proxima de um jogo.

## Escopo

- transformar a tela de `Novo Jogo` em uma cena fullscreen
- reduzir textos corridos e caixas desnecessarias
- redesenhar as cartas com visual mais ilustrado e menos textual
- mover informacoes de run e ajuda para modais
- adicionar atalhos de teclado para abrir modais

## Fora de Escopo

- menu completo de pausa
- inventario definitivo
- sistema de configuracoes completo
- arte final ilustrada
- assets externos

## Requisitos Funcionais

1. O mapa deve ocupar a maior parte da tela.
2. A mao de cartas deve permanecer acessivel na interface principal.
3. Informacoes secundarias devem ser acessiveis por modais.
4. Os modais devem abrir por atalhos e por botao.
5. O fluxo de expansao por cartas deve continuar funcional.

## Criterios de Aceitacao

1. A tela de `Novo Jogo` deixa de usar o layout informativo anterior.
2. O mapa vira o foco visual principal.
3. As cartas ficam visualmente mais proximas de cartas jogaveis.
4. Os textos inline sao significativamente reduzidos.
5. Pelo menos dois modais ficam acessiveis por atalhos.
6. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Reestruturar a cena principal para fullscreen`
- `HISTORIA-002 - Redesenhar a mao de cartas com foco visual`
- `HISTORIA-003 - Mover informacoes auxiliares para modais por atalho`

## Tasks Derivadas

- `TASK-001` ate `TASK-006`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Core

## Status de Execucao

- Status: Concluido

## Valor Entregue

Esse PBI melhora gamefeel, legibilidade e apresentacao do prototipo, aproximando a experiencia de uma tela de jogo real com mapa fullscreen, HUD reduzido, modais por atalho e uma mao de cartas muito mais visual.
