import { APPS } from '../apps/apps.config.js'
import '../styles/startmenu.css'

// Item da coluna direita: pega o ícone do registro central.
function StartMenuLink({ id, label, onOpen }) {
  const entry = APPS.find((app) => app.id === id)
  const AppIcon = entry.icon

  return (
    <button
      type="button"
      className="startmenu__item startmenu__item--right"
      role="menuitem"
      onClick={() => onOpen(id)}
    >
      <span className="startmenu__item-icon" aria-hidden="true">
        <AppIcon size={18} alt="" />
      </span>
      {label}
    </button>
  )
}

// Menu Iniciar do XP (duas colunas + cabeçalho com o usuário + rodapé).
// onOpen recebe o id do app; os itens "falsos" são decorativos.
function StartMenu({ open, isFullscreen, onOpen, onToggleFullscreen, onClose, onShutdown }) {
  if (!open) return null

  // Coluna esquerda: programas fixados + recentes
  const pinned = APPS.slice(0, 3)
  const recent = APPS.slice(3)

  return (
    <>
      {/* Camada que captura o clique fora e fecha o menu */}
      <div className="startmenu__overlay" onPointerDown={onClose} aria-hidden="true" />

      <div className="startmenu" role="menu" aria-label="Menu Iniciar">
        {/* Cabeçalho: usuário */}
        <div className="startmenu__header">
          <div className="startmenu__avatar" aria-hidden="true">IB</div>
          <span className="startmenu__user">Igor de Souza Branco</span>
        </div>

        <div className="startmenu__columns">
          {/* Coluna esquerda (branca) */}
          <div className="startmenu__col startmenu__col--left">
            {pinned.map((app) => {
              const AppIcon = app.icon
              return (
                <button
                  key={app.id}
                  type="button"
                  className="startmenu__item"
                  role="menuitem"
                  onClick={() => onOpen(app.id)}
                >
                  <span className="startmenu__item-icon" aria-hidden="true">
                    <AppIcon size={20} alt="" />
                  </span>
                  <span>{app.title}</span>
                </button>
              )
            })}

            <span className="startmenu__sep" aria-hidden="true" />

            {recent.map((app) => {
              const AppIcon = app.icon
              return (
                <button
                  key={app.id}
                  type="button"
                  className="startmenu__item startmenu__item--recent"
                  role="menuitem"
                  onClick={() => onOpen(app.id)}
                >
                  <span className="startmenu__item-icon" aria-hidden="true">
                    <AppIcon size={20} alt="" />
                  </span>
                  <span>{app.title}</span>
                </button>
              )
            })}
          </div>

          {/* Coluna direita (azul claro) */}
          <div className="startmenu__col startmenu__col--right">
            <StartMenuLink id="computer" label="Meu Computador" onOpen={onOpen} />
            <StartMenuLink id="projects" label="Meus Projetos" onOpen={onOpen} />
            <StartMenuLink id="terminal" label="Executar…" onOpen={onOpen} />

            <span className="startmenu__sep" aria-hidden="true" />

            <button
              type="button"
              className="startmenu__item startmenu__item--right"
              role="menuitem"
              aria-pressed={isFullscreen}
              onClick={onToggleFullscreen}
            >
              <span aria-hidden="true">⛶</span>{' '}
              {isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
            </button>
          </div>
        </div>

        {/* Rodapé: desligar (reinicia o boot) */}
        <div className="startmenu__footer">
          <button
            type="button"
            className="startmenu__shutdown"
            onClick={onShutdown}
          >
            <span aria-hidden="true">⏻</span> Desligar
          </button>
        </div>
      </div>
    </>
  )
}

export default StartMenu
