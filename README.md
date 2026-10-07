# XP Portfolio — Igor de Souza Branco

Um **Windows XP no navegador**: o portfólio nº 3 do Igor, onde cada seção é um
app rodando em janela. Feito com **React + Vite (JavaScript) e CSS puro** — sem
bibliotecas de janelas e sem nenhum asset da Microsoft (papel de parede, ícones
e bandeira são CSS/SVG próprios).

**Online:** https://xp-portfolio-igorbranco.netlify.app/
**Código:** https://github.com/igordesouzabranco/xp-portfolio

## Rodar localmente

```powershell
npm install
npm run dev      # http://localhost:5173
npm run build    # valida o projeto (o lint do oxlint é bloqueado por política do Windows)
```

## Funcionalidades

### Boot e login

- **Tela de carregamento** (3 s): fundo preto, bandeira XP, logo e barra de
  blocos rolando — como o boot do XP.
- **Tela de login** (fundo preto): avatar, nome e botão **Entrar**.
- Ao entrar, o site abre em **tela cheia** (Fullscreen API; Esc sai). Tela cheia
  também pelo menu Iniciar ou pelo ícone da bandeja.

### Desktop e janelas

- **Desktop** com papel de parede em CSS (céu + colinas); ícones com duplo
  clique no desktop e clique simples no celular.
- **Janelas**: abrir, fechar, arrastar, redimensionar (8 bordas e cantos), foco
  com z-index, minimizar, maximizar, duplo clique na barra = maximizar/restaurar
  e título "apagado" quando a janela está em segundo plano.
- **Barra de tarefas**: botão Iniciar, um botão por janela (comportamento XP:
  clicou na focada = minimiza, na minimizada = restaura, na de trás = foca),
  relógio em tempo real e alternador de tela cheia.
- **Menu Iniciar**: cabeçalho com o usuário, 2 colunas com todos os apps,
  "Tela cheia" e "Desligar" (reinicia o boot); fecha por clique fora ou Esc.

### Apps (7)

- **Meu Computador** — sobre mim e trajetória (explorer com painel azul).
- **Meus Projetos** — repositórios da API do GitHub, com loading, erro e retry.
- **Bloco de Notas** — skills em área de texto.
- **Internet Explorer (fake)** — site pessoal com a lista dos repositórios da
  API do GitHub; ao abrir um repo, mostra o resumo do README e o link para o
  repositório real; página de contato.
- **Prompt de Comando** — `help`, `about`, `skills`, `contact`, `projects`
  (busca na API), `whoami`, `date`, `clear` + divulga `npx igor-portfolio`.
  Easter egg: digite `67` e um bonequinho aparece dançando o meme.
- **Currículo** — download do PDF (`public/curriculo.pdf`) + link do LinkedIn.
- **Lixeira** — easter egg com piadas; dá para esvaziar e restaurar.

### Extras

- **Ícones** dos apps hospedados localmente (`public/icons/*.webp`) — funciona
  offline, sem depender de CDN.
- **Favicon** com a bandeira XP.
- **Responsivo**: no celular, as janelas ficam em tela cheia e os ícones viram
  grade.
- **Acessibilidade**: navegação por teclado, `aria-label` nos controles e
  `prefers-reduced-motion` respeitado.

## Deploy no Netlify

1. Suba o projeto pro GitHub.
2. No Netlify: **Add new site → Import an existing project**.
3. O `netlify.toml` já está configurado (`npm run build`, pasta `dist`).

Depois disso, basta `git push` — o Netlify redesenha o site sozinho.

Ou pela CLI: `npm i -g netlify-cli && netlify init`.

## Estrutura

```
src/
├─ App.jsx              # estado central: fase do boot + janelas + taskbar/menu
├─ components/          # BootLoading, BootScreen, FlagLogo, Desktop, Icon,
│                       # AppIcon, Window, Taskbar, StartMenu
├─ apps/                # um componente por app + apps.config.js (registro)
├─ hooks/useFullscreen.js
└─ styles/              # global, desktop, window, taskbar, startmenu, boot,
                        # bootloading, apps
```

Para adicionar um app novo: crie o componente e acrescente **uma linha** em
`src/apps/apps.config.js`.

## Créditos

- Ícones (`.webp` em `public/icons/`) derivados do projeto
  [react-old-icons](https://github.com/gsnoopy/react-old-icons) (MIT), hospedados
  localmente — funcionam offline. Os ícones são marcas históricas da Microsoft;
  uso neste portfólio pessoal/não-comercial.
