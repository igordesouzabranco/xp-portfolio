// Meu Computador → Sobre mim e trajetória (estilo Explorer do XP)
function MyComputer() {
  return (
    <div className="explorer">
      {/* Barra de ferramentas decorativa */}
      <div className="explorer__toolbar" aria-hidden="true">
        <span className="explorer__tool">← Voltar</span>
        <span className="explorer__tool explorer__tool--off">→</span>
        <span className="explorer__tool">↑ Cima</span>
        <span className="explorer__tool">🔍 Pesquisar</span>
        <span className="explorer__tool">📁 Pastas</span>
      </div>

      {/* Barra de endereço */}
      <div className="explorer__address">
        <span className="explorer__address-label">Endereço</span>
        <div className="explorer__address-box">🖥️ C:\Igor\</div>
      </div>

      <div className="explorer__body">
        {/* Painel lateral azul (o "Atividades" do XP) */}
        <aside className="explorer__pane">
          <div className="explorer__pane-group">
            <h3>Área de Trabalho</h3>
            <p>Este computador mostra quem é o Igor.</p>
          </div>
          <div className="explorer__pane-group">
            <h3>Detalhes</h3>
            <p>
              <strong>Sistema:</strong> Técnico em Desenvolvimento de Sistemas
            </p>
            <p>
              <strong>Local:</strong> Cachoeirinha — RS
            </p>
            <p>
              <strong>Status:</strong> Buscando vaga júnior 💼
            </p>
          </div>
        </aside>

        {/* Conteúdo principal */}
        <main className="explorer__main">
          <h2>Igor de Souza Branco</h2>
          <p className="explorer__lead">
            Estudante de Técnico em Desenvolvimento de Sistemas (SENAC EAD) e
            Jovem Aprendiz na Appmax. Objetivo: me tornar desenvolvedor júnior.
          </p>

          <h3>📁 Trajetória</h3>
          <ul className="explorer__list">
            <li>
              <strong>Appmax</strong> — Jovem Aprendiz, primeira experiência
              profissional em ambiente de tecnologia.
            </li>
            <li>
              <strong>SENAC EAD</strong> — Técnico em Desenvolvimento de
              Sistemas, foco em programação e banco de dados.
            </li>
            <li>
              <strong>Autodidata</strong> — projetos próprios: site HTML/CSS/JS,
              CLI <code>npx igor-portfolio</code> e este XP Portfolio em React.
            </li>
          </ul>

          <h3>⚙️ O que eu construí aqui</h3>
          <p>
            Um Windows XP no navegador feito com React + Vite e CSS puro — sem
            bibliotecas de janelas. Cada seção do portfólio é um app: janelas
            arrastáveis, barra de tarefas, menu Iniciar e até um prompt de
            comando.
          </p>

          <h3>🚀 Objetivo</h3>
          <p>
            Vaga de desenvolvedor júnior para aplicar o que venho aprendendo em
            JavaScript, React, Node.js e Python — e continuar crescendo.
          </p>
        </main>
      </div>

      <div className="explorer__status">4 objetos</div>
    </div>
  )
}

export default MyComputer
