import { useRef } from 'react'
import { APPS } from '../apps/apps.config.js'
import '../styles/window.css'

// Direções de redimensionamento (letras de bússola: n=norte, e=leste...)
const RESIZE_DIRECTIONS = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

// Janela do XP: barra de título + conteúdo + bordas arrastáveis.
// Props:
//   data    → objeto da janela { id, title, x, y, width, height, ... }
//   onClose → fecha a janela
//   onUpdate→ aplica um "patch" na janela (mover, redimensionar, min/max)
//   onFocus → traz a janela para o topo da pilha (z-index)
// Observação: NÃO usamos "window" como nome de prop — é o objeto
// global do navegador e daria conflito.
function Window({ data, isActive, onClose, onUpdate, onFocus }) {
  // Caixinha de referência que NÃO re-renderiza o React.
  // Guarda o "ponto de partida" do arraste/redimensionamento.
  const startRef = useRef(null)
  const windowRef = useRef(null)

  // Minimizada? some da tela (restaurar: botão na taskbar
  // ou clicar de novo no ícone do desktop).
  if (data.minimized) return null

  const app = APPS.find((entry) => entry.id === data.id)
  const CurrentApp = app.component
  const AppIcon = app.icon

  // Em telas de toque as janelas ficam fixas (CSS) — não arrasta.
  const isCoarsePointer = () => window.matchMedia('(pointer: coarse)').matches

  // ---- Arrastar pela barra de título ----
  const handleDragStart = (event) => {
    // Botões da janela não devem iniciar o arraste.
    if (event.target.closest('button')) return
    // Maximizada não arrasta (como no Windows).
    if (data.maximized) return
    // Celular: janela é fixa, arrastar não faz sentido.
    if (isCoarsePointer()) return

    startRef.current = {
      mode: 'move',
      startX: event.clientX,
      startY: event.clientY,
      originX: data.x,
      originY: data.y,
    }
    // Captura o ponteiro: continuamos recebendo eventos mesmo
    // se o mouse sair da barra de título.
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  // ---- Redimensionar pelas bordas/cantos ----
  const handleResizeStart = (event) => {
    if (data.maximized) return

    startRef.current = {
      mode: 'resize',
      dir: event.currentTarget.dataset.dir,
      startX: event.clientX,
      startY: event.clientY,
      originX: data.x,
      originY: data.y,
      // Mede o tamanho ATUAL da janela na hora de começar.
      originWidth: windowRef.current.offsetWidth,
      originHeight: windowRef.current.offsetHeight,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  // ---- Move/redimensiona enquanto o ponteiro anda ----
  const handlePointerMove = (event) => {
    const start = startRef.current
    if (!start) return

    if (start.mode === 'move') {
      // Sempre a partir do início (idempotente) — nunca acumular.
      const x = start.originX + (event.clientX - start.startX)
      const y = start.originY + (event.clientY - start.startY)
      onUpdate(data.id, { x, y })
      return
    }

    // Modo resize: quais lados estão envolvidos?
    const dx = event.clientX - start.startX
    const dy = event.clientY - start.startY
    const patch = {}

    if (start.dir.includes('e')) {
      patch.width = Math.max(240, start.originWidth + dx)
    }
    if (start.dir.includes('s')) {
      patch.height = Math.max(160, start.originHeight + dy)
    }
    // Lado oeste/norte: a janela encolhe pelo lado errado,
    // então x/y precisam andar junto.
    if (start.dir.includes('w')) {
      const width = Math.max(240, start.originWidth - dx)
      patch.width = width
      patch.x = start.originX + (start.originWidth - width)
    }
    if (start.dir.includes('n')) {
      const height = Math.max(160, start.originHeight - dy)
      patch.height = height
      patch.y = start.originY + (start.originHeight - height)
    }

    onUpdate(data.id, patch)
  }

  // ---- Soltou o ponteiro: fim do arraste ----
  const handlePointerUp = (event) => {
    startRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <section
      ref={windowRef}
      className={`window${data.maximized ? ' window--maximized' : ''}${
        isActive ? '' : ' window--inactive'
      }`}
      style={{
        left: data.x,
        top: data.y,
        zIndex: data.zIndex,
        ...(data.width ? { width: data.width } : null),
        ...(data.height ? { height: data.height } : null),
      }}
      aria-label={`Janela ${data.title}`}
      // Clicou em qualquer lugar da janela = foco nela.
      onPointerDown={() => onFocus(data.id)}
    >
      <header
        className="window__titlebar"
        onPointerDown={handleDragStart}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        // Duplo clique na barra = maximizar/restaurar (como no XP)
        onDoubleClick={() => onUpdate(data.id, { maximized: !data.maximized })}
      >
        <span className="window__icon" aria-hidden="true">
          <AppIcon size={16} alt="" />
        </span>
        <span className="window__title">{data.title}</span>

        <div className="window__controls">
          <button
            type="button"
            className="window__btn"
            aria-label="Minimizar"
            onClick={() => onUpdate(data.id, { minimized: true })}
          >
            –
          </button>
          <button
            type="button"
            className="window__btn"
            aria-label={data.maximized ? 'Restaurar' : 'Maximizar'}
            onClick={() => onUpdate(data.id, { maximized: !data.maximized })}
          >
            {data.maximized ? '❐' : '□'}
          </button>
          <button
            type="button"
            className="window__btn window__btn--close"
            aria-label="Fechar"
            onClick={() => onClose(data.id)}
          >
            ×
          </button>
        </div>
      </header>

      <div className="window__content">
        <CurrentApp title={data.title} />
      </div>

      {/* Alças de redimensionamento (bordas e cantos) */}
      {RESIZE_DIRECTIONS.map((dir) => (
        <div
          key={dir}
          className={`window__resize window__resize--${dir}`}
          data-dir={dir}
          aria-hidden="true"
          onPointerDown={handleResizeStart}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />
      ))}
    </section>
  )
}

export default Window
