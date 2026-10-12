/*
 * Autores do catálogo. O `nome` precisa ser IGUAL ao campo `autor` dos livros
 * em livros.js: é assim que a página do livro encontra a página do autor.
 *
 * id:          vai na URL (/autor/clarice-lispector)
 * foto:        caminho da imagem (ex.: import foto from "../assets/autores/clarice.jpg").
 *              Com null a página usa o avatar padrão.
 * nascimento / falecimento: texto já formatado (null esconde a linha)
 * obras:       outras obras conhecidas que NÃO estão no catálogo (só texto, sem link)
 *
 * Dados de exemplo: trocar pela API quando o back-end estiver pronto.
 */
export const autores = [
  {
    id: "jeff-kinney",
    nome: "Jeff Kinney",
    foto: null,
    ocupacao: "Autor, cartunista e designer de jogos",
    nascimento: "19 de fevereiro de 1971",
    local: "Fort Washington, Estados Unidos",
    falecimento: null,
    bio: "Autor, cartunista e designer de jogos norte-americano, criador da série Diário de um Banana. O personagem Greg Heffley nasceu em 1998 como um rascunho no caderno de Kinney, foi publicado na internet a partir de 2004 e chegou às livrarias em 2007, tornando-se um fenômeno mundial da literatura infantojuvenil.",
    obras: [
      { titulo: "Diário de um Banana 2: Rodrick é o Cara", ano: 2008 },
      { titulo: "Diário de um Banana 3: A Gota D'Água", ano: 2009 },
      { titulo: "Diário de um Banana 4: Dias de Cão", ano: 2009 },
    ],
  },
  {
    id: "clarice-lispector",
    nome: "Clarice Lispector",
    foto: null,
    ocupacao: "Escritora e jornalista",
    nascimento: "10 de dezembro de 1920",
    local: "Chechelnyk, Ucrânia",
    falecimento: "9 de dezembro de 1977",
    bio: "Escritora e jornalista brasileira nascida na Ucrânia, chegou ao Brasil ainda bebê e passou a infância em Recife. Estreou em 1943 com Perto do Coração Selvagem e ficou conhecida pela prosa introspectiva, voltada à vida interior dos personagens. A Hora da Estrela foi publicada em 1977, pouco antes de sua morte, no Rio de Janeiro.",
    obras: [
      { titulo: "Perto do Coração Selvagem", ano: 1943 },
      { titulo: "Laços de Família", ano: 1960 },
      { titulo: "A Maçã no Escuro", ano: 1961 },
      { titulo: "A Paixão Segundo G.H.", ano: 1964 },
      { titulo: "Felicidade Clandestina", ano: 1971 },
      { titulo: "Água Viva", ano: 1973 },
    ],
  },
  {
    id: "machado-de-assis",
    nome: "Machado de Assis",
    foto: null,
    ocupacao: "Escritor",
    nascimento: "21 de junho de 1839",
    local: "Rio de Janeiro, Brasil",
    falecimento: "29 de setembro de 1908",
    bio: "Escritor carioca, considerado um dos maiores nomes da literatura brasileira e fundador e primeiro presidente da Academia Brasileira de Letras. Escreveu romances, contos, crônicas, poesia e teatro, e é associado ao Realismo no Brasil, com obras como Memórias Póstumas de Brás Cubas, Dom Casmurro e O Alienista.",
    obras: [
      { titulo: "Helena", ano: 1876 },
      { titulo: "Iaiá Garcia", ano: 1878 },
      { titulo: "Quincas Borba", ano: 1891 },
      { titulo: "Dom Casmurro", ano: 1899 },
      { titulo: "Esaú e Jacó", ano: 1904 },
      { titulo: "Memorial de Aires", ano: 1908 },
    ],
  },
  {
    id: "albert-camus",
    nome: "Albert Camus",
    foto: null,
    ocupacao: "Escritor, filósofo e jornalista",
    nascimento: "7 de novembro de 1913",
    local: "Mondovi (atual Dréan), Argélia",
    falecimento: "4 de janeiro de 1960",
    bio: "Escritor, filósofo e jornalista franco-argelino, nascido na Argélia francesa. Ligado à filosofia do absurdo e à reflexão sobre a condição humana, publicou O Estrangeiro em 1942 e recebeu o Nobel de Literatura em 1957. Morreu em 1960, em um acidente de carro na França.",
    obras: [
      { titulo: "O Mito de Sísifo", ano: 1942 },
      { titulo: "A Peste", ano: 1947 },
      { titulo: "O Homem Revoltado", ano: 1951 },
      { titulo: "A Queda", ano: 1956 },
    ],
  },
  {
    id: "stephenie-meyer",
    nome: "Stephenie Meyer",
    foto: null,
    ocupacao: "Escritora",
    nascimento: "24 de dezembro de 1973",
    local: "Hartford, Estados Unidos",
    falecimento: null,
    bio: "Escritora norte-americana, criadora da saga Crepúsculo. O primeiro livro foi publicado em 2005 e virou um sucesso mundial de romance jovem-adulto com elementos de fantasia, depois adaptado para o cinema.",
    obras: [
      { titulo: "Lua Nova", ano: 2006 },
      { titulo: "Eclipse", ano: 2007 },
      { titulo: "Amanhecer", ano: 2008 },
      { titulo: "A Hospedeira", ano: 2008 },
      { titulo: "Sol da Meia-Noite", ano: 2020 },
    ],
  },
  {
    id: "mary-shelley",
    nome: "Mary Shelley",
    foto: null,
    ocupacao: "Escritora",
    nascimento: "30 de agosto de 1797",
    local: "Londres, Reino Unido",
    falecimento: "1º de fevereiro de 1851",
    bio: "Escritora britânica, filha da filósofa Mary Wollstonecraft e do filósofo William Godwin. Publicou Frankenstein; ou, O Prometeu Moderno em 1818, aos 20 anos, obra frequentemente apontada como precursora da ficção científica.",
    obras: [
      { titulo: "Valperga", ano: 1823 },
      { titulo: "O Último Homem", ano: 1826 },
      { titulo: "Perkin Warbeck", ano: 1830 },
    ],
  },
  {
    id: "ali-hazelwood",
    nome: "Ali Hazelwood",
    foto: null,
    ocupacao: "Escritora e neurocientista",
    nascimento: null,
    local: "Itália",
    falecimento: null,
    bio: "Pseudônimo de uma autora italiana de romances contemporâneos, doutora em neurociência. Estreou na ficção com A Hipótese do Amor (2021), que acompanha uma doutoranda e um professor no meio acadêmico, e ficou conhecida pelas histórias com protagonistas mulheres na ciência.",
    obras: [
      { titulo: "Love on the Brain", ano: 2022 },
      { titulo: "Love, Theoretically", ano: 2023 },
      { titulo: "Check & Mate", ano: 2023 },
    ],
  },
];

export const autorPorId = (id) => autores.find((a) => a.id === id);
export const autorPorNome = (nome) => autores.find((a) => a.nome === nome);
