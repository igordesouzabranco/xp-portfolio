// Registro central de todos os apps do portfólio.
// Adicionar um app novo = adicionar UMA linha aqui.
//
// Ícones: arquivos .webp do repo github.com/gsnoopy/react-old-icons,
// baixados para /public/icons e renderizados por <AppIcon />.
// (createElement em vez de JSX porque este arquivo tem extensão .js)
import { createElement } from 'react'
import AppIcon from '../components/AppIcon.jsx'
import MyComputer from './MyComputer.jsx'
import Projects from './Projects.jsx'
import Notepad from './Notepad.jsx'
import Browser from './Browser.jsx'
import Terminal from './Terminal.jsx'
import Resume from './Resume.jsx'
import Trash from './Trash.jsx'

// Devolve um COMPONENTE de ícone com o nome já "amarrado".
const icon = (name) => {
  const IconComponent = (props) => createElement(AppIcon, { name, ...props })
  return IconComponent
}

export const APPS = [
  {
    id: 'computer',
    title: 'Meu Computador',
    icon: icon('WindowsXPMyComputer'),
    component: MyComputer,
  },
  {
    id: 'projects',
    title: 'Meus Projetos',
    icon: icon('WindowsXPFolder'),
    component: Projects,
  },
  {
    id: 'notepad',
    title: 'Bloco de Notas',
    icon: icon('WindowsNotepad'),
    component: Notepad,
  },
  {
    id: 'browser',
    title: 'Internet Explorer',
    icon: icon('InternetExplorer6'),
    component: Browser,
  },
  {
    id: 'terminal',
    title: 'Prompt de Comando',
    icon: icon('WindowsXPCommandPrompt'),
    component: Terminal,
  },
  {
    id: 'resume',
    title: 'Currículo',
    icon: icon('WordXP'),
    component: Resume,
  },
  {
    id: 'trash',
    title: 'Lixeira',
    icon: icon('WindowsXPRecycleBin'),
    component: Trash,
  },
]
