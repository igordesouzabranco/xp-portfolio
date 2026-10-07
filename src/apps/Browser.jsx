import { useState, useEffect, useCallback } from 'react'

const REPOS_URL =
  'https://api.github.com/users/igordesouzabranco/repos?sort=updated&per_page=30'
const GITHUB_USER = 'igordesouzabranco'

// Decodifica o conteúdo base64 do README (a API devolve assim)
function decodeBase64Utf8(base64) {
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0))
  return new TextDecoder('utf-8').decode(bytes)
}

// Extrai uma frase breve do README (1º parágrafo utilizável)
function extractBrief(text) {
  const lines = text.split(/\r?\n/)
  for (const raw of lines) {
    const line = raw
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // remove imagens/badges
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> texto puro
      .replace(/[#>*_`~\-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    if (line.length > 30 && !line.startsWith('http')) {
      return line.slice(0, 260)
    }
  }
  return ''
}

// Internet Explorer (fake) → site pessoal com repositórios + contato.
function Browser() {
  // Lista de repos na página inicial
  const [reposStatus, setReposStatus] = useState('loading') // loading | ready | error
  const [repos, setRepos] = useState([])

  // Página de um repositório aberto (null = home)
  const [active, setActive] = useState(null)
  const [readmeStatus, setReadmeStatus] = useState('idle') // loading | ready | empty | error
  const [readmeBrief, setReadmeBrief] = useState('')

  const loadRepos = useCallback(() => {
    setReposStatus('loading')
    fetch(REPOS_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        setRepos(data.filter((repo) => !repo.fork))
        setReposStatus('ready')
      })
      .catch(() => setReposStatus('error'))
  }, [])

  useEffect(() => {
    loadRepos()
  }, [loadRepos])

  // Ao abrir um repo: busca o README para montar o resumo breve
  useEffect(() => {
    if (!active) return
    setReadmeStatus('loading')
    setReadmeBrief('')

    fetch(`https://api.github.com/repos/${GITHUB_USER}/${active.name}/readme`)
      .then((response) => {
        if (!response.ok) throw new Error('sem README')
        return response.json()
      })
      .then((data) => {
        const brief = extractBrief(decodeBase64Utf8(data.content))
        if (brief) {
          setReadmeBrief(brief)
          setReadmeStatus('ready')
        } else {
          setReadmeStatus('empty')
        }
      })
      .catch(() => setReadmeStatus('error'))
  }, [active])

  // Barra de endereço: home ou página do repositório
  const address = active
    ? `https://github.com/${GITHUB_USER}/${active.name}`
    : 'http://www.igordesouzabranco.dev/'

  return (
    <div className="ie">
      {/* Barra de menu decorativa */}
      <div className="ie__menubar" aria-hidden="true">
        <span>Arquivo</span>
        <span>Editar</span>
        <span>Exibir</span>
        <span>Favoritos</span>
        <span>Ferramentas</span>
        <span>Ajuda</span>
      </div>

      {/* Barra de ferramentas (◀ é funcional: volta pra home) */}
      <div className="ie__toolbar">
        <button
          type="button"
          className="ie__tool"
          aria-label="Voltar"
          disabled={!active}
          onClick={() => setActive(null)}
        >
          ◀
        </button>
        <span className="ie__tool ie__tool--off" aria-hidden="true">▶</span>
        <span className="ie__tool" aria-hidden="true">↻</span>
        <span className="ie__tool" aria-hidden="true">⏹</span>
        <span className="ie__tool" aria-hidden="true">🏠</span>
        <span className="ie__tool" aria-hidden="true">🔍</span>
      </div>

      {/* Barra de endereço */}
      <div className="ie__address">
        <span className="ie__address-label">Endereço</span>
        <div className="ie__address-box">
          <span aria-hidden="true">🔒</span> {address}
        </div>
        <button type="button" className="ie__go" aria-label="Ir">
          Ir
        </button>
      </div>

      <main className="ie__page">
        {active ? (
          /* ---------- Página do repositório ---------- */
          <article className="ie__repo-page">
            <button
              type="button"
              className="xp-button"
              onClick={() => setActive(null)}
            >
              ← Voltar
            </button>

            <h1>📁 {active.name}</h1>
            <p className="ie__lead">
              {active.description || 'Sem descrição cadastrada no GitHub.'}
            </p>

            <div className="projects__meta">
              {active.language && (
                <span className="projects__lang">
                  <span className="projects__dot" aria-hidden="true" />
                  {active.language}
                </span>
              )}
              <span>★ {active.stargazers_count}</span>
              <span>
                atualizado{' '}
                {new Date(active.updated_at).toLocaleDateString('pt-BR')}
              </span>
            </div>

            {/* Resumo do README */}
            <section className="ie__readme" aria-live="polite">
              <h2>Resumo do README</h2>
              {readmeStatus === 'loading' && <p>Carregando README…</p>}
              {readmeStatus === 'ready' && <p>{readmeBrief}</p>}
              {readmeStatus === 'empty' && (
                <p>Este repositório não tem README — use a descrição acima.</p>
              )}
              {readmeStatus === 'error' && (
                <p>Não consegui ler o README (sem internet ou limite da API).</p>
              )}
            </section>

            <div className="ie__repo-actions">
              <a
                className="xp-button xp-button--primary"
                href={active.html_url}
                target="_blank"
                rel="noreferrer"
              >
                Ir para o repositório ↗
              </a>
              <button
                type="button"
                className="xp-button"
                onClick={() => setActive(null)}
              >
                Ver todos os repos
              </button>
            </div>
          </article>
        ) : (
          /* ---------- Home: repositórios + contato ---------- */
          <>
            <h1>Igor de Souza Branco</h1>
            <p className="ie__lead">
              Desenvolvedor em formação — veja meus repositórios e fale comigo
              pelos canais abaixo.
            </p>

            <section className="ie__section">
              <h2>Repositórios no GitHub</h2>

              {reposStatus === 'loading' && (
                <div className="projects__state" role="status">
                  <span className="projects__spinner" aria-hidden="true" />
                  <p>Carregando repositórios…</p>
                </div>
              )}

              {reposStatus === 'error' && (
                <div className="projects__state projects__state--error" role="alert">
                  <p>⚠️ Não foi possível falar com a API do GitHub.</p>
                  <button type="button" className="xp-button" onClick={loadRepos}>
                    Tentar novamente
                  </button>
                </div>
              )}

              {reposStatus === 'ready' && (
                <ul className="ie__repos">
                  {repos.map((repo) => (
                    <li key={repo.id} className="ie__repo">
                      <div className="ie__repo-info">
                        <span className="ie__repo-name">📁 {repo.name}</span>
                        <p className="ie__repo-desc">
                          {repo.description || 'Sem descrição.'}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="xp-button"
                        onClick={() => setActive(repo)}
                      >
                        Abrir ▸
                      </button>
                    </li>
                  ))}
                  {repos.length === 0 && (
                    <li className="projects__state">Nenhum repositório encontrado.</li>
                  )}
                </ul>
              )}
            </section>

            <section className="ie__section">
              <h2>Contato</h2>
              <ul className="ie__contacts">
                <li>
                  <span aria-hidden="true">💼</span>
                  <a
                    href="https://www.linkedin.com/in/igor-de-souza-branco-b68630314"
                    target="_blank"
                    rel="noreferrer"
                  >
                    linkedin.com/in/igor-de-souza-branco-b68630314
                  </a>
                  <span className="ie__tag">LinkedIn — melhor para recrutadores</span>
                </li>
                <li>
                  <span aria-hidden="true">🐙</span>
                  <a
                    href="https://github.com/igordesouzabranco"
                    target="_blank"
                    rel="noreferrer"
                  >
                    github.com/igordesouzabranco
                  </a>
                  <span className="ie__tag">GitHub — meus códigos</span>
                </li>
                <li>
                  <span aria-hidden="true">✉️</span>
                  {/* TODO: confirmar o e-mail real do Igor antes do deploy */}
                  <a href="mailto:igordesouzabranco@gmail.com">
                    igordesouzabranco@gmail.com
                  </a>
                  <span className="ie__tag">E-mail</span>
                </li>
                <li>
                  <span aria-hidden="true">🌐</span>
                  <a
                    href="https://portifolioigordesouza.netlify.app"
                    target="_blank"
                    rel="noreferrer"
                  >
                    portifolioigordesouza.netlify.app
                  </a>
                  <span className="ie__tag">Meu primeiro portfólio (HTML/CSS/JS)</span>
                </li>
                <li>
                  <span aria-hidden="true">💻</span>
                  <span className="ie__mono">npx igor-portfolio</span>
                  <span className="ie__tag">Portfólio no terminal (CLI)</span>
                </li>
              </ul>
            </section>

            <p className="ie__footer-note">
              Local: Cachoeirinha — RS · Disponível para oportunidades júnior
            </p>
          </>
        )}
      </main>

      {/* Barra de status */}
      <div className="ie__status">
        <span>{active ? 'Concluído' : 'Pronto'}</span>
        <span className="ie__status-zone" aria-hidden="true">
          🌐 Internet
        </span>
      </div>
    </div>
  )
}

export default Browser
