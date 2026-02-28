# TASK-003 - Configurar Camera Ortografica Isometrica

## Status

Concluido

## Objetivo

Definir angulo, zoom e framing base para leitura isometrica limpa.

## Implementacao

- configurada uma `OrthographicCamera` como camera padrao do stage 3D
- definidos parametros base de enquadramento em constantes de facil ajuste
- aplicado `lookAt` fixo para manter leitura isometrica coerente do centro do stage

## Resultado Esperado

O canvas 3D passa a usar uma camera ortografica com angulo isometrico estavel, servindo como base visual para os proximos passos da migracao.
