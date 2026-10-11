import { useEffect, useState } from "react";
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
 * @param {string}   value     (opcional) texto vindo de fora, ex.: da URL da tela de pesquisa
 * @param {function} onChange  chamada a cada letra digitada, com o texto
 * @param {function} onSearch  chamada com o texto ao apertar Enter ou clicar na lupa
 * @param {function} onAbrir   chamada quando a pessoa clica no campo
 */
export default function SearchBar({ placeholder = "Pesquisar...", value, onChange, onSearch, onAbrir }) {
  const [texto, setTexto] = useState(value ?? "");

  useEffect(() => {
    if (value !== undefined) setTexto(value);
  }, [value]);

  const alterar = (e) => {
    setTexto(e.target.value);
    onChange?.(e.target.value);
  };

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
        onChange={alterar}
        onClick={onAbrir}
        placeholder={placeholder}
        aria-label="Pesquisar"
        autoComplete="off"
      />
      <button type="submit" className="search-btn" aria-label="Buscar">
        <IconSearch />
      </button>
    </form>
  );
}
