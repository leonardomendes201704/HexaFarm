# PBI-003 - Sistema Minimo de Save Local

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-002 - Persistencia Local e Continuidade de Run`

## Titulo

Implementar um sistema minimo de save local versionado para `HexaFarm`

## Objetivo

Substituir o save stub atual por um modelo minimo de persistencia local, com metadados de run, validacao basica, suporte a migracao do formato anterior e uma acao de limpeza do save na interface.

## Contexto

O frontend ja possui fluxo de entrada e navegacao base. O proximo passo e tornar o save local um contrato real entre as telas, para preparar a chegada do mapa, do progresso de run e da futura meta-progressao.

## Escopo

- definir um modelo minimo e versionado de save
- suportar leitura e escrita no `localStorage`
- migrar o save stub anterior quando encontrado
- criar save real ao iniciar `Novo Jogo`
- atualizar metadados ao usar `Continuar`
- exibir resumo do save nas telas principais
- permitir limpar o save em `Opcoes`

## Fora de Escopo

- multiplos slots de save
- cloud save
- sincronizacao com backend
- serializacao completa de gameplay real
- save de configuracoes detalhadas

## Requisitos Funcionais

1. O app deve conseguir criar um save local valido.
2. O app deve conseguir ler e validar esse save.
3. O app deve conseguir migrar o formato stub anterior.
4. O fluxo `Continuar` deve consumir o save salvo.
5. A UI deve exibir metadados basicos do save.
6. Deve existir uma acao para limpar o save local.

## Criterios de Aceitacao

1. `Novo Jogo` cria um save com dados minimos reais.
2. `Continuar` mostra dados persistidos da run.
3. Se existir um save antigo no formato stub, ele e convertido para o modelo atual.
4. `Opcoes` permite limpar o save local.
5. Ao limpar o save, a home volta a desabilitar `Continuar`.
6. O build continua valido apos a mudanca.

## Historias Derivadas

- `HISTORIA-001 - Definir modelo versionado de save e persistencia`
- `HISTORIA-002 - Integrar o ciclo de novo jogo e continuar ao save real`
- `HISTORIA-003 - Expor estado e limpeza do save na interface`

## Tasks Derivadas

- `TASK-001` ate `TASK-006`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Support

## Status de Execucao

- Status: Concluido
- Data da entrega base: 2026-02-28
- Build validado: Sim
- Marcador de arquivo: `DONE-`

## Implementacao Realizada

Esta entrega implementou:

- modelo de save local versionado com metadados minimos de run
- migracao automatica do formato stub anterior
- criacao e leitura de save real no `localStorage`
- atualizacao de metadados ao continuar uma run
- exibicao do estado salvo nas telas principais
- acao para limpar o save em `Opcoes`

## Tasks Executadas Nesta Entrega

- `TASK-001 - Definir Contrato do Save Versionado`
- `TASK-002 - Implementar Leitura, Escrita e Migracao do Save`
- `TASK-003 - Integrar Home ao Save Real`
- `TASK-004 - Exibir Resumo Real no Fluxo de Continuar`
- `TASK-005 - Adicionar Acao de Limpar Save em Opcoes`
- `TASK-006 - Refletir Estado do Save nas Telas de Fluxo`

## Valor Entregue

Esse PBI cria a primeira camada real de persistencia do projeto e reduz o acoplamento futuro entre UI e estado da run.
