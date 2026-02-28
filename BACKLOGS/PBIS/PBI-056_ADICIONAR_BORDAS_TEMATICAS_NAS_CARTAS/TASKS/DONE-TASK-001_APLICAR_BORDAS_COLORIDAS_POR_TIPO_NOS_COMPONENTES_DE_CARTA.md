# TASK-001 - Aplicar Bordas Coloridas por Tipo nos Componentes de Carta

## Status

Concluido

## Objetivo

Adicionar moldura externa mais grossa e borda interna de arte nas cartas da mao e da grade, com cores por tipo.

## Implementacao

- `CollectionCard` passou a expor tambem a classe de `cardKind`
- `ExpansionHand` passou a expor classe dedicada para cartas de cultivo
- foram criadas variaveis CSS de cor para moldura externa, glow e borda da arte
- a moldura da carta e a borda da arte ficaram mais grossas
- cartas de cultivo agora usam uma moldura dourada distinta

## Resultado Esperado

As cartas passam a ter leitura visual mais forte, com moldura e area de arte bem delimitadas, e as cores da borda comunicam o tipo da carta.
