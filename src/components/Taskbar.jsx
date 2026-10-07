import { useState, useEffect } from 'react'
import '../styles/taskbar.css'

// Relógio em tempo real (atualiza a cada segundo).
function Clock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  const date = now.toLocaleDateString('pt-BR')

  return (
    <time className="taskbar__clock" title={date}>
      {time}
    </time>
  )
}

// Barra de tarefas do XP:
//  botão Iniciar | botões das janelas | bandeja (relógio + tela cheia)
function Taskbar({
  windows,
  focusedId,
  startOpen,
  onToggleStart,
  onTaskClick,
  onToggleFullscreen,
  isFullscreen,
}) {
  return (
    <footer className="taskbar">
      <button
        type="button"
        className={`taskbar__start${startOpen ? ' taskbar__start--active' : ''}`}
        aria-label="Iniciar"
        aria-expanded={startOpen}
        onClick={onToggleStart}
      >
        {/* bandeira 4 quadros: SVG próprio (não é a da Microsoft) */}
        <svg className="taskbar__start-icon" viewBox="0 0 16 16" aria-hidden="true">
          <rect x="1" y="1" width="6" height="6" rx="1.5" fill="#ff5f5f" />
          <rect x="9" y="1" width="6" height="6" rx="1.5" fill="#7ede7e" />
          <rect x="1" y="9" width="6" height="6" rx="1.5" fill="#5fa8ff" />
          <rect x="9" y="9" width="6" height="6" rx="1.5" fill="#ffe94d" />
        </svg>
        <span className="taskbar__start-text">iniciar</span>
      </button>

      <div className="taskbar__tasks" role="toolbar" aria-label="Janelas abertas">
        {windows.map((win) => {
          const AppIcon = win.icon
          return (
            <button
              key={win.id}
              type="button"
              className={`taskbar__task${win.id === focusedId && !win.minimized ? ' taskbar__task--active' : ''}`}
              title={win.title}
              onClick={() => onTaskClick(win.id)}
            >
              <AppIcon size={16} alt="" />
              <span className="taskbar__task-title">{win.title}</span>
            </button>
          )
        })}
      </div>

      <div className="taskbar__tray">
        <button
          type="button"
          className="taskbar__tray-btn"
          aria-label={isFullscreen ? 'Sair da tela cheia' : 'Ativar tela cheia'}
          title={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
          onClick={onToggleFullscreen}
        >
          {isFullscreen ? '🗗' : '⛶'}
        </button>
        <span className="taskbar__tray-sep" aria-hidden="true" />
        <Clock />
      </div>
    </footer>
  )
}

export default Taskbar
