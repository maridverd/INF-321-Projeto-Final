import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Login from './pages/login/Login.jsx'
import Home from './pages/home/Home.jsx'
import Perfil from "./pages/perfil/Perfil.jsx";
import Pesquisa from "./pages/pesquisa/Pesquisa.jsx";
import Configuracoes from './pages/configuracoes/Configuracoes.jsx'
import Cadastro from './pages/cadastro/Cadastro.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      {/* Tudo dentro de <Layout> ganha a Sidebar e o Header */}
      <Route element={<Layout />}>
         <Route path="/home" element={<Home />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
