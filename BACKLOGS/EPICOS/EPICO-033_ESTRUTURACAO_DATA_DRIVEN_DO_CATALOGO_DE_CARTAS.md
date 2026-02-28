# EPICO-033 - Estruturacao Data-Driven do Catalogo de Cartas

## Tipo

Epico

## Objetivo

Centralizar os dados das cartas em um formato declarativo, reduzindo manutencao manual no codigo e facilitando a evolucao de atributos e assets.

## Escopo

- mover atributos das cartas para um arquivo `json`
- manter o codigo apenas como camada de mapeamento e comportamento
- incluir referencia nominal aos arquivos de arte

## Criterio de Conclusao

- o catalogo de cartas existe em um arquivo `json`
- o jogo constroi a biblioteca de cartas a partir desse arquivo
- nomes de arquivos de arte ficam centralizados no dado
