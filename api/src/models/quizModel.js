var database = require("../database/config")

function listarTent(fkUsuario, fkQuiz) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT 
            count(tentativa) as tentativa
        FROM pontuacao 
        WHERE fkUsuario = ${fkUsuario} and fkQuiz = ${fkQuiz};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrarQuiz(tentativa, fkQuiz, fkUsuario, pontuacao) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarQuiz():", tentativa, fkQuiz, fkUsuario, pontuacao);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO pontuacao (tentativa, fkQuiz, fkUsuario, pontuacao) VALUES ('${tentativa}', '${fkQuiz}', '${fkUsuario}', '${pontuacao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarInfoDash(fkUsuario) {

    var instrucaoSql = `SELECT 
            tentativa, 
            tema, 
            pontuacao, 
            dataHora,
            (SELECT SUM(pontuacao) FROM pontuacao WHERE fkUsuario = ${fkUsuario}) AS totalAcertos,
            (SELECT SUM(numPergunta) FROM quiz WHERE fkUsuario = ${fkUsuario}) AS totalPerguntas,
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
            (select sum(pontuacao) from pontuacao where fkUsuario = ${fkUsuario}) as totalAcertos,
            (select count(tentativa) from pontuacao where fkUsuario = ${fkUsuario}) as totalTentativas,
            numPergunta
        FROM pontuacao
        INNER JOIN quiz ON idQuiz = ${fkUsuario}
        WHERE fkUsuario = ${fkUsuario} and fkQuiz = ${fkQuiz}
        group by tentativa, tema, pontuacao, dataHora
        order by dataHora;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarTent,
    cadastrarQuiz,
    buscarInfoDash,
    buscarDadosEspecifico
};