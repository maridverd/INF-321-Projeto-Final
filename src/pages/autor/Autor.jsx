import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import LivroCard from "../../components/LivroCard.jsx";
import { useUser } from "../../context/UserContext.jsx";
import { autorPorId } from "../../data/autores.js";
import { livrosDoAutor, resumoNotas } from "../../data/detalhesLivros.js";
import avatarPadrao from "../../assets/avatar.svg";
import "../home/Home.css"; // reaproveita .shelf, .shelf-row e .book-card
import "./Autor.css";

export default function Autor() {
  const { id } = useParams();
  const { avaliacoes } = useUser();
  const autor = autorPorId(id);

  // Ao ir de uma página para outra, começa do topo
  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!autor) {
    return (
      <div className="autor-page">
        <BackButton />
        <p className="autor-vazio">
          Não encontramos esse autor. <Link to="/home">Voltar para o início</Link>
        </p>
      </div>
    );
  }

  const livros = livrosDoAutor(autor.nome);

  // Nota média do autor = média de todas as avaliações dos livros dele
  const resumos = livros.map((l) => resumoNotas(l.id, avaliacoes[l.id]?.nota ?? 0));
  const totalAvaliacoes = resumos.reduce((s, r) => s + r.total, 0);
  const media = totalAvaliacoes ? resumos.reduce((s, r) => s + r.soma, 0) / totalAvaliacoes : null;

  const estatisticas = [
    { valor: livros.length, rotulo: livros.length === 1 ? "Livro no catálogo" : "Livros no catálogo" },
    { valor: totalAvaliacoes.toLocaleString("pt-BR"), rotulo: "Avaliações" },
    {
      valor: media === null ? "–" : media.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
      rotulo: "Nota média",
    },
  ];

  const fatos = [
    { rotulo: "Nascimento", valor: autor.nascimento },
    { rotulo: "Natural de", valor: autor.local },
    { rotulo: "Falecimento", valor: autor.falecimento },
  ].filter((f) => f.valor);

  return (
    <div className="autor-page">
      <BackButton />

      {/* ---------- Informações do autor ---------- */}
      <section className="autor-card">
        <div className="autor-foto">
          <img src={autor.foto || avatarPadrao} alt={`Foto de ${autor.nome}`} />
        </div>

        <div className="autor-main">
          <h1 className="autor-nome">{autor.nome}</h1>
          <p className="autor-ocupacao">{autor.ocupacao}</p>

          <dl className="autor-fatos">
            {fatos.map((f) => (
              <div key={f.rotulo} className="autor-fato">
                <dt>{f.rotulo}</dt>
                <dd>{f.valor}</dd>
              </div>
            ))}
          </dl>

          <p className="autor-bio">{autor.bio}</p>

          <dl className="autor-stats">
            {estatisticas.map((s) => (
              <div key={s.rotulo} className="autor-stat">
                <dt>{s.rotulo}</dt>
                <dd>{s.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Livros no catálogo ---------- */}
      <section className="shelf">
        <div className="shelf-header">
          <h2>Livros de {autor.nome}</h2>
        </div>
        {livros.length > 0 ? (
          <div className="shelf-row">
            {livros.map((l) => <LivroCard key={l.id} livro={l} />)}
          </div>
        ) : (
          <p className="autor-vazio">Ainda não há livros deste autor no catálogo.</p>
        )}
      </section>

      {/* ---------- Outras obras (fora do catálogo) ---------- */}
      {autor.obras?.length > 0 && (
        <section className="shelf">
          <div className="shelf-header">
            <h2>Outras obras</h2>
          </div>
          <ul className="autor-obras">
            {autor.obras.map((o) => (
              <li key={o.titulo} className="autor-obra">
                <span className="autor-obra-titulo">{o.titulo}</span>
                <span className="autor-obra-ano">{o.ano}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
