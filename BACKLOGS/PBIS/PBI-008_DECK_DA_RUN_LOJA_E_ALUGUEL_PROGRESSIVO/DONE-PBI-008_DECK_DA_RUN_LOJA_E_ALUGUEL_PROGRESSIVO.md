# PBI-008 - Deck da Run, Loja e Aluguel Progressivo

## Tipo

PBI (Product Backlog Item)

## Vinculo

- Epico pai: `EPICO-007 - Deckbuilding Persistente e Economia da Run`

## Titulo

Implementar deck configuravel de 24 cartas, pilhas reais, run de 7 dias, aluguel e loja

## Objetivo

Introduzir a primeira camada de deckbuilding persistente e economia entre runs, conectando deck de 24 cartas, colecao possuida, compra de cartas e aluguel progressivo.

## Contexto

O prototipo ja possui cartas, energia e fim de dia. O proximo passo e transformar isso em uma run fechada com objetivo economico e baralho montado pela jogadora.

## Escopo

- montar um deck de 24 cartas no inicio da run
- usar cartas compradas da pilha de compra e enviar usadas para o descarte
- exibir pilha de compra e pilha de descarte na interface
- persistir a colecao de cartas possuida
- encerrar a run em 7 dias
- validar o aluguel ao fim da run
- aumentar o aluguel a cada run
- abrir uma loja ao fim da run para compra de cartas

## Fora de Escopo

- sistema formal de level up
- raridades complexas
- efeitos especiais por carta alem de expansao
- embaralhamento persistido entre reloads
- balanceamento final da economia

## Requisitos Funcionais

1. A jogadora escolhe exatamente 24 cartas para iniciar a run.
2. O deck da run usa apenas cartas possuidas na colecao.
3. A interface exibe compra e descarte como pilhas visiveis.
4. A run dura 7 dias.
5. Ao fim da run, o aluguel e validado.
6. O aluguel aumenta a cada run.
7. Uma loja permite comprar novas cartas ao fim da run.

## Criterios de Aceitacao

1. Nao e possivel iniciar a run sem 24 cartas selecionadas.
2. A mao compra a partir do deck configurado da run.
3. O descarte acumula cartas jogadas.
4. Ao fim do dia 7, a run vai para a resolucao de aluguel.
5. Ao fim da run, a loja fica acessivel.
6. Cartas compradas passam a integrar a colecao possuida.
7. O build continua valido apos a entrega.

## Historias Derivadas

- `HISTORIA-001 - Montar deck persistente de 24 cartas no inicio da run`
- `HISTORIA-002 - Exibir pilhas reais e consumir o deck configurado`
- `HISTORIA-003 - Encerrar a run com aluguel e abrir a loja`

## Tasks Derivadas

- `TASK-001` ate `TASK-008`, detalhadas na pasta `TASKS`

## Prioridade

Alta

## Classificacao

Core

## Status de Execucao

- Status: Concluido

## Valor Entregue

Esse PBI conecta o prototipo a um loop real de deckbuilder roguelite, com selecao de 24 cartas, objetivo de aluguel em 7 dias e expansao da colecao via loja.
