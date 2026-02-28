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

## Estrutura Atual

- `EPICO-001`: experiencia inicial e entrada no jogo
- `PBI-001`: tela inicial do jogo HexaFarm
- `PBI-002`: estrutura base de navegacao entre telas

## Convencao de Nomes

- `EPICO-XXX_NOME.md`
- `PBI-XXX_NOME.md`
- `HISTORIA-XXX_NOME.md`
- `TASK-XXX_NOME.md`
- `DONE-PBI-XXX_NOME.md`
- `DONE-HISTORIA-XXX_NOME.md`
- `DONE-TASK-XXX_NOME.md`

Essa estrutura deve ser mantida como padrao para evitar backlog solto ou sem hierarquia.
