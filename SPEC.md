# Quiz: quem é o responsável? (cargos políticos do Brasil)

Site de perguntas de múltipla escolha que testa se o usuário sabe quais cargos
eletivos (e casas legislativas) são responsáveis por determinados atos e atribuições.

## Pergunta

- Uma única etapa: o usuário escolhe um cargo ou casa entre 4 alternativas.
- Uma única resposta correta.
- A pergunta sempre diz o **ato** em jogo ("quem sanciona", "quem propõe", "quem
  aprova", "quem edita", "quem julga"), porque uma norma tem vários responsáveis.
- O nível de governo (federal, estadual, municipal) não é uma etapa. Fica como
  metadado da pergunta e vale como filtro.
- Depois de responder: certo/errado + explicação com base legal
  (ex.: "CF/88, art. 66") e, nos casos reais, fonte e data.

### Alternativas

- **Resposta correta:** em cerca de 80% das perguntas é cargo eletivo ou casa legislativa; em cerca de 15–20% é cargo ou órgão não eletivo (ex.: STF, TCU, Ministério Público, PGR, AGU, Copom, TSE).
  - Cargos eletivos: Presidente, Governador, Prefeito, Senador, Deputado Federal,
    Deputado Estadual/Distrital, Vereador.
  - Casas: Câmara dos Deputados, Senado Federal, Congresso Nacional,
    Assembleia Legislativa, Câmara Municipal.
- **Distratores:** podem incluir cargos não eletivos (Ministro, Secretário,
  Ministro do STF, Juiz, Promotor etc.) para testar confusões comuns.
- Vices ficam de fora por enquanto.
- Ordem das alternativas embaralhada a cada exibição.

### Tipos de conteúdo

1. **Atribuições gerais:** conceituais e duradouras
   (ex.: "Quem pode vetar um projeto de lei municipal aprovado pela Câmara?").
2. **Casos reais atuais:** leis, decretos e medidas recentes.
   Cada um precisa de fonte verificada e data; só entra no banco o que for confirmado.
   Campo de revisão para sinalizar o que pode ter ficado desatualizado.

## Modos de jogo

- **Infinito (principal):** sem pontuação, só perguntas em sequência.
  Não repete pergunta vista até esgotar o banco.
- **Pontuado:** N perguntas sorteadas (padrão 10, ajustável de 5 a 30, limitado
  ao tamanho do banco). 1 ponto por acerto. Resultado final: pontos e percentual.

## Filtros

- Só por tema (cada pergunta tem 1 tema).

## Histórico (no navegador, sem login)

- Recorde e melhores pontuações do modo pontuado.
- Estatísticas de acerto por nível de governo (padrão) e por tema, em uma caixa com duas abas.
- A mesma caixa aparece ao fim de cada partida (pontuado completo, saída manual ou fim do modo infinito).

## Conteúdo

- Brasil, em português.
- Banco gerado por Claude com pesquisa e fontes; o dono do projeto revisa e aprova.
- Banco atual: 108 perguntas (lote 1: 33; lote 2: 60, com 11 de resposta não eletiva; lote 3: 15 perguntas sobre aprovações e autorizações prévias).

## Técnica (proposta)

- Site estático: HTML, CSS e JavaScript puros, sem framework e sem servidor.
- Perguntas em arquivo JSON; histórico em `localStorage`.
- Visual limpo, responsivo, pensado primeiro para celular, com tema claro/escuro.
- Publicação em GitHub Pages (gratuito).

## Regras de redação das perguntas

- O enunciado **não pode entregar a resposta**: nada de citar a etapa do processo que
  elimina ou aponta alternativas (ex.: "depois de autorizado pelo Congresso",
  "com parecer prévio do TCU", "aprovado pelo Senado"). Use "depois das devidas
  autorizações" e explique o fluxo completo na `explicacao`.
- Em fluxos com aprovação ou autorização prévia (ex.: Senado aprova, Presidente nomeia), a explicação deve dizer quem faz cada etapa, e deve existir uma pergunta para cada etapa (a "direta" e a "inversa").
- Não repetir no enunciado o nome de um cargo/órgão que seja alternativa.
- Rode `python tools/checar_perguntas.py` depois de adicionar perguntas: ele lista
  enunciados que citam alternativas ou termos de fluxo para revisão humana.

## Formato de uma pergunta (rascunho)

```json
{
  "id": "q001",
  "tema": "processo-legislativo",
  "nivel": "municipal",
  "tipo": "atribuicao",
  "pergunta": "Quem sanciona ou veta um projeto de lei aprovado pela Câmara Municipal?",
  "alternativas": ["Prefeito", "Vereador", "Governador", "Secretário municipal"],
  "correta": "Prefeito",
  "explicacao": "O chefe do Executivo municipal sanciona ou veta ...",
  "fonte": "CF/88, art. 66, aplicado aos municípios por simetria",
  "data_referencia": null,
  "revisar": false
}
```

## Decisões fechadas

- Hospedagem: GitHub Pages.
- Banco inicial: cerca de 30 perguntas (hoje 33).
- Visual: simples, a critério do desenvolvimento.
- Perguntas ficam em `questions.js` (e não JSON) para o site abrir até com duplo clique.
  A primeira alternativa de cada pergunta é a correta; o site embaralha.
- Um caso real pode ter como resposta "nenhum cargo eletivo" quando a regra veio de
  órgão técnico (ex.: portaria da Vigilância Sanitária).
- Casos reais com `revisar: true` precisam de conferência humana.
