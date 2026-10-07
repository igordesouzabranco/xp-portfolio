import { useState } from 'react'

// Itens "apagados" — cada um tem uma piadinha de programador.
const ITEMS = [
  {
    name: 'motivo_do_bug.txt',
    size: '1 KB',
    content: '“foi pop() no estado” — culpa clássica 😅',
  },
  {
    name: 'tarefa_que_nunca_acaba.doc',
    size: '0 KB',
    content: 'O arquivo está sempre sendo “salvo”... nunca fecha.',
  },
  {
    name: 'undefined_vs_null.png',
    size: '2 KB',
    content: 'A imagem não abriu: o valor era undefined.',
  },
  {
    name: 'node_modules_final.exe',
    size: '400 MB',
    content: 'Apagado... mas volta na próxima instalação.',
  },
]

// Lixeira → easter egg divertido.
function Trash() {
  const [selected, setSelected] = useState(null)
  const [emptied, setEmptied] = useState(false)

  const handleEmpty = () => {
    setEmptied(true)
    setSelected(null)
  }

  const handleRestore = () => setEmptied(false)

  return (
    <div className="trash">
      <div className="trash__toolbar">
        <button
          type="button"
          className="xp-button"
          onClick={handleEmpty}
          disabled={emptied}
        >
          🗑️ Esvaziar a Lixeira
        </button>
        <button
          type="button"
          className="xp-button"
          onClick={handleRestore}
          disabled={!emptied}
        >
          ↩ Restaurar tudo
        </button>
      </div>

      <div className="trash__body">
        <ul className="trash__list" aria-label="Itens da lixeira">
          {!emptied &&
            ITEMS.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={`trash__item${selected?.name === item.name ? ' trash__item--selected' : ''}`}
                  onClick={() => setSelected(item)}
                >
                  <span aria-hidden="true">📄</span> {item.name}
                  <span className="trash__size">{item.size}</span>
                </button>
              </li>
            ))}
          {emptied && (
            <li className="trash__empty">
              A Lixeira está vazia.
            </li>
          )}
        </ul>

        {/* Painel de detalhes, estilo XP */}
        <aside className="trash__details">
          {selected ? (
            <>
              <h3>{selected.name}</h3>
              <p className="trash__size">Tamanho: {selected.size}</p>
              <p>{selected.content}</p>
            </>
          ) : emptied ? (
            <>
              <h3>🎉 Parabéns!</h3>
              <p>
                Você esvaziou a Lixeira... e a única coisa que sobrou foi essa
                mensagem. Espaço liberado: 0 bytes (a nostalgia continua
                guardada).
              </p>
            </>
          ) : (
            <>
              <h3>Lixeira</h3>
              <p>Selecione um item para ver o que tem dentro 👀</p>
            </>
          )}
        </aside>
      </div>

      <div className="explorer__status">
        {emptied ? '0 objetos' : `${ITEMS.length} objetos`}
      </div>
    </div>
  )
}

export default Trash
