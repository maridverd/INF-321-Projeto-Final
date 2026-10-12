import { Link } from "react-router-dom";

/* Card de livro que leva para a página do livro (/livro/:id).
   Usa as classes .book-card, .book-cover etc. de pages/home/Home.css,
   então a página que usar este componente precisa importar esse CSS. */
export default function LivroCard({ livro }) {
  return (
    <Link className="book-card" to={`/livro/${livro.id}`}>
      <div className="book-cover">{livro.capa && <img src={livro.capa} alt={livro.titulo} />}</div>
      <div className="book-info">
        <p className="book-title">{livro.titulo}</p>
        <p className="book-author">{livro.autor}</p>
      </div>
    </Link>
  );
}
