import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Configuracoes from './pages/Configuracoes.jsx'

function App() {
  return (
    <Routes>
      {/* Tudo dentro de <Layout> ganha a Sidebar e o Header */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
