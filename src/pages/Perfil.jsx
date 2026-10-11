import { useState } from "react";
import { Link } from "react-router-dom";
import BookModal from "../components/BookModal.jsx";
import StarRating, { formatarNota } from "../components/StarRating.jsx";
import { useUser } from "../context/UserContext.jsx";
import { lendoAgora, recomendados } from "../data/livros.js";
import avatarPadrao from "../assets/avatar.svg";
import "./Home.css"; // reaproveita .shelf, .shelf-row e .book-card
import "./Perfil.css";

/* Provisório, até existirem em data/livros.js (mesmo formato de lendoAgora).
   - lidosCadastrados: livros já lidos que não passaram pela avaliação
   - queroLer: ainda não há como salvar um livro para ler depois no app */
const lidosCadastrados = [];
const queroLer = [];

const unicos = (lista) => lista.filter((l, i) => lista.findIndex((x) => x.id === l.id) === i);

/* ---------- Componentes pequenos ---------- */

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

function Shelf({ titulo, livros, onSelect, vazio }) {
  return (
    <section className="shelf">
      <div className="shelf-header">
        <h2>{titulo}</h2>
      </div>
      {livros.length > 0 ? (
        <div className="shelf-row">
          {livros.map((l) => <BookCard key={l.id} livro={l} onSelect={onSelect} />)}
        </div>
      ) : (
        <p className="profile-empty">{vazio}</p>
      )}
    </section>
  );
}

function LeituraAtual({ livro, onSelect }) {
  const progresso = livro.progresso; // opcional: 0 a 100
  return (
    <a
      className="reading-card"
      href={livro.href ?? "#"}
      onClick={(e) => { e.preventDefault(); onSelect(livro); }}
    >
      <div className="reading-cover">{livro.capa && <img src={livro.capa} alt="" />}</div>
      <div className="reading-info">
        <p className="reading-title">{livro.titulo}</p>
        <p className="book-author">{livro.autor}</p>
        {typeof progresso === "number" && (
          <div className="reading-progress">
            <div
              className="reading-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progresso}
              aria-label={`Progresso de leitura de ${livro.titulo}`}
            >
              <div className="reading-bar-fill" style={{ width: `${progresso}%` }} />
            </div>
            <span className="reading-percent">{progresso}% lido</span>
          </div>
        )}
      </div>
    </a>
  );
}

function CardAvaliacao({ livro, avaliacao, onSelect }) {
  return (
    <li>
      <a
        className="avaliacao-card"
        href={livro.href ?? "#"}
        onClick={(e) => { e.preventDefault(); onSelect(livro); }}
      >
        <div className="avaliacao-capa">{livro.capa && <img src={livro.capa} alt="" />}</div>
        <div className="avaliacao-corpo">
          <div className="avaliacao-topo">
            <p className="avaliacao-titulo">{livro.titulo}</p>
            <div className="avaliacao-nota">
              <StarRating value={avaliacao.nota} size={16} readOnly />
              <span>{formatarNota(avaliacao.nota)}</span>
            </div>
          </div>
          <p className="book-author">{livro.autor}</p>
          {avaliacao.resenha && <p className="avaliacao-texto">{avaliacao.resenha}</p>}
          {avaliacao.data && (
            <p className="avaliacao-data">
              Avaliado em {new Date(avaliacao.data).toLocaleDateString("pt-BR")}
            </p>
          )}
        </div>
      </a>
    </li>
  );
}

/* ---------- Página ---------- */

export default function Perfil() {
  const { usuario, avaliacoes, salvarAvaliacao } = useUser();
  const [livroAberto, setLivroAberto] = useState(null);

  const catalogo = unicos([...lendoAgora, ...lidosCadastrados, ...recomendados, ...queroLer]);
  const idsEmLeitura = new Set(lendoAgora.map((l) => l.id));

  // Todo livro com nota aparece em "Minhas avaliações", do mais recente para o mais antigo
  const avaliados = catalogo
    .filter((l) => avaliacoes[l.id]?.nota)
    .sort((a, b) => new Date(avaliacoes[b.id].data ?? 0) - new Date(avaliacoes[a.id].data ?? 0));

  // Quem avaliou um livro (que não está em leitura) já leu: entra em "Livros lidos"
  const lidos = unicos([...lidosCadastrados, ...avaliados.filter((l) => !idsEmLeitura.has(l.id))]);

  const media = avaliados.length
    ? avaliados.reduce((soma, l) => soma + avaliacoes[l.id].nota, 0) / avaliados.length
    : null;

  const estatisticas = [
    { valor: lidos.length, rotulo: "Livros lidos" },
    { valor: avaliados.length, rotulo: "Avaliações" },
    {
      valor: media === null ? "–" : media.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 }),
      rotulo: "Nota média",
    },
    { valor: queroLer.length, rotulo: "Quero ler" },
  ];

  return (
    <div className="profile">
      {/* ---------- Informações do perfil ---------- */}
      <section className="profile-card">
        <div className="profile-photo">
          <img src={usuario.foto || avatarPadrao} alt={`Foto de ${usuario.nome}`} />
        </div>

        <div className="profile-main">
          <div className="profile-top">
            <div>
              <h1 className="profile-name">{usuario.nome}</h1>
              <p className="profile-username">@{usuario.username}</p>
            </div>
            <Link to="/configuracoes" className="btn btn-soft">Editar perfil</Link>
          </div>

          {usuario.bio ? (
            <p className="profile-bio">{usuario.bio}</p>
          ) : (
            <p className="profile-bio profile-bio-empty">
              Adicione uma bio em Editar perfil para contar o que você gosta de ler.
            </p>
          )}

          <dl className="profile-stats">
            {estatisticas.map((s) => (
              <div key={s.rotulo} className="profile-stat">
                <dt>{s.rotulo}</dt>
                <dd>{s.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Leitura atual ---------- */}
      <section className="shelf">
        <div className="shelf-header">
          <h2>Lendo agora</h2>
        </div>
        {lendoAgora.length > 0 ? (
          <div className="reading-list">
            {lendoAgora.map((l) => <LeituraAtual key={l.id} livro={l} onSelect={setLivroAberto} />)}
          </div>
        ) : (
          <p className="profile-empty">Você não está lendo nenhum livro no momento.</p>
        )}
      </section>

      {/* ---------- Livros lidos ---------- */}
      <Shelf
        titulo="Livros lidos"
        livros={lidos}
        onSelect={setLivroAberto}
        vazio="Avalie um livro e ele aparece aqui como lido."
      />

      {/* ---------- Avaliações ---------- */}
      <section className="shelf">
        <div className="shelf-header">
          <h2>Minhas avaliações</h2>
        </div>
        {avaliados.length > 0 ? (
          <ul className="avaliacao-lista">
            {avaliados.map((l) => (
              <CardAvaliacao key={l.id} livro={l} avaliacao={avaliacoes[l.id]} onSelect={setLivroAberto} />
            ))}
          </ul>
        ) : (
          <p className="profile-empty">Abra um livro na Início e deixe sua nota e resenha.</p>
        )}
      </section>

      {/* ---------- Quero ler ---------- */}
      <Shelf
        titulo="Quero ler"
        livros={queroLer}
        onSelect={setLivroAberto}
        vazio="Os livros que você salvar para ler depois aparecem aqui."
      />

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
