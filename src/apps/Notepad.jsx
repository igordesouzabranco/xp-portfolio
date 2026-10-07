// Skills e tecnologias, dentro de um Bloco de Notas.
const SKILLS = `SKILLS — Igor de Souza Branco
=====================================

LINGUAGENS
  JavaScript ........ principal, dia a dia
  TypeScript ........ projetos e estudo
  Python ............ scripts e backend
  Java .............. base sólida (SENAC)

WEB
  React ............. este portfólio (Vite + CSS puro)
  Node.js/Express ... APIs REST
  Django ............ Python web

FORMAÇÃO
  Técnico em Desenvolvimento de Sistemas — SENAC EAD
  Jovem Aprendiz na Appmax

OBJETIVO
  Vaga de desenvolvedor júnior.

ONDE ME ENCONTRAR
  github.com/igordesouzabranco
  linkedin.com/in/igor-de-souza-branco-b68630314

DICA
  Abra o Prompt de Comando e digite: npx igor-portfolio
`

function Notepad() {
  return (
    <div className="notepad">
      <div className="notepad__menubar" aria-hidden="true">
        <span>Arquivo</span>
        <span>Editar</span>
        <span>Formatar</span>
        <span>Exibir</span>
        <span>Ajuda</span>
      </div>
      <textarea
        className="notepad__text"
        value={SKILLS}
        readOnly
        spellCheck={false}
        aria-label="Skills e tecnologias"
      />
    </div>
  )
}

export default Notepad
