var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarQuiz", function (req, res) {
    quizController.cadastrarQuiz(req, res);
})

router.post("/listarTentativas", function (req, res) {
    quizController.listarTent(req, res);
})

router.post("/buscarInfoDash", function (req, res) {
    quizController.buscarInfoDash(req, res);
})

router.post("/buscarDadosEspecifico", function (req, res) {
    quizController.buscarDadosEspecifico(req, res);
})

module.exports = router;
