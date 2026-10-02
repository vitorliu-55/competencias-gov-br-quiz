// Banco de perguntas. A primeira alternativa de cada pergunta é a correta
// (o site embaralha na hora de mostrar).
//
// tipo: "atribuicao" (conceitual, duradouro) | "real" (caso recente, com fonte e data)
// nivel: "federal" | "estadual" | "municipal"
// revisar: true = precisa de conferência humana antes de confiar
const TEMAS = {
  "processo-legislativo": "Processo legislativo e atos",
  "executivo": "Poder Executivo",
  "controle": "Controle e fiscalização",
  "orcamento": "Orçamento e tributos",
  "competencias": "Competência para legislar",
  "cargos": "Cargos e mandatos",
  "educacao": "Educação",
  "habitacao": "Habitação e urbanismo",
  "saude": "Saúde",
};

// Quando uma alternativa é exatamente um destes órgãos, o site mostra
// entre parênteses quem o compõe.
const ORGAOS = {
  "Congresso Nacional": "deputados federais e senadores",
  "Câmara dos Deputados": "deputados federais",
  "Senado Federal": "senadores",
  "Assembleia Legislativa": "deputados estaduais",
  "Câmara Municipal": "vereadores",
  "Supremo Tribunal Federal": "ministros do STF",
  "Tribunal de Contas da União": "ministros do TCU",
  "Tribunal de Contas": "conselheiros ou ministros",
  "Tribunal de Justiça": "desembargadores",
};

const QUESTIONS = [
  // ---------- Federal: atribuições gerais ----------
  {
    id: "q001", tema: "processo-legislativo", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem sanciona ou veta um projeto de lei aprovado pelo Congresso Nacional?",
    alternativas: ["Presidente da República", "Presidente do Senado", "Ministro da Casa Civil", "Presidente do STF"],
    explicacao: "O projeto aprovado pelo Congresso vai ao Presidente da República, que tem 15 dias úteis para sancioná-lo (total ou parcialmente) ou vetá-lo.",
    fonte: "CF/88, art. 66",
  },
  {
    id: "q002", tema: "processo-legislativo", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem analisa um veto presidencial e decide mantê-lo ou derrubá-lo?",
    alternativas: ["Congresso Nacional", "Presidente da República", "Supremo Tribunal Federal", "Câmara dos Deputados"],
    explicacao: "O veto é apreciado pelo Congresso Nacional em sessão conjunta de deputados e senadores. Para derrubá-lo é preciso maioria absoluta dos deputados e dos senadores.",
    fonte: "CF/88, art. 66, §§ 4º e 5º",
  },
  {
    id: "q003", tema: "processo-legislativo", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem pode editar uma medida provisória, com força de lei, em caso de relevância e urgência?",
    alternativas: ["Presidente da República", "Câmara dos Deputados", "Senado Federal", "Ministro da Fazenda"],
    explicacao: "A medida provisória é ato do Presidente da República e vale imediatamente, mas precisa ser votada pelo Congresso em até 120 dias para não perder a eficácia.",
    fonte: "CF/88, art. 62",
  },
  {
    id: "q004", tema: "controle", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem julga o Presidente da República por crime de responsabilidade (impeachment)?",
    alternativas: ["Senado Federal", "Câmara dos Deputados", "Supremo Tribunal Federal", "Congresso Nacional"],
    explicacao: "O julgamento é do Senado Federal, presidido pelo Presidente do STF. Já crimes comuns são julgados pelo STF.",
    fonte: "CF/88, art. 52, I e parágrafo único",
  },
  {
    id: "q005", tema: "controle", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem autoriza, por 2/3 dos votos, a abertura de processo contra o Presidente da República?",
    alternativas: ["Câmara dos Deputados", "Senado Federal", "Supremo Tribunal Federal", "Procurador-Geral da República"],
    explicacao: "A Câmara dos Deputados admite a acusação por 2/3 dos votos. Só então o caso segue para julgamento no Senado (crime de responsabilidade) ou no STF (crime comum).",
    fonte: "CF/88, arts. 51, I, e 86",
  },
  {
    id: "q006", tema: "controle", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem aprova, por maioria absoluta, a escolha de um ministro do STF indicado pelo Presidente?",
    alternativas: ["Senado Federal", "Câmara dos Deputados", "Congresso Nacional", "Presidente do STF"],
    explicacao: "O Presidente indica, o Senado aprova a indicação por maioria absoluta depois de sabatina, e então o Presidente nomeia.",
    fonte: "CF/88, arts. 101, parágrafo único, e 52, III, a",
  },
  {
    id: "q007", tema: "executivo", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem decreta intervenção federal em um estado?",
    alternativas: ["Presidente da República", "Congresso Nacional", "Supremo Tribunal Federal", "Ministro da Defesa"],
    explicacao: "A intervenção é decretada pelo Presidente da República, por iniciativa própria ou após requisição ou provimento do Judiciário, conforme o caso.",
    fonte: "CF/88, arts. 34 e 84, X",
  },
  {
    id: "q008", tema: "executivo", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem tem competência para conceder indulto a condenados?",
    alternativas: ["Presidente da República", "Supremo Tribunal Federal", "Senado Federal", "Ministro da Justiça"],
    explicacao: "Conceder indulto e comutar penas é atribuição privativa do Presidente da República, que pode delegá-la a ministros, ao PGR ou ao AGU.",
    fonte: "CF/88, art. 84, XII e parágrafo único",
  },
  {
    id: "q009", tema: "executivo", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem decreta o estado de sítio, depois das devidas autorizações?",
    alternativas: ["Presidente da República", "Congresso Nacional", "Supremo Tribunal Federal", "Ministro da Defesa"],
    explicacao: "O Presidente ouve o Conselho da República e o Conselho de Defesa Nacional e solicita autorização ao Congresso Nacional (Câmara e Senado, que decidem por maioria absoluta). Autorizado, é o próprio Presidente quem decreta o estado de sítio.",
    fonte: "CF/88, arts. 137 e 84, IX",
  },
  {
    id: "q010", tema: "executivo", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem edita decretos para regulamentar a execução de uma lei federal?",
    alternativas: ["Presidente da República", "Ministro de Estado", "Congresso Nacional", "Supremo Tribunal Federal"],
    explicacao: "Expedir decretos e regulamentos para a fiel execução das leis é atribuição privativa do Presidente da República.",
    fonte: "CF/88, art. 84, IV",
  },
  {
    id: "q011", tema: "executivo", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem declara guerra, no caso de agressão estrangeira?",
    alternativas: ["Presidente da República", "Ministro da Defesa", "Senado Federal", "Comandante do Exército"],
    explicacao: "O Presidente da República declara guerra no caso de agressão estrangeira, sempre autorizado ou referendado pelo Congresso Nacional.",
    fonte: "CF/88, art. 84, XIX",
  },
  {
    id: "q012", tema: "cargos", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem nomeia o Procurador-Geral da República?",
    alternativas: ["Presidente da República", "Senado Federal", "Supremo Tribunal Federal", "Câmara dos Deputados"],
    explicacao: "O PGR é nomeado pelo Presidente entre integrantes da carreira, mas só depois de o Senado aprovar o nome por maioria absoluta.",
    fonte: "CF/88, art. 128, § 1º",
  },
  {
    id: "q013", tema: "cargos", nivel: "federal", tipo: "atribuicao",
    pergunta: "Qual cargo eletivo tem mandato de 8 anos?",
    alternativas: ["Senador", "Deputado Federal", "Presidente da República", "Vereador"],
    explicacao: "Senadores têm mandato de 8 anos, com renovação de 1/3 e 2/3 do Senado alternadamente a cada 4 anos. Os demais cargos eletivos têm mandato de 4 anos.",
    fonte: "CF/88, art. 46, § 1º",
  },
  {
    id: "q014", tema: "orcamento", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem envia ao Congresso Nacional o projeto de lei do orçamento anual da União?",
    alternativas: ["Presidente da República", "Câmara dos Deputados", "Tribunal de Contas da União", "Presidente do Senado"],
    explicacao: "A iniciativa das leis do ciclo orçamentário (PPA, LDO e LOA) é do chefe do Executivo. O Congresso discute, emenda e aprova.",
    fonte: "CF/88, arts. 84, XXIII, e 165",
  },
  {
    id: "q015", tema: "controle", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem julga anualmente as contas do Presidente da República?",
    alternativas: ["Congresso Nacional", "Tribunal de Contas da União", "Supremo Tribunal Federal", "Senado Federal"],
    explicacao: "O TCU apenas emite um parecer prévio. Quem julga as contas do Presidente é o Congresso Nacional.",
    fonte: "CF/88, arts. 49, IX, e 71, I",
  },
  {
    id: "q016", tema: "competencias", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem tem competência privativa para legislar sobre trânsito e transporte?",
    alternativas: ["Congresso Nacional", "Assembleia Legislativa", "Câmara Municipal", "Prefeito"],
    explicacao: "Legislar sobre trânsito e transporte é competência privativa da União, exercida pelo Congresso Nacional (como no Código de Trânsito Brasileiro). Municípios cuidam da execução local, como sinalização e fiscalização.",
    fonte: "CF/88, art. 22, XI",
  },
  {
    id: "q017", tema: "educacao", nivel: "federal", tipo: "atribuicao",
    pergunta: "Quem legisla sobre as diretrizes e bases da educação nacional?",
    alternativas: ["Congresso Nacional", "Ministro da Educação", "Governador", "Prefeito"],
    explicacao: "As diretrizes e bases da educação nacional são competência privativa da União, por lei federal (hoje, a Lei 9.394/1996, a LDB). O Ministro executa e regulamenta, mas não cria a lei.",
    fonte: "CF/88, art. 22, XXIV",
  },

  // ---------- Estadual ----------
  {
    id: "q018", tema: "processo-legislativo", nivel: "estadual", tipo: "atribuicao",
    pergunta: "Quem sanciona ou veta um projeto de lei aprovado pela Assembleia Legislativa?",
    alternativas: ["Governador", "Deputado Estadual", "Presidente da República", "Secretário de Estado"],
    explicacao: "O processo legislativo estadual segue, por simetria, o federal: a Assembleia aprova e o Governador sanciona ou veta.",
    fonte: "CF/88, arts. 25 e 66 (por simetria)",
  },
  {
    id: "q019", tema: "processo-legislativo", nivel: "estadual", tipo: "atribuicao",
    pergunta: "Quem tem iniciativa exclusiva para propor lei que aumenta a remuneração de servidores do Executivo estadual?",
    alternativas: ["Governador", "Deputado Estadual", "Assembleia Legislativa", "Prefeito"],
    explicacao: "Leis sobre o regime e a remuneração dos servidores do Executivo são de iniciativa privativa do chefe do Executivo. Um deputado não pode propô-las.",
    fonte: "CF/88, art. 61, § 1º, II, a (por simetria)",
  },
  {
    id: "q020", tema: "processo-legislativo", nivel: "estadual", tipo: "atribuicao",
    pergunta: "Quem elabora e aprova a Constituição de um estado e as suas emendas?",
    alternativas: ["Assembleia Legislativa", "Governador", "Congresso Nacional", "Tribunal de Justiça"],
    explicacao: "Cada estado se organiza por sua Constituição, elaborada pela Assembleia Legislativa, respeitando os princípios da Constituição Federal.",
    fonte: "CF/88, art. 25 e ADCT, art. 11",
  },

  // ---------- Municipal ----------
  {
    id: "q021", tema: "processo-legislativo", nivel: "municipal", tipo: "atribuicao",
    pergunta: "Quem sanciona ou veta um projeto de lei aprovado pela Câmara Municipal?",
    alternativas: ["Prefeito", "Vereador", "Governador", "Secretário municipal"],
    explicacao: "Como nos outros níveis, o Legislativo aprova e o chefe do Executivo, aqui o Prefeito, sanciona ou veta.",
    fonte: "CF/88, arts. 29 e 66 (por simetria)",
  },
  {
    id: "q022", tema: "processo-legislativo", nivel: "municipal", tipo: "atribuicao",
    pergunta: "Quem vota e aprova a Lei Orgânica do município?",
    alternativas: ["Câmara Municipal", "Prefeito", "Assembleia Legislativa", "Tribunal de Contas"],
    explicacao: "A Lei Orgânica, a \"constituição\" do município, é votada em dois turnos pela Câmara Municipal e aprovada por 2/3 dos vereadores. O Prefeito não a sanciona.",
    fonte: "CF/88, art. 29, caput",
  },
  {
    id: "q023", tema: "controle", nivel: "municipal", tipo: "atribuicao",
    pergunta: "Quem julga as contas anuais do Prefeito?",
    alternativas: ["Câmara Municipal", "Tribunal de Contas", "Governador", "Juiz eleitoral"],
    explicacao: "O Tribunal de Contas emite apenas parecer prévio, que só deixa de prevalecer por voto de 2/3 dos vereadores. O julgamento é da Câmara Municipal.",
    fonte: "CF/88, art. 31, §§ 1º e 2º",
  },
  {
    id: "q024", tema: "habitacao", nivel: "municipal", tipo: "atribuicao",
    pergunta: "Quem aprova o plano diretor da cidade?",
    alternativas: ["Câmara Municipal", "Prefeito", "Governador", "Assembleia Legislativa"],
    explicacao: "O plano diretor é aprovado pela Câmara Municipal e é obrigatório para cidades com mais de 20 mil habitantes. É o instrumento básico da política de desenvolvimento urbano.",
    fonte: "CF/88, art. 182, § 1º",
  },
  {
    id: "q025", tema: "orcamento", nivel: "municipal", tipo: "atribuicao",
    pergunta: "Quem aprova a lei que cria ou altera o IPTU?",
    alternativas: ["Câmara Municipal", "Prefeito (por decreto)", "Governador", "Congresso Nacional"],
    explicacao: "Tributo só pode ser criado ou aumentado por lei. O IPTU é imposto municipal, então a lei é aprovada pela Câmara Municipal e sancionada pelo Prefeito.",
    fonte: "CF/88, arts. 150, I, e 156, I",
  },
  {
    id: "q026", tema: "cargos", nivel: "municipal", tipo: "atribuicao",
    pergunta: "Quem fixa o subsídio dos vereadores para a legislatura seguinte?",
    alternativas: ["Câmara Municipal", "Prefeito", "Tribunal de Contas", "Assembleia Legislativa"],
    explicacao: "O subsídio dos vereadores é fixado pela própria Câmara Municipal, em cada legislatura para a seguinte, respeitados os limites constitucionais.",
    fonte: "CF/88, art. 29, VI",
  },
  {
    id: "q027", tema: "executivo", nivel: "municipal", tipo: "atribuicao",
    pergunta: "Quem nomeia os secretários municipais?",
    alternativas: ["Prefeito", "Câmara Municipal", "Governador", "Vereador mais votado"],
    explicacao: "Os secretários são auxiliares de confiança do chefe do Executivo e são nomeados e exonerados livremente pelo Prefeito, conforme a Lei Orgânica de cada município.",
    fonte: "Lei Orgânica municipal; CF/88, art. 84, I (por simetria)",
  },
  {
    id: "q028", tema: "competencias", nivel: "municipal", tipo: "atribuicao",
    pergunta: "Quem legisla sobre assuntos de interesse local, como o horário de funcionamento do comércio?",
    alternativas: ["Câmara Municipal", "Assembleia Legislativa", "Congresso Nacional", "Prefeito (por decreto)"],
    explicacao: "O município legisla sobre assuntos de interesse local, e o STF fixou que o horário de funcionamento de estabelecimentos comerciais é um deles. A lei é da Câmara Municipal.",
    fonte: "CF/88, art. 30, I; Súmula Vinculante 38 do STF",
  },

  // ---------- Casos reais ----------
  {
    id: "r001", tema: "saude", nivel: "estadual", tipo: "real", data_referencia: "2026-07-06",
    pergunta: "Em São Paulo, bares e restaurantes não podem mais oferecer molhos em bisnagas coletivas (os condimentos devem ser servidos em embalagens individuais). Quem editou essa regra?",
    alternativas: [
      "Nenhum cargo eletivo: foi uma portaria de um órgão técnico (CVS)",
      "Governador do estado",
      "Assembleia Legislativa",
      "Prefeito da capital",
    ],
    explicacao: "A regra é a Portaria CVS nº 3, publicada no Diário Oficial do Estado em 6/7/2026 pelo Centro de Vigilância Sanitária, órgão técnico ligado à Secretaria de Estado da Saúde, com prazo de 90 dias e vigor a partir de 4/10/2026. Não foi lei votada por deputados nem decreto do Governador: muita regra do dia a dia vem de órgãos técnicos, e não de cargos eletivos.",
    fonte: "Itatiaia (reportagem sobre a Portaria CVS nº 3/2026)",
    url: "https://www.itatiaia.com.br/brasil/sudeste/sp/bisnagas-com-molhos-serao-proibidas-em-estabelecimentos-de-sao-paulo/",
  },
  {
    id: "r002", tema: "habitacao", nivel: "municipal", tipo: "real", data_referencia: "2026-04-23",
    pergunta: "Em abril de 2026, quem sancionou a lei que criou a Política Municipal de Habitação de Interesse Social de Vitória da Conquista (BA)?",
    alternativas: ["Prefeito", "Governador da Bahia", "Presidente da República", "Câmara Municipal"],
    explicacao: "A prefeita Sheila Lemos sancionou a Lei nº 2.098/2026 em 23/4/2026, que também cria o Fundo Municipal de Habitação de Interesse Social. A Câmara aprova o projeto antes, mas a sanção é ato do chefe do Executivo.",
    fonte: "Prefeitura de Vitória da Conquista",
    url: "https://www.pmvc.ba.gov.br/prefeitura-sanciona-lei-que-cria-politica-municipal-de-habitacao-de-interesse-social-e-cria-fundo-para-ampliar-acesso-a-moradia/",
  },
  {
    id: "r003", tema: "orcamento", nivel: "federal", tipo: "real", data_referencia: "2026-01-14",
    pergunta: "Em janeiro de 2026, quem sancionou, com vetos a cerca de R$ 400 milhões em emendas parlamentares, a Lei Orçamentária Anual de 2026 (Lei 15.346/2026)?",
    alternativas: ["Presidente da República", "Presidente do Congresso Nacional", "Ministro do Planejamento", "Presidente do STF"],
    explicacao: "O Presidente Lula sancionou a LOA 2026 em 14/1/2026 e vetou dois dispositivos. O Congresso aprovou o texto em dezembro de 2025; a sanção e o veto são do Presidente.",
    fonte: "Agência Câmara de Notícias",
    url: "https://www.camara.leg.br/noticias/1238564-orcamento-2026-e-sancionado-com-veto-a-r-400-milhoes-em-emendas/",
  },
  {
    id: "r004", tema: "orcamento", nivel: "federal", tipo: "real", data_referencia: "2026-01-14",
    pergunta: "Os vetos do Presidente à Lei Orçamentária de 2026 ainda precisam ser analisados. Quem decide se eles são mantidos ou derrubados?",
    alternativas: ["Congresso Nacional", "Presidente da República", "Supremo Tribunal Federal", "Tribunal de Contas da União"],
    explicacao: "Vetos são apreciados pelo Congresso Nacional em sessão conjunta de deputados e senadores, e para derrubá-los é preciso maioria absoluta nas duas casas.",
    fonte: "Agência Câmara de Notícias; CF/88, art. 66, § 4º",
    url: "https://www.camara.leg.br/noticias/1238564-orcamento-2026-e-sancionado-com-veto-a-r-400-milhoes-em-emendas/",
  },
  {
    id: "r005", tema: "processo-legislativo", nivel: "federal", tipo: "real", data_referencia: "2026-02-25",
    pergunta: "Em fevereiro de 2026, quem sancionou a Lei 15.352, que alterou a LGPD e criou a Agência Nacional de Proteção de Dados?",
    alternativas: ["Presidente da República", "Presidente da Câmara dos Deputados", "Ministro da Justiça", "Presidente do Senado"],
    explicacao: "A lei foi sancionada pelo Presidente da República e publicada no Diário Oficial da União em 25/2/2026.",
    fonte: "Planalto (notícia sobre a sanção da lei)",
    url: "https://www.gov.br/planalto/pt-br/acompanhe-o-planalto/noticias/2026/02/presidente-lula-sanciona-lei-que-cria-a-agencia-nacional-de-protecao-de-dados",
    revisar: true,
  },
];
