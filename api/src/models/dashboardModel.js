var database = require("../database/config")

function buscarInfoDash(fkUsuario) {

    var instrucaoSql = `SELECT 
            tentativa, 
            dataHora,
            (SELECT SUM(pontuacao) FROM pontuacao WHERE fkUsuario = ${fkUsuario}) AS totalAcertos,
            (SELECT SUM(numPergunta) FROM pontuacao p inner join quiz on idQuiz = fkQuiz and fkUsuario = ${fkUsuario}) AS totalPerguntas,
            (SELECT MAX(dataHora) FROM pontuacao WHERE fkUsuario = ${fkUsuario}) AS ultimaTentativa
        FROM pontuacao
        INNER JOIN quiz ON idQuiz = fkQuiz
        WHERE fkUsuario = ${fkUsuario}
        GROUP BY tentativa, tema, pontuacao, dataHora;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosEspecifico(fkQuiz, fkUsuario) {
    var instrucaoSql = `SELECT 
            tentativa, 
            tema, 
            pontuacao, 
            dataHora,
            (select sum(pontuacao) from pontuacao where fkUsuario = ${fkUsuario} and fkQUiz = ${fkQuiz}) as totalAcertos,
            (select count(tentativa) from pontuacao where fkUsuario = ${fkUsuario} and fkQUiz = ${fkQuiz}) as totalTentativas,
            numPergunta
        FROM pontuacao
        INNER JOIN quiz ON idQuiz = fkQuiz
        WHERE fkUsuario = ${fkUsuario} and fkQuiz = ${fkQuiz}
        group by tentativa, tema, pontuacao, dataHora
        order by dataHora;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarGraficoJogos() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarGraficos()");
    var instrucaoSql = `
        SELECT 
            nomeJogo,
            ROUND((COUNT(*) * 100.0) / (SELECT COUNT(*) FROM usuario), 2) AS porcentagemJogo
        FROM usuario
        JOIN jogo ON fkJogo = idJogo
        GROUP BY nomeJogo ORDER BY porcentagemJogo DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarGraficoGeneros() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarGraficos()");
    var instrucaoSql = `
        SELECT 
            nomeGenero,
            ROUND((COUNT(*) * 100.0) / (SELECT COUNT(*) FROM usuario), 2) AS porcentagemGenero
        FROM usuario
        JOIN genero ON fkGenero = idGenero
        GROUP BY nomeGenero ORDER BY porcentagemGenero DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarInfoDash,
    buscarDadosEspecifico,
    buscarGraficoJogos,
    buscarGraficoGeneros
};