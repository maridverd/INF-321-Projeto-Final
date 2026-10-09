import { createContext, useContext, useState } from "react";

/*
 * Guarda os dados do usuário logado e as avaliações dele num lugar só,
 * para o Header, a tela de Configurações e o modal do livro enxergarem
 * a mesma informação. Por enquanto fica só em memória (some ao recarregar);
 * depois é aqui que entra a chamada para a API.
 */
const UserContext = createContext(null);

const usuarioInicial = {
  nome: "Marina Sena",
  username: "marinasena",
  email: "marina@email.com",
  bio: "",
  foto: null,
};

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [avaliacoes, setAvaliacoes] = useState({}); // { [livroId]: { nota, resenha, data } }

  const salvarAvaliacao = (livroId, avaliacao) =>
    setAvaliacoes((atual) => ({ ...atual, [livroId]: avaliacao }));

  return (
    <UserContext.Provider value={{ usuario, setUsuario, avaliacoes, salvarAvaliacao }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
