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

1. **Cenários** (	ipo: "cenario"): situações hipotéticas do dia a dia (ex.: falta de energia após tempestade, reajuste de passagem). Preferir respostas em cargos eletivos (ao menos 2/3 dos cenários; hoje 20 de 30 são cargos individuais, 7 são casas legislativas e 3 são órgãos técnicos). O enunciado precisa de um verbo exato ("quem fiscaliza e pode multar", "quem autoriza o reajuste", "quem aprova a lei") para a resposta ser única, porque um mesmo cenário costuma envolver vários responsáveis.
2. **Atribuições gerais:** conceituais e duradouras
   (ex.: "Quem pode vetar um projeto de lei municipal aprovado pela Câmara?").
3. **Casos reais atuais:** leis, decretos e medidas recentes.
   Cada um precisa de fonte verificada e data; só entra no banco o que for confirmado.
   Campo de revisão para sinalizar o que pode ter ficado desatualizado.

## Modos de jogo

- **Infinito (principal):** sem pontuação, só perguntas em sequência.
  Não repete pergunta vista até esgotar o banco.
- **Pontuado:** N perguntas sorteadas (padrão 10, ajustável de 5 a 30, limitado
  ao tamanho do banco). 1 ponto por acerto. Resultado final: pontos e percentual.

## Filtros

- Por tema (cada pergunta tem 1 tema) e por dificuldade (fácil, média ou difícil).
- Cada pergunta mostra, durante o jogo, a tag do tema e a de dificuldade.
- Critério de dificuldade: **fácil** = conhecimento comum de cidadão, com pouca confusão possível; **média** = exige distinguir nível, casa ou órgão, ou o fluxo básico; **difícil** = detalhes constitucionais, quóruns, aprovações prévias ou órgãos técnicos menos conhecidos. Hoje: 61 fáceis, 90 médias e 58 difíceis.

## Histórico (no navegador, sem login)

- Recorde e melhores pontuações do modo pontuado.
- Estatísticas de acerto por nível de governo (padrão) e por tema, em uma caixa com duas abas.
- A mesma caixa aparece ao fim de cada partida (pontuado completo, saída manual ou fim do modo infinito).

## Conteúdo

- Brasil, em português.
- Banco gerado por Claude com pesquisa e fontes; o dono do projeto revisa e aprova.
- Banco atual: 201 perguntas: 92 de atribuições gerais, 30 de cenários ("se acontecer X, quem é o responsável?") e 79 de casos reais (cerca de 39%). Por nível: 111 federais, 51 estaduais e 39 municipais. Casos reais com `revisar: true` foram conferidos apenas pelo resumo de busca, sem abrir a página da fonte.

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
- Em casos reais, citar o nome da cidade ou do município já entrega que a resposta é o Prefeito ou a Câmara. Evitar muitos casos assim: limitar a cerca de 4% do banco as perguntas reais com resposta Prefeito e preferir casos cuja resposta seja Câmara Municipal, Tribunal de Justiça ou outro órgão.
- Não repetir no enunciado o nome de um cargo/órgão que seja alternativa.
- Rode `python tools/checar_perguntas.py` depois de adicionar perguntas: ele lista
  enunciados que citam alternativas ou termos de fluxo para revisão humana.

## Formato de uma pergunta (rascunho)

```json
{
  "id": "q001",
  "tema": "processo-legislativo",
  "nivel": "municipal",
  "tipo": "atribuicao",`n  "dificuldade": "media",
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
