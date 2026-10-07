import { useState, useEffect, useCallback } from 'react'

// API pública do GitHub (sem token — limite de 60 req/h por IP)
const API_URL =
  'https://api.github.com/users/igordesouzabranco/repos?sort=updated&per_page=30'

// Meus Projetos → busca repositórios na API do GitHub
// com estados de carregando, erro e sucesso.
function Projects() {
  const [status, setStatus] = useState('loading') // loading | ready | error
  const [repos, setRepos] = useState([])

  const load = useCallback(() => {
    setStatus('loading')
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        return response.json()
      })
      .then((data) => {
        // esconde forks: mostramos só projetos criados pelo Igor
        setRepos(data.filter((repo) => !repo.fork))
        setStatus('ready')
      })
      .catch(() => setStatus('error'))
  }, [])

  // Dispara a busca quando o app abre (e quando pede "Tentar novamente")
  useEffect(() => {
    load()
  }, [load])

  return (
    <div className="projects">
      <div className="projects__bar">
        <span className="projects__url">
          https://api.github.com/users/igordesouzabranco
        </span>
      </div>

      <div className="projects__body">
        <h2>Meus Projetos</h2>
        <p className="projects__subtitle">
          Recarregado direto da API do GitHub — {repos.length} repositórios
        </p>

        {status === 'loading' && (
          <div className="projects__state" role="status">
            <span className="projects__spinner" aria-hidden="true" />
            <p>Carregando repositórios do GitHub…</p>
          </div>
        )}

        {status === 'error' && (
          <div className="projects__state projects__state--error" role="alert">
            <p>⚠️ Não foi possível falar com a API do GitHub.</p>
            <p className="projects__hint">
              Verifique sua conexão ou tente de novo em instantes.
            </p>
            <button type="button" className="xp-button" onClick={load}>
              Tentar novamente
            </button>
          </div>
        )}

        {status === 'ready' && (
          <ul className="projects__list">
            {repos.map((repo) => (
              <li key={repo.id} className="projects__card">
                <a
                  className="projects__name"
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  📁 {repo.name}
                </a>
                <p className="projects__desc">
                  {repo.description || 'Sem descrição.'}
                </p>
                <div className="projects__meta">
                  {repo.language && (
                    <span className="projects__lang">
                      <span className="projects__dot" aria-hidden="true" />
                      {repo.language}
                    </span>
                  )}
                  <span>★ {repo.stargazers_count}</span>
                  <span>
                    atualizado{' '}
                    {new Date(repo.updated_at).toLocaleDateString('pt-BR')}
                  </span>
                </div>
              </li>
            ))}
            {repos.length === 0 && (
              <li className="projects__state">Nenhum repositório encontrado.</li>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Projects
