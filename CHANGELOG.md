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
- `BACKLOGS/PBIS/PBI-001_TELA_INICIAL_HEXAFARM/PBI-001_TELA_INICIAL_HEXAFARM.md`
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
