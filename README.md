# Visualizador de Transformações Lineares (2D) — GAAL/FTC

Projeto interativo em **TypeScript + Canvas** para visualizar o efeito de uma **matriz 2×2** em vetores, grade cartesiana e um quadrado unitário.
Inclui animação usando **A(t) = (1−t)I + tA** e cálculo de determinante.

## Rodar localmente
```bash
npm install
npm run dev
```

## O que você vê
- Grade original (identidade) e grade transformada
- Quadrado unitário antes/depois
- Vetores base `e1`, `e2` e suas imagens `A(t)e1`, `A(t)e2`
- `det(A)` e escala de área

## Ideias para evoluir
- Mostrar autovalores/autovetores (quando existirem)
- Projeção em uma base escolhida
- Transformações 3D (matriz 3×3) com WebGL

https://rapha0602.github.io/linear-transform-visualizer/
https://rapha0602.github.io/linear-transform-visualizer/
https://rapha0602.github.io/linear-transform-visualizer/

Este projeto tem como objetivo visualizar de forma interativa os efeitos geométricos de transformações lineares no plano, explorando conceitos de GAAL e FTC como determinante, orientação, composição e interpolação linear de matrizes
