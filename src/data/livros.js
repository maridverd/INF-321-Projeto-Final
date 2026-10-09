/*
 * Catálogo de exemplo. Cada livro aparece uma vez só aqui, e as prateleiras
 * guardam apenas os ids — assim a avaliação de um livro vale para ele em
 * qualquer prateleira.
 *
 * capa:    caminho da imagem (ex.: import capa from "../assets/capa.jpg")
 * sinopse: texto exibido no modal
 */
export const livros = [
  { id: 1, titulo: "Diário de um Banana", autor: "Jeff Kinney", capa: null, sinopse: null },
  { id: 2, titulo: "A Hora da Estrela", autor: "Clarice Lispector", capa: null, sinopse: null },
  { id: 3, titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", capa: null, sinopse: null },
  { id: 4, titulo: "The Stranger", autor: "Albert Camus", capa: null, sinopse: null },
  { id: 5, titulo: "Crepúsculo", autor: "Stephenie Meyer", capa: null, sinopse: null },
  { id: 6, titulo: "Frankenstein", autor: "Mary Shelley", capa: null, sinopse: null },
  { id: 7, titulo: "A Hipótese do Amor", autor: "Ali Hazelwood", capa: null, sinopse: null },
  { id: 8, titulo: "O Alienista", autor: "Machado de Assis", capa: null, sinopse: null },
];

const porId = (ids) => ids.map((id) => livros.find((l) => l.id === id));

export const lendoAgora = porId([1, 2, 3, 4, 5]);
export const recomendados = porId([6, 7, 8, 1, 5]);
