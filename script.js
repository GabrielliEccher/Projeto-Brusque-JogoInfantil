const perguntas = [
    {
        pergunta: "Qual o nome da famosa festa de tradição alemã em Brusque?",
        opcoes: ["A) Fenarreco", "B) Festa dos animais", "C) Carnaval"],
        correta: 0
    },
    {
        pergunta: "Qual o mascote da Fenarreco?",
        opcoes: ["A) Leão", "B) Marreco", "C) Dinossauro"],
        correta: 1
    },
    {
        pergunta: "Na Fenarreco, as pessoas usam o que?",
        opcoes: ["A) Traje típico", "B) Pijamas", "C) Armadura"],
        correta: 0
    },
    {
        pergunta: "Que tipo de música toca na Fenarreco?",
        opcoes: ["A) Música alemã animada", "B) Música de ninar", "C) Sertanejo"],
        correta: 0
    },
    {
        pergunta: "O que o Brusque Futebol Clube joga?",
        opcoes: ["A) Basquete", "B) Futebol", "C) Vôlei"],
        correta: 1
    },
    {
        pergunta: "De onde vieram as pessoas que vieram morar em Brusque?",
        opcoes: ["A) Lua", "B) Pólo Norte", "C) Alemanha"],
        correta: 2
    },
    {
        pergunta: "Como essas pessoas chegaram em Brusque?",
        opcoes: ["A) Foguete", "B) Disco voador", "C) Barco"],
        correta: 2
    },
    {
        pergunta: "Brusque tem muitas fábricas de que?",
        opcoes: ["A) Roupas", "B) Brinquedos gigantes", "C) Navios"],
        correta: 0
    },
    {
        pergunta: "O que tem em Brusque?",
        opcoes: ["A) Rios", "B) Vulcões", "C) Deserto"],
        correta: 0
    },
    {
        pergunta: "Como as pessoas se divertem nas festas?",
        opcoes: ["A) Juntas", "B) Sozinhas", "C) Dormindo"],
        correta: 0
    },
    {
        pergunta: "Brusque fica no…",
        opcoes: ["A) Mar", "B) Brasil", "C) Espaço"],
        correta: 1
    },
    {
        pergunta: "As roupas usadas na Fenarreco são…",
        opcoes: ["A) Coloridas", "B) Todas cinzas", "C) Invisíveis"],
        correta: 0
    },
    {
        pergunta: "O que a Fenarreco é?",
        opcoes: ["A) Uma escola", "B) Uma floresta", "C) Uma festa"],
        correta: 2
    },
    {
        pergunta: "O que as pessoas mais fazem nas festas?",
        opcoes: ["A) Dançar", "B) Ficar paradas", "C) Dormir"],
        correta: 0
    },
    {
        pergunta: "As pessoas que vieram de longe para Brusque trouxeram…",
        opcoes: ["A) Nada", "B) Tradições", "C) Robôs"],
        correta: 1
    }
];

const basePath = "parte1_curricularizacao/ImagensJogoInfantil-IA/";

const perguntaElemento = document.getElementById("pergunta");

if (perguntaElemento) {
    carregarPergunta();
}

function carregarPergunta() {

    let indice = Number(localStorage.getItem("perguntaAtual")) || 0;
    const total = perguntas.length;

    // 🔥 FIM DO JOGO
    if (indice >= total) {
        window.location.href = "final.html";
        return;
    }

    let dados = perguntas[indice];

    document.querySelector(".info-jogador").innerHTML =
        "👤 " + (localStorage.getItem("nomeJogador") || "JOGADOR");

    document.querySelector(".info-pontos").innerHTML =
        "⭐ " + (localStorage.getItem("pontos") || 0);

    document.querySelector(".info-erros").innerHTML =
        "❌ " + (localStorage.getItem("erros") || 0);

    document.querySelector(".info-tentativas").innerHTML =
        "🔁 " + (localStorage.getItem("tentativas") || 0);

    document.querySelector(".info-pergunta").innerHTML =
        `📍 ${indice + 1} / ${total}`;

    perguntaElemento.innerHTML = dados.pergunta;

    document.getElementById("texto0").innerHTML = dados.opcoes[0];
    document.getElementById("texto1").innerHTML = dados.opcoes[1];
    document.getElementById("texto2").innerHTML = dados.opcoes[2];

    // 🔥 IMAGENS (CORRIGIDO)
    document.getElementById("img0").src = `${basePath}${indice + 1}a.jpg`;
    document.getElementById("img1").src = `${basePath}${indice + 1}b.jpg`;
    document.getElementById("img2").src = `${basePath}${indice + 1}c.jpg`;
}

function verificarResposta(opcaoEscolhida) {

    let indice = Number(localStorage.getItem("perguntaAtual")) || 0;
    let pontos = Number(localStorage.getItem("pontos")) || 0;
    let erros = Number(localStorage.getItem("erros")) || 0;

    const acertou = opcaoEscolhida === perguntas[indice].correta;

    if (acertou) {
        pontos++;
        localStorage.setItem("pontos", pontos);
        window.location.href = "acerto.html";
    } else {
        erros++;
        localStorage.setItem("erros", erros);
        window.location.href = "erro.html";
    }
}

function tentarNovamente() {
    let tentativas = Number(localStorage.getItem("tentativas")) || 0;
    tentativas++;
    localStorage.setItem("tentativas", tentativas);

    window.location.href = "pergunta.html";
}

function continuar() {

    let erros = Number(localStorage.getItem("erros")) || 0;
    erros++;
    localStorage.setItem("erros", erros);

    let indice = Number(localStorage.getItem("perguntaAtual")) || 0;
    indice++;

    localStorage.setItem("perguntaAtual", indice);

    window.location.href = "pergunta.html";
}