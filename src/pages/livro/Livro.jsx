import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import BookModal from "../../components/BookModal.jsx";
import LivroCard from "../../components/LivroCard.jsx";
import StarRating, { formatarNota } from "../../components/StarRating.jsx";
import { useUser } from "../../context/UserContext.jsx";
import { autorPorNome } from "../../data/autores.js";
import { comunidade, livroCompleto, livrosDoAutor, resumoNotas } from "../../data/detalhesLivros.js";
import "../home/Home.css"; // reaproveita .shelf, .shelf-row e .book-card
import "./Livro.css";

/* ---------- Componentes pequenos ---------- */

function Distribuicao({ votos, total }) {
  return (
    <ul className="livro-dist" aria-label="Distribuição das avaliações">
      {[5, 4, 3, 2, 1].map((n) => {
        const qtd = votos[n - 1];
        const pct = total ? (qtd / total) * 100 : 0;
        return (
          <li key={n} className="livro-dist-linha">
            <span className="livro-dist-rotulo">{n} ★</span>
            <div className="livro-dist-barra">
              <div className="livro-dist-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="livro-dist-qtd">{qtd}</span>
          </li>
        );
      })}
    </ul>
  );
}

function Resenha({ nome, nota, texto, data, voce = false }) {
  return (
    <li className="livro-resenha">
      <div className="livro-resenha-avatar" aria-hidden="true">{nome.charAt(0)}</div>
      <div className="livro-resenha-corpo">
        <div className="livro-resenha-topo">
          <p className="livro-resenha-nome">
            {nome}
            {voce && <span className="livro-resenha-voce">Você</span>}
          </p>
          <div className="livro-resenha-nota">
            <StarRating value={nota} size={16} readOnly />
            <span>{formatarNota(nota)}</span>
          </div>
        </div>
        {texto && <p className="livro-resenha-texto">{texto}</p>}
        {data && <p className="livro-resenha-data">Avaliado em {new Date(data).toLocaleDateString("pt-BR")}</p>}
      </div>
    </li>
  );
}

/* ---------- Página ---------- */

export default function Livro() {
  const { id } = useParams();
  const { usuario, avaliacoes, salvarAvaliacao } = useUser();
  const [avaliando, setAvaliando] = useState(false);

  // Ao ir de uma página para outra, começa do topo
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const livro = livroCompleto(Number(id));

  if (!livro) {
    return (
      <div className="livro-page">
        <BackButton />
        <p className="livro-vazio">
          Não encontramos esse livro. <Link to="/home">Voltar para o início</Link>
        </p>
      </div>
    );
  }

  const autor = autorPorNome(livro.autor);
  const minhaAvaliacao = avaliacoes[livro.id];
  const { votos, total, media } = resumoNotas(livro.id, minhaAvaliacao?.nota ?? 0);
  const mediaArredondada = Math.round(media * 10) / 10;
  const maisDoAutor = livrosDoAutor(livro.autor, livro.id);

  const meta = [
    livro.paginas && { rotulo: "Páginas", valor: livro.paginas },
    livro.ano && { rotulo: "Publicação", valor: livro.ano },
    { rotulo: "Avaliações", valor: total.toLocaleString("pt-BR") },
  ].filter(Boolean);

  return (
    <div className="livro-page">
      <BackButton />

      {/* ---------- Informações do livro ---------- */}
      <section className="livro-card">
        <div className="livro-capa">
          {livro.capa && <img src={livro.capa} alt={`Capa de ${livro.titulo}`} />}
        </div>

        <div className="livro-main">
          <h1 className="livro-titulo">{livro.titulo}</h1>
          <p className="livro-autor">
            por {autor ? <Link to={`/autor/${autor.id}`}>{livro.autor}</Link> : livro.autor}
          </p>

          {livro.generos.length > 0 && (
            <ul className="livro-generos" aria-label="Gêneros">
              {livro.generos.map((g) => <li key={g} className="livro-genero">{g}</li>)}
            </ul>
          )}

          <div className="livro-nota">
            <StarRating value={mediaArredondada} size={24} readOnly />
            <strong>{total ? formatarNota(mediaArredondada) : "–"}</strong>
            <span className="livro-nota-total">
              {total === 1 ? "1 avaliação" : `${total.toLocaleString("pt-BR")} avaliações`}
            </span>
          </div>

          <dl className="livro-meta">
            {meta.map((m) => (
              <div key={m.rotulo}>
                <dt>{m.rotulo}</dt>
                <dd>{m.valor}</dd>
              </div>
            ))}
          </dl>

          <div className="livro-acoes">
            <button type="button" className="btn btn-primary" onClick={() => setAvaliando(true)}>
              {minhaAvaliacao ? "Editar minha avaliação" : "★ Avaliar"}
            </button>
            {autor && (
              <Link to={`/autor/${autor.id}`} className="btn btn-soft">Sobre o autor</Link>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Sinopse ---------- */}
      <section className="shelf">
        <div className="shelf-header">
          <h2>Sinopse</h2>
        </div>
        <p className={`livro-sinopse${livro.sinopse ? "" : " vazia"}`}>
          {livro.sinopse || "Sinopse ainda não cadastrada."}
        </p>
      </section>

      {/* ---------- Avaliações ---------- */}
      <section className="shelf">
        <div className="shelf-header">
          <h2>Avaliações</h2>
        </div>

        {total > 0 ? (
          <div className="livro-resumo">
            <div className="livro-resumo-media">
              <span className="livro-resumo-numero">{formatarNota(mediaArredondada)}</span>
              <StarRating value={mediaArredondada} size={20} readOnly />
              <span className="livro-nota-total">
                {total === 1 ? "1 avaliação" : `${total.toLocaleString("pt-BR")} avaliações`}
              </span>
            </div>
            <Distribuicao votos={votos} total={total} />
          </div>
        ) : (
          <p className="livro-vazio">Este livro ainda não foi avaliado. Seja a primeira pessoa!</p>
        )}

        {/* resenhas: a sua primeiro, depois as da comunidade */}
        {(minhaAvaliacao || comunidade[livro.id]?.resenhas?.length > 0) && (
          <ul className="livro-resenhas">
            {minhaAvaliacao && (
              <Resenha
                voce
                nome={usuario.nome}
                nota={minhaAvaliacao.nota}
                texto={minhaAvaliacao.resenha}
                data={minhaAvaliacao.data}
              />
            )}
            {(comunidade[livro.id]?.resenhas ?? []).map((r) => (
              <Resenha key={r.usuario} nome={r.usuario} nota={r.nota} texto={r.texto} data={r.data} />
            ))}
          </ul>
        )}
      </section>

      {/* ---------- Mais do autor ---------- */}
      {maisDoAutor.length > 0 && (
        <section className="shelf">
          <div className="shelf-header">
            <h2>Mais de {livro.autor}</h2>
            {autor && (
              <Link to={`/autor/${autor.id}`} className="see-more">
                Ver autor <span className="see-more-arrow">→</span>
              </Link>
            )}
          </div>
          <div className="shelf-row">
            {maisDoAutor.map((l) => <LivroCard key={l.id} livro={l} />)}
          </div>
        </section>
      )}

      {avaliando && (
        <BookModal
          key={livro.id}
          livro={livro}
          avaliacao={minhaAvaliacao}
          modoInicial="avaliar"
          linkPagina={false}
          onAvaliar={(av) => salvarAvaliacao(livro.id, av)}
          onClose={() => setAvaliando(false)}
        />
      )}
    </div>
  );
}
