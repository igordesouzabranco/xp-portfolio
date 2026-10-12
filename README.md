<div align="center">

# XP Portfolio

**Um Windows XP no navegador: meu portfólio nº 3, onde cada seção é um app rodando em janela**

React · Vite · JavaScript · CSS puro · Netlify

![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white) ![GitHub API](https://img.shields.io/badge/GitHub%20API-181717?logo=github&logoColor=white) ![PWA-ready](https://img.shields.io/badge/Responsivo-mobile%20e%20desktop-0A246A)

**[Online](https://xp-portfolio-igorbranco.netlify.app/)** · **[Código](https://github.com/igordesouzabranco/xp-portfolio)**

</div>

---

## Sobre

O XP Portfolio é o meu terceiro portfólio e recria a experiência de um Windows XP dentro do navegador: tela de boot, login, desktop com ícones, janelas arrastáveis, barra de tarefas e menu Iniciar. Cada seção do portfólio é um app que abre em janela.

Foi feito com **React + Vite (JavaScript) e CSS puro**, sem bibliotecas de janelas e sem nenhum asset da Microsoft: papel de parede, ícones e bandeira são CSS/SVG próprios.

## Recursos

- **Boot e login:** tela de carregamento de 3 s (fundo preto, bandeira XP, logo e barra de blocos rolando) e tela de login com avatar, nome e botão **Entrar**.
- **Tela cheia:** ao entrar, o site abre em tela cheia (Fullscreen API; Esc sai). Também dá para ativar pelo menu Iniciar ou pelo ícone da bandeja.
- **Desktop:** papel de parede em CSS (céu + colinas); ícones com duplo clique no desktop e clique simples no celular.
- **Janelas:** abrir, fechar, arrastar, redimensionar (8 bordas e cantos), foco com z-index, minimizar, maximizar, duplo clique na barra para maximizar/restaurar e título "apagado" quando a janela está em segundo plano.
- **Barra de tarefas:** botão Iniciar, um botão por janela (clicou na focada = minimiza, na minimizada = restaura, na de trás = foca), relógio em tempo real e alternador de tela cheia.
- **Menu Iniciar:** cabeçalho com o usuário, 2 colunas com todos os apps, "Tela cheia" e "Desligar" (reinicia o boot). Fecha por clique fora ou Esc.
- **7 apps:** Meu Computador, Meus Projetos, Bloco de Notas, Internet Explorer, Prompt de Comando, Currículo e Lixeira.
- **Repositórios ao vivo:** a lista de projetos vem da API do GitHub, com estados de loading, erro e retry.
- **Ícones locais:** os ícones dos apps ficam em `public/icons/*.webp`, então funciona offline, sem depender de CDN.
- **Responsivo:** no celular, as janelas ficam em tela cheia e os ícones viram grade.
- **Acessibilidade:** navegação por teclado, `aria-label` nos controles e `prefers-reduced-motion` respeitado.

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| React | — | Interface e estado das janelas |
| Vite | — | Dev server e build |
| JavaScript | — | Linguagem |
| CSS puro | — | Todo o visual XP (sem framework de UI) |
| Fullscreen API | — | Modo tela cheia |
| API do GitHub | — | Lista de repositórios nos apps |
| Netlify | — | Hospedagem |

## Como rodar

**Requisitos:** Node.js e npm.

```bash
git clone https://github.com/igordesouzabranco/xp-portfolio.git
cd xp-portfolio
npm install
npm run dev
```

| Comando | O que faz |
|---|---|
| `npm install` | Instala as dependências |
| `npm run dev` | Sobe o site em `http://localhost:5173` |
| `npm run build` | Valida o projeto e gera o build |

> O lint do oxlint é bloqueado por política do Windows, por isso o `npm run build` é usado para validar o projeto.

## Apps

| App | O que faz |
|---|---|
| **Meu Computador** | Sobre mim e minha trajetória, em um explorer com painel azul |
| **Meus Projetos** | Repositórios da API do GitHub, com loading, erro e retry |
| **Bloco de Notas** | Skills em uma área de texto |
| **Internet Explorer (fake)** | Meu site pessoal com a lista de repositórios da API do GitHub; ao abrir um repo, mostra o resumo do README e o link para o repositório real. Tem página de contato |
| **Prompt de Comando** | Comandos `help`, `about`, `skills`, `contact`, `projects` (busca na API), `whoami`, `date` e `clear`, além de divulgar `npx igor-portfolio` |
| **Currículo** | Download do PDF (`public/curriculo.pdf`) e link do LinkedIn |
| **Lixeira** | Easter egg com piadas; dá para esvaziar e restaurar |


## Estrutura

```
xp-portfolio/
├── public/
│   ├── icons/                  # ícones dos apps (.webp), hospedados localmente
│   └── curriculo.pdf           # PDF baixado pelo app Currículo
├── src/
│   ├── App.jsx                 # estado central: fase do boot + janelas + taskbar/menu
│   ├── components/             # BootLoading, BootScreen, FlagLogo, Desktop, Icon,
│   │                           # AppIcon, Window, Taskbar, StartMenu
│   ├── apps/                   # um componente por app + apps.config.js (registro)
│   ├── hooks/
│   │   └── useFullscreen.js    # controle da tela cheia
│   └── styles/                 # global, desktop, window, taskbar, startmenu, boot,
│                               # bootloading, apps
└── README.md
```


## Créditos

Os ícones (`.webp` em `public/icons/`) são derivados do projeto [react-old-icons](https://github.com/gsnoopy/react-old-icons) (MIT) e ficam hospedados localmente, por isso funcionam offline. Eles são marcas históricas da Microsoft, usadas neste portfólio apenas de forma pessoal e não comercial.

---
