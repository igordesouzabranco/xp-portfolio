import '../styles/boot.css'
import FlagLogo from './FlagLogo.jsx'

// Tela de login/boot do XP Portfolio.
// onEnter é chamada no clique do botão "Entrar": é o MOMENTO do
// gesture (necessário para o navegador aceitar a tela cheia).
function BootScreen({ onEnter }) {
  return (
    <div className="login">
      {/* Bandeira estilo XP — SVG nosso, mesmo da tela de carregamento */}
      <FlagLogo size={92} className="login__flag" />

      <div className="login__logo">
        <span className="login__logo-xp">XP</span>
        <span className="login__logo-text">Portfolio</span>
      </div>

      <div className="login__panel">
        <div className="login__user">
          <div className="login__avatar" aria-hidden="true">IB</div>
          <div className="login__user-info">
            <span className="login__name">Igor de Souza Branco</span>
            <span className="login__hint">Cachoeirinha — RS</span>
          </div>
        </div>

        <button type="button" className="login__enter" onClick={onEnter}>
          <span className="login__enter-arrow" aria-hidden="true">➜</span>
          Entrar
        </button>
      </div>

      <p className="login__footer">XP Portfolio — feito com React + Vite</p>
    </div>
  )
}

export default BootScreen
