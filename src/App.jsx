import { useState, useEffect } from 'react'
import Desktop from './components/Desktop.jsx'
import Window from './components/Window.jsx'
import Taskbar from './components/Taskbar.jsx'
import StartMenu from './components/StartMenu.jsx'
import BootLoading from './components/BootLoading.jsx'
import BootScreen from './components/BootScreen.jsx'
import { APPS } from './apps/apps.config.js'
import { useFullscreen } from './hooks/useFullscreen.js'

function App() {
  // Fases do sistema: 'boot' (carregamento) → 'login' → 'desktop'
  const [phase, setPhase] = useState('boot')
  // Lista de janelas do sistema
  const [windows, setWindows] = useState([])
  // Menu Iniciar aberto/fechado
  const [startOpen, setStartOpen] = useState(false)
  // Tela cheia (Fullscreen API)
  const { isFullscreen, toggleFullscreen } = useFullscreen()

  // Tela de carregamento dura 3s e depois vai pro login
  useEffect(() => {
    if (phase !== 'boot') return
    const timer = setTimeout(() => setPhase('login'), 3000)
    return () => clearTimeout(timer)
  }, [phase])

  // Esc fecha o menu Iniciar
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') setStartOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // Atualizador ÚNICO: aplica um "patch" (pedaço do objeto) com
  // merge imutável só na janela certa (mover, redimensionar, min/max).
  const handleUpdateWindow = (windowId, patch) => {
    setWindows((current) =>
      current.map((win) =>
        win.id === windowId ? { ...win, ...patch } : win,
      ),
    )
  }

  // Foco: a janela clicada vira a MAIOR da pilha (maxZ + 1).
  const handleFocusWindow = (windowId) => {
    setWindows((current) => {
      const maxZ = Math.max(0, ...current.map((win) => win.zIndex))
      return current.map((win) =>
        win.id === windowId ? { ...win, zIndex: maxZ + 1 } : win,
      )
    })
  }

  // Abre o app: cria janela nova; se já existe (ou está minimizada),
  // só restaura e traz para frente.
  const handleOpenApp = (appId) => {
    const app = APPS.find((entry) => entry.id === appId)
    const existing = windows.find((win) => win.id === appId)

    if (existing) {
      handleUpdateWindow(appId, { minimized: false })
      handleFocusWindow(appId)
      return
    }

    const offset = windows.length * 26 // empilha "escada", como o XP
    const newWindow = {
      id: app.id,
      title: app.title,
      icon: app.icon,
      minimized: false,
      maximized: false,
      x: 60 + offset,
      y: 40 + offset,
      width: null,  // null = tamanho padrão do CSS
      height: null,
      zIndex: windows.length + 1,
    }

    setWindows([...windows, newWindow]) // array NOVO → re-render
  }

  const handleCloseWindow = (windowId) => {
    setWindows((current) => current.filter((win) => win.id !== windowId))
  }

  // Janela no topo (não minimizada) = focada
  const visibleWindows = windows.filter((win) => !win.minimized)
  const topWindow = visibleWindows.reduce(
    (top, win) => (!top || win.zIndex > top.zIndex ? win : top),
    null,
  )
  const focusedId = topWindow ? topWindow.id : null

  // Clique no botão da barra de tarefas (comportamento XP):
  //  - minimizada → restaura
  //  - focada     → minimiza
  //  - em segundo plano → traz para frente
  const handleTaskbarClick = (windowId) => {
    const win = windows.find((entry) => entry.id === windowId)
    if (!win) return

    if (win.minimized) {
      handleUpdateWindow(windowId, { minimized: false })
      handleFocusWindow(windowId)
    } else if (win.id === focusedId) {
      handleUpdateWindow(windowId, { minimized: true })
    } else {
      handleFocusWindow(windowId)
    }
  }

  // Login: o clique é o "gesture" que permite a tela cheia.
  const handleEnter = () => {
    toggleFullscreen()
    setPhase('desktop')
  }

  // Desligar = reiniciar o sistema (volta pro boot)
  const handleShutdown = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    window.location.reload()
  }

  // 1ª fase: tela de carregamento (3s)
  if (phase === 'boot') return <BootLoading />

  // 2ª fase: login com o botão Entrar
  if (phase === 'login') return <BootScreen onEnter={handleEnter} />


  return (
    <div className="xp-os">
      <Desktop onOpen={handleOpenApp} />

      {/* Uma <Window /> por janela aberta (minimizadas ficam ocultas) */}
      {windows.map((win) => (
        <Window
          key={win.id}
          data={win}
          isActive={win.id === focusedId}
          onClose={handleCloseWindow}
          onUpdate={handleUpdateWindow}
          onFocus={handleFocusWindow}
        />
      ))}

      <StartMenu
        open={startOpen}
        isFullscreen={isFullscreen}
        onOpen={(appId) => {
          handleOpenApp(appId)
          setStartOpen(false)
        }}
        onToggleFullscreen={toggleFullscreen}
        onClose={() => setStartOpen(false)}
        onShutdown={handleShutdown}
      />

      <Taskbar
        windows={windows}
        focusedId={focusedId}
        startOpen={startOpen}
        onToggleStart={() => setStartOpen((open) => !open)}
        onTaskClick={handleTaskbarClick}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />
    </div>
  )
}

export default App
