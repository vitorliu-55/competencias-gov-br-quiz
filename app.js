"use strict";

const NIVEIS = { federal: "Federal", estadual: "Estadual", municipal: "Municipal" };
const N_MIN = 5, N_MAX = 30, N_DEFAULT = 10;
const STORAGE_KEY = "quiz-cargos-v1";

const app = document.getElementById("app");

// ---------- utilidades ----------
function el(tag, props, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (k === "class") node.className = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else if (v !== false && v != null) node.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(c));
  }
  return node;
}

function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function render(...nodes) {
  app.replaceChildren(...nodes.filter(Boolean));
  window.scrollTo(0, 0);
}

// ---------- histórico (localStorage, tolerante a falhas) ----------
function loadHistory() {
  try {
    const h = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (h && typeof h === "object") return { temas: h.temas || {}, niveis: h.niveis || {}, recordes: h.recordes || [] };
  } catch (e) { /* sem acesso ao storage: segue sem histórico */ }
  return { temas: {}, niveis: {}, recordes: [] };
}
function saveHistory(h) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(h)); } catch (e) { /* ignora */ }
}
function tally(map, key, acertou) {
  const t = map[key] || { ok: 0, total: 0 };
  t.total += 1;
  if (acertou) t.ok += 1;
  map[key] = t;
}
function recordAnswer(q, acertou) {
  const h = loadHistory();
  tally(h.temas, q.tema, acertou);
  tally(h.niveis, q.nivel, acertou);
  saveHistory(h);
}
// devolve true se for o novo melhor percentual
function recordScore(pontos, total) {
  const h = loadHistory();
  const pct = Math.round((pontos / total) * 100);
  const best = h.recordes.reduce((m, r) => Math.max(m, r.pct), -1);
  h.recordes.push({ data: new Date().toISOString().slice(0, 10), pontos, total, pct });
  h.recordes.sort((a, b) => b.pct - a.pct || b.total - a.total);
  h.recordes = h.recordes.slice(0, 5);
  saveHistory(h);
  return pct > best;
}

// ---------- configuração da rodada ----------
const config = {
  mode: "infinito",
  temas: new Set(Object.keys(TEMAS)),
  n: N_DEFAULT,
};

function filteredPool() {
  return QUESTIONS.filter(q => config.temas.has(q.tema));
}

// ---------- tela inicial ----------
function showHome() {
  const countEl = el("p", { class: "muted" });
  const btnStart = el("button", { class: "primary", onclick: () => startGame(config.mode) }, "Começar");
  const nRow = el("div", { class: "row" });
  const nInput = el("input", {
    type: "number", id: "n", min: N_MIN, max: N_MAX, value: config.n,
    onchange: () => { config.n = clampN(nInput.value); nInput.value = config.n; },
  });
  nRow.append(
    el("label", { for: "n" }, "Número de perguntas:"), nInput,
    el("span", { class: "muted" }, `(${N_MIN} a ${N_MAX})`));

  const modeButtons = {};
  const modes = [
    ["infinito", "Modo infinito", "Sem pontos. Perguntas em sequência até você sair."],
    ["pontuado", "Modo pontuado", "Número fixo de perguntas e nota no final."],
  ];
  for (const [key, title, desc] of modes) {
    modeButtons[key] = el("button", {
      class: "mode", role: "radio",
      onclick: () => { config.mode = key; refresh(); },
    }, el("strong", null, title), el("span", null, desc));
  }

  function refresh() {
    const total = filteredPool().length;
    countEl.textContent = total === 0
      ? "Nenhuma pergunta com esses filtros."
      : `${total} pergunta${total === 1 ? "" : "s"} disponível${total === 1 ? "" : "is"}.`;
    btnStart.disabled = total === 0;
    for (const [key, b] of Object.entries(modeButtons)) {
      const on = key === config.mode;
      b.classList.toggle("selected", on);
      b.setAttribute("aria-checked", on);
    }
    nRow.hidden = config.mode !== "pontuado";
  }

  function group(title, map, set) {
    const boxes = Object.entries(map).map(([key, label]) =>
      el("label", null,
        el("input", {
          type: "checkbox", checked: set.has(key),
          onchange: (e) => { e.target.checked ? set.add(key) : set.delete(key); refresh(); },
        }), label));
    return el("details", null, el("summary", null, title), el("div", { class: "checks" }, boxes));
  }

  render(
    el("h1", null, "Quem decide?"),
    el("p", { class: "muted" },
      "Você sabe qual cargo ou casa legislativa é responsável por cada ato? Escolha como jogar."),
    el("div", { class: "card stack" },
      el("div", { class: "stack", role: "radiogroup", "aria-label": "Modo de jogo" },
        modeButtons.infinito, modeButtons.pontuado),
      nRow),
    el("div", { class: "card" },
      el("h2", null, "Filtros"),
      group("Tema", TEMAS, config.temas),
      countEl),
    btnStart,
    el("button", { class: "link", onclick: showStats }, "Ver meu histórico"),
  );
  refresh();
}

function clampN(v) {
  const n = Math.round(Number(v));
  return Number.isFinite(n) ? Math.min(N_MAX, Math.max(N_MIN, n)) : N_DEFAULT;
}

// ---------- jogo ----------
let game = null;

function startGame(mode) {
  const pool = filteredPool();
  if (!pool.length) return;
  game = { mode, queue: [], answered: 0, correct: 0, total: 0, niveis: {}, temas: {} };
  if (mode === "pontuado") {
    game.queue = shuffle(pool).slice(0, Math.min(config.n, pool.length));
    game.total = game.queue.length;
  } else {
    game.queue = shuffle(pool);
  }
  nextQuestion();
}

function nextQuestion() {
  if (game.mode === "pontuado" && game.answered >= game.total) return showResult();
  if (!game.queue.length) return showAllSeen();   // infinito: banco esgotado
  showQuestion(game.queue.shift());
}

function showAllSeen() {
  const total = filteredPool().length;
  render(
    el("h1", null, "Você viu todas as perguntas"),
    el("div", { class: "card" },
      el("p", null, `As ${total} pergunta${total === 1 ? "" : "s"} disponíve${total === 1 ? "l" : "is"} com os filtros atuais já foram feitas.`),
      el("p", { class: "muted" }, "Se continuar, as perguntas vão se repetir em outra ordem.")),
    el("div", { class: "stack" },
      el("button", { class: "primary", onclick: () => {
        game.queue = shuffle(filteredPool());
        nextQuestion();
      } }, "Continuar (repetir perguntas)"),
      el("button", { onclick: () => showSummary(false) }, "Encerrar e ver estatísticas")),
  );
}

function exitGame() {
  if (game.answered === 0) return showHome();
  if (game.mode === "pontuado" && !confirm("Sair da rodada? Ela não entrará nos recordes.")) return;
  showSummary(false);
}

function optionLabel(text) {
  const comp = ORGAOS[text];
  return comp ? [text, " ", el("span", { class: "comp" }, `(${comp})`)] : text;
}

function showQuestion(q) {
  const correta = q.alternativas[0];
  const feedbackBox = el("div");
  let answered = false;
  const buttons = shuffle(q.alternativas).map(text => {
    const b = el("button", { class: "opt", onclick: () => choose(text, b) }, optionLabel(text));
    b.dataset.value = text;
    return b;
  });

  function choose(text, btn) {
    if (answered) return;
    answered = true;
    const acertou = text === correta;
    game.answered += 1;
    if (acertou) game.correct += 1;
    recordAnswer(q, acertou);
    tally(game.niveis, q.nivel, acertou);
    tally(game.temas, q.tema, acertou);
    buttons.forEach(b => {
      b.disabled = true;
      if (b.dataset.value === correta) b.classList.add("correct");
    });
    if (!acertou) btn.classList.add("wrong");
    const last = game.mode === "pontuado" && game.answered >= game.total;
    feedbackBox.replaceChildren(
      el("div", { class: "feedback " + (acertou ? "ok" : "bad") },
        el("div", { class: "verdict" }, acertou ? "Correto!" : "Não foi dessa vez."),
        el("div", null, q.explicacao),
        el("div", { class: "src" },
          "Fonte: ", q.url ? el("a", { href: q.url, target: "_blank", rel: "noopener" }, q.fonte) : q.fonte,
          q.data_referencia ? ` (${formatDate(q.data_referencia)})` : "")),
      el("button", { class: "primary", onclick: nextQuestion }, last ? "Ver resultado" : "Próxima"));
    feedbackBox.querySelector(".primary").focus();
  }

  const progresso = game.mode === "pontuado"
    ? `Pergunta ${game.answered + 1} de ${game.total}`
    : `Pergunta ${game.answered + 1}`;

  render(
    el("div", { class: "topbar" },
      el("span", { class: "muted" }, progresso),
      el("button", { class: "exit", onclick: exitGame }, "Sair")),
    game.mode === "pontuado" &&
      el("div", { class: "progress" }, el("div", { style: `width:${(game.answered / game.total) * 100}%` })),
    el("div", { class: "card" },
      el("div", { class: "chips" }, el("span", { class: "chip" }, TEMAS[q.tema])),
      el("div", { class: "question" }, q.pergunta),
      el("div", { class: "stack" }, buttons),
      feedbackBox),
  );
}

function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

// ---------- estatísticas (caixa com abas) ----------
function statsTable(labels, data) {
  const rows = Object.entries(labels).filter(([key]) => data[key]).map(([key, nome]) => {
    const t = data[key];
    const pct = Math.round((t.ok / t.total) * 100);
    return el("tr", null,
      el("td", null, nome),
      el("td", null, el("div", { class: "bar" }, el("div", { style: `width:${pct}%` }))),
      el("td", { class: "num" }, `${pct}% (${t.ok}/${t.total})`));
  });
  return rows.length ? el("table", null, rows) : el("p", { class: "muted" }, "Ainda sem respostas.");
}

function statsBox(title, byNivel, byTema) {
  const panels = {
    nivel: statsTable(NIVEIS, byNivel),
    tema: statsTable(TEMAS, byTema),
  };
  const tabs = {};
  function select(key) {
    for (const k of Object.keys(panels)) {
      tabs[k].setAttribute("aria-selected", k === key);
      tabs[k].classList.toggle("selected", k === key);
      panels[k].hidden = k !== key;
    }
  }
  const names = { nivel: "Nível de governo", tema: "Tema" };
  for (const k of Object.keys(panels)) {
    tabs[k] = el("button", { class: "tab", role: "tab", onclick: () => select(k) }, names[k]);
  }
  const box = el("div", { class: "card" },
    el("h2", null, title),
    el("div", { class: "tabs", role: "tablist" }, tabs.nivel, tabs.tema),
    panels.nivel, panels.tema);
  select("nivel");
  return box;
}

// ---------- resultado ----------
// completo = true: rodada pontuada terminada. false: saída manual ou fim do modo infinito.
function showSummary(completo) {
  const blocos = [];
  if (game.mode === "pontuado") {
    const pct = Math.round((game.correct / game.answered) * 100);
    let extra = null;
    if (completo) {
      extra = recordScore(game.correct, game.total) ? "Novo recorde!" : null;
    }
    const msg = pct === 100 ? "Perfeito!" : pct >= 70 ? "Muito bem!" : pct >= 40 ? "Bom começo. Dá para melhorar." : "Vale revisar as atribuições.";
    blocos.push(el("div", { class: "card" },
      el("div", { class: "score" }, `${game.correct}/${completo ? game.total : game.answered}`),
      el("p", { class: "muted", style: "text-align:center" },
        `${pct}% de acertos. ${msg}` + (completo ? "" : " (rodada interrompida)")),
      extra && el("p", { style: "text-align:center;font-weight:600" }, extra)));
  } else {
    blocos.push(el("p", { class: "muted" },
      `Você respondeu ${game.answered} pergunta${game.answered === 1 ? "" : "s"}.`));
  }
  render(
    el("h1", null, game.mode === "pontuado" ? "Resultado" : "Resumo da partida"),
    ...blocos,
    statsBox("Acertos nesta partida", game.niveis, game.temas),
    el("div", { class: "stack" },
      el("button", { class: "primary", onclick: () => startGame(game.mode) }, "Jogar de novo"),
      el("button", { onclick: showHome }, "Início")),
  );
}
function showResult() { showSummary(true); }

// ---------- histórico ----------
function showStats() {
  const h = loadHistory();
  const recordes = h.recordes.map(r =>
    el("tr", null,
      el("td", null, formatDate(r.data)),
      el("td", { class: "num" }, `${r.pontos}/${r.total}`),
      el("td", { class: "num" }, `${r.pct}%`)));

  render(
    el("h1", null, "Meu histórico"),
    el("p", { class: "muted" }, "Salvo apenas neste navegador."),
    statsBox("Acertos (todas as partidas)", h.niveis, h.temas),
    el("div", { class: "card" },
      el("h2", null, "Melhores rodadas pontuadas"),
      recordes.length
        ? el("table", null, el("tr", null, el("th", null, "Data"), el("th", { class: "num" }, "Pontos"), el("th", { class: "num" }, "%")), recordes)
        : el("p", { class: "muted" }, "Ainda sem rodadas pontuadas.")),
    el("div", { class: "row" },
      el("button", { class: "primary grow", onclick: showHome }, "Voltar"),
      el("button", { onclick: () => {
        if (confirm("Apagar todo o histórico deste navegador?")) { saveHistory({ temas: {}, niveis: {}, recordes: [] }); showStats(); }
      } }, "Apagar histórico")),
  );
}

showHome();
