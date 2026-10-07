// Currículo → resumo + botão para baixar o PDF.
function Resume() {
  return (
    <div className="resume">
      <div className="resume__hero">
        <div className="resume__avatar" aria-hidden="true">
          IB
        </div>
        <div>
          <h2>Igor de Souza Branco</h2>
          <p>Desenvolvedor em formação · Cachoeirinha — RS</p>
        </div>
      </div>

      <ul className="resume__facts">
        <li>
          <strong>Formação:</strong> Técnico em Desenvolvimento de Sistemas —
          SENAC EAD
        </li>
        <li>
          <strong>Experiência:</strong> Jovem Aprendiz na Appmax
        </li>
        <li>
          <strong>Stack:</strong> JavaScript, TypeScript, Python, Java,
          Node.js/Express, React, Django
        </li>
        <li>
          <strong>Objetivo:</strong> vaga de desenvolvedor júnior
        </li>
      </ul>

      <div className="resume__actions">
        <a className="xp-button xp-button--primary" href="/curriculo.pdf" download>
          ⬇ Baixar currículo (PDF)
        </a>
        <a
          className="xp-button"
          href="https://www.linkedin.com/in/igor-de-souza-branco-b68630314"
          target="_blank"
          rel="noreferrer"
        >
          Ver LinkedIn
        </a>
      </div>
    </div>
  )
}

export default Resume
