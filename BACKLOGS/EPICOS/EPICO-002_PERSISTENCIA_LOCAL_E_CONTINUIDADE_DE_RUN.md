# EPICO-002 - Persistencia Local e Continuidade de Run

## Tipo

Epico

## Objetivo

Estabelecer a base de persistencia local do jogo para que a continuidade de progresso deixe de ser apenas um stub e passe a representar um estado minimo de run salvo no navegador.

## Problema que Este Epico Resolve

Sem um save local minimamente estruturado, o fluxo de `Continuar` existe apenas como placeholder e o frontend nao consegue sustentar evolucoes reais do loop de jogo.

## Valor de Negocio

- transforma o fluxo de continuidade em algo verificavel
- reduz risco de retrabalho quando o gameplay real entrar
- prepara a base para metadados de run, progresso e futuras migracoes

## Resultado Esperado

Ao iniciar uma nova jornada, o jogo cria um save local versionado com informacoes minimas da run. Ao continuar, esse save pode ser lido, validado, atualizado e exibido ao usuario.

## PBIs Vinculados

- `PBI-003 - Sistema Minimo de Save Local`

## PBIs Futuros Naturais

- `PBI-004 - Prototipo do mapa hexagonal isometrico`

## Criterios de Sucesso do Epico

1. O save local possui estrutura valida e versionada.
2. O fluxo de `Novo Jogo` cria um save minimo real.
3. O fluxo de `Continuar` le e exibe dados desse save.
4. Existe ao menos um ponto da UI para limpar ou reiniciar o save.

## Dependencias

- `DONE-PBI-001`
- `DONE-PBI-002`

## Status

- Status: Concluido
- Data de fechamento base: 2026-02-28
