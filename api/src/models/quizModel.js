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

    var instrucaoSql = `
        INSERT INTO pontuacao (tentativa, fkQuiz, fkUsuario, pontuacao) VALUES ('${tentativa}', '${fkQuiz}', '${fkUsuario}', '${pontuacao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarTent,
    cadastrarQuiz
};