# TASK-001 - Adicionar Raio Amarelo na Badge de Custo das Cartas

## Status

Concluido

## Objetivo

Adicionar um pequeno icone de raio amarelo ao lado direito do valor da badge de energia.

## Implementacao

- a badge de energia deixou de ser circular fixa e passou a ser um pill compacto
- o numero e o icone foram alinhados lado a lado
- o icone de raio foi adicionado via pseudo-elemento CSS
- o ajuste foi aplicado tanto em `expansion-card__cost` quanto em `collection-card__cost`

## Resultado Esperado

O custo de energia passa a mostrar um pequeno raio amarelo ao lado do numero, reforcando a semantica de energia sem mudar o HTML.
