const CHAVE = "buscas-recentes";
const MAXIMO = 6;

export function lerRecentes() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE)) ?? [];
  } catch {
    return [];
  }
}

export function salvarRecente(texto) {
  const busca = texto.trim();
  if (!busca) return lerRecentes();
  const lista = [busca, ...lerRecentes().filter((r) => r !== busca)].slice(0, MAXIMO);
  try {
    localStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch {
    /* sem armazenamento disponível: ignora */
  }
  return lista;
}

export function limparRecentes() {
  try {
    localStorage.removeItem(CHAVE);
  } catch {
    /* ignora */
  }
}
