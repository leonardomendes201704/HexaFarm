# PBI-048 - Migrar Stage Hexagonal para Renderizacao 3D Isometrica Real

## Tipo

PBI

## Status

Em andamento

## Epic Vinculado

- `EPICO-037 - Renderizacao 3D Isometrica Real do Stage`

## Objetivo

Substituir a renderizacao atual do stage por um mapa 3D real, com camera isometrica, tiles hexagonais com volume e suporte visual para terrenos, cultivo e interacoes.

## Contexto

O jogo ja possui logica de grid axial, save, cartas de expansao, cartas de cultivo, selecao de tiles e pan. A migracao deve reaproveitar essa base e trocar prioritariamente a camada de renderizacao do mapa.

## Escopo

- introduzir uma camada 3D para o stage
- manter a logica atual do mapa e do save
- representar os tiles como prismas hexagonais com materiais por bioma
- manter a mao, HUD e modais em 2D sobre o canvas
- preservar clique, hover, selecao, pan e destaque de alvos

## Fora de Escopo

- refatorar o sistema de cartas fora do necessario para integrar ao novo stage
- multiplayer
- backend
- pipeline artistico completo com assets finais de todos os biomas
- efeitos visuais avancados como particulas complexas ou pos-processamento pesado

## Historias

- `HISTORIA-001 - Estruturar a Base 3D do Stage`
- `HISTORIA-002 - Portar o Grid Hexagonal Atual para Meshes 3D`
- `HISTORIA-003 - Representar Terrenos e Cultivos no Mapa 3D`
- `HISTORIA-004 - Reintegrar Interacao, Camera e Compatibilidade com o Loop Atual`

## Criterios de Aceitacao

- existe um stage 3D com camera ortografica/isometrica funcional
- tiles do save atual aparecem como hexagonos com volume real
- terrenos diferentes possuem leitura visual distinta
- tiles com cultivo exibem a cultura plantada de forma clara
- selecao, plantio, expansao e pan continuam funcionando
- HUD, modais e mao continuam sobrepostos corretamente

## Riscos

- regressao de performance em maquinas fracas
- aumento de complexidade da interacao por raycasting
- conflitos entre a camada 3D e os overlays 2D existentes
- escopo artistico crescer demais cedo demais

## Dependencias

- decidir a stack 3D principal
- manter a fonte de verdade do mapa na logica atual
- definir fallback visual leve caso o stage 3D precise ser simplificado

## Definicao de Pronto

- historias do PBI decompostas em tasks
- stack 3D escolhida e documentada
- criterios de performance e validacao definidos

## Validacao Planejada

- `npm run build`
- verificacao manual de performance e interacao em runtime
- validacao visual do alinhamento isometrico e da leitura dos tiles
