// Verifica se o dispositivo é de toque (ponteiro "grosso"),
// como celular ou tablet. Usado para decidir entre
// clique simples (mobile) e duplo clique (desktop).
function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches
}

// Ícone do desktop.
// Props: id (qual app abrir), icon (COMPONENTE de ícone), label (texto),
// onOpen (função que o PAI passou para ser avisado do clique).
function Icon({ id, icon: IconComponent, label, onOpen }) {
  const handleOpen = () => onOpen(id)

  // Em telas de toque, clique simples já abre.
  const handleClick = () => {
    if (isCoarsePointer()) handleOpen()
  }

  // No desktop, abre com duplo clique.
  const handleDoubleClick = () => handleOpen()

  // Acessibilidade: teclado (Enter e Espaço) também abrem.
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault() // impede a rolagem da página com o Espaço
      handleOpen()
    }
  }

  return (
    <button
      type="button"
      className="icon"
      aria-label={`Abrir ${label}`}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
    >
      <span className="icon__image" aria-hidden="true">
        <IconComponent size={34} alt="" />
      </span>
      <span className="icon__label">{label}</span>
    </button>
  )
}

export default Icon
