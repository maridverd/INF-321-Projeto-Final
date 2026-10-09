import { useState } from "react";
import BookModal from "../components/BookModal.jsx";
import { useUser } from "../context/UserContext.jsx";
import { lendoAgora, recomendados } from "../data/livros.js";
import "./Home.css";

function BookCard({ livro, onSelect }) {
  return (
    <a
      className="book-card"
      href={livro.href ?? "#"}
      onClick={onSelect ? (e) => { e.preventDefault(); onSelect(livro); } : undefined}
    >
      <div className="book-cover">{livro.capa && <img src={livro.capa} alt={livro.titulo} />}</div>
      <div className="book-info">
        <p className="book-title">{livro.titulo}</p>
        <p className="book-author">{livro.autor}</p>
      </div>
    </a>
  );
}

function Shelf({ titulo, livros, onSelect }) {
  return (
    <section className="shelf">
      <div className="shelf-header">
        <h2>{titulo}</h2>
        <a href="#" className="see-more">Ver todos <span className="see-more-arrow">→</span></a>
      </div>
      <div className="shelf-row">
        {livros.map((l) => <BookCard key={l.id} livro={l} onSelect={onSelect} />)}
      </div>
    </section>
  );
}

export default function Home() {
  const { avaliacoes, salvarAvaliacao } = useUser();
  const [livroAberto, setLivroAberto] = useState(null);

  return (
    <>
      <Shelf titulo="Lendo Agora" livros={lendoAgora} onSelect={setLivroAberto} />
      <Shelf titulo="Recomendados" livros={recomendados} onSelect={setLivroAberto} />

      {livroAberto && (
        <BookModal
          key={livroAberto.id}
          livro={livroAberto}
          avaliacao={avaliacoes[livroAberto.id]}
          onAvaliar={(av) => salvarAvaliacao(livroAberto.id, av)}
          onClose={() => setLivroAberto(null)}
        />
      )}
    </>
  );
}
