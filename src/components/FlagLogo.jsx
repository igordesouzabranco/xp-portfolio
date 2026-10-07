// Bandeira de 4 quadros estilo XP — desenhada 100% por nós em SVG
// (nenhum asset da Microsoft). Usada no boot e na tela de login.
function FlagLogo({ size = 80, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      {/* 4 quadrados levemente inclinados = "bandeira esvoaçante" */}
      <path d="M6 24 Q26 16 46 22 L46 46 Q26 40 6 48 Z" fill="#ff5f5f" />
      <path d="M54 22 Q74 28 94 20 L94 44 Q74 52 54 46 Z" fill="#7ede7e" />
      <path d="M6 54 Q26 46 46 52 L46 78 Q26 72 6 80 Z" fill="#5fa8ff" />
      <path d="M54 52 Q74 58 94 50 L94 76 Q74 84 54 78 Z" fill="#ffe94d" />
    </svg>
  )
}

export default FlagLogo
