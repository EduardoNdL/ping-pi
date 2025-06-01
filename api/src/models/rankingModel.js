var database = require("../database/config")

function obter() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarGraficos()");
    var instrucaoSql = `
        SELECT 
            nome,
            fotoPerfil,
            SUM(pontuacao) AS totalAcertos
        FROM pontuacao
        INNER JOIN quiz ON idQuiz = fkQuiz
		INNER JOIN usuario on idUsuario = fkUsuario
        GROUP BY nome, fotoPerfil
        ORDER BY totalAcertos DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    obter
};