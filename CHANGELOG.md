# CHANGELOG - HexaFarm

Este arquivo registra o historico auditavel das mudancas do projeto.

## Como registrar novas entradas

Cada entrega deve adicionar ou atualizar uma entrada com:

- data
- titulo da entrega
- resumo do que foi feito
- arquivos principais afetados
- vinculos de backlog, quando existirem
- validacao executada
- status de commit e push

Se a entrega nao tiver item de backlog associado, isso deve ser declarado.

---

## 2026-02-28 - Implementacao do PBI-017 de background fullscreen na tela inicial

### Resumo

Foi aplicada a arte fornecida pelo usuario como background da tela inicial, cobrindo 100% da viewport e mantendo o menu legivel por cima.

### Entregas realizadas

- criacao do `EPICO-016` e do backlog completo do `PBI-017`
- copia da imagem de menu para dentro do projeto como asset local
- conexao da arte ao componente da tela inicial
- criacao de um layer de fundo em `cover` ocupando toda a tela
- aplicacao de um overlay sutil para preservar legibilidade dos paineis
- conclusao do `PBI-017` e do `EPICO-016`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-016_AMBIENTACAO_VISUAL_DA_TELA_INICIAL.md`
- `BACKLOGS/PBIS/PBI-017_APLICAR_BACKGROUND_FULLSCREEN_NA_TELA_INICIAL/DONE-PBI-017_APLICAR_BACKGROUND_FULLSCREEN_NA_TELA_INICIAL.md`
- `BACKLOGS/PBIS/PBI-017_APLICAR_BACKGROUND_FULLSCREEN_NA_TELA_INICIAL/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-017_APLICAR_BACKGROUND_FULLSCREEN_NA_TELA_INICIAL/TASKS/DONE-*`
- `src/assets/background-menu-hexafarm.png`
- `src/components/TitleScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-016 - Ambientacao Visual da Tela Inicial`
- `PBI-017 - Aplicar Background Fullscreen na Tela Inicial`
- `HISTORIA-001 - Integrar Arte de Background a Home`

### Tasks executadas

- `TASK-001 - Copiar Asset de Background para o Projeto`
- `TASK-002 - Conectar a Imagem ao Componente da Tela Inicial`
- `TASK-003 - Garantir Cobertura Fullscreen com Overlay de Leitura`

### Validacao executada

- `npm run build`
- verificacao manual da home com imagem cobrindo toda a viewport

### Resultado da validacao

- build concluido com sucesso
- a home agora usa a arte do menu como fundo fullscreen
- os paineis continuam legiveis por cima da imagem

### Commit e push

- esta entrada corresponde a entrega do `PBI-017` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-016 de ocultar badges auxiliares do HUD principal

### Resumo

Foi reduzido o ruido visual da tela principal da run, removendo da superficie as badges de `Deck`, `Bordas`, `Tiles`, `Rendimento/dia` e `Loja`.

### Entregas realizadas

- criacao do `EPICO-015` e do backlog completo do `PBI-016`
- remocao da badge `Loja` do HUD superior
- remocao da badge de `Rendimento` do HUD superior
- remocao das badges de `Deck`, `Bordas`, `Tiles` e `Rendimento` do overlay do stage
- preservacao do restante do HUD principal e do fluxo da run
- conclusao do `PBI-016` e do `EPICO-015`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-015_REDUCAO_DE_RUIDO_VISUAL_DO_HUD_PRINCIPAL.md`
- `BACKLOGS/PBIS/PBI-016_OCULTAR_BADGES_AUXILIARES_DO_HUD_PRINCIPAL/DONE-PBI-016_OCULTAR_BADGES_AUXILIARES_DO_HUD_PRINCIPAL.md`
- `BACKLOGS/PBIS/PBI-016_OCULTAR_BADGES_AUXILIARES_DO_HUD_PRINCIPAL/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-016_OCULTAR_BADGES_AUXILIARES_DO_HUD_PRINCIPAL/TASKS/DONE-*`
- `src/screens/NewGameScreen.tsx`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-015 - Reducao de Ruido Visual do HUD Principal`
- `PBI-016 - Ocultar Badges Auxiliares do HUD Principal`
- `HISTORIA-001 - Reduzir Telemetria Visivel na Superficie Principal`

### Tasks executadas

- `TASK-001 - Remover Badges de Loja e Rendimento do HUD Superior`
- `TASK-002 - Remover Badges de Deck, Bordas, Tiles e Rendimento do Overlay`

### Validacao executada

- `npm run build`
- verificacao manual da ausencia dessas badges na superficie principal da run

### Resultado da validacao

- build concluido com sucesso
- o topo da run nao mostra mais `Loja` nem `Rendimento`
- o overlay do stage nao mostra mais `Deck`, `Bordas`, `Tiles` nem `Rendimento`

### Commit e push

- esta entrada corresponde a entrega do `PBI-016` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-015 de fullscreen ao iniciar novo jogo

### Resumo

Foi conectado o clique de `Novo Jogo` a uma tentativa de tela cheia do navegador, para que a entrada da run aconteca em modo mais imersivo.

### Entregas realizadas

- criacao do `EPICO-014` e do backlog completo do `PBI-015`
- criacao de um helper de fullscreen com fallback seguro
- tentativa de fullscreen no gesto de clique de `Novo Jogo`
- preservacao do fluxo de criacao de save e navegacao para a run mesmo quando a API falha
- conclusao do `PBI-015` e do `EPICO-014`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-014_IMERSAO_DE_ENTRADA_DA_RUN.md`
- `BACKLOGS/PBIS/PBI-015_ENTRAR_EM_FULLSCREEN_AO_INICIAR_NOVO_JOGO/DONE-PBI-015_ENTRAR_EM_FULLSCREEN_AO_INICIAR_NOVO_JOGO.md`
- `BACKLOGS/PBIS/PBI-015_ENTRAR_EM_FULLSCREEN_AO_INICIAR_NOVO_JOGO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-015_ENTRAR_EM_FULLSCREEN_AO_INICIAR_NOVO_JOGO/TASKS/DONE-*`
- `src/lib/browserFullscreen.ts`
- `src/screens/HomeScreen.tsx`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-014 - Imersao de Entrada da Run`
- `PBI-015 - Entrar em Fullscreen ao Iniciar Novo Jogo`
- `HISTORIA-001 - Acionar Fullscreen no Gatilho de Novo Jogo`

### Tasks executadas

- `TASK-001 - Criar Helper de Fullscreen do Navegador`
- `TASK-002 - Integrar Fullscreen ao Fluxo de Novo Jogo`

### Validacao executada

- `npm run build`
- verificacao manual do clique de `Novo Jogo` com tentativa de fullscreen antes da navegacao

### Resultado da validacao

- build concluido com sucesso
- `Novo Jogo` agora tenta entrar em tela cheia antes de abrir a run
- se o navegador negar a tela cheia, a run ainda abre normalmente

### Commit e push

- esta entrada corresponde a entrega do `PBI-015` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-014 de animacao de moedas no fim do dia

### Resumo

Foi adicionado um feedback visual de coleta no fechamento do dia: cada tile com rendimento agora exibe moedas subindo no mapa, e so depois o saldo de moedas da run e atualizado.

### Entregas realizadas

- criacao do `EPICO-013` e do backlog completo do `PBI-014`
- renderizacao de bursts de moedas por tile com rendimento diferente de zero
- adicao de animacao visual para ganhos e perdas diarias
- sincronizacao do `Fim do Dia` para aplicar o saldo somente apos a animacao
- bloqueio temporario das interacoes principais da run durante a resolucao visual
- atualizacao da dica de ajuda para refletir a nova leitura do fechamento do dia
- conclusao do `PBI-014` e do `EPICO-013`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-013_FEEDBACK_VISUAL_DE_COLETA_NO_FIM_DO_DIA.md`
- `BACKLOGS/PBIS/PBI-014_ANIMAR_MOEDAS_DE_RENDIMENTO_NO_FIM_DO_DIA/DONE-PBI-014_ANIMAR_MOEDAS_DE_RENDIMENTO_NO_FIM_DO_DIA.md`
- `BACKLOGS/PBIS/PBI-014_ANIMAR_MOEDAS_DE_RENDIMENTO_NO_FIM_DO_DIA/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-014_ANIMAR_MOEDAS_DE_RENDIMENTO_NO_FIM_DO_DIA/TASKS/DONE-*`
- `src/components/HexMapPrototype.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-013 - Feedback Visual de Coleta no Fim do Dia`
- `PBI-014 - Animar Moedas de Rendimento no Fim do Dia`
- `HISTORIA-001 - Exibir Feedback Visual de Rendimento por Tile`
- `HISTORIA-002 - Sincronizar Animacao com a Resolucao do Dia`

### Tasks executadas

- `TASK-001 - Criar Bursts Visuais de Moeda por Tile`
- `TASK-002 - Estilizar Animacao de Subida das Moedas`
- `TASK-003 - Atrasar Aplicacao do Fim do Dia ate o Termino da Animacao`
- `TASK-004 - Bloquear Interacao Durante a Resolucao do Dia`

### Validacao executada

- `npm run build`
- verificacao manual do fechamento do dia com tiles de rendimento positivo e negativo

### Resultado da validacao

- build concluido com sucesso
- o mapa agora mostra moedas subindo em cada tile com rendimento no fim do dia
- o saldo da run so muda apos a resolucao visual da coleta
- as acoes principais ficam bloqueadas enquanto a animacao estiver ativa

### Commit e push

- esta entrada corresponde a entrega do `PBI-014` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-013 de rendimento diario por carta e tile

### Resumo

Foi implementado um sistema de rendimento diario: cada carta agora define quantas moedas o tile gerado produz no fim do dia, inclusive com valores negativos.

### Entregas realizadas

- criacao do `EPICO-012` e do backlog completo do `PBI-013`
- adicao de `coinYield` ao catalogo de cartas
- exibicao do rendimento nas cartas da mao, na montagem de deck e na loja
- persistencia de tiles colocados com carta de origem e rendimento diario
- migracao automatica de saves antigos para a nova estrutura de tiles persistidos
- remocao do ganho imediato de moedas na expansao e migracao da economia para o fim do dia
- aplicacao do rendimento acumulado ao fechar o dia
- aplicacao do rendimento do ultimo dia antes da validacao de aluguel
- exposicao do rendimento acumulado no HUD, nos modais e no resumo do save
- conclusao do `PBI-013` e do `EPICO-012`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-012_ECONOMIA_DE_RENDIMENTO_DIARIO_DOS_TILES.md`
- `BACKLOGS/PBIS/PBI-013_IMPLEMENTAR_RENDIMENTO_DIARIO_POR_CARTA_E_TILE/DONE-PBI-013_IMPLEMENTAR_RENDIMENTO_DIARIO_POR_CARTA_E_TILE.md`
- `BACKLOGS/PBIS/PBI-013_IMPLEMENTAR_RENDIMENTO_DIARIO_POR_CARTA_E_TILE/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-013_IMPLEMENTAR_RENDIMENTO_DIARIO_POR_CARTA_E_TILE/TASKS/DONE-*`
- `src/lib/prototypeDeck.ts`
- `src/lib/hexGrid.ts`
- `src/lib/save.ts`
- `src/components/ExpansionHand.tsx`
- `src/components/SaveSummaryCard.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-012 - Economia de Rendimento Diario dos Tiles`
- `PBI-013 - Implementar Rendimento Diario por Carta e Tile`
- `HISTORIA-001 - Definir Rendimento Diario nas Cartas`
- `HISTORIA-002 - Persistir Tiles com Rendimento na Run`
- `HISTORIA-003 - Aplicar Producao Diaria ao Fechar o Dia`

### Tasks executadas

- `TASK-001 - Adicionar coinYield ao Catalogo de Cartas`
- `TASK-002 - Exibir Rendimento nas Cartas da Mao, Deckbuilding e Loja`
- `TASK-003 - Persistir placedTiles com cardId e Rendimento`
- `TASK-004 - Migrar Saves Antigos para a Nova Estrutura`
- `TASK-005 - Aplicar Rendimento no Fim do Dia e no Aluguel`
- `TASK-006 - Expor Rendimento Acumulado no HUD e nos Resumos`

### Validacao executada

- `npm run build`
- verificacao manual do fluxo de colocacao de tile e fechamento do dia com rendimento

### Resultado da validacao

- build concluido com sucesso
- cada carta mostra seu rendimento diario
- cada tile colocado preserva o rendimento da carta de origem
- o fim do dia aplica a soma do rendimento do mapa antes de avancar
- o aluguel do ultimo dia considera o rendimento produzido no proprio fechamento

### Commit e push

- esta entrada corresponde a entrega do `PBI-013` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-012 de ocultar a badge de tile selecionado

### Resumo

Foi removida da superficie principal a badge `Tile selecionado`, mantendo apenas a badge de `Carta armada` quando ela for relevante.

### Entregas realizadas

- criacao do `EPICO-011` e do backlog completo do `PBI-012`
- remocao da renderizacao da badge `Tile selecionado`
- preservacao da logica interna de selecao do mapa
- manutencao da badge `Carta armada`
- conclusao do `PBI-012` e do `EPICO-011`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-011_REFINAMENTO_DE_VISIBILIDADE_DO_HUD.md`
- `BACKLOGS/PBIS/PBI-012_OCULTAR_BADGE_DE_TILE_SELECIONADO/DONE-PBI-012_OCULTAR_BADGE_DE_TILE_SELECIONADO.md`
- `BACKLOGS/PBIS/PBI-012_OCULTAR_BADGE_DE_TILE_SELECIONADO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-012_OCULTAR_BADGE_DE_TILE_SELECIONADO/TASKS/DONE-*`
- `src/screens/NewGameScreen.tsx`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-011 - Refinamento de Visibilidade do HUD`
- `PBI-012 - Ocultar Badge de Tile Selecionado`
- `HISTORIA-001 - Reduzir Ruido Visual do HUD Contextual`

### Tasks executadas

- `TASK-001 - Remover Renderizacao da Badge de Tile Selecionado`
- `TASK-002 - Manter Estado Interno de Selecao Intacto`

### Validacao executada

- `npm run build`
- verificacao manual da ausencia da badge na tela principal

### Resultado da validacao

- build concluido com sucesso
- a badge `Tile selecionado` nao aparece mais
- a badge `Carta armada` continua aparecendo quando aplicavel
- a selecao de tiles continua funcionando para o mapa

### Commit e push

- esta entrada corresponde a entrega do `PBI-012` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-011 de pan do stage e rodape fixo da mao

### Resumo

Foi removido o scroll do palco de jogo e adicionado pan manual com botao direito do mouse, junto com a fixacao da mao e das pilhas no rodape da viewport.

### Entregas realizadas

- criacao do `EPICO-010` e do backlog completo do `PBI-011`
- remocao das barras de rolagem da area do mapa
- criacao de pan manual com botao direito do mouse
- bloqueio do menu de contexto na area do palco durante o pan
- centralizacao do mapa com deslocamento manual por arraste
- fixacao da mao e das pilhas em um rodape visual persistente
- ajuste do layout do stage para reservar espaco ao rodape fixo
- atualizacao das dicas da run para o novo controle
- conclusao do `PBI-011` e do `EPICO-010`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-010_CONTROLE_DE_CAMERA_E_RODAPE_FIXO_DA_RUN.md`
- `BACKLOGS/PBIS/PBI-011_IMPLEMENTAR_PAN_DO_STAGE_E_FIXAR_A_MAO_NO_RODAPE/DONE-PBI-011_IMPLEMENTAR_PAN_DO_STAGE_E_FIXAR_A_MAO_NO_RODAPE.md`
- `BACKLOGS/PBIS/PBI-011_IMPLEMENTAR_PAN_DO_STAGE_E_FIXAR_A_MAO_NO_RODAPE/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-011_IMPLEMENTAR_PAN_DO_STAGE_E_FIXAR_A_MAO_NO_RODAPE/TASKS/DONE-*`
- `src/components/HexMapPrototype.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-010 - Controle de Camera e Rodape Fixo da Run`
- `PBI-011 - Implementar Pan do Stage e Fixar a Mao no Rodape`
- `HISTORIA-001 - Implementar Pan Manual do Mapa`
- `HISTORIA-002 - Fixar Mao e Pilhas no Rodape`

### Tasks executadas

- `TASK-001 - Remover Scroll da Area do Mapa`
- `TASK-002 - Adicionar Pan com Botao Direito`
- `TASK-003 - Fixar a Mao e as Pilhas no Rodape`
- `TASK-004 - Ajustar HUD e Dicas para o Novo Controle`

### Validacao executada

- `npm run build`
- verificacao manual do pan com botao direito e da mao fixa no rodape

### Resultado da validacao

- build concluido com sucesso
- o mapa nao exibe mais scrollbars
- o palco pode ser arrastado com o botao direito do mouse
- a mao e as pilhas permanecem fixas no rodape

### Commit e push

- esta entrada corresponde a entrega do `PBI-011` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-010 de correcao geometrica dos hexagonos

### Resumo

Foi corrigida a geometria visual do tabuleiro para usar hexagonos flat-top regulares, com encaixe correto entre tiles e sem a inclinacao artificial que distorcia o mapa.

### Entregas realizadas

- criacao do `EPICO-009` e do backlog completo do `PBI-010`
- alinhamento da projecao axial do tabuleiro com um layout flat-top regular
- ajuste do calculo de largura e altura do board para considerar o tamanho real de cada hexagono
- remocao do `skew` artificial que inclinava o grid
- ajuste do bounding box dos tiles para proporcao regular
- correcao da `clip-path` dos hexagonos para um shape simetrico
- conclusao do `PBI-010` e do `EPICO-009`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-009_CORRECAO_GEOMETRICA_DO_MAPA_HEXAGONAL.md`
- `BACKLOGS/PBIS/PBI-010_CORRIGIR_ENCAIXE_E_GEOMETRIA_DOS_HEXAGONOS/DONE-PBI-010_CORRIGIR_ENCAIXE_E_GEOMETRIA_DOS_HEXAGONOS.md`
- `BACKLOGS/PBIS/PBI-010_CORRIGIR_ENCAIXE_E_GEOMETRIA_DOS_HEXAGONOS/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-010_CORRIGIR_ENCAIXE_E_GEOMETRIA_DOS_HEXAGONOS/TASKS/DONE-*`
- `src/components/HexMapPrototype.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-009 - Correcao Geometrica do Mapa Hexagonal`
- `PBI-010 - Corrigir Encaixe e Geometria dos Hexagonos`
- `HISTORIA-001 - Corrigir Projecao Axial do Tabuleiro`
- `HISTORIA-002 - Corrigir Shape Visual dos Hexagonos`

### Tasks executadas

- `TASK-001 - Alinhar Projecao com Hex Flat-Top`
- `TASK-002 - Ajustar Bounding Box dos Tiles`
- `TASK-003 - Remover Inclinacao Artificial do Board`
- `TASK-004 - Usar Hexagono Regular na Clip-Path`

### Validacao executada

- `npm run build`
- verificacao manual do encaixe visual do tabuleiro apos a correcao de geometria

### Resultado da validacao

- build concluido com sucesso
- os hexagonos do mapa passaram a usar proporcao regular
- os tiles se encaixam corretamente no grid
- o mapa nao fica mais inclinado artificialmente

### Commit e push

- esta entrada corresponde a entrega do `PBI-010` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-009 de correcao da identidade das cartas em mao

### Resumo

Foi corrigida a identidade das copias de carta durante a run, eliminando chaves duplicadas no React e ajustando a jogada para operar sobre instancias unicas, nao sobre o ID do catalogo.

### Entregas realizadas

- criacao do `EPICO-008` e do backlog completo do `PBI-009`
- separacao entre ID do catalogo e ID da instancia da carta em jogo
- criacao de `instanceId` unico para cada copia de carta do deck da run
- ajuste da selecao da carta armada para usar a instancia correta
- ajuste da jogada e do descarte para remover apenas a copia clicada
- eliminacao dos `duplicate key warnings` na renderizacao da mao
- conclusao do `PBI-009` e do `EPICO-008`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-008_ESTABILIZACAO_DO_LOOP_DE_CARTAS.md`
- `BACKLOGS/PBIS/PBI-009_CORRIGIR_IDENTIDADE_DAS_CARTAS_EM_MAO/DONE-PBI-009_CORRIGIR_IDENTIDADE_DAS_CARTAS_EM_MAO.md`
- `BACKLOGS/PBIS/PBI-009_CORRIGIR_IDENTIDADE_DAS_CARTAS_EM_MAO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-009_CORRIGIR_IDENTIDADE_DAS_CARTAS_EM_MAO/TASKS/DONE-*`
- `src/lib/prototypeDeck.ts`
- `src/components/ExpansionHand.tsx`
- `src/screens/NewGameScreen.tsx`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-008 - Estabilizacao do Loop de Cartas`
- `PBI-009 - Corrigir Identidade das Cartas em Mao`
- `HISTORIA-001 - Criar Instancia Unica para Cada Copia de Carta`
- `HISTORIA-002 - Ajustar Renderizacao e Interacao da Mao`

### Tasks executadas

- `TASK-001 - Separar ID de Catalogo e ID de Instancia`
- `TASK-002 - Ajustar Jogada e Descarte para Usar Instancia`
- `TASK-003 - Corrigir Keys da Mao`
- `TASK-004 - Ajustar Selecao da Carta Armada`

### Validacao executada

- `npm run build`
- verificacao manual do fluxo de selecao e jogada com cartas repetidas

### Resultado da validacao

- build concluido com sucesso
- a mao nao deve mais emitir warnings de `duplicate key`
- cartas repetidas podem coexistir e ser jogadas sem remover copias irmas

### Commit e push

- esta entrada corresponde a entrega do `PBI-009` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-008 de deck da run, loja e aluguel progressivo

### Resumo

Foi implementado o primeiro loop completo de deckbuilder roguelite do prototipo: deck de 24 cartas montado no inicio da run, pilhas visiveis de compra e descarte, run fechada de 7 dias, aluguel progressivo e loja ao fim da run.

### Entregas realizadas

- criacao do `EPICO-007` e do backlog completo do `PBI-008`
- definicao de um catalogo maior de cartas e de uma colecao persistente
- migracao do save para um contrato mais rico, com colecao, aluguel e fase da run
- criacao da etapa de montagem do deck com selecao obrigatoria de 24 cartas
- consumo da run a partir do deck configurado
- exibicao visual de pilha de compra e pilha de descarte no mesmo padrao visual da tela
- encerramento automatico da run no dia 7
- validacao de aluguel ao fim da run e aumento do proximo aluguel
- criacao da loja de fim de run para compra de novas cartas da colecao
- unificacao da tela de `Continuar` com a tela principal de jogo
- conclusao do `PBI-008` e do `EPICO-007`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-007_DECKBUILDING_PERSISTENTE_E_ECONOMIA_DA_RUN.md`
- `BACKLOGS/PBIS/PBI-008_DECK_DA_RUN_LOJA_E_ALUGUEL_PROGRESSIVO/DONE-PBI-008_DECK_DA_RUN_LOJA_E_ALUGUEL_PROGRESSIVO.md`
- `BACKLOGS/PBIS/PBI-008_DECK_DA_RUN_LOJA_E_ALUGUEL_PROGRESSIVO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-008_DECK_DA_RUN_LOJA_E_ALUGUEL_PROGRESSIVO/TASKS/DONE-*`
- `src/lib/prototypeDeck.ts`
- `src/lib/save.ts`
- `src/components/ExpansionHand.tsx`
- `src/components/GameModal.tsx`
- `src/components/SaveSummaryCard.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/screens/ContinueScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-007 - Deckbuilding Persistente e Economia da Run`
- `PBI-008 - Deck da Run, Loja e Aluguel Progressivo`
- `HISTORIA-001 - Montar Deck Persistente de 24 Cartas no Inicio da Run`
- `HISTORIA-002 - Exibir Pilhas Reais e Consumir o Deck Configurado`
- `HISTORIA-003 - Encerrar a Run com Aluguel e Abrir a Loja`

### Tasks executadas

- `TASK-001 - Criar Catalogo de Cartas e Colecao Persistente`
- `TASK-002 - Implementar Montagem de Deck com 24 Cartas`
- `TASK-003 - Persistir Deck da Run no Save`
- `TASK-004 - Exibir Pilha de Compra na Interface`
- `TASK-005 - Exibir Pilha de Descarte e Consumir Cartas da Run`
- `TASK-006 - Encerrar Run no Dia 7`
- `TASK-007 - Validar Aluguel Progressivo`
- `TASK-008 - Abrir Loja e Comprar Novas Cartas`

### Validacao executada

- `npm run build`
- verificacao manual da montagem de deck, fluxo de 7 dias e loja de fim de run

### Resultado da validacao

- build concluido com sucesso
- a run agora comeca com montagem de 24 cartas
- a mao consome um deck real com compra e descarte visiveis
- o dia 7 resolve o aluguel e leva para a loja
- novas cartas compradas passam a integrar a colecao para a proxima run

### Commit e push

- esta entrada corresponde a entrega do `PBI-008` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-007 de energia e ciclo minimo de dia

### Resumo

Foi implementado o primeiro loop real de turno do prototipo, com custo de energia por carta, bloqueio de jogadas sem energia e uma acao de `Fim do Dia` para recarregar energia e renovar a mao.

### Entregas realizadas

- criacao do `EPICO-006` e do backlog completo do `PBI-007`
- adicao de custo de energia ao modelo das cartas de expansao
- bloqueio de cartas quando a energia atual nao for suficiente
- consumo de energia ao jogar uma carta
- criacao do fluxo de `Fim do Dia` com descarte da mao e nova compra
- persistencia de avanco de dia e restauracao de energia no save
- exposicao de `Dia`, `Energia` e `Fim do Dia` no HUD principal
- atualizacao do modal de run e da ajuda para refletir o novo loop
- conclusao do `PBI-007` e do `EPICO-006`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-006_CICLO_MINIMO_DE_TURNO_E_ENERGIA.md`
- `BACKLOGS/PBIS/PBI-007_ENERGIA_E_CICLO_MINIMO_DE_DIA/DONE-PBI-007_ENERGIA_E_CICLO_MINIMO_DE_DIA.md`
- `BACKLOGS/PBIS/PBI-007_ENERGIA_E_CICLO_MINIMO_DE_DIA/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-007_ENERGIA_E_CICLO_MINIMO_DE_DIA/TASKS/DONE-*`
- `src/lib/prototypeDeck.ts`
- `src/lib/save.ts`
- `src/components/ExpansionHand.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-006 - Ciclo Minimo de Turno e Energia`
- `PBI-007 - Energia e Ciclo Minimo de Dia`
- `HISTORIA-001 - Aplicar Custo de Energia nas Cartas`
- `HISTORIA-002 - Implementar Fim de Dia e Renovacao do Turno`
- `HISTORIA-003 - Expor Estado do Turno na Interface`

### Tasks executadas

- `TASK-001 - Definir Custo de Energia por Carta`
- `TASK-002 - Bloquear Cartas sem Energia`
- `TASK-003 - Criar Fluxo de Fim de Dia no Deck`
- `TASK-004 - Avancar Dia e Recarregar Energia no Save`
- `TASK-005 - Expor Controle de Fim de Dia no HUD`
- `TASK-006 - Atualizar HUD e Modal com Estado de Turno`

### Validacao executada

- `npm run build`
- verificacao manual do consumo de energia, bloqueio de cartas e fim de dia

### Resultado da validacao

- build concluido com sucesso
- usar cartas agora consome energia da run
- cartas caras ficam indisponiveis quando a energia e insuficiente
- `Fim do Dia` aumenta o dia, restaura a energia base e renova a mao

### Commit e push

- esta entrada corresponde a entrega do `PBI-007` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-006 da tela de jogo fullscreen com HUD modal

### Resumo

Foi refatorada a tela de `Novo Jogo` para um formato muito mais proximo de uma tela de jogo: mapa fullscreen, HUD minimo, modais por atalho e cartas com apresentacao visual inspirada em um hand fan de jogo cozy.

### Entregas realizadas

- criacao do `EPICO-005` e do backlog completo do `PBI-006`
- substituicao do layout informativo antigo por uma cena fullscreen de jogo
- promocao do mapa hexagonal para o palco principal da tela
- reducao drastica de textos inline e paines desnecessarios
- criacao de HUD minimalista com recursos e estado rapido da jogada
- criacao de modais de `Menu`, `Run` e `Ajuda`
- adicao de atalhos de teclado `M`, `R`, `H` e `Esc`
- redesenho da mao de cartas para uma apresentacao mais ilustrada e mais proxima de cartas jogaveis
- conclusao do `PBI-006` e do `EPICO-005`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-005_REFINAMENTO_DA_TELA_DE_JOGO_E_HUD.md`
- `BACKLOGS/PBIS/PBI-006_TELA_DE_JOGO_FULLSCREEN_COM_HUD_MODAL/DONE-PBI-006_TELA_DE_JOGO_FULLSCREEN_COM_HUD_MODAL.md`
- `BACKLOGS/PBIS/PBI-006_TELA_DE_JOGO_FULLSCREEN_COM_HUD_MODAL/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-006_TELA_DE_JOGO_FULLSCREEN_COM_HUD_MODAL/TASKS/DONE-*`
- `src/components/GameModal.tsx`
- `src/components/ExpansionHand.tsx`
- `src/components/HexMapPrototype.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-005 - Refinamento da Tela de Jogo e HUD`
- `PBI-006 - Tela de Jogo Fullscreen com HUD Modal`
- `HISTORIA-001 - Reestruturar a Cena Principal para Fullscreen`
- `HISTORIA-002 - Redesenhar a Mao de Cartas com Foco Visual`
- `HISTORIA-003 - Mover Informacoes Auxiliares para Modais por Atalho`

### Tasks executadas

- `TASK-001 - Refazer Layout da Tela de Novo Jogo com Mapa Fullscreen`
- `TASK-002 - Reduzir Textos Inline e HUD Fixo`
- `TASK-003 - Reestilizar Cartas com Visual Mais Ilustrado`
- `TASK-004 - Reorganizar a Mao com Apresentacao de Jogo`
- `TASK-005 - Criar Modais de Menu e Status`
- `TASK-006 - Adicionar Atalhos de Teclado para HUD e Modais`

### Validacao executada

- `npm run build`
- verificacao manual dos atalhos, modais e da nova composicao da tela

### Resultado da validacao

- build concluido com sucesso
- a tela de `Novo Jogo` agora abre como uma cena fullscreen com o mapa como foco principal
- a mao de cartas passou a ter leitura visual de carta jogavel, com fan na base da tela
- informacoes secundarias sairam da superficie principal e foram movidas para modais

### Commit e push

- esta entrada corresponde a entrega do `PBI-006` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-005 do sistema inicial de cartas de expansao

### Resumo

Foi implementada a primeira mao de cartas de expansao do prototipo, substituindo o gatilho de expansao por botao unico por um ciclo minimo de deck, compra e descarte.

### Entregas realizadas

- criacao do `EPICO-004` e do backlog completo do `PBI-005`
- definicao do modelo inicial de cartas de expansao
- associacao entre cada carta e um tipo especifico de tile
- implementacao do ciclo minimo de deck, mao, compra e descarte
- criacao do componente visual da mao de cartas
- integracao da selecao da carta ao prototipo do mapa
- uso da carta para definir o tile criado na expansao
- conclusao do `PBI-005` e do `EPICO-004`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-004_FUNDACAO_DO_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO.md`
- `BACKLOGS/PBIS/PBI-005_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO/DONE-PBI-005_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO.md`
- `BACKLOGS/PBIS/PBI-005_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-005_SISTEMA_INICIAL_DE_CARTAS_DE_EXPANSAO/TASKS/DONE-*`
- `src/lib/prototypeDeck.ts`
- `src/lib/hexGrid.ts`
- `src/components/ExpansionHand.tsx`
- `src/components/HexMapPrototype.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-004 - Fundacao do Sistema Inicial de Cartas de Expansao`
- `PBI-005 - Sistema Inicial de Cartas de Expansao`
- `HISTORIA-001 - Definir o Modelo Inicial das Cartas de Expansao`
- `HISTORIA-002 - Implementar o Ciclo Minimo de Deck, Mao e Descarte`
- `HISTORIA-003 - Conectar a Selecao de Carta a Expansao do Mapa`

### Tasks executadas

- `TASK-001 - Definir Tipos e Dados das Cartas de Expansao`
- `TASK-002 - Associar Cartas a Tipos de Tile`
- `TASK-003 - Implementar Deck Minimo e Compra Inicial`
- `TASK-004 - Renderizar a Mao e Atualizar Descarte`
- `TASK-005 - Armar Expansao a partir da Carta Selecionada`
- `TASK-006 - Criar Tile Correspondente a Carta Jogada`

### Validacao executada

- `npm run build`
- verificacao manual da integracao entre a mao de cartas e o mapa

### Resultado da validacao

- build concluido com sucesso
- a expansao agora depende de uma carta selecionada
- a mao e atualizada apos cada jogada
- o tile criado corresponde ao tipo da carta utilizada

### Commit e push

- esta entrada corresponde a entrega do `PBI-005` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-004 do mapa hexagonal isometrico

### Resumo

Foi implementado o primeiro prototipo do mapa hexagonal isometrico fake 3D no fluxo de `Novo Jogo`, incluindo fronteiras validas e uma acao simples de expansao de tiles.

### Entregas realizadas

- criacao do `EPICO-003` e do backlog completo do `PBI-004`
- definicao de um modulo puro para coordenadas e regras basicas do grid hexagonal
- criacao do componente visual do tabuleiro hexagonal
- renderizacao do prototipo dentro da tela de `Novo Jogo`
- adicao da acao `Usar Carta: Abrir Clareira`
- adicao de fronteiras clicaveis para expansao
- atualizacao do save minimo ao adicionar novos tiles
- conclusao do `PBI-004` e do `EPICO-003`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-003_FUNDACAO_DO_MAPA_HEXAGONAL_ISOMETRICO.md`
- `BACKLOGS/PBIS/PBI-004_PROTOTIPO_DO_MAPA_HEXAGONAL_ISOMETRICO/DONE-PBI-004_PROTOTIPO_DO_MAPA_HEXAGONAL_ISOMETRICO.md`
- `BACKLOGS/PBIS/PBI-004_PROTOTIPO_DO_MAPA_HEXAGONAL_ISOMETRICO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-004_PROTOTIPO_DO_MAPA_HEXAGONAL_ISOMETRICO/TASKS/DONE-*`
- `src/lib/hexGrid.ts`
- `src/lib/save.ts`
- `src/components/FlowScreen.tsx`
- `src/components/HexMapPrototype.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-003 - Fundacao do Mapa Hexagonal Isometrico`
- `PBI-004 - Prototipo do Mapa Hexagonal Isometrico`
- `HISTORIA-001 - Estruturar o Modelo Inicial do Grid Hexagonal`
- `HISTORIA-002 - Renderizar o Mapa Hexagonal Fake 3D no Fluxo de Novo Jogo`
- `HISTORIA-003 - Permitir Expansao Simples de Tiles e Refletir no Save`

### Tasks executadas

- `TASK-001 - Definir Tipos e Coordenadas do Grid`
- `TASK-002 - Calcular Fronteiras Validas de Expansao`
- `TASK-003 - Renderizar Tabuleiro Hexagonal na Tela de Novo Jogo`
- `TASK-004 - Estilizar Leitura Isometrica Fake 3D`
- `TASK-005 - Adicionar Acao de Expansao Simples`
- `TASK-006 - Atualizar Metadados do Save apos Expansao`

### Validacao executada

- `npm run build`
- verificacao manual da estrutura do backlog e da tela de `Novo Jogo`

### Resultado da validacao

- build concluido com sucesso
- o fluxo `Novo Jogo` agora exibe um tabuleiro hexagonal visivel
- um novo tile pode ser adicionado em fronteiras validas
- o save reflete o aumento de tiles colocados

### Commit e push

- esta entrada corresponde a entrega do `PBI-004` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-003 de save local minimo

### Resumo

Foi implementado o primeiro sistema real de save local do projeto, substituindo o stub anterior por um modelo versionado, com migracao, leitura, escrita, exibicao na interface e limpeza manual do save.

### Entregas realizadas

- criacao do `EPICO-002` e do backlog completo do `PBI-003`
- definicao de um contrato versionado para o save local
- suporte a migracao automatica do formato stub anterior
- leitura e escrita reais no `localStorage`
- integracao do save com a home, `Novo Jogo` e `Continuar`
- exibicao de resumo persistido da run nas telas de fluxo
- criacao de uma acao de `Limpar Save Local` em `Opcoes`
- conclusao do `PBI-003` e do `EPICO-002`

### Arquivos principais criados ou alterados

- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-002_PERSISTENCIA_LOCAL_E_CONTINUIDADE_DE_RUN.md`
- `BACKLOGS/PBIS/PBI-003_SISTEMA_MINIMO_DE_SAVE_LOCAL/DONE-PBI-003_SISTEMA_MINIMO_DE_SAVE_LOCAL.md`
- `BACKLOGS/PBIS/PBI-003_SISTEMA_MINIMO_DE_SAVE_LOCAL/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-003_SISTEMA_MINIMO_DE_SAVE_LOCAL/TASKS/DONE-*`
- `src/lib/save.ts`
- `src/components/TitleScreen.tsx`
- `src/components/SaveSummaryCard.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/screens/ContinueScreen.tsx`
- `src/screens/OptionsScreen.tsx`
- `src/styles.css`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-002 - Persistencia Local e Continuidade de Run`
- `PBI-003 - Sistema Minimo de Save Local`
- `HISTORIA-001 - Definir Modelo Versionado de Save e Persistencia`
- `HISTORIA-002 - Integrar Novo Jogo e Continuar ao Save Real`
- `HISTORIA-003 - Expor Estado e Limpeza do Save na UI`

### Tasks executadas

- `TASK-001 - Definir Contrato do Save Versionado`
- `TASK-002 - Implementar Leitura, Escrita e Migracao do Save`
- `TASK-003 - Integrar Home ao Save Real`
- `TASK-004 - Exibir Resumo Real no Fluxo de Continuar`
- `TASK-005 - Adicionar Acao de Limpar Save em Opcoes`
- `TASK-006 - Refletir Estado do Save nas Telas de Fluxo`

### Validacao executada

- `npm run build`
- verificacao manual do fluxo de save e da estrutura de backlog

### Resultado da validacao

- build concluido com sucesso
- o save antigo pode ser migrado para o novo formato
- `Continuar` depende de um save valido
- `Opcoes` pode limpar o save e invalidar a continuidade

### Commit e push

- esta entrada corresponde a entrega do `PBI-003` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Regra de resumo do que validar em execucao por task

### Resumo

Foi adicionada uma nova regra de entrega: toda task implementada deve terminar com um resumo claro do que deve ser visto em execucao para validar a mudanca.

### Entregas realizadas

- formalizacao da exigencia de resumo de validacao em execucao na diretriz de implementacao
- formalizacao da mesma regra no padrao do backlog
- definicao do bloco `O que voce deve ver na execucao` como parte esperada do fechamento de task

### Arquivos principais criados ou alterados

- `Documentacao/DIRETRIZ_DE_IMPLEMENTACAO.md`
- `BACKLOGS/README.md`
- `CHANGELOG.md`

### Vinculos de backlog

- sem item funcional de backlog associado
- mudanca de governanca aplicada como diretriz operacional do repositorio

### Validacao executada

- `npm run build`
- verificacao manual das diretrizes atualizadas

### Resultado da validacao

- build concluido com sucesso
- a regra de fechamento de task agora exige resumo observavel de validacao em execucao

### Commit e push

- esta entrada corresponde a uma mudanca de governanca e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Convencao de conclusao com prefixo DONE-

### Resumo

Foi definida uma nova regra de governanca para backlog: itens concluidos passam a ser marcados no proprio nome do arquivo com prefixo `DONE-`.

### Entregas realizadas

- formalizacao da regra de conclusao por prefixo `DONE-` na diretriz de implementacao
- formalizacao da regra no `BACKLOGS/README.md`
- renomeacao dos arquivos concluidos de tasks, historias e PBIs ja entregues
- ajuste dos PBIs concluidos para status `Concluido`
- manutencao da rastreabilidade com os IDs logicos preservados dentro do backlog

### Arquivos principais criados ou alterados

- `Documentacao/DIRETRIZ_DE_IMPLEMENTACAO.md`
- `BACKLOGS/README.md`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/DONE-PBI-001_TELA_INICIAL_HEXAFARM.md`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/TASKS/DONE-*`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/DONE-PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO.md`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/HISTORIAS/DONE-*`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/TASKS/DONE-*`
- `CHANGELOG.md`

### Vinculos de backlog

- `PBI-001 - Tela Inicial do Jogo HexaFarm`
- `PBI-002 - Estrutura Base de Navegacao Entre Telas`

### Validacao executada

- `npm run build`
- verificacao manual da estrutura de backlog apos renomeacao

### Resultado da validacao

- build concluido com sucesso
- arquivos concluidos do backlog agora seguem o padrao `DONE-`
- IDs logicos dos itens foram preservados no conteudo dos documentos

### Commit e push

- esta entrada corresponde a entrega de governanca do backlog e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-002 de navegacao base

### Resumo

Foi implementada a primeira estrutura real de navegacao do frontend, separando a home das rotas iniciais de `Novo Jogo`, `Continuar` e `Opcoes`.

### Entregas realizadas

- criacao do backlog do `PBI-002` com historias e tasks
- fechamento do `EPICO-001` como concluido
- adicao de `react-router-dom` ao frontend
- configuracao de `BrowserRouter` e da arvore de rotas do app
- extracao da home para uma screen dedicada
- conexao dos botoes principais da home a rotas reais
- criacao de telas placeholder para `Novo Jogo`, `Continuar` e `Opcoes`
- protecao da rota `Continuar` quando nao existir save
- reaproveitamento do save local stub para suportar navegacao

### Arquivos principais criados ou alterados

- `package.json`
- `package-lock.json`
- `src/main.tsx`
- `src/App.tsx`
- `src/components/TitleScreen.tsx`
- `src/components/FlowScreen.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/NewGameScreen.tsx`
- `src/screens/ContinueScreen.tsx`
- `src/screens/OptionsScreen.tsx`
- `src/lib/save.ts`
- `src/styles.css`
- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-001_EXPERIENCIA_INICIAL_E_ENTRADA_NO_JOGO.md`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/DONE-PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO.md`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/HISTORIAS/*`
- `BACKLOGS/PBIS/PBI-002_ESTRUTURA_BASE_DE_NAVEGACAO/TASKS/*`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-001 - Experiencia Inicial e Entrada no Jogo`
- `PBI-002 - Estrutura Base de Navegacao Entre Telas`
- `HISTORIA-001 - Configurar a Base de Roteamento do Aplicativo`
- `HISTORIA-002 - Conectar a Home as Rotas Principais`
- `HISTORIA-003 - Criar Telas Placeholder dos Fluxos Iniciais`

### Tasks executadas

- `TASK-001 - Adicionar Estrutura de Roteamento`
- `TASK-002 - Estruturar Rotas Raiz do App`
- `TASK-003 - Conectar Acoes da Home a Navegacao`
- `TASK-004 - Criar Tela Placeholder de Novo Jogo`
- `TASK-005 - Criar Tela Placeholder de Continuar`
- `TASK-006 - Criar Tela Placeholder de Opcoes`

### Validacao executada

- `npm install react-router-dom`
- `npm run build`
- verificacao manual das rotas, arquivos e da rastreabilidade do backlog

### Resultado da validacao

- build concluido com sucesso
- rotas iniciais compiladas sem erros
- `Continuar` permanece protegido por verificacao de save

### Commit e push

- esta entrada corresponde a entrega do `PBI-002` e deve ser fechada com commit e push apos a atualizacao do changelog

## 2026-02-28 - Implementacao do PBI-001 da tela inicial

### Resumo

Foi implementada a primeira versao funcional do frontend de `HexaFarm`, incluindo a base do app web e a tela inicial jogavel do `PBI-001`.

### Entregas realizadas

- criacao da base tecnica com `Vite + React + TypeScript`
- criacao do ponto de entrada da aplicacao e configuracao de build
- implementacao da tela inicial com layout responsivo
- criacao de identidade visual inicial com composicao estilizada e atmosfera cozy
- implementacao dos botoes `Novo Jogo`, `Continuar` e `Opcoes`
- criacao de adaptador simples de save em `localStorage`
- habilitacao dinamica do botao `Continuar` conforme a existencia de save
- criacao de painel stub de `Opcoes`
- ajuste do pipeline de build para evitar artefatos desnecessarios de typecheck
- registro da execucao dentro do PBI-001

### Arquivos principais criados ou alterados

- `.gitignore`
- `package.json`
- `package-lock.json`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/components/TitleScreen.tsx`
- `src/lib/save.ts`
- `src/styles.css`
- `src/vite-env.d.ts`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/DONE-PBI-001_TELA_INICIAL_HEXAFARM.md`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-001 - Experiencia Inicial e Entrada no Jogo`
- `PBI-001 - Tela Inicial do Jogo HexaFarm`
- `HISTORIA-001 - Estruturar Identidade Visual e Composicao da Tela Inicial`
- `HISTORIA-002 - Implementar Acoes Principais de Entrada`
- `HISTORIA-003 - Controlar Continuar por Save Local`
- `HISTORIA-004 - Garantir Responsividade e Polimento Inicial`

### Tasks executadas

- `TASK-001 - Criar Tela Raiz e Ponto de Entrada`
- `TASK-002 - Montar Layout Base da Tela Inicial`
- `TASK-003 - Implementar Titulo e Branding Base`
- `TASK-004 - Implementar Menu Principal e Botoes`
- `TASK-005 - Conectar Acao de Novo Jogo`
- `TASK-006 - Criar Adaptador de Leitura de Save`
- `TASK-007 - Implementar Estado do Botao Continuar`
- `TASK-008 - Criar Acesso Stub de Configuracoes`
- `TASK-009 - Ajustar Responsividade e Acessibilidade Inicial`
- `TASK-010 - Aplicar Fundo Visual e Microanimacoes Leves`

### Validacao executada

- `npm install`
- `npm run build`
- verificacao manual da estrutura gerada e da relacao entre PBI e implementacao

### Resultado da validacao

- build concluido com sucesso
- bundle de producao gerado em `dist/`
- sem erros de TypeScript durante o build
- sem gerar artefatos de configuracao fora do que deve ir para o repositorio

### Commit e push

- esta entrada corresponde a entrega do `PBI-001` e deve ser fechada com commit e push apos a atualizacao do changelog
## 2026-02-28 - Fundacao inicial do projeto e governanca de rastreabilidade

### Resumo

Foi consolidada a base documental inicial do projeto, organizada a estrutura de backlog e formalizada a regra de rastreabilidade obrigatoria para entregas futuras.

### Entregas realizadas

- criacao do GDD inicial do projeto
- criacao da diretriz de implementacao
- criacao da estrutura de backlog com epico, PBI, historias e tasks do primeiro item
- inicializacao do repositorio Git local
- configuracao do `origin` no GitHub
- primeiro commit e primeiro push para `main`
- formalizacao da exigencia de documentacao, changelog, validacao tecnica, commit e push ao fim de cada entrega

### Arquivos principais criados ou alterados

- `Documentacao/GDD_HEXAFARM.md`
- `Documentacao/DIRETRIZ_DE_IMPLEMENTACAO.md`
- `BACKLOGS/README.md`
- `BACKLOGS/EPICOS/EPICO-001_EXPERIENCIA_INICIAL_E_ENTRADA_NO_JOGO.md`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/DONE-PBI-001_TELA_INICIAL_HEXAFARM.md`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/HISTORIAS/*`
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/TASKS/*`
- `CHANGELOG.md`

### Vinculos de backlog

- `EPICO-001 - Experiencia Inicial e Entrada no Jogo`
- `PBI-001 - Tela Inicial do Jogo HexaFarm`

### Observacao de governanca

Parte desta entrada cobre mudancas de processo e governanca do repositorio. Nesse caso, a rastreabilidade e feita por documentacao institucional, mesmo quando nao houver um item funcional especifico de produto.

### Validacao executada

- build nao aplicavel nesta entrega, pois o repositorio ainda nao possui sistema de build configurado
- verificacao manual da estrutura de pastas e arquivos
- verificacao da configuracao do repositorio Git e do remote `origin`

### Commit e push

- commit local anterior realizado: `6d58676 - Add initial game documentation and backlog structure`
- commit e push desta entrega devem ser consultados no historico Git do repositorio
