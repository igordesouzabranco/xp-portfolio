import { useState, useEffect, useCallback } from 'react'

// Hook da Tela Cheia (Fullscreen API).
// Regra do navegador: requestFullscreen() SÓ funciona depois de um
// clique do usuário (gesture) — por isso chamamos dentro de handlers.
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false)

  // O navegador avisa quando entra/sai de tela cheia.
  useEffect(() => {
    const handleChange = () => setIsFullscreen(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', handleChange)
    return () => document.removeEventListener('fullscreenchange', handleChange)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      // .catch evita erro vermelho se o navegador bloquear o pedido
      document.documentElement.requestFullscreen().catch(() => {})
    }
  }, [])

  return { isFullscreen, toggleFullscreen }
}
