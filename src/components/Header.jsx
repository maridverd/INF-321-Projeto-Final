import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import { useUser } from "../context/UserContext.jsx";
import { salvarRecente } from "../utils/buscasRecentes.js";
import logo from "../assets/wormbox.svg";
import avatarPadrao from "../assets/avatar.svg";
import "./Header.css";

const IconBell = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
    <path d="M6 17V11a6 6 0 0 1 12 0v6l1.5 1.5h-15z" />
    <path d="M10 21h4" strokeLinecap="round" />
  </svg>
);

export default function Header({ notificacoes = 0 }) {
  const { usuario } = useUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  const naPesquisa = pathname === "/pesquisa";
  const consulta = naPesquisa ? params.get("q") ?? "" : "";

  const irParaPesquisa = (texto) => {
    const p = new URLSearchParams(naPesquisa ? params : undefined);
    if (texto) p.set("q", texto);
    else p.delete("q");
    const search = p.toString();
    navigate({ pathname: "/pesquisa", search: search ? `?${search}` : "" }, { replace: naPesquisa });
  };

  return (
    <header className="header">
      <Link to="/" className="logo-slot" aria-label="Início">
        <img src={logo} alt="wormboxd" />
      </Link>

      <SearchBar
        value={consulta}
        onAbrir={() => { if (!naPesquisa) navigate("/pesquisa"); }}
        onChange={irParaPesquisa}
        onSearch={(busca) => { salvarRecente(busca); irParaPesquisa(busca); }}
      />

      <div className="user">
        <div className="avatar"><img src={usuario.foto || avatarPadrao} alt={usuario.nome} /></div>
        <span className="user-name">{usuario.nome}</span>
        <button
          className="bell"
          aria-label={notificacoes > 0 ? `Notificações (${notificacoes} novas)` : "Notificações"}
        >
          <IconBell />
          {notificacoes > 0 && <span className="bell-dot" />}
        </button>
      </div>
    </header>
  );
}
