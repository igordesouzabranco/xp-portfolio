# XP Portfolio — Igor de Souza Branco

Um **Windows XP no navegador**: o portfólio nº 3 do Igor, onde cada seção é um
app rodando em janela. Feito com **React + Vite (JavaScript) e CSS puro** — sem
bibliotecas de janelas e sem nenhum asset da Microsoft (papel de parede, ícones
e "bandeira" são CSS/SVG próprios).

## Rodar locally

```powershell
npm install
npm run dev      # http://localhost:5173
npm run build    # valida o projeto (o lint do oxlint é bloqueado por política do Windows)
```

## O que tem aqui

- **Login/boot** com botão **Entrar** → o site abre em **tela cheia**
  (Fullscreen API; Esc sai). Tela cheia também pelo menu Iniciar ou pelo ícone
  da bandeja.
- **Desktop** com papel de parede em CSS (céu + colinas), ícones com duplo
  clique no desktop / clique simples no celular.
- **Janelas**: abrir, fechar, arrastar, redimensionar (bordas e cantos),
  foco com z-index, minimizar, maximizar (duplo clique na barra também).
- **Barra de tarefas**: botão Iniciar, botões das janelas, relógio em tempo real.
- **Menu Iniciar** com os apps, "Tela cheia" e "Desligar" (reinicia o boot).
- **Apps**:
  - Meu Computador → sobre mim e trajetória
  - Meus Projetos → repositórios da API do GitHub (loading/erro/retry)
  - Bloco de Notas → skills
  - Internet Explorer (fake) → site pessoal com a lista dos repositórios da
    API do GitHub (ao abrir um repo, mostra o resumo do README + link para o
    repositório real) e página de contato
  - Prompt de Comando → `help`, `about`, `skills`, `contact`, `projects`,
    `whoami`, `date`, `clear` + divulga `npx igor-portfolio`
  - Currículo → download do PDF (`public/curriculo.pdf`)
  - Lixeira → easter egg
- **Responsivo**: no celular as janelas ficam em tela cheia e os ícones viram grade.
- **Acessibilidade**: navegação por teclado, `aria-label` nos controles,
  `prefers-reduced-motion` respeitado.

## Deploy no Netlify

1. Suba o projeto pro GitHub.
2. No Netlify: **Add new site → Import an existing project**.
3. O `netlify.toml` já está configurado (`npm run build`, pasta `dist`).

Ou pela CLI: `npm i -g netlify-cli && netlify init`.

## Estrutura

```
src/
├─ App.jsx              # estado central das janelas + boot + taskbar/start
├─ components/          # Desktop, Icon, Window, Taskbar, StartMenu, BootScreen
├─ apps/                # um componente por app + apps.config.js (registro)
├─ hooks/useFullscreen.js
└─ styles/              # global, desktop, window, taskbar, startmenu, boot, apps
```

Para adicionar um app novo: crie o componente e acrescente **uma linha** em
`src/apps/apps.config.js`.

## Créditos

- Ícones (`.webp` em `public/icons/`) derivados do projeto
  [react-old-icons](https://github.com/gsnoopy/react-old-icons) (MIT), hospedados
  localmente — funcionam offline. Os ícones são marcas históricas da Microsoft;
  uso neste portfólio pessoal/não-comercial.
