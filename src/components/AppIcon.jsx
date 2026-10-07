// Ícone hospedado LOCALMENTE (arquivos .webp em /public/icons).
// Mesma API da lib react-old-icons: size, alt, className, style.
// Vantagem sobre a lib: funciona offline, sem piscada e sem
// depender do repositório do autor na internet.
function AppIcon({ name, size = 24, alt = '', className = '', style = {} }) {
  return (
    <img
      src={`/icons/${name}.webp`}
      width={size}
      height={size}
      alt={alt}
      className={className}
      style={{ width: size, height: size, display: 'inline-block', ...style }}
      aria-hidden={alt === '' ? true : undefined}
      loading="eager"
      decoding="sync"
    />
  )
}

export default AppIcon
