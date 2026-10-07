import '../styles/bootloading.css'
import FlagLogo from './FlagLogo.jsx'

// Tela de carregamento (estilo "boot" do XP): fundo preto,
// bandeira + logo central e barra de blocos rolando.
// Sem assets da Microsoft — tipografia e cores são nossas.
function BootLoading() {
  return (
    <div className="bootload" role="status" aria-label="Carregando o XP Portfolio">
      {/* Bandeira estilo XP — SVG nosso, mesma da tela de login */}
      <FlagLogo size={88} className="bootload__flag" />

      {/* Logo central */}
      <div className="bootload__logo">
        <span className="bootload__logo-xp">XP</span>
        <span className="bootload__logo-name">Portfolio</span>
      </div>

      {/* Barra de progresso: 3 blocos azuis que rodam em loop */}
      <div className="bootload__bar">
        <div className="bootload__blocks" aria-hidden="true">
          <span className="bootload__block" />
          <span className="bootload__block" />
          <span className="bootload__block" />
        </div>
      </div>

      {/* Rodapé */}
      <p className="bootload__copyright">Copyright © Igor de Souza Branco</p>
      <p className="bootload__brand">XP Portfolio</p>
    </div>
  )
}

export default BootLoading
