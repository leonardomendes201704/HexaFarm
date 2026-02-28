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
- `PBI-001`: tela inicial do jogo HexaFarm
- `PBI-002`: estrutura base de navegacao entre telas
- `PBI-003`: sistema minimo de save local
- `PBI-004`: prototipo do mapa hexagonal isometrico
- `PBI-005`: sistema inicial de cartas de expansao
- `PBI-006`: tela de jogo fullscreen com HUD modal
- `PBI-007`: energia e ciclo minimo de dia

## Convencao de Nomes

- `EPICO-XXX_NOME.md`
- `PBI-XXX_NOME.md`
- `HISTORIA-XXX_NOME.md`
- `TASK-XXX_NOME.md`
- `DONE-PBI-XXX_NOME.md`
- `DONE-HISTORIA-XXX_NOME.md`
- `DONE-TASK-XXX_NOME.md`

Essa estrutura deve ser mantida como padrao para evitar backlog solto ou sem hierarquia.
