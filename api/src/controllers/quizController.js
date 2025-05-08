var quizModel = require("../models/quizModel");

function listarTent(req, res) {
    var fkQuiz = req.body.fkQuizServer;
    var fkUsuario = req.body.fkUsuarioServer;

    quizModel.listarTent(fkUsuario, fkQuiz)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar as tentativas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function cadastrarQuiz(req, res) {
    var tentativa = req.body.tentativaServer;
    var fkQuiz = req.body.fkQuizServer;
    var fkUsuario = req.body.fkUsuarioServer;
    var pontuacao = req.body.pontuacaoServer;

    if (fkQuiz == undefined) {
        res.status(400).send("O quiz escolhido está undefined!");
    } else if (fkQuiz == undefined) {
        res.status(400).send("Seu usuário está undefined!");
    } else if (pontuacao == undefined) {
        res.status(400).send("Sua pontuação está undefined!");
    } else if (tentativa == undefined) {
        res.status(400).send("Sua tentativa está undefined!");
    }

    quizModel.cadastrarQuiz(tentativa, fkQuiz, fkUsuario, pontuacao)
    .then(function(resposta){
        res.status(200).send("Quiz gravado com sucesso");
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
    listarTent,
    cadastrarQuiz
}
