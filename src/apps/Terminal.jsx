import { useState, useRef, useEffect } from 'react'

const WELCOME = [
  'XP Portfolio Terminal — Igor de Souza Branco',
  'Digite "help" para ver os comandos disponíveis.',
  '',
]

// Prompt de Comando: mini terminal com comandos reais.
function Terminal() {
  const [lines, setLines] = useState(WELCOME)
  const [input, setInput] = useState('')
  const [meme, setMeme] = useState(false)
  const outputRef = useRef(null)

  // Easter egg "67": o bonequinho dança por ~6,7s e some sozinho.
  useEffect(() => {
    if (!meme) return undefined
    const timer = setTimeout(() => setMeme(false), 6700)
    return () => clearTimeout(timer)
  }, [meme])

  // Auto-scroll: sempre mostrar a última linha
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight
    }
  }, [lines])

  const print = (...newLines) =>
    setLines((current) => [...current, ...newLines])

  const runCommand = async (raw) => {
    const command = raw.trim()
    print(`C:\\Users\\igor> ${command}`)
    if (!command) return

    const [cmd] = command.toLowerCase().split(' ')

    switch (cmd) {
      case 'help':
        print(
          'Comandos disponíveis:',
          '  help      - lista os comandos',
          '  about     - quem é o Igor',
          '  skills    - tecnologias que usa',
          '  contact   - como falar comigo',
          '  projects  - repositórios do GitHub',
          '  whoami    - usuário atual',
          '  date      - data e hora',
          '  clear     - limpa a tela',
          '',
        )
        break

      case 'about':
        print(
          'Igor de Souza Branco, de Cachoeirinha - RS.',
          'Estudante de Técnico em Desenvolvimento de Sistemas (SENAC EAD)',
          'e Jovem Aprendiz na Appmax. Objetivo: desenvolvedor júnior.',
          '',
        )
        break

      case 'skills':
        print(
          'JavaScript  TypeScript  Python  Java',
          'Node.js/Express  React  Django',
          '',
        )
        break

      case 'contact':
        print(
          'GitHub:   github.com/igordesouzabranco',
          'LinkedIn: linkedin.com/in/igor-de-souza-branco-b68630314',
          'CLI:      npx igor-portfolio',
          '',
        )
        break

      case 'whoami':
        print('igor', '')
        break

      case 'date':
        print(new Date().toLocaleString('pt-BR'), '')
        break

      case 'clear':
        setLines([])
        setMeme(false)
        break

      // Easter egg: digite 67 e o bonequinho aparece dançando o meme
      case '67':
        setMeme(true)
        print(
          '6  7  6  7  6  7  !!!!!!!',
          'Alguém dançando o meme apareceu na tela...',
          '',
        )
        break

      case 'projects': {
        print('Buscando repositórios na API do GitHub...')
        try {
          const response = await fetch(
            'https://api.github.com/users/igordesouzabranco/repos?sort=updated&per_page=10',
          )
          if (!response.ok) throw new Error('HTTP ' + response.status)
          const repos = await response.json()
          print(
            ...repos.map(
              (repo) =>
                `  ${repo.name}${repo.language ? `   [${repo.language}]` : ''}`,
            ),
            '',
          )
        } catch {
          print('Erro ao consultar a API do GitHub.', '')
        }
        break
      }

      case 'npx':
      case 'igor-portfolio':
        print(
          'Para ver o portfólio no seu terminal, rode:',
          '  npx igor-portfolio',
          '',
        )
        break

      default:
        print(`'${cmd}' não é um comando interno. Digite "help".`, '')
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const value = input
      setInput('')
      runCommand(value)
    }
  }

  return (
    <div className="terminal" onClick={() => document.getElementById('terminal-input')?.focus()}>
      <div className="terminal__output" ref={outputRef} role="log" aria-live="polite">
        {lines.map((line, index) => (
          <div key={index} className="terminal__line">
            {line || '\u00A0'}
          </div>
        ))}
      </div>
      <div className="terminal__prompt">
        <span className="terminal__label">C:\Users\igor&gt;</span>
        <input
          id="terminal-input"
          className="terminal__input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Entrada do terminal"
          autoComplete="off"
          autoFocus
          spellCheck={false}
        />
      </div>

      {/* Easter egg: bonequinho dançando o meme "6 7" (some sozinho) */}
      {meme && (
        <div className="terminal__meme" aria-hidden="true">
          <span className="terminal__meme-num">6</span>
          <svg className="terminal__meme-guy" viewBox="0 0 100 130">
            {/* cabeça */}
            <circle cx="50" cy="22" r="16" fill="#ffe94d" stroke="#000" strokeWidth="3" />
            <circle cx="44" cy="19" r="2.5" fill="#000" />
            <circle cx="56" cy="19" r="2.5" fill="#000" />
            {/* boca aberta cantando "seis sete" */}
            <ellipse cx="50" cy="29" rx="5" ry="4" fill="#000" />
            {/* corpo */}
            <path d="M50 38 L50 78" stroke="#6fb1ff" strokeWidth="7" strokeLinecap="round" />
            {/* braços pra cima: gesto do meme */}
            <path d="M50 48 L26 26 M50 48 L74 26" stroke="#6fb1ff" strokeWidth="7" strokeLinecap="round" />
            <circle cx="26" cy="26" r="6" fill="#ffe94d" stroke="#000" strokeWidth="2" />
            <circle cx="74" cy="26" r="6" fill="#ffe94d" stroke="#000" strokeWidth="2" />
            {/* pernas */}
            <path d="M50 78 L34 112 M50 78 L66 112" stroke="#3a7bd5" strokeWidth="7" strokeLinecap="round" />
          </svg>
          <span className="terminal__meme-num">7</span>
        </div>
      )}
    </div>
  )
}

export default Terminal
