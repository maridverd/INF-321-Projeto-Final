import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import "./Layout.css";

/* Estrutura comum a todas as telas: Sidebar à esquerda, Header no topo
   e a página da rota atual no lugar do <Outlet />. */
export default function Layout() {
  return (
    <div className="page">
      <Sidebar />
      <main className="content">
        <Header notificacoes={0} />
        <Outlet />
      </main>
    </div>
  );
}
