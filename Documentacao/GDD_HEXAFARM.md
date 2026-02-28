# HexaFarm - Documento de Visao e Escopo

## 1. Visao Geral

HexaFarm e um jogo para browser/web em React que combina:

- incremental
- deckbuilder
- cozy farming
- roguelite
- fantasy waifu/cute
- mapa isometrico com tiles hexagonais

O diferencial central do projeto e que o mapa nao e apenas um cenario: ele cresce durante a run. Cada carta pode alterar o tabuleiro, e varias cartas devem permitir adicionar novos tiles hexagonais ao mapa.

O jogo deve priorizar sensacao de progresso visual, conforto, rejogabilidade e sinergias espaciais.

## 2. High Concept

O jogador comeca cada run com uma base pequena, um deck inicial e um unico tile central. Ao comprar e jogar cartas, ele expande a fazenda em um grid hexagonal isometrico, planta, constroi estruturas, cria combos por adjacencia e evolui sua economia. Ao fim da estacao, a run termina, parte do progresso e convertida em meta-progresso e novas opcoes sao desbloqueadas para futuras runs.

Em resumo:

`jogar carta -> tile aparece -> tile gera valor -> adjacencia cria combo -> run termina -> desbloqueios permanentes`

Esse loop deve ser o coracao do projeto.

## 3. Pilar Principal de Design

O projeto deve seguir estes pilares:

- Cozy: baixa punicao, atmosfera leve, experiencia confortavel.
- Spatial deckbuilder: cartas alteram o mapa, nao apenas executam acoes isoladas.
- Incremental por adjacencia: tiles e estruturas escalam valor com posicionamento.
- Roguelite: cada run tem variacao de cartas, eventos e configuracao de mapa.
- Colecionavel: cartas, personagens, biomas, upgrades e conteudo desbloqueavel.
- Visualmente recompensador: a fazenda cresce na tela e comunica progresso.

## 4. Core Loop

### 4.1 Loop macro da run

1. A run inicia com um tile central e um deck basico.
2. O jogador compra cartas e recebe um conjunto pequeno de energia por dia.
3. Cartas de expansao adicionam novos tiles nas bordas validas do mapa.
4. Cartas de cultivo, construcao e utilidade interagem com tiles ja existentes.
5. A configuracao espacial do mapa gera bonus passivos por adjacencia.
6. Eventos e escolhas surgem durante a estacao.
7. Ao final da run, a fazenda temporaria e encerrada.
8. Parte dos ganhos vira progresso permanente.

### 4.2 Loop diario sugerido

1. Inicio do dia: compra de cartas, efeitos de inicio de turno e possivel evento.
2. Fase de acao: jogar cartas para expandir, plantar, regar, colher, construir ou interagir.
3. Fase de producao: passivos, crescimento de cultivos e triggers de adjacencia.
4. Fase social: interacoes com personagem/waifu e ganho de afinidade.
5. Fim do dia: resolucao de efeitos, save e avancar o relogio.

## 5. Estrutura do Mapa

## 5.1 Grid

O mapa deve usar um grid hexagonal com coordenadas axiais (`q`, `r`).

Motivos:

- simplifica calculo de vizinhos
- facilita regras de adjacencia
- desacopla logica do jogo da renderizacao
- permite trocar o renderer sem quebrar a simulacao

## 5.2 Regras de expansao

- O jogador so pode adicionar tiles em `bordas validas`.
- Algumas cartas so podem ser jogadas se houver adjacencia com tipos especificos.
- Certos tiles especiais devem surgir por evento, recompensa ou condicao.
- A expansao do mapa deve ser legivel e previsivel o bastante para criar estrategia.

## 5.3 Tipos iniciais de tile

MVP recomendado:

- Campo
- Agua
- Jardim
- Casa/Base

Expansao futura:

- Bosque
- Mercado
- Santuario
- Cozinha
- Lago magico
- Estufa

## 5.4 Dados de cada tile

Cada tile deve suportar, no minimo:

- `id`
- `q`
- `r`
- `tileType`
- `biome`
- `elevation`
- `fertility`
- `moisture`
- `structureId?`
- `cropId?`
- `modifiers[]`

## 6. Sistema de Cartas

As cartas devem ser o principal meio de interacao com o tabuleiro.

## 6.1 Familias de carta

- Expansion: adiciona novos tiles ao mapa.
- Cultivation: plantar, regar, acelerar crescimento, colher.
- Construction: coloca estruturas e decoracoes.
- Utility: compra, energia, reducao de custo, duplicacao, reciclagem.
- Social: ativa personagens, afinidade e buffs em area.

## 6.2 Comportamento do deck

O sistema deve incluir:

- deck
- mao
- descarte
- exaustao quando necessario
- compra por turno/dia
- custo de energia por carta

## 6.3 Exemplo de cartas

- `Abrir Clareira`: adiciona 1 tile de bosque em uma borda valida.
- `Lote Fertil`: adiciona 1 tile de campo com bonus de crescimento.
- `Canal de Irrigacao`: adiciona 1 tile de agua.
- `Plantar Tulipas`: planta em um tile compativel.
- `Rega Delicada`: aumenta crescimento em tile alvo.
- `Coreto da Lily`: constroi estrutura social com bonus em tiles vizinhos.

## 7. Progressao Incremental

O aspecto incremental deve nascer da combinacao entre:

- passivos de tiles
- bonus por adjacencia
- estruturas
- afinidade com personagens
- upgrades permanentes entre runs

O crescimento deve ser controlado para evitar escalada quebrada logo no inicio. A diversao deve vir de montar engines produtivas e visualmente satisfatorias, nao de um unico combo dominante.

## 8. Camada Roguelite

O componente roguelite deve ser integrado a estrutura de fazenda, e nao separado dela.

Cada run deve variar por:

- pool aleatorio de cartas
- eventos
- tiles raros
- recompensas
- escolhas de caminho
- sinergias disponiveis

A propria fazenda da run deve funcionar como a "dungeon" procedural do jogo.

## 9. Personagens e Tom Cozy/Waifu

O lado waifu/cute deve ser tratado como camada de fantasia, companhia e progressao afetiva, nao como sistema desconectado do gameplay.

Cada personagem pode oferecer:

- bonus passivos
- cartas exclusivas
- eventos proprios
- afinidade
- buffs por proximidade a certos tiles

MVP recomendado:

- 1 personagem inicial
- 1 linha de afinidade simples
- 1 estrutura social exclusiva
- 2 a 4 cartas relacionadas

## 10. Direcao Visual

## 10.1 Estilo

O jogo deve ser:

- isometrico
- 3D ou "3D fake"
- legivel em browser
- estilizado
- cute/cozy

## 10.2 Recomendacao tecnica

Abordagem recomendada:

- React + TypeScript
- react-three-fiber
- camera ortografica
- tiles como prismas baixos
- props low-poly leves ou billboards
- sombras suaves

Objetivo:

Ter leitura de profundidade e volume sem custo alto de uma pipeline 3D pesada.

## 11. Arquitetura Tecnica

Stack recomendada:

- React + TypeScript
- Vite
- Zustand
- react-three-fiber
- Framer Motion (UI/transicoes)
- LocalStorage ou IndexedDB para save
- Howler.js para audio simples

Separacao obrigatoria de camadas:

- UI: componentes React e HUD
- Renderer: cena 3D/isometrica
- Game State: stores e estado global
- Game Logic: regras puras sem dependencia de React
- Content Data: cartas, eventos, tiles, personagens e upgrades em dados
- Persistence: save/load/versionamento

Regra critica:

`React deve renderizar o estado. A logica central do jogo nao deve morar dentro dos componentes.`

## 12. Modelo de Dados

O projeto deve ser orientado por dados desde o inicio.

Entidades principais:

- `cards`
- `tiles`
- `crops`
- `structures`
- `characters`
- `events`
- `relics`
- `metaUpgrades`
- `runs`

Cada tipo de conteudo deve ser facil de expandir por arquivos de dados, sem exigir refatoracao do motor.

## 13. MVP Recomendado

O MVP precisa validar a fantasia principal e nao o projeto inteiro.

Escopo ideal do MVP:

- 1 tile central/base
- 3 tipos de tile (`Campo`, `Agua`, `Jardim`)
- 15 a 20 cartas
- 1 personagem
- 1 estacao/run
- sistema de expansao hexagonal
- sistema de adjacencia
- plantio, rega, colheita e moeda
- save local
- UI funcional, clara e atraente

Se o MVP provar que `expandir o mapa por carta` e divertido, o projeto esta validado.

## 14. Backlog Prioritario

Ordem recomendada de implementacao:

1. Grid hex axial e renderer isometrico
2. Colocacao de tiles e highlight de posicoes validas
3. Deck, mao, descarte e custo de energia
4. Cartas de expansao
5. Interacoes com tiles (plantar, regar, colher)
6. Bonus por adjacencia
7. Loop de dia e fim de run
8. Meta-progressao
9. Personagem e afinidade
10. Polimento visual e de UX

## 15. Roadmap por Fases

### Fase 1 - Pre-producao

- fechar fantasy, escopo e pilares
- definir 20 cartas-base no papel
- definir 1 personagem inicial
- definir 1 estacao jogavel

### Fase 2 - Prototipo de grid e loop

- implementar coordenadas hex axiais
- criar mapa com expansao por carta
- validar posicionamento e bordas
- testar loop sem arte final

### Fase 3 - Vertical slice

- 1 run completa jogavel
- UI basica
- 10+ eventos
- 15+ cartas
- 1 personagem com afinidade

### Fase 4 - Meta-progressao e save

- reset parcial ao fim da run
- moeda permanente
- desbloqueios
- save/load com versionamento

### Fase 5 - Polimento

- feedback visual ao jogar cartas
- elevacao/animacao na colocacao de tiles
- efeitos leves
- tutorial curto

### Fase 6 - Expansao de conteudo

- novos biomas
- novos personagens
- novas familias de carta
- balanceamento

## 16. Riscos Principais

- Escopo inflado: juntar deckbuilder, incremental, roguelite, grid hex e render 3D aumenta a complexidade.
- Falta de foco: farm, deck e social nao podem competir pelo centro do loop.
- Balanceamento: combos espaciais podem quebrar o progresso rapido demais.
- UI carregada: muita informacao ao mesmo tempo reduz conforto e clareza.
- Save fragil: mudancas em dados exigem versionamento desde cedo.

## 17. Regras de Escopo

Para manter o projeto viavel:

- Nao adicionar multiplayer no MVP.
- Nao depender de backend no MVP.
- Nao criar combate separado antes do loop de fazenda funcionar.
- Nao adicionar varias personagens antes de validar a primeira.
- Nao misturar todas as mecanicas novas na mesma iteracao.

## 18. Criterio de Validacao

O projeto esta no caminho certo quando:

- o jogador entende onde pode expandir
- jogar cartas para crescer o mapa e satisfatorio
- o posicionamento dos tiles altera claramente a producao
- o loop diario e facil de ler
- a run cria uma fazenda unica
- a progressao permanente incentiva nova tentativa

## 19. Regra Mestra

Toda decisao de design, codigo, arte e UX deve responder a esta pergunta:

`Isso reforca o loop de deckbuilder espacial cozy em que cartas expandem e melhoram uma fazenda hexagonal isometrica?`

Se a resposta for "nao", a funcionalidade deve ser adiada, simplificada ou removida.
