import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BookModal from "../components/BookModal.jsx";
import { useUser } from "../context/UserContext.jsx";
import { lendoAgora, recomendados } from "../data/livros.js";
import { lerRecentes, limparRecentes, salvarRecente } from "../utils/buscasRecentes.js";
import "./Home.css"; // reaproveita .shelf, .shelf-row e .book-card
import "./Pesquisa.css";

/* Provisório: quando existir um catálogo completo em data/livros.js, importe de lá.
   Para o filtro de gênero funcionar, cada livro precisa de `genero` (texto)
   ou `generos` (lista), com nomes iguais aos de GENEROS. */
const GENEROS = [
  "Romance",
  "Fantasia",
  "Ficção científica",
  "Suspense",
  "Terror",
  "Clássicos",
  "Biografia",
  "Autoajuda",
  "Poesia",
  "HQs e mangás",
  "Infantojuvenil",
  "História",
];

const CATALOGO = [...lendoAgora, ...recomendados].filter(
  (l, i, todos) => todos.findIndex((x) => x.id === l.id) === i // remove duplicados
);

/* Ignora acentos e maiúsculas: "ficcao" encontra "Ficção" */
const normalizar = (s = "") =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

const generosDe = (livro) => [].concat(livro.generos ?? livro.genero ?? []).map(normalizar);

function BookCard({ livro, onSelect }) {
  return (
    <a
      className="book-card"
      href={livro.href ?? "#"}
      onClick={(e) => { e.preventDefault(); onSelect(livro); }}
    >
      <div className="book-cover">{livro.capa && <img src={livro.capa} alt={livro.titulo} />}</div>
      <div className="book-info">
        <p className="book-title">{livro.titulo}</p>
        <p className="book-author">{livro.autor}</p>
      </div>
    </a>
  );
}

export default function Pesquisa() {
  const { avaliacoes, salvarAvaliacao } = useUser();
  const [params, setParams] = useSearchParams();
  const [recentes, setRecentes] = useState(lerRecentes);
  const [livroAberto, setLivroAberto] = useState(null);

  // O texto digitado na barra do Header vive na URL: /pesquisa?q=...&genero=...
  const consulta = params.get("q") ?? "";
  const genero = params.get("genero");

  const termo = normalizar(consulta);
  const buscando = termo !== "" || genero !== null;

  const atualizar = (mudancas) => {
    const p = new URLSearchParams(params);
    Object.entries(mudancas).forEach(([chave, valor]) => (valor ? p.set(chave, valor) : p.delete(chave)));
    setParams(p);
  };

  // Ao voltar para a tela inicial da pesquisa, relê as buscas recentes (o Enter na barra as grava)
  useEffect(() => {
    if (!termo) setRecentes(lerRecentes());
  }, [termo]);

  const resultados = useMemo(
    () =>
      CATALOGO.filter((l) => {
        const bateTexto =
          !termo || normalizar(l.titulo).includes(termo) || normalizar(l.autor).includes(termo);
        const bateGenero = !genero || generosDe(l).includes(normalizar(genero));
        return bateTexto && bateGenero;
      }),
    [termo, genero]
  );

  const abrirLivro = (livro) => {
    salvarRecente(consulta);
    setLivroAberto(livro);
  };

  return (
    <div className="pesquisa">
      {/* ---------- Gêneros ---------- */}
      <section className="shelf">
        <div className="shelf-header">
          <h2>Explore por gênero</h2>
          {genero && (
            <button type="button" className="shelf-action" onClick={() => atualizar({ genero: null })}>
              Limpar filtro
            </button>
          )}
        </div>
        <div className="genre-list">
          {GENEROS.map((g) => (
            <button
              key={g}
              type="button"
              className={`genre-chip${genero === g ? " selected" : ""}`}
              aria-pressed={genero === g}
              onClick={() => atualizar({ genero: genero === g ? null : g })}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      {buscando ? (
        /* ---------- Resultados ---------- */
        <section className="shelf">
          <div className="shelf-header">
            <h2>Resultados</h2>
            <span className="results-count" role="status">
              {resultados.length === 1 ? "1 livro" : `${resultados.length} livros`}
            </span>
          </div>

          {resultados.length > 0 ? (
            <div className="results-grid">
              {resultados.map((l) => <BookCard key={l.id} livro={l} onSelect={abrirLivro} />)}
            </div>
          ) : (
            <p className="pesquisa-vazio">
              {termo
                ? `Nenhum livro encontrado para "${consulta.trim()}"${genero ? ` em ${genero}` : ""}. Confira a grafia ou tente outro título ou autor.`
                : `Ainda não há livros em ${genero}. Escolha outro gênero.`}
            </p>
          )}
        </section>
      ) : (
        <>
          {/* ---------- Buscas recentes ---------- */}
          {recentes.length > 0 && (
            <section className="shelf">
              <div className="shelf-header">
                <h2>Buscas recentes</h2>
                <button
                  type="button"
                  className="shelf-action"
                  onClick={() => { limparRecentes(); setRecentes([]); }}
                >
                  Limpar
                </button>
              </div>
              <div className="genre-list">
                {recentes.map((r) => (
                  <button key={r} type="button" className="genre-chip recent" onClick={() => atualizar({ q: r })}>
                    {r}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* ---------- Sugestões ---------- */}
          <section className="shelf">
            <div className="shelf-header">
              <h2>Sugestões para você</h2>
            </div>
            <div className="shelf-row">
              {recomendados.map((l) => <BookCard key={l.id} livro={l} onSelect={setLivroAberto} />)}
            </div>
          </section>
        </>
      )}

      {livroAberto && (
        <BookModal
          key={livroAberto.id}
          livro={livroAberto}
          avaliacao={avaliacoes[livroAberto.id]}
          onAvaliar={(av) => salvarAvaliacao(livroAberto.id, av)}
          onClose={() => setLivroAberto(null)}
        />
      )}
    </div>
  );
}
