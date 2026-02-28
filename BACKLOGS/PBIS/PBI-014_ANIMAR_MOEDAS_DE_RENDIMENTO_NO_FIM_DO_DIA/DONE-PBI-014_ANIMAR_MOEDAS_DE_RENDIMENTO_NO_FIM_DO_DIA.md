# PBI-014 - Animar Moedas de Rendimento no Fim do Dia

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-013 - Feedback Visual de Coleta no Fim do Dia`

## Titulo

Exibir a coleta de moedas por tile antes de aplicar o saldo ao fechar o dia

## Objetivo

Adicionar um feedback visual de moedas subindo em cada tile com rendimento no fim do dia, sincronizando a animacao com a atualizacao do saldo da run.

## Criterios de Aceitacao

1. Ao fechar o dia, cada tile com rendimento diferente de zero exibe uma animacao de moedas subindo.
2. O saldo da run so e atualizado apos a resolucao visual do rendimento.
3. O fluxo de `Fim do Dia` continua funcional nos dias normais e no dia final da run.
4. A interacao principal da run fica bloqueada durante a resolucao curta da coleta.
5. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Exibir feedback visual de rendimento por tile`
- `HISTORIA-002 - Sincronizar animacao com a resolucao do dia`

## Tasks Derivadas

- `TASK-001` ate `TASK-004`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Core

## Status de Execucao

- Status: Concluido

## Valor Entregue

Esse PBI torna o fim do dia mais legivel, reforca o papel de cada tile na economia e conecta o ganho de moedas a um feedback visual claro no proprio mapa.
