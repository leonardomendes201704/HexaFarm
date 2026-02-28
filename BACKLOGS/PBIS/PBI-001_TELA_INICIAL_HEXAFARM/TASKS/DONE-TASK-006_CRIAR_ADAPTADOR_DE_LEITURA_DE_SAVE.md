# TASK-006 - Criar Adaptador de Leitura de Save

## Tipo

Task

## Vinculo

- Epico: `EPICO-001`
- PBI: `PBI-001`
- Historia: `HISTORIA-003`

## Objetivo

Criar um adaptador simples para consultar se existe um save local valido.

## Descricao Tecnica

- criar funcao ou modulo de persistencia minimo
- encapsular a leitura de save local
- retornar um estado simples para consumo da UI

## Saida Esperada

A interface pode consultar a existencia de save sem conhecer os detalhes de persistencia.

## Definicao de Pronto

A task estara pronta quando a leitura de save estiver isolada em um adaptador reutilizavel.
