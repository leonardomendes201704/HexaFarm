# Estrutura de Backlogs - HexaFarm

Este diretorio organiza o backlog do projeto de forma rastreavel e escalavel.

## Estrutura Padrao

- `EPICOS/`: iniciativas macro que agrupam valor de negocio e grandes frentes.
- `PBIS/`: backlog funcional por entrega.
- `PBIS/PBI-XXX_NOME/`: pasta dedicada de cada PBI.
- `PBIS/PBI-XXX_NOME/HISTORIAS/`: historias derivadas do PBI.
- `PBIS/PBI-XXX_NOME/TASKS/`: tasks tecnicas e operacionais derivadas das historias.

## Regra de Organizacao

Cada novo PBI deve seguir esta estrutura:

1. Criar a pasta do PBI em `PBIS/`.
2. Criar o arquivo principal do PBI dentro da propria pasta.
3. Criar as historias em `HISTORIAS/`.
4. Criar as tasks em `TASKS/`.
5. Vincular o PBI a um epico existente ou criar um novo epico em `EPICOS/`.

## Regra de Rastreabilidade

Todo artefato deve informar:

- ID
- tipo do item
- vinculo com epico, PBI e historia quando aplicavel
- objetivo
- criterios de conclusao

As entregas executadas a partir desses itens tambem devem ser refletidas em:

- `CHANGELOG.md`

## Regra de Conclusao

O estado de conclusao do backlog deve ser refletido no nome do arquivo.

- task concluida: prefixo `DONE-`
- historia concluida: prefixo `DONE-` quando todas as tasks estiverem concluidas
- PBI concluido: prefixo `DONE-` quando todas as historias estiverem concluidas

O prefixo `DONE-` e uma marca de status no arquivo, sem alterar o ID logico do item.

## Regra de Validacao de Task

Toda task implementada deve fechar com um resumo objetivo de validacao em execucao.

Esse resumo deve informar:

- o que deve ser visto ao executar
- qual interacao deve funcionar
- qual efeito esperado confirma a implementacao

Se a task nao tiver efeito visual direto, a validacao deve descrever o comportamento tecnico esperado.

## Estrutura Atual

- `EPICO-001`: experiencia inicial e entrada no jogo
- `EPICO-002`: persistencia local e continuidade de run
- `EPICO-003`: fundacao do mapa hexagonal isometrico
- `EPICO-004`: fundacao do sistema inicial de cartas de expansao
- `EPICO-005`: refinamento da tela de jogo e HUD
- `EPICO-006`: ciclo minimo de turno e energia
- `EPICO-007`: deckbuilding persistente e economia da run
- `EPICO-008`: estabilizacao do loop de cartas
- `EPICO-009`: correcao geometrica do mapa hexagonal
- `EPICO-010`: controle de camera e rodape fixo da run
- `EPICO-011`: refinamento de visibilidade do HUD
- `EPICO-012`: economia de rendimento diario dos tiles
- `EPICO-013`: feedback visual de coleta no fim do dia
- `EPICO-014`: imersao de entrada da run
- `EPICO-015`: reducao de ruido visual do HUD principal
- `EPICO-016`: ambientacao visual da tela inicial
- `EPICO-017`: refinamento dos paineis da home
- `EPICO-018`: ajuste fino de translucidez na home
- `EPICO-019`: minimizar a presenca dos cards da home
- `EPICO-020`: abrir mais espaco para a arte da home
- `EPICO-021`: audio de ambientacao da home
- `EPICO-022`: imersao no fechamento do modal inicial
- `EPICO-023`: ajuste de volume da trilha da home
- `EPICO-024`: limpeza de informacao da home
- `EPICO-025`: video de background da home
- `EPICO-026`: ajuste de posicionamento dos cards da home
- `EPICO-027`: refinamento tipografico da home
- `EPICO-028`: leitura e exposicao visual da home
- `EPICO-029`: refinamento da modal de montagem de baralho
- `EPICO-030`: feedback informativo das cartas
- `EPICO-031`: refinamento de camadas e espaco util da interface
- `EPICO-032`: integracao de artes reais nas cartas
- `EPICO-033`: estruturacao data-driven do catalogo de cartas
- `EPICO-034`: persistencia global do BGM da jornada
- `EPICO-035`: sistema de cultivo em solos ferteis
- `EPICO-036`: refinamento do hud superior e ocupacao total do stage
- `EPICO-037`: renderizacao 3d isometrica real do stage
- `PBI-001`: tela inicial do jogo HexaFarm
- `PBI-002`: estrutura base de navegacao entre telas
- `PBI-003`: sistema minimo de save local
- `PBI-004`: prototipo do mapa hexagonal isometrico
- `PBI-005`: sistema inicial de cartas de expansao
- `PBI-006`: tela de jogo fullscreen com HUD modal
- `PBI-007`: energia e ciclo minimo de dia
- `PBI-008`: deck da run, loja e aluguel progressivo
- `PBI-009`: corrigir identidade das cartas em mao
- `PBI-010`: corrigir encaixe e geometria dos hexagonos
- `PBI-011`: implementar pan do stage e fixar a mao no rodape
- `PBI-012`: ocultar badge de tile selecionado
- `PBI-013`: implementar rendimento diario por carta e tile
- `PBI-014`: animar moedas de rendimento no fim do dia
- `PBI-015`: entrar em fullscreen ao iniciar novo jogo
- `PBI-016`: ocultar badges auxiliares do HUD principal
- `PBI-017`: aplicar background fullscreen na tela inicial
- `PBI-018`: tornar os cards da home brancos translucidos
- `PBI-019`: aumentar a translucidez dos cards da home
- `PBI-020`: deixar os cards da home quase transparentes
- `PBI-021`: remover ilustracao interna e reduzir largura dos cards da home
- `PBI-022`: adicionar BGM no menu com modal de boas-vindas
- `PBI-023`: entrar em fullscreen ao fechar modal de boas-vindas
- `PBI-024`: ajustar volume padrao do BGM da home
- `PBI-025`: remover info redundante da home
- `PBI-026`: trocar background da home por video mp4
- `PBI-027`: altura auto-fit e alinhamento inferior dos cards da home
- `PBI-028`: ajustar cor e stroke do titulo HexaFarm
- `PBI-029`: ocultar status e rodape tecnico da home
- `PBI-030`: aplicar filtro visual no video da home
- `PBI-031`: reforcar stroke grosso do titulo HexaFarm
- `PBI-032`: remover overlay do video da home
- `PBI-033`: remover filtro do video e aplicar sombra branca nos textos da home
- `PBI-034`: limpar e fixar a modal de montagem de baralho da run
- `PBI-035`: adicionar tooltip estilizado com explicacao nas cartas
- `PBI-036`: refinar altura da modal deckbuilding e camada dos tooltips
- `PBI-037`: reduzir margens verticais das modais
- `PBI-038`: regras laterais para tooltips das cartas da grade
- `PBI-039`: refinar cores do tooltip das cartas
- `PBI-040`: aplicar arte real na carta Abrir Clareira
- `PBI-041`: aplicar artes nas cartas iniciais e componentizar cartas da grade
- `PBI-042`: centralizar catalogo de cartas em json
- `PBI-043`: tornar o bgm global e continuo entre telas
- `PBI-044`: implementar cartas de cultivo e combo com lote fertil
- `PBI-045`: adicionar calendario semanal no hud e expandir stage fullscreen
- `PBI-046`: remover badges redundantes de compra e descarte na mao
- `PBI-047`: compensar centro vertical do stage com variavel ajustavel
- `PBI-048`: migrar stage hexagonal para renderizacao 3d isometrica real
- `PBI-049`: ajustar espessura dos tiles 3d
- `PBI-050`: corrigir z-fighting das meshes superficiais 3d
- `PBI-051`: adicionar atalho para ocultar slabs 3d
- `PBI-052`: adicionar atalho para ocultar topo dos tiles 3d
- `PBI-053`: adicionar atalho para ocultar highlights 3d
- `PBI-054`: resolver artes de cartas via json com import meta glob
- `PBI-055`: ocultar cartas nao possuidas na montagem da run
- `PBI-056`: adicionar bordas tematicas nas cartas
- `PBI-057`: reforcar bordas das artes das cartas
- `PBI-058`: ajustar fundo das cartas e badge de rendimento
- `PBI-059`: adicionar icone de raio na badge de energia
- `PBI-060`: remover painel de fundo da secao da mao
- `PBI-061`: animar descarte da mao no fim do dia
- `PBI-062`: refinar descarte da mao para stack unico no centro
- `PBI-063`: reduzir velocidade da animacao de descarte da mao
- `PBI-064`: animar compra sequencial da nova mao apos o fim do dia

## Convencao de Nomes

- `EPICO-XXX_NOME.md`
- `PBI-XXX_NOME.md`
- `HISTORIA-XXX_NOME.md`
- `TASK-XXX_NOME.md`
- `DONE-PBI-XXX_NOME.md`
- `DONE-HISTORIA-XXX_NOME.md`
- `DONE-TASK-XXX_NOME.md`

Essa estrutura deve ser mantida como padrao para evitar backlog solto ou sem hierarquia.
