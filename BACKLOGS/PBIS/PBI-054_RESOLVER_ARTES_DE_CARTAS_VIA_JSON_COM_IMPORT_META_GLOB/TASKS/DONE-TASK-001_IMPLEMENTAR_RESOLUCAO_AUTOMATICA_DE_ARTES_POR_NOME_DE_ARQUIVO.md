# TASK-001 - Implementar Resolucao Automatica de Artes por Nome de Arquivo

## Status

Concluido

## Objetivo

Substituir o mapeamento manual de `imageAssetName` por uma descoberta automatica de arquivos com `import.meta.glob`.

## Implementacao

- os imports individuais das imagens foram removidos do `prototypeDeck`
- foi criado um indice automatico de arquivos da pasta `assets/cards`
- a chave desse indice passou a ser o nome do arquivo
- o `imageAssetName` do JSON agora resolve a arte diretamente nesse indice

## Resultado Esperado

Qualquer carta com `imageAssetName` valido e arquivo presente em `src/assets/cards` passa a exibir sua arte sem precisar de manutencao manual no codigo.
