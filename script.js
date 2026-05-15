const perguntas = [
    {
        pergunta: "QUAL O NOME DA FAMOSA FESTA DE TRADIÇÃO ALEMÃ EM BRUSQUE?",
        opcoes: ["A) FENARRECO", "B) FESTA DOS ANIMAIS", "C) CARNAVAL"],
        correta: 0
    },
    {
        pergunta: "QUAL O MASCOTE DA FENARRECO?",
        opcoes: ["A) LEÃO", "B) MARRECO", "C) DINOSSAURO"],
        correta: 1
    },
    {
        pergunta: "NA FENARRECO, AS PESSOAS USAM O QUE?",
        opcoes: ["A) TRAJE TÍPICO", "B) PIJAMAS", "C) ARMADURA"],
        correta: 0
    },
    {
        pergunta: "QUE TIPO DE MÚSICA TOCA NA FENARRECO?",
        opcoes: ["A) MÚSICA ALEMÃ ANIMADA", "B) MÚSICA DE NINAR", "C) SERTANEJO"],
        correta: 0
    },
    {
        pergunta: "O QUE O BRUSQUE FUTEBOL CLUBE JOGA?",
        opcoes: ["A) BASQUETE", "B) FUTEBOL", "C) VÔLEI"],
        correta: 1
    },
    {
        pergunta: "DE ONDE VINHAM AS PESSOAS QUE MORARAM EM BRUSQUE?",
        opcoes: ["A) LUA", "B) PÓLO NORTE", "C) ALEMANHA"],
        correta: 2
    },
    {
        pergunta: "COMO ESSAS PESSOAS CHEGARAM EM BRUSQUE?",
        opcoes: ["A) FOGUETE", "B) DISCO VOADOR", "C) BARCO"],
        correta: 2
    },
    {
        pergunta: "BRUSQUE TEM MUITAS FÁBRICAS DE QUE?",
        opcoes: ["A) ROUPAS", "B) BRINQUEDOS GIGANTES", "C) NAVIOS"],
        correta: 0
    },
    {
        pergunta: "O QUE TEM EM BRUSQUE?",
        opcoes: ["A) RIOS", "B) VULCÕES", "C) DESERTO"],
        correta: 0
    },
    {
        pergunta: "COMO AS PESSOAS SE DIVERTEM NAS FESTAS?",
        opcoes: ["A) JUNTAS", "B) SOZINHAS", "C) DORMINDO"],
        correta: 0
    },
    {
        pergunta: "BRUSQUE FICA NO…",
        opcoes: ["A) MAR", "B) BRASIL", "C) ESPAÇO"],
        correta: 1
    },
    {
        pergunta: "AS ROUPAS DA FENARRECO SÃO…",
        opcoes: ["A) COLORIDAS", "B) TODAS CINZAS", "C) INVISÍVEIS"],
        correta: 0
    },
    {
        pergunta: "O QUE É A FENARRECO?",
        opcoes: ["A) UMA ESCOLA", "B) UMA FLORESTA", "C) UMA FESTA"],
        correta: 2
    },
    {
        pergunta: "O QUE AS PESSOAS MAIS FAZEM NAS FESTAS?",
        opcoes: ["A) DANÇAR", "B) FICAR PARADAS", "C) DORMIR"],
        correta: 0
    },
    {
        pergunta: "AS PESSOAS QUE VIERAM PARA BRUSQUE TROUXERAM…",
        opcoes: ["A) NADA", "B) TRADIÇÕES", "C) ROBÔS"],
        correta: 1
    }
];

const basePath = "parte1_curricularizacao/ImagensJogoInfantil-IA/";

const perguntaElemento = document.getElementById("pergunta");

if (perguntaElemento) {

    let indice = Number(localStorage.getItem("perguntaAtual")) || 0;
    let dados = perguntas[indice];

    document.querySelector(".info-jogador").innerHTML =
        "👤 " + (localStorage.getItem("nomeJogador") || "JOGADOR");

    document.querySelector(".info-pontos").innerHTML =
        "⭐ PONTOS: " + (localStorage.getItem("pontos") || 0);

    document.querySelector(".info-pergunta").innerHTML =
        "❓ " + (indice + 1) + "/15";

    perguntaElemento.innerHTML = dados.pergunta;

    document.getElementById("texto0").innerHTML = dados.opcoes[0];
    document.getElementById("texto1").innerHTML = dados.opcoes[1];
    document.getElementById("texto2").innerHTML = dados.opcoes[2];

    document.getElementById("img0").src = `${basePath}${indice + 1}a.jpg`;
    document.getElementById("img1").src = `${basePath}${indice + 1}b.jpg`;
    document.getElementById("img2").src = `${basePath}${indice + 1}c.jpg`;
}

function verificarResposta(opcaoEscolhida) {

    let indice = Number(localStorage.getItem("perguntaAtual")) || 0;
    let pontos = Number(localStorage.getItem("pontos")) || 0;

    const acertou = opcaoEscolhida === perguntas[indice].correta;

    // salva se acertou ou errou essa pergunta
    localStorage.setItem("ultimaRespostaAcertou", acertou);

    if (acertou) {
        pontos++;
        localStorage.setItem("pontos", pontos);
    }

    // IMPORTANTE: NÃO avança ainda
    window.location.href = acertou ? "acerto.html" : "erro.html";
}