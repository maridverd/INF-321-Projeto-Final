import { useState } from "react";
import "./SearchBar.css";

const IconSearch = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <circle cx="10.5" cy="10.5" r="7" />
    <path d="m16 16 5 5" />
  </svg>
);

/**
 * Barra de pesquisa.
 * @param {string}   placeholder
 * @param {function} onSearch  chamada com o texto digitado ao apertar Enter ou clicar na lupa
 */
export default function SearchBar({ placeholder = "Pesquisar...", onSearch }) {
  const [texto, setTexto] = useState("");

  const enviar = (e) => {
    e.preventDefault();
    const busca = texto.trim();
    if (busca) onSearch?.(busca);
  };

  return (
    <form className="search" role="search" onSubmit={enviar}>
      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={placeholder}
        aria-label="Pesquisar"
      />
      <button type="submit" className="search-btn" aria-label="Buscar">
        <IconSearch />
      </button>
    </form>
  );
}
