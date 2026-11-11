# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Visão geral

Livro de receitas (CRUD) em JavaScript puro: front-end estático (Bootstrap 5 + Axios via CDN, sem build) que consome uma API REST simulada com `json-server`. Não há bundler, linter nem testes configurados. O código, a UI e os dados (`receitas`, `titulo`, `tipo`, `nota`, `ingredientes`, `preparo`, `favorito`) estão em português.

## Comandos

```bash
# Backend (API simulada em http://localhost:3000) — manter rodando
cd backend
npx json-server --watch db.json --port 3000   # equivalente a `npm start` em backend/

# Frontend: abrir index.html direto no navegador ou usar o Live Server do VSCode
```

`json-server` não está listado como dependência em `backend/package.json`; é executado via `npx`. O frontend usa `<script type="module">`, então pode ser necessário servir por HTTP (Live Server) em vez de `file://`, dependendo do navegador.

## Arquitetura

Três módulos ES em `js/`, carregados por `index.html` (`js/main.js` é o único ponto de entrada):

- `api.js` — objeto `api` com a camada de serviço (Axios). `URL_BASE` está fixa em `http://localhost:3000`. `axios` é uma variável **global** vinda do CDN (não há import). Busca/filtro e favoritos são feitos no cliente: `filtrarPorTermo` e `buscarFavoritos` chamam `buscarReceitas()` e filtram o array, em vez de usar query params do json-server.
- `ui.js` — objeto `ui` que monta o DOM com `document.createElement` (sem templates/innerHTML para os cards). `renderizarReceitas(receitasFiltradas = null)` limpa `#listaReceitas` e renderiza a lista recebida ou, se for `null`, busca tudo na API. Cada card registra seus próprios listeners (favoritar, ver, editar, excluir) dentro de `criarReceita`, e depois chama `ui.renderizarReceitas()` para recarregar.
- `main.js` — controller: liga o formulário/busca/filtro de favoritos aos módulos acima. O mesmo formulário (`#formReceita`) serve para criar e editar: o campo oculto `#idReceita` decide entre `api.cadastrarReceita` e `api.alterarReceita`. `ui.preencherFormulario(id)` preenche os campos e troca o título do modal para "Editar Receita"; `limparFormulario()` em `main.js` reverte para "Nova Receita".

`index.html` contém todo o markup estático, incluindo os dois modais Bootstrap (`#modalReceita` para criar/editar e `#modalVisualizar` para detalhes). Os modais são abertos via atributos `data-bs-*` nos botões criados em `ui.js`, não via JS.

## Pontos de atenção

- Os módulos tratam erros com `alert()` dentro de cada método de `api`; como os `catch` engolem o erro, os métodos retornam `undefined` em falha e os chamadores (ex.: `renderizarReceitas`) podem quebrar ao iterar.
- Ingredientes são salvos como uma única string separada por vírgula e divididos com `split(",")` em `ui.preencherModalVerReceita`.
- `nota` é armazenada como string em `backend/db.json`; é comparada numericamente (`i <= receita.nota`) em `criarIconeEstrela`.
- `backend/db.json` é o "banco": o `json-server --watch` grava nele a cada POST/PUT/PATCH/DELETE, então usar o app altera um arquivo versionado.
