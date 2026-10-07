# AGENTS.md — xp-portfolio (Windows XP no navegador)

## O projeto
Portfólio nº 3 de **Igor de Souza Branco** (Cachoeirinha, RS), estudante do Técnico em
Desenvolvimento de Sistemas (SENAC EAD) e Jovem Aprendiz na Appmax. Objetivo: júnior.
Um "Windows XP" no navegador onde cada seção do portfólio é um app em janela.

- GitHub: github.com/igordesouzabranco
- LinkedIn: linkedin.com/in/igor-de-souza-branco-b68630314
- Outros portfólios: portifolioigordesouza.netlify.app e `npx igor-portfolio`
- Stack: React + Vite (JavaScript, sem TS), CSS puro, deploy no Netlify
- **xp.css: NÃO usar** (decidido) — quer entender o CSS por baixo; olhar só como referência

## Como ensinar (regras do Igor — NÃO quebrar)
1. O Igor está aprendendo React (estado, props, efeitos). O projeto é a aula.
2. Explicar conceitos em pedaços pequenos; **antes de avançar, 1–2 perguntas de verificação**;
   só continuar quando ele responder.
3. Se ele errar: **não dar a resposta direta** — corrigir em passos com dicas.
4. Entregar em **etapas**, nunca tudo de uma vez.
5. Ao fim de cada etapa: **montar o código completo da etapa** para ele conferir e rodar.
6. Código **comentado em português**, nomes de variáveis/funções **em inglês**.

## Progresso

### ✅ PROJETO COMPLETO (todas as etapas finalizadas a pedido do Igor,
### que dispensou as perguntas de verificação das etapas seguintes)

- **Login/boot**: `BootLoading.jsx` + `styles/bootloading.css` (tela preta com
  logo e barra de blocos, 3s, via `phase` no App: `'boot' → 'login' →
  'desktop'`) → `BootScreen.jsx` + `styles/boot.css`: nome do Igor + botão
  **Entrar** → `requestFullscreen()` dentro do clique (gesture) +
  `setPhase('desktop')`.
  Hook `src/hooks/useFullscreen.js` (entra/sai, `fullscreenchange`).
- **Taskbar** (`Taskbar.jsx` + `taskbar.css`): botão Iniciar (SVG próprio de
  4 quadros), botões por janela (comportamento XP: focada→minimiza,
  minimizada→restaura, fundo→foca), bandeja com relógio ao vivo (1s) e
  alternador de tela cheia (opção C).
- **StartMenu** (`StartMenu.jsx` + `startmenu.css`): cabeçalho com usuário,
  2 colunas, "Tela cheia" e "Desligar" (`location.reload()` = reboot).
  Fecha por overlay/ESC.
- **Janelas** (`Window.jsx`): arrastar (pointer capture + `useRef` de origem,
  fórmula idempotente), redimensionar 8 bordas/cantos, foco `maxZ+1`,
  min/max, duplo clique na barra = max/restore, título inativo apagado
  (`window--inactive`), mobile: janela em tela cheia via CSS.
- **Apps** (7) em `src/apps/` registrados em `apps.config.js`:
  MyComputer (explorer azul lateral), Projects (GitHub API com
  loading/erro/retry), Notepad (skills em textarea), Browser (IE fake com
  site pessoal: lista dos repos da API GitHub + resumo do README ao abrir um
  repo + página de contato), Terminal (`help/about/skills/contact/projects/
  whoami/date/clear` + `npx igor-portfolio`; `projects` busca na API),
  Resume (download PDF), Trash (easter egg com piadas + esvaziar/restaurar).
- **Ícones (opção B escolhida pelo Igor)**: 7 `.webp` baixados do repo
  `gsnoopy/react-old-icons` para `public/icons/`, renderizados pelo componente
  próprio `src/components/AppIcon.jsx` (mesma API da lib: size/alt/className).
  Lib **desinstalada** — bundle voltou de 552 kB p/ ~252 kB e funciona offline.
  Crédito/licença no README (MIT; ícones são marcas históricas, uso pessoal).
- **CV**: `public/curriculo.pdf` = **PDF real do Igor**, copiado de
  `Downloads\Igor_de_Souza_Branco_Curriculo (1).pdf` (147 kB). App Currículo:
  botão de download + LinkedIn. (O PDF gerado antigo de 1,7 kB foi substituído;
  script `make-pdf.js` não é mais necessário. Igor não lê PDFs no chat — se
  precisar mudar textos do CV no app, ele cola o conteúdo.)
- **Favicon**: `public/favicon.svg` = bandeira XP (4 quadros em SVG, fundo
  preto) — antes era o raio padrão do Vite.
- **Responsivo ≤640px**: janelas fullscreen, ícones em grade, painéis dos apps
  ocultos.
- **Deploy**: `netlify.toml` (build `npm run build`, publish `dist`) + README.

### ⚠️ Pendências/ajustes finos para o Igor
1. **Confirmar o e-mail real** — está `igordesouzabranco@gmail.com` em
   `src/apps/Browser.jsx` (marcado com TODO).
2. Conteúdo do PDF (`make-pdf.js`) é editável — trocar textos se quiser.
3. `npm run lint` (oxlint) continua bloqueado por política do Windows;
   validar sempre com `npm run build`.

### Aulas dadas até agora (para retomar o estilo ensino depois)
- Etapa 1: componente React (props, desestruturação, pai→filho), Vite.
- Etapa 2: callback (`onOpen`), eventos, `useState`, `useEffect` + cleanup,
  `undefined` vs `null`, `key` estável no `.map()` (estado segue a instância).
- Etapa 3: estado centralizado (array de janelas), imutabilidade (`filter` ×
  `pop`), setter funcional (`current` = valor fresco × estado congelado/stale),
  renderização condicional, guard de janela duplicada.
- Etapa 4: Pointer Events, delta idempotente (não acumular), `useRef` para o
  ponto de partida, patch único com spread, foco = `maxZ + 1`.

## Etapas (todas concluídas)
3. ✅ Componente Window (abrir e fechar)
4. ✅ Arrastar, foco (z-index), minimizar, maximizar, redimensionar
5. ✅ Barra de tarefas + Start Menu + tela cheia opção C + relógio real
6. ✅ Apps de conteúdo (todos os 7)
7. ✅ Meus Projetos com API do GitHub (loading/erro)
8. ✅ Prompt de Comando
9. ✅ Responsivo, acessibilidade e deploy (netlify.toml + README)

## Estado do ambiente
- Windows, PowerShell; Node v24.18.1, npm 12.0.2
- **`npm run lint` (oxlint) NÃO funciona**: política de segurança do Windows bloqueia
  o binário `.node` ("Controle de Aplicativo"). Validar com `npm run build`.
- Comandos: `npm run dev` (localhost:5173), `npm run build`, `npm run preview`
