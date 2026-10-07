import { APPS } from '../apps/apps.config.js'
import Icon from './Icon.jsx'
import '../styles/desktop.css'

// A "tela" do sistema: papel de parede + grade de ícones.
// onOpen é uma prop-função: o Desktop não sabe O QUE abrir,
// só avisa "foi pedido o app X".
function Desktop({ onOpen }) {
  return (
    <main className="desktop">
      {/* Colinas do papel de parede: só CSS, sem imagens da Microsoft */}
      <div className="desktop__hill desktop__hill--back" aria-hidden="true" />
      <div className="desktop__hill desktop__hill--front" aria-hidden="true" />

      <div className="desktop__icons">
        {APPS.map((app) => (
          <Icon
            key={app.id}
            id={app.id}
            icon={app.icon}
            label={app.title}
            onOpen={onOpen}
          />
        ))}
      </div>
    </main>
  )
}

export default Desktop
