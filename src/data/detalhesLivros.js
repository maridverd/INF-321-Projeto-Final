import { livros } from "./livros.js";

/*
 * Informações extras dos livros, usadas pela página do livro (e pelo modal).
 * Ficam aqui, separadas de livros.js, para não mexer no arquivo que o resto
 * do grupo edita. Quando o back-end existir, tudo isto vem da API.
 *
 * sinopse:  só é usada se livros.js ainda não tiver sinopse para o livro
 * ano:      ano da primeira publicação
 * paginas:  número de páginas de uma edição de EXEMPLO (varia conforme a edição)
 * generos:  nomes iguais aos de GENEROS em pages/pesquisa/Pesquisa.jsx
 */
export const detalhes = {
  1: {
    ano: 2007,
    paginas: 224,
    generos: ["Infantojuvenil"],
    sinopse:
      "Greg Heffley acaba de entrar no ensino fundamental e está decidido a ficar famoso. Enquanto tenta sobreviver ao primeiro ano, ele anota em seu diário as confusões com o melhor amigo Rowley, o irmão mais velho e os colegas, tudo contado com muito humor e ilustrações.",
  },
  2: {
    ano: 1977,
    paginas: 88,
    generos: ["Clássicos"],
    sinopse:
      "Macabéa é uma jovem alagoana que vive no Rio de Janeiro, datilógrafa de vida modesta que pouco sabe sobre si mesma. Narrada por Rodrigo S.M., que se coloca na história e questiona o próprio ato de escrever, a novela acompanha o cotidiano e os sonhos simples da protagonista.",
  },
  3: {
    ano: 1881,
    paginas: 256,
    generos: ["Clássicos"],
    sinopse:
      "Já morto, Brás Cubas decide contar sua vida de além-túmulo, sem pressa nem pudor. Entre amores, ambições frustradas e reflexões irônicas, o defunto autor faz um retrato bem-humorado e cruel da sociedade carioca do século XIX.",
  },
  4: {
    ano: 1942,
    paginas: 123,
    generos: ["Clássicos"],
    sinopse:
      "Em Argel, Meursault recebe a notícia da morte da mãe e reage com um distanciamento que chama a atenção de todos. Quando se envolve em um crime numa praia sob o sol forte, é o seu jeito de encarar a vida, mais do que o ato em si, que passa a ser julgado.",
  },
  5: {
    ano: 2005,
    paginas: 408,
    generos: ["Romance", "Fantasia", "Infantojuvenil"],
    sinopse:
      "Aos 17 anos, Bella Swan se muda para a pequena e chuvosa Forks, onde conhece o misterioso Edward Cullen. Quanto mais se aproxima dele e de sua família, mais ela descobre que há segredos perigosos por trás da beleza e da frieza de todos eles.",
  },
  6: {
    ano: 1818,
    paginas: 280,
    generos: ["Clássicos", "Ficção científica", "Terror"],
    sinopse:
      "O cientista Victor Frankenstein, obcecado em desvendar o segredo da vida, dá vida a uma criatura feita de partes de cadáveres. Abandonada pelo criador, a criatura busca seu lugar no mundo, e a história vira uma reflexão sobre responsabilidade, solidão e os limites da ciência.",
  },
  7: {
    ano: 2021,
    paginas: 384,
    generos: ["Romance"],
    sinopse:
      "Olive Smith, doutoranda, finge namorar o professor Adam Carlsen, famoso e temido, para convencer a amiga de que já está seguindo em frente. O acordo de conveniência, que mistura ciência, pressão acadêmica e muita tensão, começa a ganhar contornos que nenhum dos dois esperava.",
  },
  8: {
    ano: 1882,
    paginas: 96,
    generos: ["Clássicos"],
    sinopse:
      "Em Itaguaí, o doutor Simão Bacamarte decide fundar a Casa Verde, um hospício para tratar os casos de loucura da vila. À medida que seus critérios do que é são e insano mudam, a fronteira entre razão e loucura fica cada vez mais confusa.",
  },
};

/*
 * Avaliações da comunidade (EXEMPLO, com nomes fictícios).
 *
 * votos:    quantidade de avaliações de 1 a 5 estrelas, nessa ordem
 *           (votos[0] = 1 estrela ... votos[4] = 5 estrelas)
 * resenhas: { usuario, nota, texto, data }
 */
export const comunidade = {
  1: {
    votos: [14, 22, 71, 130, 95],
    resenhas: [
      { usuario: "Ana Beatriz", nota: 4.5, texto: "Leitura leve e muito engraçada. Terminei em uma tarde e ri do começo ao fim.", data: "2026-08-14T12:00:00" },
      { usuario: "Lucas M.", nota: 3.5, texto: "Divertido, mas o Greg me irritou em vários momentos. Mesmo assim, vale pelas ilustrações.", data: "2026-07-02T12:00:00" },
    ],
  },
  2: {
    votos: [6, 10, 38, 92, 121],
    resenhas: [
      { usuario: "Carol Souza", nota: 5, texto: "Curtinho e devastador. A Macabéa ficou comigo por dias depois que terminei.", data: "2026-09-03T12:00:00" },
      { usuario: "Rafael T.", nota: 4, texto: "Não é uma leitura fácil no começo, mas a narração diferente compensa.", data: "2026-06-21T12:00:00" },
    ],
  },
  3: {
    votos: [9, 18, 52, 88, 64],
    resenhas: [
      { usuario: "Júlia Prado", nota: 5, texto: "O humor do Brás Cubas envelheceu muito bem. Os capítulos curtos ajudam demais.", data: "2026-08-29T12:00:00" },
      { usuario: "Pedro H.", nota: 3.5, texto: "Gostei mais do final do que do começo, mas a ironia é impagável.", data: "2026-05-17T12:00:00" },
    ],
  },
  4: {
    votos: [5, 12, 46, 110, 88],
    resenhas: [
      { usuario: "Bia Nogueira", nota: 4.5, texto: "Escrita seca e direta, que incomoda de um jeito bom. Fica na cabeça.", data: "2026-09-11T12:00:00" },
      { usuario: "Marcos V.", nota: 4, texto: "Curto, mas pede uma segunda leitura para absorver tudo.", data: "2026-07-25T12:00:00" },
    ],
  },
  5: {
    votos: [60, 55, 90, 70, 48],
    resenhas: [
      { usuario: "Larissa C.", nota: 3, texto: "Nostalgia pura. A história tem altos e baixos, mas a atmosfera é ótima.", data: "2026-06-09T12:00:00" },
      { usuario: "Gustavo R.", nota: 2.5, texto: "Esperava mais do enredo, mas entendo por que marcou uma geração.", data: "2026-04-30T12:00:00" },
    ],
  },
  6: {
    votos: [8, 14, 55, 103, 77],
    resenhas: [
      { usuario: "Helena Duarte", nota: 4.5, texto: "Muito mais triste e filosófico do que eu imaginava. A criatura é o grande destaque.", data: "2026-08-05T12:00:00" },
      { usuario: "Tiago L.", nota: 4, texto: "Linguagem antiga, mas a história prende. Vale pelas discussões que levanta.", data: "2026-03-18T12:00:00" },
    ],
  },
  7: {
    votos: [20, 24, 60, 110, 148],
    resenhas: [
      { usuario: "Mariana F.", nota: 5, texto: "Fofo, divertido e viciante. Li em dois dias!", data: "2026-09-20T12:00:00" },
      { usuario: "Daniel S.", nota: 3.5, texto: "Gostoso de ler, só achei alguns clichês previsíveis demais.", data: "2026-08-01T12:00:00" },
    ],
  },
  8: {
    votos: [4, 9, 33, 70, 52],
    resenhas: [
      { usuario: "Isabela M.", nota: 4.5, texto: "Uma crítica afiada em poucas páginas. Atual até hoje.", data: "2026-07-12T12:00:00" },
      { usuario: "Caio A.", nota: 4, texto: "Ótima leitura rápida, com um final que faz pensar.", data: "2026-05-28T12:00:00" },
    ],
  },
};

/* Sinopse do livro: a de livros.js tem prioridade; a de exemplo só entra se ela estiver vazia */
export const sinopseDe = (livro) => livro.sinopse ?? detalhes[livro.id]?.sinopse ?? null;

/* Livro do catálogo + informações extras, ou undefined se o id não existir */
export function livroCompleto(id) {
  const livro = livros.find((l) => l.id === id);
  if (!livro) return undefined;
  const extra = detalhes[id] ?? {};
  return {
    ...livro,
    sinopse: sinopseDe(livro),
    ano: extra.ano ?? null,
    paginas: extra.paginas ?? null,
    generos: extra.generos ?? [],
  };
}

/* Livros do catálogo escritos por um autor (comparando pelo nome) */
export const livrosDoAutor = (nome, excluirId) =>
  livros.filter((l) => l.autor === nome && l.id !== excluirId);

/*
 * Resumo das notas de um livro: comunidade + a nota do próprio usuário (se houver).
 * A nota do usuário entra na média pelo valor exato e no gráfico na barra da
 * estrela inteira mais próxima. Assim, ao avaliar, a página já reflete a nova nota.
 */
export function resumoNotas(livroId, notaUsuario = 0) {
  const votos = [...(comunidade[livroId]?.votos ?? [0, 0, 0, 0, 0])];
  let soma = votos.reduce((s, qtd, i) => s + qtd * (i + 1), 0);
  let total = votos.reduce((s, qtd) => s + qtd, 0);

  if (notaUsuario > 0) {
    votos[Math.min(5, Math.max(1, Math.round(notaUsuario))) - 1] += 1;
    soma += notaUsuario;
    total += 1;
  }

  return { votos, soma, total, media: total ? soma / total : 0 };
}
