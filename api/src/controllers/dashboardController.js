var dashboardModel = require("../models/dashboardModel");

function buscarInfoDash(req, res) {
    var fkUsuario = req.body.fkUsuario;

    dashboardModel.buscarInfoDash(fkUsuario).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os quizes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarDadosEspecifico(req, res) {
    var fkQuiz = req.body.fkQuiz;
    var fkUsuario = req.body.fkUsuario;

    dashboardModel.buscarDadosEspecifico(fkQuiz, fkUsuario).then((resultado) => {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(200).json([]);
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os quizes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarGraficoJogos(req, res) {
    dashboardModel.buscarGraficoJogos().then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarGraficoGeneros(req, res) {
    dashboardModel.buscarGraficoGeneros().then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os dados: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarInfoDash,
    buscarDadosEspecifico,
    buscarGraficoJogos,
    buscarGraficoGeneros
}
