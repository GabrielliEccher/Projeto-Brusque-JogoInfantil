const perguntas = [
    { id: 1, pergunta: "QUAL O NOME DA FAMOSA FESTA DE TRADIÇÃO ALEMÃ EM BRUSQUE?", opcoes: ["FENARRECO", "FESTA DOS ANIMAIS", "CARNAVAL"], respostaCorreta: 0, dica: "É UMA FESTA MUITO CONHECIDA NA CIDADE E TEM UM MARRECO COMO SÍMBOLO." },
    { id: 2, pergunta: "QUAL O MASCOTE DA FENARRECO?", opcoes: ["LEÃO", "MARRECO", "DINOSSAURO"], respostaCorreta: 1, dica: "É UMA AVE QUE FAZ 'QUÁ QUÁ'." },
    { id: 3, pergunta: "NA FENARRECO, AS PESSOAS USAM O QUE?", opcoes: ["TRAJE TÍPICO", "PIJAMAS", "ARMADURA"], respostaCorreta: 0, dica: "AS ROUPAS LEMBRAM COSTUMES ANTIGOS DA ALEMANHA." },
    { id: 4, pergunta: "QUE TIPO DE MÚSICA TOCA NA FENARRECO?", opcoes: ["MÚSICA ALEMÄ ANIMADA", "MÚSICA DE NINAR", "SERTANEJO"], respostaCorreta: 0, dica: "SÃO MÚSICAS ALEGRES TÍPICAS DA CULTURA ALEMÃ." },
    { id: 5, pergunta: "O QUE O BRUSQUE FUTEBOL CLUBE JOGA?", opcoes: ["BASQUETE", "FUTEBOL", "VÔLEI"], respostaCorreta: 1, dica: "É UM ESPORTE JOGADO COM BOLA E CHUTE AO GOL." },
    { id: 6, pergunta: "DE ONDE VIERAM AS PESSOAS QUE MORARAM EM BRUSQUE?", opcoes: ["LUA", "PÓLO NORTE", "ALEMANHA"], respostaCorreta: 2, dica: "É UM PAÍS EUROPEU CONHECIDO POR SUAS TRADIÇÕES GERMÂNICAS." },
    { id: 7, pergunta: "COMO ESSAS PESSOAS CHEGARAM EM BRUSQUE?", opcoes: ["FOGUETE", "DISCO VOADOR", "BARCO"], respostaCorreta: 2, dica: "ELAS VIERAM ATRAVESSANDO O OCEANO." },
    { id: 8, pergunta: "BRUSQUE TEM MUITAS FÁBRICAS DE QUE?", opcoes: ["ROUPAS", "BRINQUEDOS GIGANTES", "NAVIOS"], respostaCorreta: 0, dica: "A CIDADE É FAMOSA PELA PRODUÇÃO TÊXTIL." },
    { id: 9, pergunta: "O QUE TEM EM BRUSQUE?", opcoes: ["RIOS", "VULCÕES", "DESERTO"], respostaCorreta: 0, dica: "A CIDADE POSSUI NATUREZA E ÁGUA ABUNDANTE." },
    { id: 10, pergunta: "QUAL É A PONTE FAMOSA DE BRUSQUE QUE TEM CABOS ALTOS?", opcoes: ["PONTE ESTAIADA", "PONTE DE MADEIRA", "PONTE DO ESPAÇO"], respostaCorreta: 0, dica: "É UMA PONTE MODERNA COM CABOS DE SUSTENTAÇÃO." },
    { id: 11, pergunta: "O QUE FICA PERTO DA CAIXA D'ÁGUA EM BRUSQUE?", opcoes: ["UM AVIÃO", "UM FOGUETE", "UM SUBMARINO"], respostaCorreta: 1, dica: "É UM OBJETO GRANDE E TECNOLÓGICO." },
    { id: 12, pergunta: "NO PARQUE DAS ESCULTURAS EXISTEM...", opcoes: ["OBRAS DE ARTE", "VULCÕES", "CASTELOS GIGANTES"], respostaCorreta: 0, dica: "É UM LOCAL COM ESCULTURAS AO AR LIVRE." },
    { id: 13, pergunta: "NO ZOOBOTÂNICO DE BRUSQUE AS CRIANÇAS APRENDEM SOBRE...", opcoes: ["ANIMAIS E PLANTAS", "CARROS DE CORRIDA", "VIDEO GAMES"], respostaCorreta: 0, dica: "É UM LUGAR COM NATUREZA E ANIMAIS." },
    { id: 14, pergunta: "AS ESCULTURAS DO PARQUE DAS ESCULTURAS SÃO FEITAS POR...", opcoes: ["ARTISTAS", "PIRATAS", "ASTRONAUTAS"], respostaCorreta: 0, dica: "SÃO PESSOAS QUE CRIAM ARTE." },
    { id: 15, pergunta: "A PONTE ESTAIADA É CONHECIDA POR SEU FORMATO COM...", opcoes: ["CABOS", "ASAS", "RODAS"], respostaCorreta: 0, dica: "SÃO ESTRUTURAS QUE SUSTENTAM A PONTE." }
];

const basePath = "parte1_curricularizacao/ImagensJogoInfantil-IA/";

const perguntaElemento = document.getElementById("pergunta");

if (perguntaElemento) {
    carregarPergunta();
}

const botaoLerAudio = document.getElementById("btn-ler-audio");

if (botaoLerAudio) {
    botaoLerAudio.onclick = lerPerguntaEOpcoesEmVozAlta;
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

    perguntaElemento.textContent = dados.pergunta;

document.getElementById("texto0").textContent =
    "A) " + dados.opcoes[0];

document.getElementById("texto1").textContent =
    "B) " + dados.opcoes[1];

document.getElementById("texto2").textContent =
    "C) " + dados.opcoes[2];

    // 🔥 IMAGENS (CORRIGIDO)
    document.getElementById("img0").src = `${basePath}${indice + 1}a.jpg`;
    document.getElementById("img1").src = `${basePath}${indice + 1}b.jpg`;
    document.getElementById("img2").src = `${basePath}${indice + 1}c.jpg`;
}

function lerPerguntaEOpcoesEmVozAlta() {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
        return;
    }

    window.speechSynthesis.cancel();

    const pergunta = document.getElementById("pergunta")?.textContent?.trim() || "";
    const opcoes = [0, 1, 2]
        .map((i) => document.getElementById(`texto${i}`)?.textContent?.trim() || "")
        .filter(Boolean);

    const textosParaLer = [];

    if (pergunta) {
        textosParaLer.push(pergunta);
    }

    if (opcoes.length) {
        textosParaLer.push("ALTERNATIVAS.");
        opcoes.forEach((opcao, indice) => {
            textosParaLer.push(`OPÇÃO ${indice + 1}. ${opcao}`);
        });
    }

    const lang = "pt-BR";
    const rate = 0.88;

    textosParaLer.forEach((texto) => {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = lang;
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
    });
}

function verificarResposta(opcaoEscolhida) {

    let indice = Number(localStorage.getItem("perguntaAtual")) || 0;
    let pontos = Number(localStorage.getItem("pontos")) || 0;
    let erros = Number(localStorage.getItem("erros")) || 0;

    const acertou = opcaoEscolhida === perguntas[indice].respostaCorreta;

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
    let indice = Number(localStorage.getItem("perguntaAtual")) || 0;
    indice++;

    localStorage.setItem("perguntaAtual", indice);

    window.location.href = "pergunta.html";
}
