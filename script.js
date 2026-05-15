const perguntas = [
  {
    id: 1,
    pergunta: "Qual o nome da famosa festa de tradição alemã em Brusque?",
    opcoes: ["Fenarreco", "Festa dos animais", "Carnaval"],
    respostaCorreta: 0,
    dica: "É uma festa que tem nome de um patinho!",
  },
  {
    id: 2,
    pergunta: "Qual o mascote da Fenarreco?",
    opcoes: ["Leão", "Marreco", "Dinossauro"],
    respostaCorreta: 1,
    dica: "Ele adora nadar na lagoa e faz 'quack'.",
  },
  {
    id: 3,
    pergunta: "Na Fenarreco, as pessoas usam o que?",
    opcoes: ["Traje típico", "Pijamas"],
    respostaCorreta: 0,
    dica: "São roupas tradicionais muito bonitas da Alemanha.",
  },
  {
    id: 4,
    pergunta: "Que tipo de música toca na Fenarreco?",
    opcoes: ["Música alemã animada", "Música de ninar", "Sertanejo"],
    respostaCorreta: 0,
    dica: "É uma música que dá muita vontade de dançar junto!",
  },
  {
    id: 5,
    pergunta: "O que o time da cidade, Brusque Futebol Clube joga?",
    opcoes: ["Basquete", "Futebol", "Vôlei"],
    respostaCorreta: 1,
    dica: "Usa-se os pés para chutar a bola para o gol.",
  },
  {
    id: 6,
    pergunta: "De onde eram as pessoas que vieram de longe para morar em Brusque?",
    opcoes: ["Lua", "Pólo norte", "Alemanha"],
    respostaCorreta: 2,
    dica: "Fica lá na Europa, bem longe daqui!",
  },
  {
    id: 7,
    pergunta: "Como essas pessoas chegaram em Brusque?",
    opcoes: ["Foguete", "Disco Voador", "Barco"],
    respostaCorreta: 2,
    dica: "Eles atravessaram o mar navegando.",
  },
  {
    id: 8,
    pergunta: "Brusque tem muitas fábricas de que?",
    opcoes: ["Roupas", "Brinquedos gigantes"],
    respostaCorreta: 0,
    dica: "Coisas que usamos para nos vestir todos os dias.",
  },
  {
    id: 9,
    pergunta: "O que tem em Brusque?",
    opcoes: ["Rios", "Vulcões"],
    respostaCorreta: 0,
    dica: "Tem muita água corrente passando pelo meio da cidade.",
  },
  {
    id: 10,
    pergunta: "Como as pessoas se divertem nas festas?",
    opcoes: ["Juntas", "Sozinhas"],
    respostaCorreta: 0,
    dica: "É muito mais legal brincar com os amigos!",
  },
  {
    id: 11,
    pergunta: "Brusque fica no…",
    opcoes: ["Mar", "Brasil", "Espaço"],
    respostaCorreta: 1,
    dica: "É o nosso país, que tem a bandeira verde e amarela.",
  },
  {
    id: 12,
    pergunta: "As roupas usadas na Fenarreco são…",
    opcoes: ["Coloridas", "Todas cinzas"],
    respostaCorreta: 0,
    dica: "Têm muitas cores, como o arco-íris!",
  },
  {
    id: 13,
    pergunta: "O que a Fenarreco é?",
    opcoes: ["Uma escola", "Uma floresta", "Uma festa"],
    respostaCorreta: 2,
    dica: "Um lugar com muita música, comida e diversão.",
  },
  {
    id: 14,
    pergunta: "O que as pessoas mais fazem nas festas?",
    opcoes: ["Dançar", "Ficar paradas"],
    respostaCorreta: 0,
    dica: "Mexer o corpo no ritmo da música.",
  },
  {
    id: 15,
    pergunta: "As pessoas que vieram de longe para Brusque trouxeram…",
    opcoes: ["Nada", "Tradições"],
    respostaCorreta: 1,
    dica: "Trouxeram seus costumes, comidas e danças.",
  },
];

const state = {
  jogador: { nome: "", escola: "", idade: "" },
  indiceAtual: 0,
  pontos: 0,
  acertouIds: new Set(),
};

const dom = {
  views: {
    welcome: document.getElementById("view-welcome"),
    quiz: document.getElementById("view-quiz"),
    final: document.getElementById("view-final"),
  },
  welcomeForm: document.getElementById("welcomeForm"),
  inputNome: document.getElementById("inputNome"),
  inputEscola: document.getElementById("inputEscola"),
  inputIdade: document.getElementById("inputIdade"),
  btnComecar: document.getElementById("btnComecar"),

  hudJogador: document.getElementById("hudJogador"),
  hudPontos: document.getElementById("hudPontos"),
  hudProgresso: document.getElementById("hudProgresso"),

  quizPergunta: document.getElementById("quizPergunta"),
  quizOpcoes: document.getElementById("quizOpcoes"),

  overlayAcerto: document.getElementById("overlayAcerto"),
  btnAcertoContinuar: document.getElementById("btnAcertoContinuar"),

  overlayErro: document.getElementById("overlayErro"),
  erroDica: document.getElementById("erroDica"),
  btnErroTentar: document.getElementById("btnErroTentar"),
  btnErroContinuar: document.getElementById("btnErroContinuar"),

  finalMensagem: document.getElementById("finalMensagem"),
  finalPontos: document.getElementById("finalPontos"),
  finalTotal: document.getElementById("finalTotal"),
  btnReiniciar: document.getElementById("btnReiniciar"),
};

function limparTexto(texto) {
  return String(texto ?? "").trim();
}

function mostrarView(nome) {
  Object.values(dom.views).forEach((el) => el.classList.remove("is-active"));
  dom.views[nome].classList.add("is-active");
}

function mostrarOverlay(elOverlay) {
  elOverlay.hidden = false;
  elOverlay.setAttribute("aria-hidden", "false");
}

function esconderOverlay(elOverlay) {
  elOverlay.hidden = true;
  elOverlay.setAttribute("aria-hidden", "true");
}

function validarComecar() {
  const nome = limparTexto(dom.inputNome.value);
  const escola = limparTexto(dom.inputEscola.value);
  const idade = limparTexto(dom.inputIdade.value);
  const idadeNum = Number(idade);
  const okIdade = Number.isFinite(idadeNum) && idadeNum >= 1 && idadeNum <= 99;
  dom.btnComecar.disabled = !(nome && escola && okIdade);
}

function iniciarJogo() {
  state.jogador.nome = limparTexto(dom.inputNome.value);
  state.jogador.escola = limparTexto(dom.inputEscola.value);
  state.jogador.idade = limparTexto(dom.inputIdade.value);
  state.indiceAtual = 0;
  state.pontos = 0;
  state.acertouIds = new Set();

  dom.hudJogador.textContent = state.jogador.nome || "—";
  dom.hudPontos.textContent = String(state.pontos);
  dom.hudProgresso.textContent = `1/${perguntas.length}`;

  esconderOverlay(dom.overlayAcerto);
  esconderOverlay(dom.overlayErro);
  mostrarView("quiz");
  renderizarPergunta();
}

function renderizarPergunta() {
  const atual = perguntas[state.indiceAtual];
  if (!atual) {
    finalizarJogo();
    return;
  }

  dom.hudPontos.textContent = String(state.pontos);
  dom.hudProgresso.textContent = `${state.indiceAtual + 1}/${perguntas.length}`;
  dom.quizPergunta.textContent = atual.pergunta;

  while (dom.quizOpcoes.firstChild) dom.quizOpcoes.removeChild(dom.quizOpcoes.firstChild);

  atual.opcoes.forEach((textoOpcao, indice) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "card";
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", `Opção: ${textoOpcao}`);
    btn.addEventListener("click", () => escolherOpcao(indice));

    const box = document.createElement("div");
    box.className = "card__image";
    box.textContent = textoOpcao;
    btn.appendChild(box);

    dom.quizOpcoes.appendChild(btn);
  });
}

function escolherOpcao(indiceEscolhido) {
  const atual = perguntas[state.indiceAtual];
  if (!atual) return;
  if (!dom.overlayAcerto.hidden || !dom.overlayErro.hidden) return;

  const acertou = indiceEscolhido === atual.respostaCorreta;
  if (acertou) {
    if (!state.acertouIds.has(atual.id)) {
      state.pontos += 1;
      state.acertouIds.add(atual.id);
    }
    dom.hudPontos.textContent = String(state.pontos);
    mostrarOverlay(dom.overlayAcerto);
  } else {
    dom.erroDica.textContent = atual.dica || "Pense com calma e tente novamente!";
    mostrarOverlay(dom.overlayErro);
  }
}

function proximaPergunta() {
  state.indiceAtual += 1;
  esconderOverlay(dom.overlayAcerto);
  esconderOverlay(dom.overlayErro);
  if (state.indiceAtual >= perguntas.length) {
    finalizarJogo();
  } else {
    renderizarPergunta();
  }
}

function finalizarJogo() {
  esconderOverlay(dom.overlayAcerto);
  esconderOverlay(dom.overlayErro);

  dom.finalPontos.textContent = String(state.pontos);
  dom.finalTotal.textContent = String(perguntas.length);
  dom.finalMensagem.textContent = `${state.jogador.nome || "Você"} fez ${state.pontos} ponto(s)!`;
  mostrarView("final");
}

function reiniciar() {
  state.jogador = { nome: "", escola: "", idade: "" };
  state.indiceAtual = 0;
  state.pontos = 0;
  state.acertouIds = new Set();

  dom.welcomeForm.reset();
  validarComecar();
  esconderOverlay(dom.overlayAcerto);
  esconderOverlay(dom.overlayErro);
  mostrarView("welcome");
  dom.inputNome.focus();
}

dom.inputNome.addEventListener("input", validarComecar);
dom.inputEscola.addEventListener("input", validarComecar);
dom.inputIdade.addEventListener("input", validarComecar);

dom.welcomeForm.addEventListener("submit", (e) => {
  e.preventDefault();
  validarComecar();
  if (!dom.btnComecar.disabled) iniciarJogo();
});

dom.btnAcertoContinuar.addEventListener("click", () => proximaPergunta());

dom.btnErroTentar.addEventListener("click", () => {
  esconderOverlay(dom.overlayErro);
});

dom.btnErroContinuar.addEventListener("click", () => proximaPergunta());

dom.btnReiniciar.addEventListener("click", reiniciar);

validarComecar();



////

// NOME
let nomeJogador =
    localStorage.getItem("nomeJogador") || "JOGADOR";

// PONTOS
let pontos =
    Number(localStorage.getItem("pontos")) || 0;

// PERGUNTA
let perguntaAtual =
    Number(localStorage.getItem("perguntaAtual")) || 1;


// MOSTRA NA TELA
document.querySelector(".info-jogador").innerHTML =
    "👤 " + nomeJogador;

document.querySelector(".info-pontos").innerHTML =
    "⭐ PONTOS: " + pontos;

document.querySelector(".info-pergunta").innerHTML =
    "❓ " + perguntaAtual + "/15";


// ACERTO
function respostaCerta(proximaPagina) {

    pontos++;

    localStorage.setItem("pontos", pontos);

    perguntaAtual++;

    localStorage.setItem("perguntaAtual", perguntaAtual);

    window.location.href = proximaPagina;
}


// ERRO
function respostaErrada(proximaPagina) {

    perguntaAtual++;

    localStorage.setItem("perguntaAtual", perguntaAtual);

    window.location.href = proximaPagina;
}