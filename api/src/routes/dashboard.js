var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/buscarInfoDash", function (req, res) {
    dashboardController.buscarInfoDash(req, res);
})

router.post("/buscarDadosEspecifico", function (req, res) {
    dashboardController.buscarDadosEspecifico(req, res);
}
)
router.get("/buscarGraficoJogos", function (req, res) {
    dashboardController.buscarGraficoJogos(req, res);
})
router.get("/buscarGraficoGeneros", function (req, res) {
    dashboardController.buscarGraficoGeneros(req, res);
})

module.exports = router;
