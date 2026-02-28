# PBI-042 - Centralizar Catalogo de Cartas em JSON

## Tipo

PBI

## Status

Concluido

## Epic Vinculado

- `EPICO-033 - Estruturacao Data-Driven do Catalogo de Cartas`

## Objetivo

Criar um arquivo `json` central com todas as cartas, seus atributos e o nome do arquivo de imagem, e fazer o motor de cartas consumir esse catalogo.

## Historias

- `HISTORIA-001 - Externalizar Dados das Cartas`
- `HISTORIA-002 - Manter Mapeamento de Assets no Codigo`

## Criterios de Aceitacao

- existe um `json` com todas as cartas
- o `json` contem atributos principais e `imageAssetName`
- `prototypeDeck.ts` passa a montar a biblioteca a partir do `json`
- cartas com assets ja presentes continuam exibindo a arte normalmente

## Resultado

- o catalogo foi movido para `src/data/card-library.json`
- o codigo ficou responsavel apenas por resolver os arquivos de imagem e construir a biblioteca final
