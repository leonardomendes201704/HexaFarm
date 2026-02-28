# Diretriz de Implementacao - HexaFarm

Este arquivo define como o projeto deve ser conduzido com base no documento principal:

- `Documentacao/GDD_HEXAFARM.md`
- `CHANGELOG.md`

Esse GDD e a fonte principal de verdade para escopo, prioridades e validacao do conceito. Toda implementacao futura deve respeitar essa referencia antes de abrir novas frentes.

## 1. Regra de Alinhamento

Antes de iniciar qualquer feature, confirmar:

1. A feature reforca o loop principal do jogo.
2. A feature cabe no escopo atual do MVP ou da fase ativa.
3. A feature nao desloca o foco do mapa hexagonal e das cartas.

Se qualquer resposta for negativa, a feature nao deve entrar imediatamente.

## 2. Loop Central Obrigatorio

O time deve proteger este fluxo como prioridade absoluta:

`jogar carta -> tile aparece -> tile gera valor -> adjacencia cria combo -> fim de run -> meta-progresso`

Nenhuma feature secundaria deve ser implementada antes desse fluxo estar funcional e divertido.

## 3. Ordem de Prioridade

Quando houver duvida entre duas entregas, priorizar nesta ordem:

1. Grid hexagonal e regras de posicionamento
2. Cartas de expansao e interacao com tiles
3. Valor gerado por tiles e adjacencia
4. Loop diario e progressao da run
5. Meta-progressao
6. Personagens, eventos e polimento

Ou seja: primeiro provar o sistema, depois ampliar o conteudo.

## 4. Regras de Escopo para o MVP

No MVP, o projeto deve ficar restrito a:

- 1 base inicial
- 3 tipos de tile principais
- 15 a 20 cartas
- 1 personagem
- 1 estacao/run
- save local

Nao adicionar no MVP:

- multiplayer
- backend
- combate separado
- multiplos biomas complexos
- varias personagens
- economia inflada

## 5. Regra de Arquitetura

Toda implementacao deve manter estas fronteiras:

- React cuida da interface e da exibicao do estado
- A logica central do jogo fica em funcoes puras/modulos de dominio
- O estado global fica centralizado
- O conteudo deve ser orientado por dados
- O renderer isometrico nao deve carregar regras de negocio

Se uma regra de gameplay estiver presa dentro de um componente visual, isso deve ser tratado como desvio de arquitetura.

## 6. Regra de Conteudo

Novos tiles, cartas, personagens e eventos devem ser adicionados por dados sempre que possivel.

Evitar:

- regras hardcoded em varios componentes
- efeitos duplicados escritos manualmente
- dependencia entre conteudo e layout da UI

Objetivo:

Escalar o jogo por conteudo, nao por acoplamento de codigo.

## 7. Regra de UX e Leitura

Cada iteracao deve preservar:

- clareza de onde o jogador pode colocar um tile
- feedback visual claro ao jogar uma carta
- leitura limpa da producao por adjacencia
- navegacao confortavel em browser

Se uma feature aumenta a complexidade visual sem aumentar a compreensao, ela deve ser simplificada.

## 8. Regra de Validacao por Entrega

Cada entrega deve ser testada contra estas perguntas:

1. O jogador entende a nova funcionalidade sem tutorial longo?
2. A fazenda ficou mais interessante visualmente apos a mudanca?
3. A mudanca cria decisao espacial real?
4. A mudanca torna a run mais rejogavel?
5. A mudanca preserva a atmosfera cozy?

Se a maioria dessas respostas for "nao", a entrega nao esta boa o suficiente.

## 9. Regra de Revisao de Feature

Toda feature proposta deve ser classificada em um destes grupos:

- Core: essencial para o loop principal
- Support: melhora clareza, qualidade ou progressao
- Expansion: adiciona variedade apos o core estar validado

So features `Core` e `Support` devem entrar antes do vertical slice jogavel.

## 10. Regra de Corte

Quando o escopo crescer demais, cortar nesta ordem:

1. quantidade de conteudo
2. quantidade de personagens
3. complexidade de eventos
4. sistemas paralelos

Nao cortar primeiro:

- o grid hexagonal
- as cartas de expansao
- a adjacencia
- a progressao visual da fazenda

Esses elementos definem a identidade do jogo.

## 11. Definicao de "No Caminho Certo"

O projeto esta alinhado com a documentacao quando:

- o mapa cresce por cartas
- a fazenda da run e unica
- o posicionamento importa
- a leitura isometrica e clara
- o jogador sente progresso constante
- a experiencia continua leve e convidativa

## 12. Comando de Decisao

Em caso de duvida, usar esta regra:

`Se a ideia nao reforca o deckbuilder espacial cozy de fazenda hexagonal isometrica, ela nao e prioridade.`

## 13. Regra de Documentacao Obrigatoria

Toda solicitacao que gerar qualquer tipo de trabalho no projeto deve deixar rastros documentados no repositorio.

Isso inclui:

- implementacoes
- alteracoes de comportamento
- mudancas de escopo
- criacao ou alteracao de backlog
- ajustes de arquitetura
- mudancas de processo

Ao receber uma nova demanda, deve ser avaliado se ela exige atualizar:

- documentacao funcional
- backlog
- diretrizes
- changelog

Se a mudanca nao for registrada, ela e considerada incompleta do ponto de vista de governanca.

## 14. Regra de Rastreabilidade

Toda entrega deve ter rastreabilidade explicita entre o que foi pedido e o que foi alterado.

Sempre que aplicavel, relacionar a entrega com:

- epico
- PBI
- historia
- task
- arquivo(s) alterado(s)

Se a entrega for de governanca ou infraestrutura e nao existir item de backlog associado, isso deve ser declarado de forma explicita no registro da mudanca.

## 15. Regra de Changelog

Toda implementacao ou alteracao deve criar ou atualizar o arquivo:

- `CHANGELOG.md`

Cada entrada do changelog deve registrar, no minimo:

- data da mudanca
- titulo curto da entrega
- resumo objetivo do que foi feito
- arquivos principais criados ou alterados
- vinculos de backlog quando existirem
- validacao executada
- status de commit e push

O changelog deve servir como historico auditavel do projeto.

## 16. Regra de Validacao Tecnica

Ao final de cada implementacao ou alteracao, deve ser executada uma validacao tecnica antes de concluir a entrega.

Ordem obrigatoria:

1. Validar a integridade da mudanca.
2. Executar o build do projeto, quando houver build configurado.
3. Executar verificacoes adicionais relevantes, quando existirem.
4. Registrar o resultado no changelog.

Exemplos de validacao:

- build
- testes
- lint
- verificacao de arquivos gerados
- checagem de estrutura ou navegacao

Se o projeto ainda nao possuir build configurado, isso deve ser registrado como:

- `Build nao aplicavel nesta entrega`

Ausencia de build nao elimina a obrigacao de registrar a validacao executada.

## 17. Regra de Fechamento de Entrega

Nenhuma implementacao ou alteracao deve ser considerada finalizada sem passar pelo fluxo de fechamento abaixo:

1. Atualizar a documentacao relevante.
2. Atualizar ou criar a entrada correspondente no `CHANGELOG.md`.
3. Executar a validacao tecnica aplicavel.
4. Revisar os arquivos alterados.
5. Criar commit com mensagem clara e coerente com a entrega.
6. Fazer push para o repositorio remoto.

Se algum passo nao puder ser executado, o motivo deve ser declarado explicitamente.

## 18. Regra de Commit e Push

Todo trabalho concluido deve terminar com:

- commit
- push

O commit deve refletir a entrega real feita no repositorio, sem mensagens vagas.

O ideal e que a mensagem:

- identifique o objetivo da entrega
- reflita o escopo principal alterado
- facilite leitura futura do historico

O push deve ocorrer ao final da entrega para manter o repositorio remoto atualizado e alinhado com o changelog.

## 19. Regra de Conclusao de Backlog

Quando um item de backlog for concluido, o proprio arquivo deve refletir esse estado por convencao de nome.

Regras:

- task implementada: renomear o arquivo com prefixo `DONE-`
- historia com todas as tasks concluidas: renomear o arquivo com prefixo `DONE-`
- PBI com todas as historias concluidas: renomear o arquivo com prefixo `DONE-`

Exemplos:

- `TASK-001_EXEMPLO.md` -> `DONE-TASK-001_EXEMPLO.md`
- `HISTORIA-001_EXEMPLO.md` -> `DONE-HISTORIA-001_EXEMPLO.md`
- `PBI-001_EXEMPLO.md` -> `DONE-PBI-001_EXEMPLO.md`

O prefixo `DONE-` e o marcador oficial de conclusao do backlog no nivel de arquivo.

## 20. Regra de Aplicacao da Conclusao

Ao concluir uma entrega, aplicar nesta ordem:

1. concluir a implementacao
2. validar a entrega
3. renomear os arquivos de backlog elegiveis com prefixo `DONE-`
4. atualizar changelog e documentacao
5. commitar e fazer push

Se um item ainda depender de subtarefas ou historias abertas, ele nao deve receber o prefixo `DONE-`.
