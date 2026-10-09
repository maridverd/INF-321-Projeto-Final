import { NavLink } from "react-router-dom";
import "./Sidebar.css";

/* ---------- Ícones ---------- */
const IconHome = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
    <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
    <circle cx="10" cy="8" r="4" />
    <path d="M2.5 20c.8-3.5 3.8-6 7.5-6s6.7 2.5 7.5 6" />
    <path d="M15.5 4.3a4 4 0 0 1 0 7.4M18.5 14.5c1.6.9 2.7 3 3 5.5" />
  </svg>
);

const IconSettings = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/*
 * Itens da navegação. "to" é a rota; o item cuja rota bate com a URL atual
 * ganha a classe "active" (círculo rosa) automaticamente pelo NavLink.
 * Amigos ainda não tem tela, então fica sem rota por enquanto.
 */
const itens = [
  { to: "/", end: true, label: "Início", Icon: IconHome },
  { to: null, label: "Amigos", Icon: IconUsers },
  { to: "/configuracoes", label: "Configurações", Icon: IconSettings },
];

export default function Sidebar() {
  return (
    <nav className="sidebar">
      {itens.map(({ to, end, label, Icon }) =>
        to ? (
          <NavLink
            key={label}
            to={to}
            end={end}
            aria-label={label}
            title={label}
            className={({ isActive }) => `sidebar-btn${isActive ? " active" : ""}`}
          >
            <Icon />
          </NavLink>
        ) : (
          <button key={label} className="sidebar-btn" aria-label={label} title={`${label} (em breve)`}>
            <Icon />
          </button>
        )
      )}
    </nav>
  );
}
